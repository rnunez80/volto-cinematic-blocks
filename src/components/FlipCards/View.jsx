import React, { useState } from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const FlipCardsView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const columns = data?.columns || '4';
  const cardHeight = data?.cardHeight || '300px';
  const gap = data?.gap || '1.5rem';
  const borderRadius = data?.borderRadius || '16px';

  const [flippedStates, setFlippedStates] = useState({});

  const toggleFlip = (index) => {
    setFlippedStates((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (!cards.length) {
    return (
      <div className={cx('block cinematic-flip-cards', className)}>
        <p>{isEditMode ? 'Configure cards in the sidebar →' : ''}</p>
      </div>
    );
  }

  return (
    <div
      className={cx('block cinematic-flip-cards', className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
    >
      {cards.map((card, index) => {
        const isFlipped = flippedStates[index] || false;

        // Resolve CTA link
        let resolvedLink = card.ctaLink || '#';
        if (Array.isArray(resolvedLink)) {
          resolvedLink = resolvedLink[0]?.['@id'] || resolvedLink[0] || '#';
        } else if (typeof resolvedLink === 'object') {
          resolvedLink = resolvedLink['@id'] || '#';
        }

        return (
          <div
            key={card['@id'] || index}
            className={cx('cinematic-flip-cards__card', {
              'cinematic-flip-cards__card--flipped': isFlipped,
              'cinematic-flip-cards__card--reduced': prefersReducedMotion,
            })}
            style={{ height: cardHeight, perspective: '1000px' }}
            role="button"
            tabIndex={0}
            aria-label={`${card.frontTitle || 'Card'}: ${isFlipped ? 'showing details' : 'click to reveal details'}`}
            onMouseEnter={() => !prefersReducedMotion && setFlippedStates((prev) => ({ ...prev, [index]: true }))}
            onMouseLeave={() => !prefersReducedMotion && setFlippedStates((prev) => ({ ...prev, [index]: false }))}
            onFocus={() => setFlippedStates((prev) => ({ ...prev, [index]: true }))}
            onBlur={() => setFlippedStates((prev) => ({ ...prev, [index]: false }))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFlip(index);
              }
            }}
          >
            <div
              className="cinematic-flip-cards__inner"
              style={{
                borderRadius,
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: prefersReducedMotion ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
               <div
                 className="cinematic-flip-cards__front"
                 style={{
                   backgroundColor: card.frontBg || '#333',
                   backgroundImage: card.frontBgImage ? `url('${card.frontBgImage}')` : 'none',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   borderRadius,
                 }}
                 aria-hidden={isFlipped}
               >
                 <h3 className="cinematic-flip-cards__front-title" style={{ color: card.frontTitleColor || '#fff' }}>{card.frontTitle}</h3>
               </div>
               <div
                 className="cinematic-flip-cards__back"
                 style={{
                   backgroundColor: card.backBg || '#222',
                   backgroundImage: card.backBgImage ? `url('${card.backBgImage}')` : 'none',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   borderRadius,
                 }}
                 aria-hidden={!isFlipped}
               >
                 <h3 className="cinematic-flip-cards__back-title" style={{ color: card.backTitleColor || '#fff' }}>{card.backTitle}</h3>
                 <p className="cinematic-flip-cards__back-desc" style={{ color: card.backDescColor || '#ddd' }}>{card.backDesc}</p>
                 {card.ctaText && (
                   <a
                     href={isEditMode ? undefined : resolvedLink}
                     className="cinematic-flip-cards__cta"
                     onClick={(e) => isEditMode && e.preventDefault()}
                     tabIndex={isFlipped ? 0 : -1}
                     style={{ color: card.ctaTextColor || '#fff' }}
                   >
                     {card.ctaText}
                   </a>
                 )}
               </div>
            </div>

            {prefersReducedMotion && (
              <div className="cinematic-flip-cards__reduced-fallback" style={{ borderRadius }}>
                <h3>{card.frontTitle}</h3>
                <p>{card.backDesc}</p>
                {card.ctaText && (
                  <a href={isEditMode ? undefined : resolvedLink} onClick={(e) => isEditMode && e.preventDefault()}>
                    {card.ctaText}
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FlipCardsView;
