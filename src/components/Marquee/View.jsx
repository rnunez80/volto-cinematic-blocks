import React from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const MarqueeView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const bands = Array.isArray(data?.bands) ? data.bands : [];
  const speed = data?.speed || '30';
  const direction = data?.direction || 'left';
  const fontSize = data?.fontSize || '3rem';
  const separator = data?.separator || ' · ';
  const fontWeight = data?.fontWeight || '800';
  const pauseOnHover = data?.pauseOnHover !== false;

  if (!bands.length) {
    return (
      <div
        className={cx('block cinematic-marquee', className, 'full-width', {
          'cinematic-marquee--empty': isEditMode,
        })}
      >
        {isEditMode && <span className="cinematic-marquee__empty-text">Configure marquee bands in the sidebar →</span>}
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
      className={cx('block cinematic-marquee', className, 'full-width', {
        'cinematic-marquee--pause-hover': pauseOnHover,
      })}
      role="marquee"
      aria-label="Scrolling text display"
    >
      {bands.map((band, index) => {
        const bandText = band.text || '';
        const isReverse = direction === 'right'
          ? index % 2 === 0
          : index % 2 !== 0;

        const repeatedContent = `${bandText}${separator}`.repeat(6);
        const isFirst = index === 0;
        const bandBgColor = band.fallbackBgColor || (isFirst ? '#000000' : 'transparent');
        const bandTextColor = band.textColor || (isFirst ? '#ffffff' : '#000000');

        return (
          <div
            key={band['@id'] || index}
            className={cx('cinematic-marquee__band', {
              'cinematic-marquee__band--reverse': isReverse,
            })}
            style={{ fontSize, fontWeight }}
          >
            <div
              className="cinematic-marquee__track"
              style={{
                animationDuration: `${speed}s`,
                animationPlayState: prefersReducedMotion ? 'paused' : 'running',
                backgroundColor: bandBgColor,
                backgroundImage: band.bgImage ? `url('${band.bgImage}')` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <span className="cinematic-marquee__text" style={{ color: bandTextColor }}>{repeatedContent}</span>
              <span className="cinematic-marquee__text" aria-hidden="true" style={{ color: bandTextColor }}>
                {repeatedContent}
              </span>
              {band.buttonLabel && (
                <a
                  href={isEditMode ? undefined : resolveLink(band.buttonLink)}
                  className={`ui ${band.buttonPrimary ? 'primary' : 'secondary'} button`}
                  onClick={(e) => isEditMode && e.preventDefault()}
                  style={{ color: bandTextColor }}
                >
                  {band.buttonLabel}
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarqueeView;
