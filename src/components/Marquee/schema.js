import { defineMessages } from 'react-intl';

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

const BandSchema = {
  title: 'Band',
  addMessage: 'Add band',
  fieldsets: [
    { id: 'default', title: 'Default', fields: ['text'] },
  ],
  properties: {
    text: { title: 'Text', default: 'STRATEGY · DESIGN · DEVELOPMENT · GROWTH' },
  },
  required: [],
};

export const MarqueeSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.MarqueeBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['bands'] },
      { id: 'animation', title: 'Animation', fields: ['speed', 'direction', 'pauseOnHover'] },
      { id: 'styling', title: 'Typography', fields: ['fontSize', 'separator', 'fontWeight'] },
    ],
    properties: {
      bands: {
        title: intl.formatMessage(messages.bands),
        widget: 'object_list',
        schema: BandSchema,
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
      pauseOnHover: {
        title: intl.formatMessage(messages.pauseOnHover),
        type: 'boolean',
        default: true,
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
    },
    required: [],
  };
};
