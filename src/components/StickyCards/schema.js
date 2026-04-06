import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  StickyCardsBlock: { id: 'cinematicStickyCards', defaultMessage: 'Sticky Cards' },
  cards: { id: 'cinematicStickyCardsData', defaultMessage: 'Cards' },
  cardHeight: { id: 'cinematicStickyCardsHeight', defaultMessage: 'Card Height' },
  borderRadius: { id: 'cinematicStickyCardsRadius', defaultMessage: 'Border Radius' },
  offsetSpacing: { id: 'cinematicStickyCardsOffset', defaultMessage: 'Stack Offset' },
});

const CardSchema = (props) => ({
  title: 'Card',
  addMessage: 'Add card',
  fieldsets: [
    { id: 'default', title: 'Default', fields: ['title', 'description', 'bgColor', 'textColor'] },
  ],
  properties: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    bgColor: { title: 'Background Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#1a1a2e' },
    textColor: { title: 'Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#ffffff' },
  },
  required: [],
});

export const StickyCardsSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.StickyCardsBlock),
    fieldsets: [
      { id: 'default', title: 'Cards', fields: ['cards'] },
      { id: 'styling', title: 'Layout', fields: ['cardHeight', 'borderRadius', 'offsetSpacing'] },
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
    },
    required: [],
  };
};
