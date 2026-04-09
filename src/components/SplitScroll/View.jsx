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
  const sectionHeight = data?.sectionHeight || '400vh';
  const gap = data?.gap || '0rem';
  const stickyColumn = data?.stickyColumn || 'left';

  const sectionRef = useRef(null);
  const leftColInnerRef = useRef(null);
  const rightColInnerRef = useRef(null);

  useEffect(() => {
    if (!loaded || !gsap || !ScrollTrigger || prefersReducedMotion || isEditMode) return;

    const section = sectionRef.current;
    const leftCol = leftColInnerRef.current;
    const rightCol = rightColInnerRef.current;
    
    if (!section) return;

    const itemH = window.innerHeight;
    const count = Math.max(leftItems.length, rightItems.length);
    const totalDistance = -(count - 1) * itemH;

    if (stickyColumn === 'left') {
      gsap.to(leftCol, {
        y: totalDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      gsap.fromTo(rightCol, { y: totalDistance }, { y: 0, ease: 'none', scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }});
    } else if (stickyColumn === 'right') {
      gsap.fromTo(leftCol, { y: totalDistance }, { y: 0, ease: 'none', scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }});

      gsap.to(rightCol, {
        y: totalDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [loaded, gsap, ScrollTrigger, prefersReducedMotion, isEditMode, stickyColumn, leftItems.length, rightItems.length]);

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

  const renderItem = (item, index) => {
    const isFirst = index === 0;
    const itemBgColor = item.bgColor || (isFirst ? '#000000' : 'transparent');
    const itemTextColor = item.textColor || (isFirst ? '#ffffff' : '#000000');
    const imageUrl = getImageUrl(item.image);
    return (
      <article
        key={item['@id'] || index}
        className="cinematic-split-scroll__item"
        style={{
          backgroundColor: itemBgColor,
          backgroundImage: item.bgImage ? `url('${item.bgImage}')` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: itemTextColor,
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
      style={{ height: sectionHeight, gap }}
    >
      <div
        className={cx('cinematic-split-scroll__column', {
          'cinematic-split-scroll__column--sticky': stickyColumn === 'left',
        })}
        style={{ width: '50%' }}
      >
        <div
          ref={stickyColumn === 'left' ? leftColInnerRef : null}
          className="cinematic-split-scroll__column-inner"
        >
          {leftItems.map(renderItem)}
        </div>
      </div>
      <div
        className="cinematic-split-scroll__column cinematic-split-scroll__column--scroll"
        style={{ width: '50%' }}
      >
        <div
          ref={stickyColumn === 'right' ? rightColInnerRef : null}
          className="cinematic-split-scroll__column-inner"
        >
          {rightItems.map(renderItem)}
        </div>
      </div>
    </div>
  );
};

export default SplitScrollView;
