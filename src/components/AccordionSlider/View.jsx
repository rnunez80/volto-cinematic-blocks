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

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

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
        const scale = 'large';
        const imageValue = panel?.bgImage;
        const imageUrl = imageValue && typeof imageValue === 'string'
          ? imageValue.includes('/@@images/image/')
            ? imageValue
            : `${imageValue}/@@images/image/${scale}`
          : (imageValue?.url
              ? imageValue.url.includes('/@@images/image/')
                ? imageValue.url
                : `${imageValue.url}/@@images/image/${scale}`
              : (imageValue?.['@id'] || imageValue?.id || null));
        const isFirst = index === 0;
        const panelBgColor = panel.bgColor || (isFirst ? '#000000' : '#000000');
        const panelTextColor = panel.textColor || (isFirst ? '#ffffff' : '#ffffff');

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
              backgroundColor: panelBgColor,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius,
              color: panelTextColor,
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
              style={{ color: panelTextColor }}
            >
              <p className="cinematic-title">{panel.title}</p>
              {isActive && panel.description && (
                <p className="cinematic-accordion-slider__description">
                  {panel.description}
                </p>
              )}
              {panel.buttonLabel && (
                <a
                  href={isEditMode ? undefined : resolveLink(panel.buttonLink)}
                  className={`ui ${panel.buttonPrimary ? 'ui button primary' : 'ui button secondary'} button`}
                  onClick={(e) => isEditMode && e.preventDefault()}
                >
                  {panel.buttonLabel}
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AccordionSliderView;
