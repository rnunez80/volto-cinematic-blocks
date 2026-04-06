import React from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const StickyCardsView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const cardHeight = data?.cardHeight || '400px';
  const borderRadius = data?.borderRadius || '20px';
  const offsetSpacing = data?.offsetSpacing || 30;

  if (!cards.length) {
    return (
      <div className={cx('block cinematic-sticky-cards', className)}>
        <p>{isEditMode ? 'Configure sticky cards in the sidebar →' : ''}</p>
      </div>
    );
  }

  return (
    <div
      className={cx('block cinematic-sticky-cards', className, {
        'cinematic-sticky-cards--reduced': prefersReducedMotion,
      })}
    >
      {cards.map((card, index) => (
        <article
          key={card['@id'] || index}
          className="cinematic-sticky-cards__card"
          style={{
            position: prefersReducedMotion ? 'relative' : 'sticky',
            top: prefersReducedMotion ? 'auto' : `${100 + index * offsetSpacing}px`,
            height: cardHeight,
            backgroundColor: card.bgColor || '#1a1a2e',
            color: card.textColor || '#ffffff',
            borderRadius,
            zIndex: index,
            marginBottom: prefersReducedMotion ? '2rem' : `-${parseInt(cardHeight) - offsetSpacing * 2}px`,
          }}
        >
          <div className="cinematic-sticky-cards__content">
            <p className="cinematic-sticky-cards__title">{card.title}</p>
            <p className="cinematic-sticky-cards__description">{card.description}</p>
          </div>
        </article>
      ))}
      {!prefersReducedMotion && (
        <div style={{ height: cardHeight }} aria-hidden="true" />
      )}
    </div>
  );
};

export default StickyCardsView;
