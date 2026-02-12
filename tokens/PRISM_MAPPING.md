# Prism token mapping

Semantic colors are aligned to **Figma Prism** (usage/color and comp/color) where a direct match exists. Values without a Prism equivalent are kept and listed below.

## Semantic → Prism (used)

| Semantic | Prism source | Value |
|----------|--------------|--------|
| text.neutral | usage/color/text/default | #191919 |
| text.subdued | usage/color/text/subdued/default | #606060 |
| text.inverse | usage/color/text/inverse/default | #ffffff |
| surface.default | usage/color/background/strong/default | #f1f1f1 |
| surface.subdued | usage/color/background/subdued/default | #f7f7f7 |
| surface.raised | usage/color/background/default | #ffffff |
| surface.positive | usage/color/positive/subdued/default | #e7fbef |
| surface.negative | usage/color/negative/subdued/default | #fff0ed |
| interaction.surfaceHovered | usage/color/background/hovered | #f7f7f7 |
| interaction.surfacePressed | usage/color/background/pressed | #f1f1f1 |
| border.neutral, border.subdued | usage/color/border/default | #e4e4e4 |
| background.default | usage/color/background/default | #ffffff |
| background.subdued | usage/color/background/subdued/default | #f7f7f7 |

## No Prism match (kept as-is; please confirm or provide token)

| Semantic | Current value | Note |
|----------|----------------|------|
| text.disabled | #424242 | Prism has usage/color/text/disabled #b2b2b2 (lighter). Kept current for contrast. |
| text.positive | #327A34 | Prism positive/default is #00832d (different green). Kept for tag/status. |
| text.negative | #C83527 | Prism negative/default is #d91400 (different red). Kept for tag/status. |
| surface.elevated | #FBFBFB | Prism background/elevated is #ffffff. Kept for dropdowns. |
| surface.neutralTertiary / transparent | #FFFFFF | Alias; no separate Prism token. |
| border.table | #EDEDEE | No table border in Prism. |
| border.selected | #9A9A9A | Prism border/selected is #191919. Kept for checkbox/custom. |
| border.focused | #0F2594 | Prism border/focused is #191919a8. Kept blue for focus ring. |

- **Replaced in app:** `rgba(32, 33, 37, 0.64)` (header/label subdued) was replaced with `text.subdued` (#606060). Prism has no exact rgba token; if the design requires that specific transparent color, we can add a separate token.

If you have a Prism variable for any "No Prism match" row, we can switch to it.
