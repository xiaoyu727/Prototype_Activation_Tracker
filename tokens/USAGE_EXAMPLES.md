# Design Tokens - Usage Examples

Practical examples for using design tokens in React components.

## Table of Contents

- [Button Examples](#button-examples)
- [Input Examples](#input-examples)
- [Card Examples](#card-examples)
- [Typography Examples](#typography-examples)
- [Layout Examples](#layout-examples)
- [Icon Examples](#icon-examples)

---

## Button Examples

### Primary Button

```tsx
import { tokens, getTypographyStyles } from './tokens';

// With CSS-in-JS
const PrimaryButton = styled.button`
  padding: ${tokens.component.button.paddingY.small}px ${tokens.component.button.paddingX.small}px;
  border-radius: ${tokens.component.button.borderRadius}px;
  background-color: ${tokens.colors.brand.bgFillBrand};
  color: ${tokens.colors.brand.textOnBgFillBrand};
  border: none;
  cursor: pointer;
  ${getTypographyStyles(tokens.usage.typography.label.small.strong)}
  
  &:hover {
    opacity: 0.9;
  }
`;

// With inline styles
function PrimaryButton({ children }) {
  return (
    <button
      style={{
        padding: `${tokens.component.button.paddingY.small}px ${tokens.component.button.paddingX.small}px`,
        borderRadius: `${tokens.component.button.borderRadius}px`,
        backgroundColor: tokens.colors.brand.bgFillBrand,
        color: tokens.colors.brand.textOnBgFillBrand,
        border: 'none',
        cursor: 'pointer',
        ...getTypographyStyles(tokens.usage.typography.label.small.strong),
      }}
    >
      {children}
    </button>
  );
}

// With CSS Custom Properties
// CSS:
// .primary-button {
//   padding: var(--button-padding-y-small) var(--button-padding-x-small);
//   border-radius: var(--button-border-radius);
//   background-color: var(--brand-bg-fill-brand);
//   color: var(--brand-text-on-bg-fill-brand);
//   font-family: var(--typography-label-small-strong-font-family);
//   font-size: var(--typography-label-small-strong-font-size);
//   font-weight: var(--typography-label-small-strong-font-weight);
// }

function PrimaryButton({ children }) {
  return <button className="primary-button">{children}</button>;
}
```

### Icon Button

```tsx
import { tokens } from './tokens';

const IconButton = styled.button`
  width: ${tokens.component.iconButton.small.size}px;
  height: ${tokens.component.iconButton.small.size}px;
  border-radius: ${tokens.component.iconButton.small.cornerRadius}px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.usage.iconColors.default};
  
  &:hover {
    background-color: ${tokens.semantic.colors.surface.subdued};
  }
`;
```

---

## Input Examples

### Text Input

```tsx
import { tokens, getTypographyStyles } from './tokens';

const TextInput = styled.input`
  height: ${tokens.component.control.small.height}px;
  border-radius: ${tokens.component.input.small.cornerRadius}px;
  border: ${tokens.component.input.borderWidth}px solid ${tokens.semantic.colors.border.subdued};
  padding: 0 ${tokens.usage.spacing.small}px;
  background-color: ${tokens.semantic.colors.background.default};
  color: ${tokens.semantic.colors.text.neutral};
  ${getTypographyStyles(tokens.usage.typography.label.small.default)}
  
  &::placeholder {
    color: ${tokens.semantic.colors.text.subdued};
  }
  
  &:focus {
    outline: none;
    border-width: ${tokens.component.input.borderWidthFocused}px;
    border-color: ${tokens.semantic.colors.border.focused};
  }
  
  &:disabled {
    background-color: ${tokens.semantic.colors.surface.subdued};
    color: ${tokens.semantic.colors.text.disabled};
    cursor: not-allowed;
  }
`;
```

### Search Input

```tsx
const SearchInput = styled.input`
  height: ${tokens.component.control.small.height}px;
  border-radius: ${tokens.component.input.small.cornerRadius}px;
  border: none;
  padding: 0 ${tokens.usage.spacing.small}px 0 ${tokens.usage.spacing.xLarge}px;
  background-color: ${tokens.component.input.search.backgroundColor};
  color: ${tokens.semantic.colors.text.neutral};
  ${getTypographyStyles(tokens.usage.typography.label.small.default)}
  
  &::placeholder {
    color: ${tokens.semantic.colors.text.subdued};
  }
  
  &:focus {
    outline: none;
    background-color: ${tokens.semantic.colors.background.default};
    border: ${tokens.component.input.borderWidthFocused}px solid ${tokens.semantic.colors.border.focused};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${tokens.usage.spacing.xSmall}px;
  top: 50%;
  transform: translateY(-50%);
  color: ${tokens.usage.iconColors.subdued};
  width: ${tokens.usage.sizing.xSmall}px;
  height: ${tokens.usage.sizing.xSmall}px;
`;
```

---

## Card Examples

### Basic Card

```tsx
import { tokens } from './tokens';

const Card = styled.div`
  background-color: ${tokens.semantic.colors.surface.raised};
  border: ${tokens.usage.borderWidth.thin}px solid ${tokens.semantic.colors.border.subdued};
  border-radius: ${tokens.usage.borderRadius.medium}px;
  padding: ${tokens.usage.spacing.medium}px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  margin-bottom: ${tokens.usage.spacing.small}px;
  ${getTypographyStyles(tokens.usage.typography.label.small.strong)}
  color: ${tokens.semantic.colors.text.neutral};
`;

const CardContent = styled.div`
  ${getTypographyStyles(tokens.usage.typography.body.small.regular)}
  color: ${tokens.semantic.colors.text.subdued};
`;
```

### Elevated Card

```tsx
const ElevatedCard = styled.div`
  background-color: ${tokens.semantic.colors.surface.raised};
  border-radius: ${tokens.usage.borderRadius.large}px;
  padding: ${tokens.usage.spacing.large}px;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  
  &:hover {
    box-shadow: 
      0 14px 28px rgba(0, 0, 0, 0.12),
      0 10px 10px rgba(0, 0, 0, 0.15);
  }
`;
```

---

## Typography Examples

### Headings

```tsx
import { tokens, getTypographyStyles } from './tokens';

const H1 = styled.h1`
  ${getTypographyStyles(tokens.usage.typography.display.large)}
  color: ${tokens.semantic.colors.text.neutral};
  margin: 0 0 ${tokens.usage.spacing.medium}px 0;
`;

const Label = styled.label`
  ${getTypographyStyles(tokens.usage.typography.label.small.strong)}
  color: ${tokens.semantic.colors.text.neutral};
  display: block;
  margin-bottom: ${tokens.usage.spacing.xxSmall}px;
`;

const Caption = styled.span`
  ${getTypographyStyles(tokens.usage.typography.caption)}
  color: ${tokens.semantic.colors.text.subdued};
`;
```

### Body Text

```tsx
const BodyText = styled.p`
  ${getTypographyStyles(tokens.usage.typography.body.small.regular)}
  color: ${tokens.semantic.colors.text.neutral};
  margin: 0 0 ${tokens.usage.spacing.small}px 0;
  line-height: 1.6;
`;

const SubduedText = styled.span`
  ${getTypographyStyles(tokens.usage.typography.label.small.default)}
  color: ${tokens.semantic.colors.text.subdued};
`;
```

### Links

```tsx
const Link = styled.a`
  ${getTypographyStyles(tokens.usage.typography.link.small)}
  color: ${tokens.colors.brand.bgFillBrand};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:visited {
    color: ${tokens.colors.brand.bgFillBrand};
  }
`;
```

---

## Layout Examples

### Flex Container

```tsx
const FlexContainer = styled.div`
  display: flex;
  gap: ${tokens.usage.spacing.medium}px;
  padding: ${tokens.usage.spacing.medium}px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.usage.spacing.small}px;
`;
```

### Grid Container

```tsx
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${tokens.usage.spacing.medium}px;
  padding: ${tokens.usage.spacing.large}px;
`;
```

### Stack (Vertical Spacing)

```tsx
const Stack = styled.div<{ spacing?: keyof typeof tokens.usage.spacing }>`
  display: flex;
  flex-direction: column;
  gap: ${({ spacing = 'medium' }) => tokens.usage.spacing[spacing]}px;
`;

// Usage
<Stack spacing="small">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

---

## Icon Examples

### Icon Container

```tsx
const Icon = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  width: ${({ size = 'small' }) => 
    size === 'small' ? tokens.usage.sizing.xSmall :
    size === 'medium' ? tokens.usage.sizing.small :
    tokens.usage.sizing.medium
  }px;
  height: ${({ size = 'small' }) => 
    size === 'small' ? tokens.usage.sizing.xSmall :
    size === 'medium' ? tokens.usage.sizing.small :
    tokens.usage.sizing.medium
  }px;
  color: ${tokens.usage.iconColors.default};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const InverseIcon = styled(Icon)`
  color: ${tokens.usage.iconColors.inverse};
`;

const SubduedIcon = styled(Icon)`
  color: ${tokens.usage.iconColors.subdued};
`;
```

---

## Complete Component Examples

### Complete Button Component

```tsx
import { tokens, getTypographyStyles } from './tokens';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledButton = styled.button<{ variant: ButtonVariant; size: ButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.usage.spacing.xxSmall}px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  /* Size styles */
  ${({ size }) => {
    const sizeMap = {
      small: {
        paddingX: tokens.component.button.paddingX.small,
        paddingY: tokens.component.button.paddingY.small,
      },
      medium: {
        paddingX: tokens.component.button.paddingX.medium,
        paddingY: tokens.component.button.paddingY.medium,
      },
      large: {
        paddingX: tokens.component.button.paddingX.large,
        paddingY: tokens.component.button.paddingY.large,
      },
    };
    const { paddingX, paddingY } = sizeMap[size];
    return `padding: ${paddingY}px ${paddingX}px;`;
  }}
  
  border-radius: ${tokens.component.button.borderRadius}px;
  ${getTypographyStyles(tokens.usage.typography.label.small.strong)}
  
  /* Variant styles */
  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${tokens.colors.brand.bgFillBrand};
          color: ${tokens.colors.brand.textOnBgFillBrand};
          
          &:hover:not(:disabled) {
            opacity: 0.9;
          }
        `;
      case 'secondary':
        return `
          background-color: ${tokens.semantic.colors.surface.subdued};
          color: ${tokens.semantic.colors.text.neutral};
          
          &:hover:not(:disabled) {
            background-color: ${tokens.semantic.colors.surface.default};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${tokens.semantic.colors.text.neutral};
          
          &:hover:not(:disabled) {
            background-color: ${tokens.semantic.colors.surface.subdued};
          }
        `;
      default:
        return '';
    }
  }}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export function Button({ 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
```

### Complete Input Component

```tsx
import { tokens, getTypographyStyles } from './tokens';
import styled from 'styled-components';
import { useState } from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.usage.spacing.xxSmall}px;
`;

const Label = styled.label`
  ${getTypographyStyles(tokens.usage.typography.label.small.strong)}
  color: ${tokens.semantic.colors.text.neutral};
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  height: ${tokens.component.control.small.height}px;
  border-radius: ${tokens.component.input.small.cornerRadius}px;
  border: ${tokens.component.input.borderWidth}px solid 
    ${({ hasError }) => hasError 
      ? '#dc2626' 
      : tokens.semantic.colors.border.subdued};
  padding: 0 ${tokens.usage.spacing.small}px;
  background-color: ${tokens.semantic.colors.background.default};
  color: ${tokens.semantic.colors.text.neutral};
  ${getTypographyStyles(tokens.usage.typography.label.small.default)}
  transition: all 0.2s;
  
  &::placeholder {
    color: ${tokens.semantic.colors.text.subdued};
  }
  
  &:focus {
    outline: none;
    border-width: ${tokens.component.input.borderWidthFocused}px;
    border-color: ${({ hasError }) => hasError 
      ? '#dc2626' 
      : tokens.semantic.colors.border.focused};
  }
  
  &:disabled {
    background-color: ${tokens.semantic.colors.surface.subdued};
    color: ${tokens.semantic.colors.text.disabled};
    cursor: not-allowed;
  }
`;

const ErrorText = styled.span`
  ${getTypographyStyles(tokens.usage.typography.caption)}
  color: #dc2626;
`;

export function Input({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error,
  disabled 
}: InputProps) {
  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        hasError={!!error}
        disabled={disabled}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
}
```

---

## Best Practices Summary

1. **Always use tokens** - Never hardcode values
2. **Use semantic tokens** - Prefer `tokens.semantic.colors.text.neutral` over direct color values
3. **Use typography utilities** - Use `getTypographyStyles()` for consistent typography
4. **Maintain token hierarchy** - Semantic → Usage → Component → Base
5. **Use CSS variables for themes** - Enable dynamic theming
6. **Type everything** - Leverage TypeScript for token safety

---

**Last Updated**: January 30, 2026
