import React, { useRef, useEffect } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import useGsap from '../../hooks/useGsap';
import getImageUrl from '../../helpers/getImageUrl';

const SplitScrollView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger, loaded } = useGsap();

  const leftItems = Array.isArray(data?.leftItems) ? data.leftItems : [];
  const rightItems = Array.isArray(data?.rightItems) ? data.rightItems : [];
  const sectionHeight = data?.sectionHeight || '100vh';
  const gap = data?.gap || '2rem';
  const scrollRatio = parseFloat(data?.scrollRatio || '1.5');

  const sectionRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger || prefersReducedMotion || isEditMode) return;

    const section = sectionRef.current;
    const rightCol = rightRef.current;
    if (!section || !rightCol) return;

    const tween = gsap.to(rightCol, {
      yPercent: -(scrollRatio - 1) * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [loaded, gsap, ScrollTrigger, prefersReducedMotion, isEditMode, scrollRatio]);

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

  const renderItem = (item, index) => {
    const imageUrl = getImageUrl(item.image);
    return (
      <article
        key={item['@id'] || index}
        className="cinematic-split-scroll__item"
        style={{
          backgroundColor: item.bgColor || '#333',
          backgroundImage: item.bgImage ? `url('${item.bgImage}')` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: item.textColor || '#ffffff',
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            className="cinematic-split-scroll__image"
            alt={item.title || ''}
            loading="lazy"
          />
        )}
        <h3 className="cinematic-split-scroll__title">{item.title}</h3>
        <p className="cinematic-split-scroll__desc">{item.description}</p>
        {item.buttonLabel && (
          <a
            href={isEditMode ? undefined : resolveLink(item.buttonLink)}
            className={`ui ${item.buttonPrimary ? 'primary' : 'secondary'} button`}
            onClick={(e) => isEditMode && e.preventDefault()}
          >
            {item.buttonLabel}
          </a>
        )}
      </article>
    );
  };

  return (
    <div
      ref={sectionRef}
      className={cx('block cinematic-split-scroll', className, {
        'cinematic-split-scroll--reduced': prefersReducedMotion,
      })}
      style={{ minHeight: sectionHeight, gap }}
    >
      <div className="cinematic-split-scroll__column cinematic-split-scroll__left">
        {leftItems.map(renderItem)}
        {!leftItems.length && isEditMode && <p>Add left column items in the sidebar →</p>}
      </div>
      <div
        ref={rightRef}
        className="cinematic-split-scroll__column cinematic-split-scroll__right"
      >
        {rightItems.map(renderItem)}
        {!rightItems.length && isEditMode && <p>Add right column items in the sidebar →</p>}
      </div>
    </div>
  );
};

export default SplitScrollView;
