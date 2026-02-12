import type { Meta, StoryObj } from '@storybook/react';
import { QualityScore } from './QualityScore';

const meta: Meta<typeof QualityScore> = {
  title: 'Components/QualityScore',
  component: QualityScore,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    score: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Quality score percentage (0-100)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof QualityScore>;

/**
 * High quality score (80-100%) - shown in green
 */
export const HighQuality: Story = {
  args: {
    score: 95,
  },
};

/**
 * Medium quality score (50-79%) - shown in orange/yellow
 */
export const MediumQuality: Story = {
  args: {
    score: 65,
  },
};

/**
 * Low quality score (0-49%) - shown in red
 */
export const LowQuality: Story = {
  args: {
    score: 35,
  },
};

/**
 * Perfect score (100%)
 */
export const Perfect: Story = {
  args: {
    score: 100,
  },
};

/**
 * Zero score (0%)
 */
export const Zero: Story = {
  args: {
    score: 0,
  },
};

/**
 * Interactive demo with adjustable score
 */
export const Interactive: Story = {
  args: {
    score: 75,
  },
};
