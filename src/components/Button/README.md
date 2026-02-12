# Button

Button component aligned with **Figma Emporos UI Library** (node 120-25620).

## Variants

- **primary** – Brand fill (`#4c4c4c`), text on brand (`#f1f1f1`)
- **secondary** – Surface default background, neutral text
- **tertiary** – Transparent with **inset** 1px border (border drawn inside container)
- **flat** – Transparent, no border

## Sizes and design-system mapping

| Our size | Min height | Figma control height | Typography (Figma) | Notes |
|----------|------------|------------------------|---------------------|--------|
| **small** | 36px | 36px (`component.shared.control.small.height`) | label/small/strong (14px) | Matches design |
| **medium** | 48px | 48px (`component.shared.control.medium.height`) | label/medium/strong (16px) | Matches design; paddingY updated from 12 → 13 to hit 48px |
| **large** | 52px | — | label/large/strong (18px) | **Not in Figma** – design system only defines up to 48px. Kept for backward compatibility; consider aligning to 48px or documenting as custom size. |

## Size differences (do not break)

- **Medium**: Previously paddingY was 12px (total height ~44px). It is now 13px so the button reaches the design height of 48px. No API change.
- **Large**: Figma has no “large” control (max is 48px). Our large size is 52px with 18px label. If you need strict design-system compliance, prefer `size="medium"` or treat large as a deliberate override.

## Borders

All borders are drawn **inside** the container (no outside or centered stroke):

- **Tertiary**: Uses `box-shadow: inset 0 0 0 1px …` instead of `border`.
- **Focus** (if added later): Prefer inset box-shadow for consistency.

## Disabled state

- **Primary**: `bgFillBrandDisabled` (#e9e9e9), `textOnBgFillBrandDisabled` (#bfbfbf)
- **Secondary**: `surfaceDisabled` (#f8f8f8), `textDisabled` (#bfbfbf)
- **Tertiary / flat**: Transparent background, `textDisabled`

## Tokens

- `tokens.component.button` – paddingX/Y, minHeight, borderRadius
- `tokens.usage.typography.label.{small,medium,large}.strong` – type per size
- `tokens.colors.brand` – bgFillBrand, textOnBgFillBrand, …Disabled, surfaceDisabled, textDisabled
