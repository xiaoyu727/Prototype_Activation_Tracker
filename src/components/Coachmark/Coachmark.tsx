import React, { useEffect, useState, useCallback } from 'react';

export interface CoachmarkStep {
  title: string;
  body: string;
  targetSelector: string;
  placement?: 'bottom' | 'top' | 'left' | 'right';
}

interface CoachmarkProps {
  steps: CoachmarkStep[];
  onComplete: () => void;
  onSkip: () => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const CARD_WIDTH = 320;
const CARD_GAP = 12;
const SPOTLIGHT_PADDING = 8;

export const Coachmark: React.FC<CoachmarkProps> = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);

  const step = steps[currentStep];

  const measureTarget = useCallback(() => {
    if (!step) return;
    const el = document.querySelector(step.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [step]);

  useEffect(() => {
    measureTarget();
    // Retry measurement in case the target isn't rendered yet
    const retryTimer = setTimeout(measureTarget, 100);
    const retryTimer2 = setTimeout(measureTarget, 300);
    window.addEventListener('resize', measureTarget);
    window.addEventListener('scroll', measureTarget, true);
    return () => {
      clearTimeout(retryTimer);
      clearTimeout(retryTimer2);
      window.removeEventListener('resize', measureTarget);
      window.removeEventListener('scroll', measureTarget, true);
    };
  }, [measureTarget]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete();
    }
  };

  if (!step || !targetRect) return null;

  const placement = step.placement ?? 'bottom';
  const isLast = currentStep === steps.length - 1;

  const spotlightTop = targetRect.top - SPOTLIGHT_PADDING;
  const spotlightLeft = targetRect.left - SPOTLIGHT_PADDING;
  const spotlightW = targetRect.width + SPOTLIGHT_PADDING * 2;
  const spotlightH = targetRect.height + SPOTLIGHT_PADDING * 2;

  let cardTop = 0;
  let cardLeft = 0;
  if (placement === 'bottom') {
    cardTop = targetRect.top + targetRect.height + CARD_GAP + SPOTLIGHT_PADDING;
    cardLeft = targetRect.left + targetRect.width / 2 - CARD_WIDTH / 2;
  } else if (placement === 'top') {
    cardTop = targetRect.top - CARD_GAP - SPOTLIGHT_PADDING - 160;
    cardLeft = targetRect.left + targetRect.width / 2 - CARD_WIDTH / 2;
  } else if (placement === 'right') {
    cardTop = targetRect.top + targetRect.height / 2 - 80;
    cardLeft = targetRect.left + targetRect.width + CARD_GAP + SPOTLIGHT_PADDING;
  } else {
    cardTop = targetRect.top + targetRect.height / 2 - 80;
    cardLeft = targetRect.left - CARD_WIDTH - CARD_GAP - SPOTLIGHT_PADDING;
  }

  cardLeft = Math.max(16, Math.min(cardLeft, window.innerWidth - CARD_WIDTH - 16));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 20000 }}>
      {/* Overlay with spotlight cutout using box-shadow */}
      <div
        style={{
          position: 'fixed',
          top: spotlightTop,
          left: spotlightLeft,
          width: spotlightW,
          height: spotlightH,
          borderRadius: 12,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.45)',
          pointerEvents: 'none',
          zIndex: 20001,
          transition: 'top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease',
        }}
      />

      {/* Click-blocker around the spotlight */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 20000 }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Tooltip card */}
      <div
        style={{
          position: 'fixed',
          top: cardTop,
          left: cardLeft,
          width: CARD_WIDTH,
          zIndex: 20002,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          transition: 'top 0.3s ease, left 0.3s ease',
        }}
      >
        {/* Step counter */}
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          lineHeight: '16px',
          color: '#909090',
          letterSpacing: '0.02em',
        }}>
          {currentStep + 1} of {steps.length}
        </span>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{
            fontSize: 15,
            fontWeight: 700,
            lineHeight: '20px',
            color: '#191919',
          }}>
            {step.title}
          </span>
          <span style={{
            fontSize: 13,
            fontWeight: 500,
            lineHeight: '18px',
            color: '#6C6C6C',
          }}>
            {step.body}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
          <button
            type="button"
            onClick={onSkip}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              fontSize: 13,
              fontWeight: 600,
              color: '#909090',
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleNext}
            style={{
              border: 'none',
              borderRadius: 9999,
              padding: '8px 20px',
              fontSize: 13,
              fontWeight: 600,
              lineHeight: '18px',
              color: '#FFFFFF',
              backgroundColor: '#191919',
              cursor: 'pointer',
            }}
          >
            {isLast ? 'Got it' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
