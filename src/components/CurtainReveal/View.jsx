import React, { useRef, useEffect } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import useGsap from '../../hooks/useGsap';
import getImageUrl from '../../helpers/getImageUrl';

const CurtainRevealView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger, loaded } = useGsap();

  const title = data?.title || 'Reveal what matters';
  const description = data?.description || '';
  const backgroundImage = getImageUrl(data?.backgroundImage, '2k');
  const ctaText = data?.ctaText || '';
  const ctaLink = data?.ctaLink || '#';
  const curtainColor = data?.curtainColor || '#1a1a2e';
  const curtainGradient = data?.curtainGradient || '';
  const revealDirection = data?.revealDirection || 'left';
  const sectionHeight = data?.sectionHeight || '100vh';

  const sectionRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger || prefersReducedMotion || isEditMode) return;

    const section = sectionRef.current;
    const curtain = curtainRef.current;
    if (!section || !curtain) return;

    const animProps = {};
    switch (revealDirection) {
      case 'left':
        animProps.xPercent = -100;
        break;
      case 'right':
        animProps.xPercent = 100;
        break;
      case 'up':
        animProps.yPercent = -100;
        break;
      case 'down':
        animProps.yPercent = 100;
        break;
      default:
        animProps.xPercent = -100;
    }

    const tween = gsap.to(curtain, {
      ...animProps,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 10%',
        scrub: 1,
      },
    });

    return () => { tween.kill(); };
  }, [loaded, gsap, ScrollTrigger, prefersReducedMotion, isEditMode, revealDirection]);

  // Resolve CTA link
  let resolvedLink = ctaLink;
  if (ctaLink && Array.isArray(ctaLink)) {
    resolvedLink = ctaLink[0]?.['@id'] || ctaLink[0] || '#';
  } else if (ctaLink && typeof ctaLink === 'object') {
    resolvedLink = ctaLink['@id'] || '#';
  }

  const curtainBg = curtainGradient
    ? { background: curtainGradient }
    : { backgroundColor: curtainColor };

  return (
    <div
      ref={sectionRef}
      className={cx('block cinematic-curtain-reveal', className)}
      style={{
        height: sectionHeight,
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? 'transparent' : '#111',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="region"
      aria-label={title}
    >
      {/* Curtain overlay */}
      {!prefersReducedMotion && (
        <div
          ref={curtainRef}
          className="cinematic-curtain-reveal__curtain"
          style={curtainBg}
          aria-hidden="true"
        />
      )}

      {/* Content underneath */}
      <div className="cinematic-curtain-reveal__content">
        <h2
          className="cinematic-curtain-reveal__title"
        >
          {title}
        </h2>
        {description && (
          <p
            className="cinematic-curtain-reveal__description"
            style={{ opacity: 0.85 }}
          >
            {description}
          </p>
        )}
        {ctaText && (
          <a
            href={isEditMode ? undefined : resolvedLink}
            className="cinematic-curtain-reveal__cta"
            onClick={(e) => isEditMode && e.preventDefault()}
            role="button"
            aria-label={ctaText}
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
};

export default CurtainRevealView;
