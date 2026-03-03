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

export function suggestAllergens(name: string): Allergen[] {
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
      name: `${completedImages ? '✓' : '○'} Upload images`,
      detail: completedImages ? 'Complete' : `${missingImages} items remaining`,
      actionLabel: completedImages ? undefined : 'Upload',
    },
  ];

  return {
    id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: Date.now(),
    text: `Menu readiness (${completedCount}/2)`,
    items: checklistItems,
    progress: Math.round((completedCount / 2) * 100),
  };
}

/** Build verification checklist card */
function buildVerificationChecklist(status: { businessDetails: boolean; people: boolean; tax: boolean; bank: boolean }): ChatMessage {
  const completedCount = [status.businessDetails, status.people, status.tax, status.bank].filter(Boolean).length;
  const items: MessageDataItem[] = [
    {
      id: 'guide-business-details',
      name: `${status.businessDetails ? '✓' : '○'} Confirm business details`,
      detail: status.businessDetails ? 'Complete' : 'Review & confirm',
      actionLabel: status.businessDetails ? undefined : 'Start',
    },
    {
      id: 'guide-people',
      name: `${status.people ? '✓' : '○'} People connected to your business`,
      detail: status.people ? 'Complete' : 'Add UBO & representatives',
      actionLabel: status.people ? undefined : 'Start',
    },
    {
      id: 'guide-tax',
      name: `${status.tax ? '✓' : '○'} Tax information`,
      detail: status.tax ? 'Complete' : 'Add board members',
      actionLabel: status.tax ? undefined : 'Start',
    },
    {
      id: 'guide-bank',
      name: `${status.bank ? '✓' : '○'} Bank information`,
      detail: status.bank ? 'Complete' : 'Add board members',
      actionLabel: status.bank ? undefined : 'Start',
    },
  ];
  return {
    id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: Date.now(),
    text: `Verification progress (${completedCount}/4)`,
    items,
    progress: Math.round((completedCount / 4) * 100),
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
    const { total, missingAllergens: ma, missingImages: mi } = menuStats(ctx);
    const msgs: ChatMessage[] = [];

    if (ctx.fromOnboarding && ctx.focusTask) {
      const task = ctx.focusTask;
      const completedAllergens = total > 0 && ma === 0;
      const completedImages = total > 0 && mi === 0;
      const completedCount = [completedAllergens, completedImages].filter(Boolean).length;

      if (task === 'allergens') {
        msgs.push({
          id: msgId(), role: 'ai', type: 'text', timestamp: now,
          text: `Let's declare allergens for your menu. I'll guide you through the changes — it only takes a moment.`,
        });
        const items: MessageDataItem[] = [{
          id: 'guide-allergens',
          name: `${completedAllergens ? '✓' : '○'} Declare allergens for all items`,
          detail: completedAllergens ? 'Complete' : `${ma} items remaining`,
          actionLabel: completedAllergens ? undefined : 'Fix now',
        }];
        msgs.push({
          id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: now + 1,
          text: `Menu readiness (${completedCount}/2)`,
          items,
          progress: Math.round((completedCount / 2) * 100),
        });
      } else {
        msgs.push({
          id: msgId(), role: 'ai', type: 'text', timestamp: now,
          text: `Let's add photos to your menu items. I'll guide you through the changes — it only takes a moment.`,
        });
        const items: MessageDataItem[] = [{
          id: 'guide-images',
          name: `${completedImages ? '✓' : '○'} Upload images`,
          detail: completedImages ? 'Complete' : `${mi} items remaining`,
          actionLabel: completedImages ? undefined : 'Upload',
        }];
        msgs.push({
          id: msgId(), role: 'ai', type: 'suggestion-card', timestamp: now + 1,
          text: `Menu readiness (${completedCount}/2)`,
          items,
          progress: Math.round((completedCount / 2) * 100),
        });
      }
      return msgs;
    }

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

  if (ctx.page === 'settings-verification') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    const completedCount = [status.businessDetails, status.people, status.tax, status.bank].filter(Boolean).length;

    if (ctx.fromOnboarding) {
      const msgs: ChatMessage[] = [{
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `Let's verify your business! As an EU-based merchant, you need to confirm your details to comply with local regulations. Here's what we need to complete:`,
      }];
      msgs.push(buildVerificationChecklist(status));
      if (completedCount === 0) {
        msgs.push({
          id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
          text: `Let's start with your business details — most of this should already be pre-filled from your registration.`,
          actions: [{ label: 'Start with business details', actionId: 'guide-business-details' }],
        });
      }
      return msgs;
    }

    if (completedCount < 4) {
      return [{
        id: msgId(), role: 'ai', type: 'text', timestamp: now,
        text: `You have ${4 - completedCount} verification section${4 - completedCount > 1 ? 's' : ''} left to complete. I can help explain what's needed for each one.`,
        actions: [{ label: 'Show checklist', actionId: 'verify-checklist' }],
      }];
    }
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `Your business verification is complete! All sections have been submitted.`,
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
  if (ctx.page === 'settings-verification') {
    if (ctx.fromOnboarding) return [];
    return [
      { label: 'What documents do I need?', actionId: 'verify-documents' },
      { label: 'What is a UBO?', actionId: 'verify-ubo' },
      { label: 'Help me with tax info', actionId: 'verify-tax-help' },
    ];
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

  // ─── VERIFICATION GUIDED FLOW ───

  if (actionId === 'verify-checklist') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    return [buildVerificationChecklist(status)];
  }

  if (actionId === 'guide-business-details') {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `**Business details**\n\nPlease review and confirm your registered business information. This includes:\n\n• **Registered business name** — your official company name\n• **Business ID** — your Handelsregisternummer (HRB)\n• **Registered address** — where your business is officially registered\n• **Legal form** — e.g. GmbH, UG, Einzelunternehmen\n• **Registration date** and **Field of industry**\n\nMost fields should be pre-filled from your registration. Just verify they're correct and click **Save**.`,
      actions: [{ label: 'I\'ve saved this section', actionId: 'verify-saved-business' }],
    }];
  }

  if (actionId === 'verify-saved-business') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    const updated = { ...status, businessDetails: true };
    const msgs: ChatMessage[] = [
      { id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now, text: `✓ Business details confirmed!` },
      buildVerificationChecklist(updated),
    ];
    if (!status.people) {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `Next: You need to report people connected to your business. Under EU Anti-Money Laundering (AML) regulations, you must declare all Ultimate Beneficial Owners (UBOs) and company representatives.`,
        actions: [{ label: 'Continue to people', actionId: 'guide-people' }],
      });
    }
    return msgs;
  }

  if (actionId === 'guide-people') {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `**People connected to your business**\n\nUnder EU AML/KYC regulations, you must report:\n\n• **Ultimate Beneficial Owner (UBO)** — any person holding 25%+ shares or decision-making authority\n• **Company representative** — anyone with legal right to represent the company\n• **Board member** — members of the Board of Directors\n\nFor each person, provide their name, citizenship, date of birth, country of residence, and national ID number. Click **Save** when done.`,
      actions: [{ label: 'I\'ve saved this section', actionId: 'verify-saved-people' }],
    }];
  }

  if (actionId === 'verify-saved-people') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    const updated = { ...status, people: true };
    const msgs: ChatMessage[] = [
      { id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now, text: `✓ People connected saved!` },
      buildVerificationChecklist(updated),
    ];
    if (!status.tax) {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `Next up: Tax information. You'll need to add board members for tax compliance purposes.`,
        actions: [{ label: 'Continue to tax', actionId: 'guide-tax' }],
      });
    }
    return msgs;
  }

  if (actionId === 'guide-tax') {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `**Tax information**\n\nFor tax compliance, provide details of your board members:\n\n• **Full name** of each board member\n• **Date of birth**\n• **National ID number**\n\nYou can add multiple board members using the "+ Board member" button. Click **Save** when done.`,
      actions: [{ label: 'I\'ve saved this section', actionId: 'verify-saved-tax' }],
    }];
  }

  if (actionId === 'verify-saved-tax') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    const updated = { ...status, tax: true };
    const msgs: ChatMessage[] = [
      { id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now, text: `✓ Tax information saved!` },
      buildVerificationChecklist(updated),
    ];
    if (!status.bank) {
      msgs.push({
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `Last section: Bank information. Same as tax — add your board members for banking compliance.`,
        actions: [{ label: 'Continue to bank', actionId: 'guide-bank' }],
      });
    }
    return msgs;
  }

  if (actionId === 'guide-bank') {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `**Bank information**\n\nFor banking compliance, provide details of your board members:\n\n• **Full name**\n• **Date of birth**\n• **National ID number**\n\nThese are the same fields as the tax section. Add as many board members as needed and click **Save**.`,
      actions: [{ label: 'I\'ve saved this section', actionId: 'verify-saved-bank' }],
    }];
  }

  if (actionId === 'verify-saved-bank') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    const updated = { ...status, bank: true };
    const msgs: ChatMessage[] = [
      { id: msgId(), role: 'ai', type: 'action-confirmation', timestamp: now, text: `✓ Bank information saved!` },
      buildVerificationChecklist(updated),
      {
        id: msgId(), role: 'ai', type: 'text', timestamp: now + 2,
        text: `All verification sections are complete! Your business details have been submitted for review. You can go back to the onboarding page to continue with the remaining setup.`,
        actions: [{ label: 'Back to onboarding', actionId: 'navigate-home' }],
      },
    ];
    return msgs;
  }

  // Verification: What documents do I need?
  if (actionId === 'verify-documents') {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `To complete business verification, you'll typically need:\n\n• **Business registration certificate** (Handelsregisterauszug)\n• **National ID or passport** for UBOs and representatives\n• **Tax ID number** (Steuernummer)\n• **Proof of address** for the business\n\nHave these ready and I'll guide you through each section.`,
    }];
  }

  // Verification: What is a UBO?
  if (actionId === 'verify-ubo' || (lower.includes('ubo') || (lower.includes('ultimate') && lower.includes('beneficial')))) {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `**UBO = Ultimate Beneficial Owner**\n\nUnder EU Anti-Money Laundering Directive (AMLD), a UBO is any natural person who:\n\n• Holds **25% or more** of the shares or voting rights\n• Has the **sole decision-making authority** of the company\n• Otherwise exercises **control** over the management\n\nAll UBOs must be declared during business verification. If no individual meets these criteria, the senior managing official is listed instead.`,
    }];
  }

  // Verification: Tax help
  if (actionId === 'verify-tax-help') {
    return [{
      id: msgId(), role: 'ai', type: 'text', timestamp: now,
      text: `For the **Tax section**, you need to list all board members (Vorstandsmitglieder or Geschäftsführer). For each person, provide:\n\n• Full legal name\n• Date of birth\n• National ID number\n\nThis is required for tax transparency and anti-fraud regulations in Germany. You can add multiple board members.`,
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
  if (ctx.page === 'settings-verification') {
    const status = ctx.verificationStatus ?? { businessDetails: false, people: false, tax: false, bank: false };
    return [status.businessDetails, status.people, status.tax, status.bank].filter((v) => !v).length;
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
