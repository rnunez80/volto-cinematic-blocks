import React, { useState, useEffect, useRef, useCallback } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const TextScrambleView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const headline = data?.headline || 'Characters decode into your headline';
  const trigger = data?.trigger || 'on-scroll';
  const scrambleChars = data?.scrambleChars || '!<>-_\\/[]{}—=+*^?#________';
  const decodeSpeed = data?.decodeSpeed || 50;
  const fontSize = data?.fontSize || '3rem';
  const textAlign = data?.textAlign || 'center';
  const fontFamily = data?.fontFamily || 'monospace';

  const [displayText, setDisplayText] = useState(prefersReducedMotion ? headline : '');
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef(null);
  const frameRef = useRef(null);

  const scramble = useCallback(() => {
    if (prefersReducedMotion) {
      setDisplayText(headline);
      return;
    }

    let iteration = 0;
    const totalChars = headline.length;
    const maxIterations = totalChars;

    const animate = () => {
      const current = headline
        .split('')
        .map((char, index) => {
          if (index < iteration) return char;
          if (char === ' ') return ' ';
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      setDisplayText(current);

      if (iteration < maxIterations) {
        iteration += 1;
        frameRef.current = setTimeout(animate, decodeSpeed);
      }
    };

    animate();
  }, [headline, scrambleChars, decodeSpeed, prefersReducedMotion]);

  // Intersection Observer for on-scroll trigger
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(headline);
      return;
    }

    if (trigger === 'on-load' && !hasTriggered) {
      setHasTriggered(true);
      scramble();
      return;
    }

    if (trigger === 'on-scroll' && !hasTriggered) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setHasTriggered(true);
            scramble();
            observer.disconnect();
          }
        },
        { threshold: 0.3 },
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }

    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [trigger, scramble, hasTriggered, prefersReducedMotion, headline]);

  return (
    <div
      ref={containerRef}
      className={cx('block cinematic-text-scramble', className)}
      style={{ textAlign }}
      role="region"
      aria-label={headline}
    >
      <h2
        className="cinematic-text-scramble__headline"
        style={{ fontSize, fontFamily }}
        aria-live="polite"
        aria-atomic="true"
      >
        {prefersReducedMotion ? headline : displayText}
      </h2>
    </div>
  );
};

export default TextScrambleView;
