import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  FlipCardsBlock: { id: 'cinematicFlipCards', defaultMessage: 'Flip Cards' },
  cards: { id: 'cinematicFlipCardsData', defaultMessage: 'Cards' },
  columns: { id: 'cinematicFlipCardsCols', defaultMessage: 'Columns' },
  cardHeight: { id: 'cinematicFlipCardsHeight', defaultMessage: 'Card Height' },
  gap: { id: 'cinematicFlipCardsGap', defaultMessage: 'Gap' },
  borderRadius: { id: 'cinematicFlipCardsRadius', defaultMessage: 'Border Radius' },
});

const CardSchema = (props) => ({
  title: 'Card',
  addMessage: 'Add card',
  fieldsets: [
    // { id: 'content', title: 'Content', fields: ['frontTitle', 'frontDesc', 'backTitle', 'backDesc', 'buttonLabel', 'buttonLink', 'buttonPrimary'] },
    // { id: 'styling', title: 'Styling', fields: ['frontBgImage', 'frontBgColor', 'frontTextColor', 'backBgImage', 'backBgColor', 'backTextColor', 'textColor'] },
    //
    { id: 'front', title: 'Front', fields: ['frontTitle', 'frontDesc', 'frontTextColor', 'frontBgImage', 'frontBgColor'] },
    { id: 'back', title: 'Back', fields: ['backTitle', 'backDesc', 'backTextColor', 'buttonPrimary', 'buttonLabel', 'buttonLink', 'backBgImage', 'backBgColor'] },
  ],
  properties: {
    frontTitle: { title: 'Front Title' },
    frontDesc: { title: 'Front Description' },
    backTitle: { title: 'Back Title' },
    backDesc: { title: 'Back Description' },
    frontBgImage: { title: 'Front Background Image', widget: 'image', default: null },
    frontBgColor: { title: 'Front Fallback Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#eeeeee' },
    frontTextColor: { title: 'Front Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#000000' },
    backBgImage: { title: 'Back Background Image', widget: 'image', default: null },
    backBgColor: { title: 'Back Fallback Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#eeeeee' },
    backTextColor: { title: 'Back Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#000000' },
    buttonLabel: { title: 'Button Label' },
    buttonLink: { title: 'Button Link', widget: 'url' },
    buttonPrimary: { title: 'Primary Button', type: 'boolean', default: true },
  },
  required: [],
});

export const FlipCardsSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.FlipCardsBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['cards'] },
      { id: 'styling', title: 'Layout', fields: ['columns', 'cardHeight', 'gap', 'borderRadius'] },
    ],
    properties: {
      cards: {
        title: intl.formatMessage(messages.cards),
        widget: 'object_list',
        schema: CardSchema(props),
      },
      columns: {
        title: intl.formatMessage(messages.columns),
        default: '4',
        choices: [['2', '2'], ['3', '3'], ['4', '4']],
      },
      cardHeight: {
        title: intl.formatMessage(messages.cardHeight),
        default: '300px',
        choices: [['250px', 'Small'], ['300px', 'Medium'], ['400px', 'Large'], ['500px', 'Extra Large']],
      },
      gap: {
        title: intl.formatMessage(messages.gap),
        default: '1.5rem',
        choices: [['0.5rem', 'Tight'], ['1rem', 'Small'], ['1.5rem', 'Medium'], ['2.5rem', 'Large']],
      },
      borderRadius: {
        title: intl.formatMessage(messages.borderRadius),
        default: '16px',
        choices: [['0', 'None'], ['8px', 'Small'], ['16px', 'Medium'], ['24px', 'Large']],
      },
    },
    required: [],
  };
};
