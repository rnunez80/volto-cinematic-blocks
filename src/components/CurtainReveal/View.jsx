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
  const backgroundImage = getImageUrl(data?.backgroundImage, '2k') || data?.backgroundImage;
  const fallbackBgColor = data?.fallbackBgColor || '#000000';
  const curtainGradient = data?.curtainGradient || false;
  const curtainColor = data?.curtainColor !== undefined ? data?.curtainColor : '#1a1a2e';
  const curtainGradientStart = curtainGradient ? (data?.curtainGradientStart !== undefined ? data?.curtainGradientStart : '#1a1a2e') : curtainColor;
  const curtainGradientEnd = data?.curtainGradientEnd !== undefined ? data?.curtainGradientEnd : '#e94560';
  const curtainGradientAngle = data?.curtainGradientAngle !== undefined ? data?.curtainGradientAngle : 45;
  const revealDirection = data?.revealDirection || 'left';
  const sectionHeight = data?.sectionHeight || '60vh';
  const textColor = data?.textColor || '#ffffff';
  const buttonLabel = data?.buttonLabel || data?.ctaText || '';
  const buttonLink = data?.buttonLink || data?.ctaLink || '#';
  const buttonPrimary = data?.buttonPrimary !== false;
  const buttonColor = data?.ctaColor || '#e74c3c';
  const buttonTextColor = data?.ctaTextColor || '#ffffff';

  const sectionRef = useRef(null);
  const curtainRef = useRef(null);
  const curtainContentRef = useRef(null);

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger || prefersReducedMotion || isEditMode) return;

    const section = sectionRef.current;
    const curtain = curtainRef.current;
    const curtainContent = curtainContentRef.current;
    if (!section || !curtain || !curtainContent) return;

    gsap.registerPlugin(ScrollTrigger);

    const animProps = {};
    switch (revealDirection) {
      case 'left':
        animProps.xPercent = -110;
        animProps.skewX = 5;
        break;
      case 'right':
        animProps.xPercent = 110;
        animProps.skewX = -5;
        break;
      case 'up':
        animProps.yPercent = -110;
        animProps.skewY = 5;
        break;
      case 'down':
        animProps.yPercent = 100;
        animProps.skewY = -5;
        break;
      default:
        animProps.xPercent = -110;
    }

    gsap.fromTo(curtain, 
      {
        opacity: 1,
      },
      {
        ...animProps,
        opacity: 0,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    gsap.fromTo(curtainContent,
      {
        transform: revealDirection === 'left' || revealDirection === 'right' 
          ? `translateX(${revealDirection === 'left' ? 200 : -200}px)` 
          : `translateY(${revealDirection === 'up' ? 200 : -200}px)`,
        opacity: 0,
      },
      {
        transform: 'translateX(0px) translateY(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          end: 'top 30%',
          scrub: 1,
        },
      }
    );

    const curtainEdge = curtainRef.current.querySelector('.curtain-edge');
    if (curtainEdge) {
      gsap.fromTo(curtainEdge,
        {
          transform: revealDirection === 'left' || revealDirection === 'right'
            ? `translateX(${revealDirection === 'left' ? 150 : -150}px) scale(1.5)`
            : `translateY(${revealDirection === 'up' ? 150 : -150}px) scale(1.5)`,
          opacity: 0.5,
        },
        {
          transform: 'translateX(0px) translateY(0px) scale(1)',
          opacity: 0.3,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    }

    return () => {
      gsap.killTweensOf(curtain);
      gsap.killTweensOf(curtainContent);
      gsap.killTweensOf(curtainEdge);
    };
  }, [loaded, gsap, ScrollTrigger, prefersReducedMotion, isEditMode, revealDirection]);

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

  const curtainBg = curtainGradient
    ? { background: `linear-gradient(${curtainGradientAngle}deg, ${curtainGradientStart}, ${curtainGradientEnd})` }
    : { backgroundColor: curtainColor };

  return (
    <div
      ref={sectionRef}
      className={cx('block cinematic-curtain-reveal full-width', className)}
      style={{
        height: sectionHeight,
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundColor: backgroundImage ? 'transparent' : fallbackBgColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        width: '100vw',
        maxWidth: 'initial',
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
         >
           <div
             ref={curtainContentRef}
             className="cinematic-curtain-reveal__curtain-content"
           >
             <div className="cinematic-curtain-reveal__curtain-edge curtain-edge" />
           </div>
         </div>
       )}

      {/* Content underneath */}
      <div className="cinematic-curtain-reveal__content">
        <h2
          className="cinematic-curtain-reveal__title"
          style={{ color: textColor }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="cinematic-curtain-reveal__description"
            style={{ opacity: 0.85, color: textColor }}
          >
            {description}
          </p>
        )}
        {buttonLabel && (
          <a
            href={isEditMode ? undefined : resolveLink(buttonLink)}
            className={`ui ${buttonPrimary ? 'primary' : 'secondary'} button`}
            onClick={(e) => isEditMode && e.preventDefault()}
            role="button"
            aria-label={buttonLabel}
            style={{ 
              backgroundColor: buttonPrimary ? buttonColor : 'transparent',
              color: buttonPrimary ? buttonTextColor : buttonColor,
              borderColor: buttonPrimary ? undefined : buttonColor 
            }}
          >
            {buttonLabel}
          </a>
        )}
      </div>
    </div>
  );
};

export default CurtainRevealView;
