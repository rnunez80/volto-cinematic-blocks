import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  ZoomParallaxBlock: { id: 'cinematicZoomParallax', defaultMessage: 'Zoom Parallax' },
  midgroundText: { id: 'cinematicZoomMidText', defaultMessage: 'Midground Headline' },
  foregroundText: { id: 'cinematicZoomFgText', defaultMessage: 'Foreground Text' },
  overlayColor: { id: 'cinematicZoomOverlayColor', defaultMessage: 'Overlay Color' },
  overlayOpacity: { id: 'cinematicZoomOverlayOpacity', defaultMessage: 'Overlay Opacity' },
  sectionHeight: { id: 'cinematicZoomSectionHeight', defaultMessage: 'Section Height' },
  ctaText: { id: 'cinematicZoomCTAText', defaultMessage: 'CTA Button Text' },
  ctaLink: { id: 'cinematicZoomCTALink', defaultMessage: 'CTA Link' },
  ctaPrimary: { id: 'cinematicZoomCTAPrimary', defaultMessage: 'Primary CTA' },
});

export const ZoomParallaxSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.ZoomParallaxBlock),
    fieldsets: [
      { id: 'content', title: 'Content', fields: ['backgroundImage', 'midgroundText', 'foregroundText', 'ctaText', 'ctaLink', 'ctaPrimary'] },
      { id: 'styling', title: 'Styling', fields: ['fallbackBgColor', 'textColor', 'overlayColor', 'overlayOpacity', 'sectionHeight'] },
    ],
    properties: {
      backgroundImage: {
        title: 'Background Image',
        widget: 'image',
      },
      fallbackBgColor: {
        title: 'Fallback Background Color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#1a1a2e',
      },
      textColor: {
        title: 'Text Color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#ffffff',
      },
      midgroundText: {
        title: intl.formatMessage(messages.midgroundText),
        default: 'Cinematic Depth',
      },
      foregroundText: {
        title: intl.formatMessage(messages.foregroundText),
        default: 'Scroll to experience layered parallax',
      },
      overlayColor: {
        title: intl.formatMessage(messages.overlayColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#000000',
      },
      overlayOpacity: {
        title: intl.formatMessage(messages.overlayOpacity),
        default: '0.4',
        choices: [['0', 'None'], ['0.2', 'Light'], ['0.4', 'Medium'], ['0.6', 'Dark'], ['0.8', 'Very Dark']],
      },
      sectionHeight: {
        title: intl.formatMessage(messages.sectionHeight),
        default: '100vh',
        choices: [['60vh', 'Short'], ['80vh', 'Medium'], ['100vh', 'Full Screen'], ['120vh', 'Tall']],
      },
      ctaText: {
        title: intl.formatMessage(messages.ctaText),
      },
      ctaLink: {
        title: intl.formatMessage(messages.ctaLink),
        widget: 'url',
      },
      ctaPrimary: {
        title: intl.formatMessage(messages.ctaPrimary),
        type: 'boolean',
        default: true,
      },
    },
    required: [],
  };
};
