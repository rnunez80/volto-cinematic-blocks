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
    {
      id: 'default',
      title: 'Front',
      fields: ['frontTitle', 'frontBg'],
    },
    {
      id: 'back',
      title: 'Back',
      fields: ['backTitle', 'backDesc', 'backBg', 'ctaText', 'ctaLink'],
    },
  ],
  properties: {
    frontTitle: { title: 'Front Title' },
    frontBg: { title: 'Front Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#333' },
    backTitle: { title: 'Back Title' },
    backDesc: { title: 'Back Description' },
    backBg: { title: 'Back Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#222' },
    ctaText: { title: 'CTA Text' },
    ctaLink: { title: 'CTA Link', widget: 'url' },
  },
  required: [],
});

export const FlipCardsSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.FlipCardsBlock),
    fieldsets: [
      { id: 'default', title: 'Cards', fields: ['cards'] },
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
