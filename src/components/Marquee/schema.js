import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  MarqueeBlock: { id: 'cinematicMarquee', defaultMessage: 'Kinetic Marquee' },
  bands: { id: 'cinematicMarqueeBands', defaultMessage: 'Text Bands' },
  speed: { id: 'cinematicMarqueeSpeed', defaultMessage: 'Speed' },
  direction: { id: 'cinematicMarqueeDirection', defaultMessage: 'Direction' },
  fontSize: { id: 'cinematicMarqueeFontSize', defaultMessage: 'Font Size' },
  separator: { id: 'cinematicMarqueeSep', defaultMessage: 'Separator' },
  fontWeight: { id: 'cinematicMarqueeFontWeight', defaultMessage: 'Font Weight' },
  pauseOnHover: { id: 'cinematicMarqueePause', defaultMessage: 'Pause on Hover' },
});

const BandSchema = (props) => ({
  title: 'Band',
  addMessage: 'Add band',
  fieldsets: [
    { id: 'content', title: 'Content', fields: ['text', 'buttonLabel', 'buttonLink', 'buttonPrimary'] },
    { id: 'styling', title: 'Styling', fields: ['bgImage', 'fallbackBgColor', 'textColor'] },
  ],
  properties: {
    text: { title: 'Text', default: 'STRATEGY · DESIGN · DEVELOPMENT · GROWTH' },
    bgImage: { title: 'Background Image', widget: 'image', default: null },
    fallbackBgColor: { title: 'Fallback Background Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#000000' },
    textColor: { title: 'Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#ffffff' },
    buttonLabel: { title: 'Button Label' },
    buttonLink: { title: 'Button Link', widget: 'url' },
    buttonPrimary: { title: 'Primary Button', type: 'boolean', default: true },
  },
  required: [],
});

export const MarqueeSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.MarqueeBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['bands'] },
      { id: 'styling', title: 'Layout', fields: ['speed', 'direction', 'fontSize', 'separator', 'fontWeight', 'pauseOnHover'] },
    ],
    properties: {
      bands: {
        title: intl.formatMessage(messages.bands),
        widget: 'object_list',
        schema: BandSchema(props),
      },
      speed: {
        title: intl.formatMessage(messages.speed),
        default: '30',
        choices: [['15', 'Fast'], ['30', 'Medium'], ['50', 'Slow'], ['80', 'Very Slow']],
      },
      direction: {
        title: intl.formatMessage(messages.direction),
        default: 'left',
        choices: [['left', 'Left'], ['right', 'Right']],
      },
      fontSize: {
        title: intl.formatMessage(messages.fontSize),
        default: '3rem',
        choices: [['1.5rem', 'Small'], ['2rem', 'Medium'], ['3rem', 'Large'], ['5rem', 'Extra Large']],
      },
      separator: {
        title: intl.formatMessage(messages.separator),
        default: ' · ',
      },
      fontWeight: {
        title: intl.formatMessage(messages.fontWeight),
        default: '800',
        choices: [['400', 'Normal'], ['600', 'Semi Bold'], ['800', 'Bold'], ['900', 'Black']],
      },
      pauseOnHover: {
        title: intl.formatMessage(messages.pauseOnHover),
        type: 'boolean',
        default: true,
      },
    },
    required: [],
  };
};
