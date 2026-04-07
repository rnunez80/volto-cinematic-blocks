import React from 'react';
import cx from 'classnames';
import useReducedMotion from '../../hooks/useReducedMotion';
import getImageUrl from '../../helpers/getImageUrl';

const SplitScrollView = ({ data, isEditMode, className }) => {
  const prefersReducedMotion = useReducedMotion();

  const leftItems = Array.isArray(data?.leftItems) ? data.leftItems : [];
  const rightItems = Array.isArray(data?.rightItems) ? data.rightItems : [];
  const minHeight = data?.sectionHeight || '100vh';
  const stickyColumn = data?.stickyColumn || 'left';
  const gap = data?.gap || '0rem';

  const resolveLink = (link) => {
    if (!link) return '#';
    if (Array.isArray(link) && link[0]?.['@id']) return link[0]['@id'];
    if (typeof link === 'object' && link['@id']) return link['@id'];
    return link;
  };

  const renderItem = (item, index, columnClass) => {
    const isFirst = index === 0;
    const itemBgColor = item.bgColor || (isFirst ? '#000000' : 'transparent');
    const itemTextColor = item.textColor || (isFirst ? '#ffffff' : '#000000');
    const imageUrl = getImageUrl(item.image);
    const bgImage = getImageUrl(item.bgImage);
    
    return (
      <article
        key={item['@id'] || index}
        className="cinematic-split-scroll__item"
        style={{
          backgroundColor: itemBgColor,
          color: itemTextColor,
        }}
      >
        {bgImage && (
           <div 
             className="cinematic-split-scroll__bg-image" 
             style={{ backgroundImage: `url('${bgImage}')` }} 
           />
        )}
        <div className="cinematic-split-scroll__item-inner">
          {imageUrl && (
            <img
              src={imageUrl}
              className="cinematic-split-scroll__image"
              alt={item.title || ''}
              loading="lazy"
            />
          )}
          <div className="cinematic-split-scroll__content">
            {item.title && <h3 className="cinematic-split-scroll__item-title">{item.title}</h3>}
            {item.description && <p className="cinematic-split-scroll__item-desc">{item.description}</p>}
            {item.buttonLabel && (
              <a
                href={isEditMode ? undefined : resolveLink(item.buttonLink)}
                className={`ui ${item.buttonPrimary ? 'primary' : 'secondary'} button`}
                onClick={(e) => isEditMode && e.preventDefault()}
              >
                {item.buttonLabel}
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div
      className={cx('block cinematic-split-scroll', className, {
        'cinematic-split-scroll--reduced': prefersReducedMotion,
      })}
    >
      <div className="cinematic-split-scroll__grid" style={{ minHeight, gap }}>
        <div
          className={cx('cinematic-split-scroll__column cinematic-split-scroll__left', {
            'cinematic-split-scroll__column--sticky': stickyColumn === 'left' && !prefersReducedMotion,
            'cinematic-split-scroll__column--scroll': stickyColumn !== 'left' || prefersReducedMotion,
          })}
        >
          <div className="cinematic-split-scroll__column-inner">
            {leftItems.map((item, index) => renderItem(item, index, 'left'))}
            {!leftItems.length && isEditMode && <p style={{padding: '2rem'}}>Add left column items in the sidebar →</p>}
          </div>
        </div>
        <div
          className={cx('cinematic-split-scroll__column cinematic-split-scroll__right', {
            'cinematic-split-scroll__column--sticky': stickyColumn === 'right' && !prefersReducedMotion,
            'cinematic-split-scroll__column--scroll': stickyColumn !== 'right' || prefersReducedMotion,
          })}
        >
          <div className="cinematic-split-scroll__column-inner">
            {rightItems.map((item, index) => renderItem(item, index, 'right'))}
            {!rightItems.length && isEditMode && <p style={{padding: '2rem', color: '#fff'}}>Add right column items in the sidebar →</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitScrollView;
