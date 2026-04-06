import React, { useRef, useEffect } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import useGsap from '../../hooks/useGsap';

const HorizontalScrollView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const { gsap, ScrollTrigger, loaded } = useGsap();

  const items = Array.isArray(data?.items) ? data.items : [];
  const sectionHeight = data?.sectionHeight || '3';
  const itemWidth = data?.itemWidth || '400px';
  const gap = data?.gap || '2rem';

  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger || prefersReducedMotion || isEditMode) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = track.scrollWidth - section.offsetWidth;

    const tween = gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [loaded, gsap, ScrollTrigger, prefersReducedMotion, isEditMode, items]);

  if (!items.length) {
    return (
      <div className={cx('block cinematic-horizontal-scroll', className)}>
        <p>{isEditMode ? 'Configure items in the sidebar →' : ''}</p>
      </div>
    );
  }

  if (prefersReducedMotion || isEditMode) {
    return (
      <div
        className={cx('block cinematic-horizontal-scroll cinematic-horizontal-scroll--fallback', className)}
        aria-roledescription="carousel"
        aria-label="Horizontal scroll gallery"
      >
        <div className="cinematic-horizontal-scroll__fallback-grid">
          {items.map((item, index) => (
            <article
              key={item['@id'] || index}
              className="cinematic-horizontal-scroll__item"
              style={{ width: itemWidth, backgroundColor: item.bgColor || '#333' }}
              aria-label={item.title}
            >
              <h3 className="cinematic-horizontal-scroll__item-title">{item.title}</h3>
              <p className="cinematic-horizontal-scroll__item-desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={cx('block cinematic-horizontal-scroll', className)}
      style={{ height: `${parseInt(sectionHeight) * 100}vh` }}
      aria-roledescription="carousel"
      aria-label="Horizontal scroll gallery"
    >
      <div ref={trackRef} className="cinematic-horizontal-scroll__track" style={{ gap }}>
        {items.map((item, index) => (
          <article
            key={item['@id'] || index}
            className="cinematic-horizontal-scroll__item"
            style={{ width: itemWidth, minWidth: itemWidth, backgroundColor: item.bgColor || '#333' }}
            aria-label={item.title}
          >
            <h3 className="cinematic-horizontal-scroll__item-title">{item.title}</h3>
            <p className="cinematic-horizontal-scroll__item-desc">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollView;
