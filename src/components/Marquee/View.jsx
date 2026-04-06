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
      <div className={cx('block cinematic-marquee', className)}>
        <p>{isEditMode ? 'Configure marquee bands in the sidebar →' : ''}</p>
      </div>
    );
  }

  return (
    <div
      className={cx('block cinematic-marquee', className, {
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
              }}
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
