import React from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const StickyCardsView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const cardHeight = data?.cardHeight || '400px';
  const borderRadius = data?.borderRadius || '20px';
  const enableShiftRotate = data?.enableShiftRotate !== false;
  const shiftAmount = data?.shiftAmount || 0;
  const rotateAmount = data?.rotateAmount || 3;

  if (!cards.length) {
    return (
      <div className={cx('block cinematic-sticky-cards', className)}>
        <p>{isEditMode ? 'Configure sticky cards in the sidebar →' : ''}</p>
      </div>
    );
  }

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

  if (prefersReducedMotion) {
    return (
      <div className={cx('block cinematic-sticky-cards', className)}>
        {cards.map((card, index) => {
          const rotateAngle = index % 2 === 0 ? rotateAmount : -rotateAmount;
          const isFirst = index === 0;
          const cardBgColor = card.bgColor || (isFirst ? '#000000' : 'transparent');
          const cardTextColor = card.textColor || (isFirst ? '#ffffff' : '#000000');
          return (
            <article
              key={card['@id'] || index}
              className="cinematic-sticky-cards__card"
              style={{
                position: 'relative',
                height: cardHeight,
                backgroundColor: cardBgColor,
                backgroundImage: card.bgImage ? `url('${card.bgImage}')` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: cardTextColor,
                borderRadius,
                marginBottom: '2rem',
                ...(enableShiftRotate && {
                  transform: `translateX(${shiftAmount}px) rotate(${rotateAngle}deg)`,
                }),
              }}
            >
              <div className="cinematic-sticky-cards__content">
                <p className="cinematic-sticky-cards__title">{card.title}</p>
                <p className="cinematic-sticky-cards__description">{card.description}</p>
                {card.buttonLabel && (
                  <a
                    href={isEditMode ? undefined : resolveLink(card.buttonLink)}
                    className={`ui ${card.buttonPrimary ? 'primary' : 'secondary'} button`}
                    onClick={(e) => isEditMode && e.preventDefault()}
                    style={{ color: cardTextColor }}
                  >
                    {card.buttonLabel}
                  </a>
                )}
              </div>
            </article>
          );
        })}
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
        {cards.map((card, index) => {
          const rotateAngle = index % 2 === 0 ? rotateAmount : -rotateAmount;
          const isFirst = index === 0;
          const cardBgColor = card.bgColor || (isFirst ? '#000000' : 'transparent');
          const cardTextColor = card.textColor || (isFirst ? '#ffffff' : '#000000');
          return (
            <article
              key={card['@id'] || index}
              className="cinematic-sticky-cards__card"
              style={{
                position: 'sticky',
                top: `${300 + index * 40}px`,
                height: cardHeight,
                backgroundColor: cardBgColor,
                backgroundImage: card.bgImage ? `url('${card.bgImage}')` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: cardTextColor,
                borderRadius,
                zIndex: index,
                ...(enableShiftRotate && {
                  transform: `translateX(${shiftAmount}px) rotate(${rotateAngle}deg)`,
                }),
              }}
            >
              <div className="cinematic-sticky-cards__content">
                <p className="cinematic-sticky-cards__title">{card.title}</p>
                <p className="cinematic-sticky-cards__description">{card.description}</p>
                {card.buttonLabel && (
                  <a
                    href={isEditMode ? undefined : resolveLink(card.buttonLink)}
                    className={`ui ${card.buttonPrimary ? 'primary' : 'secondary'} button`}
                    onClick={(e) => isEditMode && e.preventDefault()}
                    style={{ color: cardTextColor }}
                  >
                    {card.buttonLabel}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default StickyCardsView;
