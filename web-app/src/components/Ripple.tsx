import React, { useState, useRef, MouseEvent, ReactNode } from 'react';
import { styled } from '@mui/material/styles';

type RippleData = {
  key: string;
  left: number;
  top: number;
  size: number;
};

const RippleContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-block', // Adjust to 'block' if you need full-width
});

const RippleSpan = styled('span')({
  position: 'absolute',
  borderRadius: '50%',
  transform: 'scale(0)',
  animation: 'ripple 1500ms linear',
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  pointerEvents: 'none',
  // Define the keyframes for the ripple animation
  '@keyframes ripple': {
    to: {
      transform: 'scale(4)',
      opacity: 0,
    },
  },
});

export type RippleProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const Ripple: React.FC<RippleProps> = ({
  children,
  className,
  style,
}) => {
  const [ripples, setRipples] = useState<RippleData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const left = e.clientX - rect.left - size / 2;
    const top = e.clientY - rect.top - size / 2;

    const newRipple: RippleData = {
      key: Date.now().toString() + Math.random().toString(36).substring(2, 15),
      left,
      top,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);
  };

  const handleAnimationEnd = (key: string) => {
    setRipples((prev) => prev.filter((ripple) => ripple.key !== key));
  };

  return (
    <RippleContainer ref={containerRef} onClick={handleClick} className={className} style={style}>
      {children}
      {ripples.map((ripple) => (
        <RippleSpan
          key={ripple.key}
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.left,
            top: ripple.top,
          }}
          onAnimationEnd={() => handleAnimationEnd(ripple.key)}
        />
      ))}
    </RippleContainer>
  );
};