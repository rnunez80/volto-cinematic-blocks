import React from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const StickyCardsView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const cardHeight = data?.cardHeight || '400px';
  const borderRadius = data?.borderRadius || '20px';

  if (!cards.length) {
    return (
      <div className={cx('block cinematic-sticky-cards', className)}>
        <p>{isEditMode ? 'Configure sticky cards in the sidebar →' : ''}</p>
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div className={cx('block cinematic-sticky-cards', className)}>
        {cards.map((card, index) => (
          <article
            key={card['@id'] || index}
            className="cinematic-sticky-cards__card"
            style={{
              position: 'relative',
              height: cardHeight,
              backgroundColor: card.bgColor || '#1a1a2e',
              color: card.textColor || '#ffffff',
              borderRadius,
              marginBottom: '2rem',
            }}
          >
            <div className="cinematic-sticky-cards__content">
              <p className="cinematic-sticky-cards__title">{card.title}</p>
              <p className="cinematic-sticky-cards__description">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className={cx('block cinematic-sticky-cards', className)}>
      <style>{`
        .cinematic-sticky-cards__cards-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .cinematic-sticky-cards__card {
          flex: none;
        }
      `}</style>
      <div className="cinematic-sticky-cards__cards-container">
        {cards.map((card, index) => (
          <article
            key={card['@id'] || index}
            className="cinematic-sticky-cards__card"
            style={{
              position: 'sticky',
              top: `${300 + index * 40}px`,
              height: cardHeight,
              backgroundColor: card.bgColor || '#1a1a2e',
              color: card.textColor || '#ffffff',
              borderRadius,
              zIndex: index,
            }}
          >
            <div className="cinematic-sticky-cards__content">
              <p className="cinematic-sticky-cards__title">{card.title}</p>
              <p className="cinematic-sticky-cards__description">{card.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default StickyCardsView;
