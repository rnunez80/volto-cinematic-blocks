import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

/**
 * Resolve a Volto image field value to a display URL.
 * Handles: plain string, object_browser array, object with @id.
 * @param {*} image — the raw value from widget: 'image'
 * @param {string} scale — Plone image scale (default 'large')
 * @returns {string|null}
 */
const getImageUrl = (image, scale = 'large') => {
  if (!image) return null;

  // widget: 'image' stores a plain URL string
  if (typeof image === 'string') {
    return isInternalURL(image)
      ? `${flattenToAppURL(image)}/@@images/image/${scale}`
      : image;
  }

  // legacy: object_browser stores an array
  if (Array.isArray(image) && image.length) {
    const id = image[0]?.['@id'] || image[0]?.url || '';
    if (!id) return null;
    return isInternalURL(id)
      ? `${flattenToAppURL(id)}/@@images/image/${scale}`
      : id;
  }

  // object with url or @id
  if (typeof image === 'object' && image) {
    const id = image['@id'] || image.url || image.id;
    if (!id) return null;
    return isInternalURL(id)
      ? `${flattenToAppURL(id)}/@@images/image/${scale}`
      : id;
  }

  return null;
};

export default getImageUrl;
