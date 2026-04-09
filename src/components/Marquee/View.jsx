import React from 'react';
import cx from 'classnames';

const MarqueeView = ({ data, isEditMode, className }) => {
  const bands = Array.isArray(data?.bands) ? data.bands : [];
  const speed = data?.speed || '30';
  const direction = data?.direction || 'left';
  const fontSize = data?.fontSize || '3rem';
  const separator = data?.separator || ' · ';
  const fontWeight = data?.fontWeight || '800';

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

  return (
    <div
      className={cx('block cinematic-marquee', className, 'full-width')}
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
              style={{ animationDuration: `${speed}s` }}
            >
              <span className="cinematic-marquee__text">{repeatedContent}</span>
              <span className="cinematic-marquee__text" aria-hidden="true">
                {repeatedContent}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarqueeView;
