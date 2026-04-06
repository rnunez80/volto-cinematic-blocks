import React, { useState } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import getImageUrl from '../../helpers/getImageUrl';

const AccordionSliderView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const panels = Array.isArray(data?.panels) ? data.panels : [];
  const panelHeight = data?.panelHeight || '500px';
  const transitionSpeed = data?.transitionSpeed || 500;
  const expandedRatio = data?.expandedRatio || 4;
  const overlayOpacity = data?.overlayOpacity || '0.4';
  const borderRadius = data?.borderRadius || '12px';

  const [activeIndex, setActiveIndex] = useState(null);

  if (!panels.length) {
    return (
      <div className={cx('block cinematic-accordion-slider', className)}>
        <p className="cinematic-accordion-slider__empty">
          {isEditMode ? 'Configure panels in the sidebar →' : ''}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cx('block cinematic-accordion-slider', className)}
      role="tablist"
      aria-label="Accordion Image Slider"
      style={{ height: panelHeight }}
    >
      {panels.map((panel, index) => {
        const isActive = activeIndex === index;
        const flexValue = isActive ? expandedRatio : 1;
        const imageUrl = getImageUrl(panel.image);

        return (
          <div
            key={panel['@id'] || index}
            className={cx('cinematic-accordion-slider__panel', {
              'cinematic-accordion-slider__panel--active': isActive,
            })}
            role="tab"
            tabIndex={0}
            aria-expanded={isActive}
            aria-controls={`accordion-panel-content-${index}`}
            aria-label={panel.title || `Panel ${index + 1}`}
            style={{
              flex: prefersReducedMotion ? (isActive ? expandedRatio : 1) : flexValue,
              transition: prefersReducedMotion
                ? 'none'
                : `flex ${transitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
              backgroundColor: imageUrl ? 'transparent' : (panel.bgColor || '#333'),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius,
            }}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveIndex(isActive ? null : index);
              }
            }}
          >
            <div
              className="cinematic-accordion-slider__overlay"
              style={{
                opacity: isActive ? 0 : overlayOpacity,
                transition: prefersReducedMotion
                  ? 'none'
                  : `opacity ${transitionSpeed}ms ease`,
              }}
              aria-hidden="true"
            />

            <div
              id={`accordion-panel-content-${index}`}
              className="cinematic-accordion-slider__content"
              role="tabpanel"
            >
              <p className="cinematic-accordion-slider__title">
                {panel.title}
              </p>
              {isActive && panel.description && (
                <p className="cinematic-accordion-slider__description">
                  {panel.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionSliderView;
