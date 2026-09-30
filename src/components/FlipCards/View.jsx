import React, {useState} from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';

const FlipCardsView = ({data, isEditMode, className}) => {
  const prefersReducedMotion = useReducedMotion();

  const cards = Array.isArray(data?.cards) ? data.cards : [];
  const columns = data?.columns || '4';
  const cardHeight = data?.cardHeight || '300px';
  const gap = data?.gap || '1.5rem';
  const borderRadius = data?.borderRadius || '16px';
  const scale = 'large';

  const [flippedStates, setFlippedStates] = useState({});

  const getFrontImageUrl = (image) => {
    if (typeof image === 'string') {
      return image.includes('/@@images/image/') ? image : `${image}/@@images/image/${scale}`;
    }
    if (image?.url) {
      return image.url.includes('/@@images/image/') ? image.url : `${image.url}/@@images/image/${scale}`;
    }
    if (Array.isArray(image) && image[0]?.['@id']) {
      return image[0]['@id'].includes('/@@images/image/') ? image[0]['@id'] : `${image[0]['@id']}/@@images/image/${scale}`;
    }
    if (image?.['@id']) {
      return image['@id'].includes('/@@images/image/') ? image['@id'] : `${image['@id']}/@@images/image/${scale}`;
    }
    if (image?.id) {
      return image.id.includes('/@@images/image/') ? image.id : `${image.id}/@@images/image/${scale}`;
    }
    return null;
  };

  const getBackImageUrl = (image) => {
    if (!image) return null;
    if (typeof image === 'string') {
      return image.includes('/@@images/image/') ? image : `${image}/@@images/image/${scale}`;
    }
    if (image?.url) {
      return image.url.includes('/@@images/image/') ? image.url : `${image.url}/@@images/image/${scale}`;
    }
    if (Array.isArray(image) && image[0]?.['@id']) {
      return image[0]['@id'].includes('/@@images/image/') ? image[0]['@id'] : `${image[0]['@id']}/@@images/image/${scale}`;
    }
    if (image?.['@id']) {
      return image['@id'].includes('/@@images/image/') ? image['@id'] : `${image['@id']}/@@images/image/${scale}`;
    }
    if (image?.id) {
      return image.id.includes('/@@images/image/') ? image.id : `${image.id}/@@images/image/${scale}`;
    }
    return null;
  };

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

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

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
        const isFirst = index === 0;

        const frontBgColor = card.frontBgColor || (isFirst ? '#000000' : 'transparent');
        const frontTextColor = card.frontTextColor || (isFirst ? '#ffffff' : '#000000');
        const backBgColor = card.backBgColor || (isFirst ? '#000000' : 'transparent');
        const backTextColor = card.backTextColor || (isFirst ? '#ffffff' : '#000000');

        const frontImageUrl = getFrontImageUrl(card.frontBgImage);
        const backImageUrl = getBackImageUrl(card.backBgImage);

        return (
          <div
            key={card['@id'] || index}
            className={cx('cinematic-flip-cards__card', {
              'cinematic-flip-cards__card--flipped': isFlipped,
              'cinematic-flip-cards__card--reduced': prefersReducedMotion,
            })}
            style={{height: cardHeight, perspective: '1000px'}}
            onMouseEnter={() => !prefersReducedMotion && setFlippedStates((prev) => ({ ...prev, [index]: true}))}
            onMouseLeave={() => !prefersReducedMotion && setFlippedStates((prev) => ({ ...prev, [index]: false}))}
          >
            <div
              className="cinematic-flip-cards__inner"
              style={{
                borderRadius,
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                transition: prefersReducedMotion ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Front face — the flip trigger is a standalone <button> so it is the only
                  interactive control on this face (no nesting). */}
              <button
                type="button"
                className="cinematic-flip-cards__front"
                style={{
                  backgroundColor: frontBgColor,
                  backgroundImage: frontImageUrl ? `url(${frontImageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius,
                  // Reset button UA styles so it keeps the card appearance
                  border: 'none',
                  padding: 0,
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  textAlign: 'inherit',
                }}
                aria-label={`${card.frontTitle || 'Card'}: click to reveal details`}
                aria-expanded={isFlipped}
                aria-hidden={isFlipped ? true : undefined}
                tabIndex={isFlipped ? -1 : 0}
                onClick={() => toggleFlip(index)}
                onFocus={() => setFlippedStates((prev) => ({ ...prev, [index]: true}))}
                onBlur={() => setFlippedStates((prev) => ({ ...prev, [index]: false}))}
              >
                <p className="cinematic-title" style={{color: frontTextColor}}>{card.frontTitle}</p>
                {card.frontDesc && <p className="cinematic-desc" style={{color: frontTextColor}}>{card.frontDesc}</p>}
              </button>

              {/* Back face — contains the real link; not nested inside a button/role="button" */}
              <div
                className="cinematic-flip-cards__back"
                style={{
                  backgroundColor: backBgColor,
                  backgroundImage: backImageUrl ? `url(${backImageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius,
                }}
                aria-hidden={!isFlipped ? true : undefined}
              >
                <p className="cinematic-title" style={{color: backTextColor}}>{card.backTitle}</p>
                {card.backDesc &&
                  <p className="cinematic-desc" style={{color: backTextColor}}>{card.backDesc}</p>}
                {card.buttonLabel && (
                  <a
                    href={isEditMode ? undefined : resolveLink(card.buttonLink)}
                    className={`ui ${card.buttonPrimary ? 'ui button primary' : 'ui button secondary'} button`}
                    tabIndex={isFlipped ? 0 : -1}
                    onClick={(e) => isEditMode && e.preventDefault()}
                  >
                    {card.buttonLabel}
                  </a>
                )}
              </div>
            </div>

            {prefersReducedMotion && (
              <div className="cinematic-flip-cards__reduced-fallback" style={{borderRadius}}>
                <p><strong className="cinematic-accordion-slider__title">{card.frontTitle}</strong></p>
                {card.frontDesc && <p>{card.frontDesc}</p>}
                <p>{card.backDesc}</p>
                {card.buttonLabel && (
                  <a
                    href={isEditMode ? undefined : resolveLink(card.buttonLink)}
                    className={`ui ${card.buttonPrimary ? 'ui button primary' : 'ui button secondary'} button`}
                    onClick={(e) => isEditMode && e.preventDefault()}
                  >
                    {card.buttonLabel}
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
