import React, { useState, useEffect, useRef, useCallback } from 'react';
import cx from 'classnames';
import getImageUrl from '../../helpers/getImageUrl';

const SliderCrazyEffectsView = ({ data, isEditMode, className }) => {
  const slides = Array.isArray(data?.slides) ? data.slides : [];
  const autoPlay = data?.autoPlay ?? true;
  const interval = data?.interval || 7000;
  const timeRunning = 3000;

  // Use a ref for items so callbacks don't go stale
  const [items, setItems] = useState(slides);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const [animationType, setAnimationType] = useState('');
  const isAnimatingRef = useRef(false);
  const timerRef = useRef(null);
  const runningRef = useRef(null);

  // Sync items when data.slides changes (edit mode), using JSON comparison
  const slidesJSON = JSON.stringify(slides);
  useEffect(() => {
    setItems(JSON.parse(slidesJSON));
  }, [slidesJSON]);

  const clearTimers = useCallback(() => {
    clearTimeout(timerRef.current);
    clearTimeout(runningRef.current);
  }, []);

  const scheduleAutoPlay = useCallback(() => {
    if (!autoPlay || isEditMode) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      doSlide('next');
    }, interval);
  }, [autoPlay, isEditMode, interval]);

  const doSlide = useCallback((type, targetIndex = null) => {
    const currentItems = itemsRef.current;
    if (isAnimatingRef.current || currentItems.length < 2) return;

    isAnimatingRef.current = true;
    setAnimationType(type || 'next');

    let newItems;
    if (targetIndex !== null) {
      newItems = [...currentItems.slice(targetIndex), ...currentItems.slice(0, targetIndex)];
    } else if (type === 'next') {
      newItems = [...currentItems.slice(1), currentItems[0]];
    } else {
      newItems = [currentItems[currentItems.length - 1], ...currentItems.slice(0, -1)];
    }

    setItems(newItems);
    itemsRef.current = newItems;

    clearTimeout(runningRef.current);
    runningRef.current = setTimeout(() => {
      setAnimationType('');
      isAnimatingRef.current = false;
    }, timeRunning);

    // Schedule next auto-play after transition
    if (autoPlay && !isEditMode) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        doSlide('next');
      }, interval);
    }
  }, [autoPlay, isEditMode, interval, timeRunning]);

  // Initial auto-play kickoff
  useEffect(() => {
    if (autoPlay && slides.length > 1 && !isEditMode) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        doSlide('next');
      }, interval);
    }
    return clearTimers;
  }, [autoPlay, slides.length, isEditMode, interval]);

  if (!slides.length) {
    return (
      <div className={cx('block cinematic-slider', className)}>
        <p className="cinematic-slider__empty">
          {isEditMode ? 'Add slides in the sidebar →' : ''}
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

  const thumbnails = items.length > 1 ? [...items.slice(1), items[0]] : [];

  return (
    <div className={cx('block cinematic-slider-wrapper', className)}>
      <div className={cx('cinematic-slider', animationType)}>
        {/* Main List */}
        <div className="list">
          {items.map((slide, index) => {
            if (!slide) return null;
            return (
              <div className="item" key={slide['@id'] || `slide-${index}`}>
                <img
                  src={getImageUrl(slide.image, 'great')}
                  alt={slide.title || 'slide'}
                  onClick={() => index !== 0 && doSlide('next', index)}
                  style={{ cursor: index !== 0 ? 'pointer' : 'default' }}
                />
                <div className="content">
                  <h1 className="title">{slide.title || ''}</h1>
                  <div className="topic">{slide.topic || ''}</div>
                  <div className="des">
                    {slide.description || ''}
                  </div>
                  <div className="buttons">
                    {slide.buttonLabel && (
                      <a
                        href={isEditMode ? undefined : resolveLink(slide.buttonLink)}
                        className={`ui ${slide.buttonPrimary !== false ? 'primary' : 'secondary'} button`}
                        onClick={(e) => isEditMode && e.preventDefault()}
                      >
                        {slide.buttonLabel}
                      </a>
                    )}
                    {slide.button2Label && (
                      <a
                        href={isEditMode ? undefined : resolveLink(slide.button2Link)}
                        className={`ui ${slide.button2Primary ? 'primary' : 'secondary'} button`}
                        onClick={(e) => isEditMode && e.preventDefault()}
                      >
                        {slide.button2Label}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Thumbnails */}
        {data?.showThumbnails !== false && thumbnails.length > 0 && (
          <div className="thumbnail">
            {thumbnails.map((slide, index) => {
              if (!slide) return null;
              const targetIndexInItems = (index + 1) % items.length;
              return (
                <div
                  className="item"
                  key={`thumb-${slide['@id'] || index}`}
                  onClick={() => doSlide('next', targetIndexInItems)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={getImageUrl(slide.image)} alt={slide.title || 'thumbnail'} />
                  <div className="content">
                    <div className="title">{slide.title}</div>
                    <div className="description">{slide.topic}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Arrows */}
        {data?.showArrows !== false && (
          <div className="arrows">
            <button onClick={() => doSlide('prev')}>{'<'}</button>
            <button onClick={() => doSlide('next')}>{'>'}</button>
          </div>
        )}

        {/* Time Progress Bar */}
        <div className="time" style={{
          animationDuration: `${interval}ms`,
          backgroundColor: '#F15B4E',
          animationIterationCount: 'infinite',
        }}></div>
      </div>
    </div>
  );
};

export default SliderCrazyEffectsView;
