import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  StickyCardsBlock: { id: 'cinematicStickyCards', defaultMessage: 'Sticky Cards' },
  cards: { id: 'cinematicStickyCardsData', defaultMessage: 'Cards' },
  cardHeight: { id: 'cinematicStickyCardsHeight', defaultMessage: 'Card Height' },
  borderRadius: { id: 'cinematicStickyCardsRadius', defaultMessage: 'Border Radius' },
  offsetSpacing: { id: 'cinematicStickyCardsOffset', defaultMessage: 'Stack Offset' },
  enableShiftRotate: { id: 'cinematicStickyCardsShiftRotate', defaultMessage: 'Enable Shift & Rotate' },
  shiftAmount: { id: 'cinematicStickyCardsShift', defaultMessage: 'Shift Amount' },
  rotateAmount: { id: 'cinematicStickyCardsRotate', defaultMessage: 'Rotate Amount' },
});

const CardSchema = (props) => ({
  title: 'Card',
  addMessage: 'Add card',
  fieldsets: [
    { id: 'content', title: 'Content', fields: ['title', 'description', 'buttonLabel', 'buttonLink', 'buttonPrimary'] },
    { id: 'styling', title: 'Styling', fields: ['bgImage', 'bgColor', 'textColor'] },
  ],
  properties: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    bgImage: { title: 'Background Image', widget: 'image', default: null },
    bgColor: { title: 'Fallback Background Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#eeeeee' },
    textColor: { title: 'Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#000000' },
    buttonLabel: { title: 'Button Label' },
    buttonLink: { title: 'Button Link', widget: 'url' },
    buttonPrimary: { title: 'Primary Button', type: 'boolean', default: true },
  },
  required: [],
});

export const StickyCardsSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.StickyCardsBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['cards'] },
      { id: 'styling', title: 'Layout', fields: ['cardHeight', 'borderRadius', 'offsetSpacing', 'enableShiftRotate', 'shiftAmount', 'rotateAmount'] },
    ],
    properties: {
      cards: {
        title: intl.formatMessage(messages.cards),
        widget: 'object_list',
        schema: CardSchema(props),
      },
      cardHeight: {
        title: intl.formatMessage(messages.cardHeight),
        default: '400px',
        choices: [['300px', 'Small'], ['400px', 'Medium'], ['500px', 'Large'], ['80vh', 'Full Screen']],
      },
      borderRadius: {
        title: intl.formatMessage(messages.borderRadius),
        default: '20px',
        choices: [['0', 'None'], ['12px', 'Small'], ['20px', 'Medium'], ['32px', 'Large']],
      },
      offsetSpacing: {
        title: intl.formatMessage(messages.offsetSpacing),
        description: 'Vertical offset between stacked cards (px)',
        type: 'integer',
        default: 30,
        minimum: 10,
        maximum: 80,
      },
      enableShiftRotate: {
        title: intl.formatMessage(messages.enableShiftRotate),
        type: 'boolean',
        default: false,
      },
      shiftAmount: {
        title: intl.formatMessage(messages.shiftAmount),
        description: 'Horizontal shift amount (px)',
        type: 'integer',
        default: 100,
        minimum: 0,
        maximum: 500,
      },
      rotateAmount: {
        title: intl.formatMessage(messages.rotateAmount),
        description: 'Rotation angle (degrees)',
        type: 'integer',
        default: 10,
        minimum: -45,
        maximum: 45,
      },
    },
    required: [],
  };
};
