import React, { useState, useEffect, useRef, useCallback } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import getImageUrl from '../../helpers/getImageUrl';

const TypewriterView = ({ data, isEditMode, className }) => {
  const staticText = data?.staticText || '';
  const postfixText = data?.postfixText || '';
  const phrasesRaw = data?.phrases || 'websites, applications, experiences';
  const phrases = phrasesRaw.split(',').map((p) => p.trim()).filter(Boolean);
  const textColor = data?.textColor || '#ffffff';
  const typingSpeed = data?.typingSpeed || 80;
  const deleteSpeed = data?.deleteSpeed || 40;
  const pauseDuration = data?.pauseDuration || 1500;
  const cursorChar = data?.cursorChar || '|';
  const cursorColor = data?.cursorColor || '#e74c3c';
  const fontSize = data?.fontSize || '3rem';
  const textAlign = data?.textAlign || 'center';
  const blockHeight = data?.blockHeight || 'm';
  const backgroundImage = data?.backgroundImage || null;
  const fallbackBgColor = data?.fallbackBgColor || '#000000';
  const loop = data?.loop !== false;
  const foregroundText = data?.foregroundText || '';
  const ctaText = data?.ctaText || '';
  const ctaLink = data?.ctaLink || '#';
  const ctaPrimary = data?.ctaPrimary !== false;

  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const fullPhrase = phrases[phraseIndex] || '';

  const tick = useCallback(() => {
    if (prefersReducedMotion) return;

    if (!isDeleting) {
      if (displayedText.length < fullPhrase.length) {
        setDisplayedText(fullPhrase.substring(0, displayedText.length + 1));
        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (displayedText.length > 0) {
        setDisplayedText(fullPhrase.substring(0, displayedText.length - 1));
        timeoutRef.current = setTimeout(tick, deleteSpeed);
      } else {
        setIsDeleting(false);
        const nextIndex = (phraseIndex + 1) % phrases.length;
        if (!loop && nextIndex === 0) return;
        setPhraseIndex(nextIndex);
      }
    }
  }, [
    displayedText,
    isDeleting,
    fullPhrase,
    phraseIndex,
    phrases.length,
    typingSpeed,
    deleteSpeed,
    pauseDuration,
    loop,
    prefersReducedMotion,
  ]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(fullPhrase);
      return;
    }

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : typingSpeed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [tick, prefersReducedMotion]);

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

  const ariaText = `${staticText}${phrases.join(', ')} ${postfixText}`.trim();
  const imageUrl = getImageUrl(backgroundImage);
  const heightClass = `cinematic-typewriter--h-${blockHeight}`;

  return (
    <div
      className={cx('block cinematic-typewriter', className, heightClass)}
      style={{
        textAlign,
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundColor: fallbackBgColor,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="region"
      aria-label={ariaText}
    >
      <div className={`cinematic-typewriter__inner ${heightClass}`} style={{}}>
        <h2
          className="cinematic-typewriter__text"
          style={{ fontSize, color: textColor }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="cinematic-typewriter__static">{staticText}</span>
          <span className="cinematic-typewriter__dynamic">
            {prefersReducedMotion ? fullPhrase : displayedText}
          </span>
          <span
            className={cx('cinematic-typewriter__cursor', {
              'cinematic-typewriter__cursor--blink': !isDeleting,
            })}
            style={{ color: cursorColor }}
            aria-hidden="true"
          >
            {cursorChar}
          </span>
          {postfixText && (
            <span className="cinematic-typewriter__postfix">{postfixText}</span>
          )}
        </h2>
        {ctaText && (
          <a
            href={isEditMode ? undefined : resolveLink(ctaLink)}
            className={`ui ${ctaPrimary ? 'primary' : 'secondary'} button`}
            onClick={(e) => isEditMode && e.preventDefault()}
            style={{ color: textColor }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </div>
  );
};

export default TypewriterView;
