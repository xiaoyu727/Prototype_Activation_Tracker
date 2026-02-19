import type { ChatContext, ChatMessage, SuggestedChip, MessageDataItem, ImageMatch } from './types';
import { EU_ALLERGENS } from '../../pages/ProductListPage/types';
import type { Allergen } from '../../pages/ProductListPage/types';

let _nextId = 1;
function msgId() { return `ai-${_nextId++}`; }

/** Allergen lookup by keyword in product name */
const ALLERGEN_HINTS: Record<string, Allergen[]> = {
  milk: ['Milk'],
  latte: ['Milk', 'Soy'],
  matcha: ['Milk', 'Soy'],
  cream: ['Milk'],
  creamy: ['Milk'],
  choco: ['Milk', 'Soy'],
  chocolate: ['Milk', 'Soy', 'Cereals containing gluten'],
  cheese: ['Milk'],
  burger: ['Cereals containing gluten', 'Sesame'],
  chicken: ['Cereals containing gluten', 'Eggs'],
  cookie: ['Cereals containing gluten', 'Milk', 'Eggs'],
  nugget: ['Cereals containing gluten', 'Eggs'],
  mayo: ['Eggs', 'Mustard'],
  beyond: ['Soy', 'Cereals containing gluten'],
};

function suggestAllergens(name: string): Allergen[] {
  const lower = name.toLowerCase();
  const found = new Set<Allergen>();
  for (const [keyword, allergens] of Object.entries(ALLERGEN_HINTS)) {
    if (lower.includes(keyword)) {
      allergens.forEach((a) => found.add(a));
    }
  }
  return Array.from(found);
}

/** Compute menu compliance stats */
function menuStats(ctx: ChatContext) {
  const products = ctx.products ?? [];
  const total = products.length;
  const missingAllergens = products.filter((p) => !p.allergensDeclared).length;
  const missingImages = products.filter((p) => !p.image).length;
  const missingDescriptions = products.filter((p) => !p.description).length;
  return { total, missingAllergens, missingImages, missingDescriptions };
}

/** Build the checklist card showing current progress (2 tasks: allergens + images) */
function buildChecklistCard(ctx: ChatContext): ChatMessage {
  const { total, missingAllergens, missingImages } = menuStats(ctx);
  const completedAllergens = total > 0 && missingAllergens === 0;
  const completedImages = total > 0 && missingImages === 0;
  const completedCount = [completedAllergens, completedImages].filter(Boolean).length;

  const checklistItems: MessageDataItem[] = [
    {
      id: 'guide-allergens',
      name: `${completedAllergens ? '✓' : '○'} Declare allergens for all items`,
      detail: completedAllergens ? 'Complete' : `${missingAllergens} items remaining`,
      actionLabel: completedAllergens ? undefined : 'Fix now',
    },
    {
      id: 'guide-images',
      name: `${completedImages ? '✓' : '○'} Add product images`,
      detail: completedImages ? 'Complete' : `${missingImages} items remaining`,
      actionLabel: completedImages ? undefined : 'Show items',
    },
  ];

  return {
    id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: Date.now(),
    text: `Menu readiness (${completedCount}/2)`,
    items: checklistItems,
    progress: Math.round((completedCount / 2) * 100),
  };
}

/** Generate the proactive greeting messages for a given context */
export function getGreeting(ctx: ChatContext): ChatMessage[] {
  const now = Date.now();

  if (ctx.page === 'onboarding') {
    const tasks = ctx.onboardingTasks ?? [];
    const remaining = tasks.filter((t) => !t.done).length;
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: remaining > 0
        ? `Welcome! I can see you're setting up your store. You have ${remaining} task${remaining > 1 ? 's' : ''} remaining. Want me to walk you through them?`
        : `Great news — all your onboarding tasks are complete! You're ready to go live.`,
    }];
  }

  if (ctx.page === 'menu') {
    const { total } = menuStats(ctx);
    const msgs: ChatMessage[] = [];

    if (ctx.fromOnboarding) {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Your menu has ${total} items. Before your store can go live in Germany, here's what still needs to be done:`,
      });

      msgs.push(buildChecklistCard(ctx));

      return msgs;
    }

    const { missingAllergens, missingImages, missingDescriptions } = menuStats(ctx);
    const issues: string[] = [];
    if (missingAllergens > 0) issues.push(`${missingAllergens} item${missingAllergens > 1 ? 's' : ''} missing allergen declarations`);
    if (missingImages > 0) issues.push(`${missingImages} item${missingImages > 1 ? 's' : ''} without images`);
    if (missingDescriptions > 0) issues.push(`${missingDescriptions} item${missingDescriptions > 1 ? 's' : ''} without descriptions`);

    if (issues.length > 0) {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Your menu has ${total} items. I found a few things to fix before going live:`,
      });

      const items: MessageDataItem[] = [];
      if (missingAllergens > 0) items.push({ id: 'fix-allergens', name: `${missingAllergens} items missing allergen declarations`, actionLabel: 'Fix now' });
      if (missingImages > 0) items.push({ id: 'show-no-images', name: `${missingImages} items without images`, actionLabel: 'Show items' });
      if (missingDescriptions > 0) items.push({ id: 'show-no-desc', name: `${missingDescriptions} items without descriptions`, actionLabel: 'Add descriptions' });

      msgs.push({
        id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: now + 1,
        text: 'Issues to resolve',
        items,
        actions: [{ label: 'Fix all issues', actionId: 'fix-all' }],
      });
    } else {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Your menu has ${total} items and everything looks good — all allergens are declared, images and descriptions are in place. You're ready to go live!`,
      });
    }
    return msgs;
  }

  if (ctx.page === 'product-detail' && ctx.currentProduct) {
    const p = ctx.currentProduct;
    const issues: string[] = [];
    if (!p.allergensDeclared) issues.push('allergen data');
    if (!p.image) issues.push('a product image');
    if (!p.description) issues.push('a description');
    if (issues.length > 0) {
      return [{
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `You're editing "${p.name}". This item is missing ${issues.join(', ')}.`,
      }];
    }
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `You're editing "${p.name}". This item looks complete!`,
    }];
  }

  return [{
    id: msgId(), role: 'ai', type: 'text', timestamp: now,
    text: `Hi! I'm your AI assistant. I can help with menu compliance, allergen declarations, and getting your store live. What can I help with?`,
  }];
}

/** Get suggested chips based on context */
export function getSuggestedChips(ctx: ChatContext): SuggestedChip[] {
  if (ctx.page === 'onboarding') {
    return [
      { label: "What's left to do?", actionId: 'whats-left' },
      { label: 'Help with menu', actionId: 'help-menu' },
      { label: 'German regulations', actionId: 'regulations' },
    ];
  }
  if (ctx.page === 'menu') {
    if (ctx.fromOnboarding) {
      return [];
    }
    const chips: SuggestedChip[] = [];
    const { missingAllergens, missingImages } = menuStats(ctx);
    if (missingAllergens > 0) chips.push({ label: 'Fix allergens', actionId: 'fix-allergens' });
    if (missingImages > 0) chips.push({ label: 'Missing images', actionId: 'show-no-images' });
    chips.push({ label: 'German food laws', actionId: 'regulations' });
    return chips;
  }
  if (ctx.page === 'product-detail') {
    return [
      { label: 'Suggest allergens', actionId: 'suggest-allergens' },
      { label: 'Write description', actionId: 'write-description' },
    ];
  }
  return [
    { label: 'Help me get started', actionId: 'help-start' },
    { label: 'German regulations', actionId: 'regulations' },
  ];
}

/**
 * Generate AI response to a user message or action.
 * For guided onboarding actions, ctx should reflect the LATEST product data
 * (i.e., after any mutations triggered by previous actions).
 */
export function generateResponse(
  input: string,
  actionId: string | null,
  ctx: ChatContext,
): ChatMessage[] {
  const now = Date.now();
  const lower = input.toLowerCase();
  const isGuided = ctx.fromOnboarding;
  const { missingAllergens, missingImages, missingDescriptions } = menuStats(ctx);

  // ─── GUIDED ONBOARDING FLOW ───

  // "Let's go" or start from the top — find first incomplete task and begin
  if (actionId === 'guide-start') {
    if (missingAllergens > 0) {
      return generateResponse('', 'guide-allergens', ctx);
    } else if (missingImages > 0) {
      return generateResponse('', 'guide-images', ctx);
    }
    return [{
      id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now,
      text: `All menu tasks are complete! Your menu is ready to go live.`,
      actions: [{ label: 'Back to onboarding', actionId: 'navigate-home' }],
    }];
  }

  // Step 1: Guided allergen fix — filter table & show suggestions
  if (actionId === 'guide-allergens') {
    const products = ctx.products ?? [];
    const undeclared = products.filter((p) => !p.allergensDeclared);
    if (undeclared.length === 0) {
      return [
        { id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now, text: `Allergens are already declared for all items.` },
        ...generateResponse('', 'guide-images', ctx),
      ];
    }
    const items: MessageDataItem[] = undeclared.slice(0, 8).map((p) => {
      const suggested = suggestAllergens(p.name);
      return {
        id: p.id,
        name: p.name,
        detail: suggested.length > 0 ? suggested.join(', ') : 'None detected',
      };
    });
    if (undeclared.length > 8) {
      items.push({ id: 'more', name: `... +${undeclared.length - 8} more`, detail: '' });
    }
    return [
      {
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Step 1 of 2: Allergen declarations\n\nI've filtered the table to ${undeclared.length} items missing allergen data and analyzed the product names:`,
      },
      {
        id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: now + 1,
        text: `Allergen suggestions (${undeclared.length} items)`,
        items,
        actions: [
          { label: 'Apply all suggestions', actionId: 'guide-apply-allergens' },
        ],
      },
    ];
  }

  // Guided: apply allergens, then show completion + next task
  if (actionId === 'guide-apply-allergens') {
    const products = ctx.products ?? [];
    const undeclared = products.filter((p) => !p.allergensDeclared);
    const msgs: ChatMessage[] = [
      {
        id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now,
        text: `Done! Applied allergen suggestions to ${undeclared.length} items.\n\n✓ Declare allergens — Complete`,
      },
    ];
    const afterAllergens = { ...ctx, products: (ctx.products ?? []).map((p) => p.allergensDeclared ? p : { ...p, allergensDeclared: true, allergens: p.allergens ?? [] }) };
    const afterStats = menuStats(afterAllergens);

    msgs.push(buildChecklistCard(afterAllergens));

    if (afterStats.missingImages > 0) {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `Great progress! Next up: ${afterStats.missingImages} items need product images.`,
        actions: [{ label: 'Continue to images', actionId: 'guide-images' }],
      });
    } else {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `All menu tasks are complete! Your menu is ready to go live.`,
        actions: [{ label: 'Back to onboarding', actionId: 'navigate-home' }],
      });
    }
    return msgs;
  }

  // Step 2: Guided images — filter table + show inline drop zone
  if (actionId === 'guide-images') {
    const products = ctx.products ?? [];
    const noImage = products.filter((p) => !p.image);
    if (noImage.length === 0) {
      const msgs: ChatMessage[] = [
        { id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now, text: `All items already have images.` },
      ];
      msgs.push(buildChecklistCard(ctx));
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `All menu tasks are complete! Your menu is ready to go live.`,
        actions: [{ label: 'Back to onboarding', actionId: 'navigate-home' }],
      });
      return msgs;
    }
    return [
      {
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Step 2 of 2: Product images\n\nI've filtered the table to ${noImage.length} item${noImage.length > 1 ? 's' : ''} missing images. Drop your photos below and I'll match them to items:`,
      },
      {
        id: msgId(), role: 'ai', type: 'image-upload', timestamp: now + 1,
        text: `${noImage.length} items need images`,
      },
    ];
  }

  // Guided: user dropped files — show match preview
  if (actionId === 'guide-confirm-images') {
    const products = ctx.products ?? [];
    const noImage = products.filter((p) => !p.image);
    const matches: ImageMatch[] = noImage.map((p) => ({
      fileName: p.name.toLowerCase().replace(/\s+/g, '-') + '.jpg',
      productId: p.id,
      productName: p.name,
    }));
    return [{
      id: msgId(), role: 'ai', type: 'image-match-preview', timestamp: now,
      text: `Matched ${matches.length} images to products:`,
      imageMatches: matches,
      actions: [{ label: 'Confirm and apply', actionId: 'guide-apply-matched-images' }],
    }];
  }

  // Guided: apply matched images
  if (actionId === 'guide-apply-matched-images') {
    const products = ctx.products ?? [];
    const noImage = products.filter((p) => !p.image);
    const msgs: ChatMessage[] = [
      {
        id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now,
        text: `Done! Added images for ${noImage.length} items.\n\n✓ Add product images — Complete`,
      },
    ];

    const afterImages = { ...ctx, products: (ctx.products ?? []).map((p) => p.image ? p : { ...p, image: 'placeholder' }) };

    msgs.push(buildChecklistCard(afterImages));

    msgs.push({
      id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
      text: `All tasks are complete! Your menu meets EU LMIV requirements and is ready to go live.\n\nYou can go back to the onboarding page to continue with the remaining setup steps.`,
      actions: [{ label: 'Back to onboarding', actionId: 'navigate-home' }],
    });
    return msgs;
  }

  // Guided: all complete
  if (actionId === 'guide-complete') {
    return [{
      id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now,
      text: `All tasks are complete! Your menu meets EU LMIV requirements and is ready to go live.`,
      actions: [{ label: 'Back to onboarding', actionId: 'navigate-home' }],
    }];
  }

  // ─── NON-GUIDED (STANDARD) RESPONSES ───

  // Allergen regulation question
  if (actionId === 'regulations' || lower.includes('regulation') || lower.includes('allergen') && lower.includes('germany') || lower.includes('lmiv') || lower.includes('food law')) {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `Under EU regulation (LMIV), you must declare these 14 allergens if present in any product:\n\n${EU_ALLERGENS.join(', ')}.\n\nEach product must have allergens declared before your menu can go live — even items with no allergens need to be explicitly marked as "allergen-free".\n\nWant me to help review your items?`,
      actions: isGuided
        ? [{ label: 'Back to checklist', actionId: 'guide-start' }]
        : [{ label: 'Review allergens', actionId: 'fix-allergens' }, { label: 'Learn more', actionId: 'learn-more-lmiv' }],
    }];
  }

  // Fix allergens (non-guided)
  if (actionId === 'fix-allergens' || (lower.includes('allergen') && (lower.includes('fix') || lower.includes('help') || lower.includes('review')))) {
    const products = ctx.products ?? [];
    const undeclared = products.filter((p) => !p.allergensDeclared);
    if (undeclared.length === 0) {
      return [{ id: msgId(), role: 'ai', type: 'text', timestamp: now, text: 'All items have their allergens declared. You\'re all set!' }];
    }
    const items: MessageDataItem[] = undeclared.slice(0, 8).map((p) => {
      const suggested = suggestAllergens(p.name);
      return {
        id: p.id,
        name: p.name,
        detail: suggested.length > 0 ? suggested.join(', ') : 'No allergens detected',
      };
    });
    if (undeclared.length > 8) {
      items.push({ id: 'more', name: `... +${undeclared.length - 8} more`, detail: '' });
    }
    return [
      { id: msgId(), role: 'ai', type: 'text', timestamp: now, text: `I'll analyze your product names and suggest allergens. Here's what I found:` },
      {
        id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: now + 1,
        text: `Allergen suggestions (${undeclared.length} items)`,
        items,
        actions: [
          { label: 'Apply all suggestions', actionId: 'apply-all-allergens' },
          { label: 'Review one by one', actionId: 'review-allergens' },
        ],
      },
    ];
  }

  // Apply all allergen suggestions (non-guided)
  if (actionId === 'apply-all-allergens') {
    const products = ctx.products ?? [];
    const undeclared = products.filter((p) => !p.allergensDeclared);
    return [{
      id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now,
      text: `Done! Updated allergen declarations for ${undeclared.length} items. All products now have their allergens declared.`,
    }];
  }

  // Show missing images
  if (actionId === 'show-no-images' || (lower.includes('image') && (lower.includes('missing') || lower.includes('need') || lower.includes('without')))) {
    const products = ctx.products ?? [];
    const noImage = products.filter((p) => !p.image);
    if (noImage.length === 0) {
      return [{ id: msgId(), role: 'ai', type: 'text', timestamp: now, text: 'All items have product images. Nice work!' }];
    }
    return [{
      id: msgId(), role: 'ai', type: 'data-table', timestamp: now,
      text: `${noImage.length} item${noImage.length > 1 ? 's' : ''} have no product image:`,
      items: noImage.map((p) => ({ id: p.id, name: p.name, actionLabel: 'Open' })),
      actions: [{ label: 'Filter list to show these', actionId: 'filter-no-image' }],
    }];
  }

  // Show missing descriptions
  if (actionId === 'show-no-desc' || (lower.includes('description') && (lower.includes('missing') || lower.includes('add') || lower.includes('without')))) {
    const products = ctx.products ?? [];
    const noDesc = products.filter((p) => !p.description);
    if (noDesc.length === 0) {
      return [{ id: msgId(), role: 'ai', type: 'text', timestamp: now, text: 'All items have descriptions!' }];
    }
    return [{
      id: msgId(), role: 'ai', type: 'data-table', timestamp: now,
      text: `${noDesc.length} item${noDesc.length > 1 ? 's' : ''} without descriptions:`,
      items: noDesc.slice(0, 6).map((p) => ({ id: p.id, name: p.name, actionLabel: 'Open' })),
    }];
  }

  // Write description for current product
  if (actionId === 'write-description' || (lower.includes('description') && lower.includes('write'))) {
    if (ctx.currentProduct) {
      const name = ctx.currentProduct.name;
      return [{
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Here's a suggestion for "${name}":\n\n"A refreshing ${name.toLowerCase()} crafted with premium ingredients and served with chewy tapioca pearls for an authentic boba experience."\n\nWant me to apply it?`,
        actions: [
          { label: 'Apply', actionId: 'apply-description' },
          { label: 'Try another', actionId: 'write-description' },
        ],
      }];
    }
  }

  // Suggest allergens for current product
  if (actionId === 'suggest-allergens') {
    if (ctx.currentProduct) {
      const suggested = suggestAllergens(ctx.currentProduct.name);
      return [{
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: suggested.length > 0
          ? `Based on the name "${ctx.currentProduct.name}", I suggest these allergens: ${suggested.join(', ')}.\n\nWant me to apply them?`
          : `I couldn't detect specific allergens from the name "${ctx.currentProduct.name}". You may want to mark it as allergen-free if applicable, or add allergens manually.`,
        actions: suggested.length > 0
          ? [{ label: 'Apply', actionId: 'apply-product-allergens' }, { label: 'Edit', actionId: 'edit-allergens' }]
          : [{ label: 'Mark allergen-free', actionId: 'mark-allergen-free' }],
      }];
    }
  }

  // What's left to do (onboarding)
  if (actionId === 'whats-left' || lower.includes('left') || lower.includes('remaining') || lower.includes('next')) {
    if (isGuided) {
      return generateResponse('', 'guide-start', ctx);
    }
    const tasks = ctx.onboardingTasks ?? [];
    const remaining = tasks.filter((t) => !t.done);
    if (remaining.length === 0) {
      return [{ id: msgId(), role: 'ai', type: 'text', timestamp: now, text: 'All tasks are complete! You\'re ready to go live.' }];
    }
    return [{
      id: msgId(), role: 'ai', type: 'data-table', timestamp: now,
      text: `You have ${remaining.length} task${remaining.length > 1 ? 's' : ''} remaining:`,
      items: remaining.map((t) => ({ id: t.id, name: t.label })),
    }];
  }

  // Help with menu
  if (actionId === 'help-menu' || (lower.includes('menu') && lower.includes('help'))) {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: 'To get your menu ready for going live in Germany, each product needs:\n\n1. Allergen declarations (required by EU LMIV regulation)\n2. A product image\n3. A description\n\nGo to your menu page and I\'ll help you fix any missing data. Want me to take you there?',
      actions: [{ label: 'Go to menu', actionId: 'navigate-menu' }],
    }];
  }

  // Generic fallback
  return [{
    id: msgId(), role: 'ai', type: 'text', timestamp: now,
    text: `I can help with:\n• Allergen declarations and German food regulations\n• Finding items with missing images or descriptions\n• Getting your menu ready to go live\n\nWhat would you like help with?`,
  }];
}

/** Compute the notification badge count for the AI button */
export function getBadgeCount(ctx: ChatContext): number {
  if (ctx.page === 'menu') {
    const { missingAllergens, missingImages, missingDescriptions } = menuStats(ctx);
    return missingAllergens + missingImages + missingDescriptions;
  }
  if (ctx.page === 'onboarding') {
    return (ctx.onboardingTasks ?? []).filter((t) => !t.done).length;
  }
  if (ctx.page === 'product-detail' && ctx.currentProduct) {
    const p = ctx.currentProduct;
    let count = 0;
    if (!p.allergensDeclared) count++;
    if (!p.image) count++;
    if (!p.description) count++;
    return count;
  }
  return 0;
}
