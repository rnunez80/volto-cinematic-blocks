import React, { useRef, useEffect } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import useGsap from '../../hooks/useGsap';
import getImageUrl from '../../helpers/getImageUrl';

const ZoomParallaxView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger, loaded } = useGsap();

  const backgroundImage = getImageUrl(data?.backgroundImage, '2k');
  const midgroundText = data?.midgroundText || 'Cinematic Depth';
  const foregroundText = data?.foregroundText || 'Scroll to experience layered parallax';
  const ctaText = data?.ctaText || 'Get Started';
  const ctaLink = data?.ctaLink || '#';
  const overlayColor = data?.overlayColor || '#000000';
  const overlayOpacity = data?.overlayOpacity || '0.4';
  const sectionHeight = data?.sectionHeight || '100vh';

  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const midRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger || prefersReducedMotion || isEditMode) return;

    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    if (bgRef.current) {
      tl.to(bgRef.current, { scale: 1.3, y: '-20%', ease: 'none' }, 0);
    }
    if (midRef.current) {
      tl.to(midRef.current, { scale: 1.15, y: '-10%', ease: 'none' }, 0);
    }
    if (fgRef.current) {
      tl.to(fgRef.current, { y: '-30%', opacity: 0, ease: 'none' }, 0);
    }

    return () => {
      tl.kill();
    };
  }, [loaded, gsap, ScrollTrigger, prefersReducedMotion, isEditMode]);

  // Resolve CTA link
  let resolvedLink = ctaLink;
  if (ctaLink && Array.isArray(ctaLink)) {
    resolvedLink = ctaLink[0]?.['@id'] || ctaLink[0] || '#';
  } else if (ctaLink && typeof ctaLink === 'object') {
    resolvedLink = ctaLink['@id'] || '#';
  }

  return (
    <div
      ref={sectionRef}
      className={cx('block cinematic-zoom-parallax', className)}
      style={{ height: sectionHeight, overflow: 'hidden', position: 'relative' }}
    >
      {/* Background layer */}
      <div
        ref={bgRef}
        className="cinematic-zoom-parallax__bg"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: backgroundImage ? 'transparent' : '#1a1a2e',
        }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div
        className="cinematic-zoom-parallax__overlay"
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        aria-hidden="true"
      />

      {/* Midground */}
      <div
        ref={midRef}
        className="cinematic-zoom-parallax__mid"
      >
        <h2
          className="cinematic-zoom-parallax__mid-text"
        >
          {midgroundText}
        </h2>
      </div>

      {/* Foreground */}
      <div
        ref={fgRef}
        className="cinematic-zoom-parallax__fg"
      >
        <p
          className="cinematic-zoom-parallax__fg-text"
        >
          {foregroundText}
        </p>
        {ctaText && (
          <a
            href={isEditMode ? undefined : resolvedLink}
            className="cinematic-zoom-parallax__cta"
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

export default ZoomParallaxView;
