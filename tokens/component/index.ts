/**
 * Component Tokens
 * 
 * Component-specific tokens that provide fine-tuned customization
 * while maintaining system consistency.
 */

export { button, type ButtonTokens } from './button';
export { input, type InputTokens } from './input';
export { control, type ControlTokens } from './control';
export { iconButton, type IconButtonTokens } from './iconButton';
export { selectButton, type SelectButtonTokens } from './selectButton';
export { checkbox, type CheckboxTokens } from './checkbox';
export { tag, type TagTokens } from './tag';
export { badge, type BadgeTokens } from './badge';

import { button } from './button';
import { input } from './input';
import { control } from './control';
import { iconButton } from './iconButton';
import { selectButton } from './selectButton';
import { checkbox } from './checkbox';
import { tag } from './tag';
import { badge } from './badge';

export const component = {
  button,
  input,
  control,
  iconButton,
  selectButton,
  checkbox,
  tag,
  badge,
} as const;

export type ComponentTokens = typeof component;
