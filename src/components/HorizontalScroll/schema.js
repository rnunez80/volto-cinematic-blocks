import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  HorizontalScrollBlock: { id: 'cinematicHorizontalScroll', defaultMessage: 'Horizontal Scroll' },
  items: { id: 'cinematicHScrollItems', defaultMessage: 'Items' },
  sectionHeight: { id: 'cinematicHScrollHeight', defaultMessage: 'Section Height Multiplier' },
  itemWidth: { id: 'cinematicHScrollItemWidth', defaultMessage: 'Item Width' },
  gap: { id: 'cinematicHScrollGap', defaultMessage: 'Gap' },
});

const ItemSchema = (props) => ({
  title: 'Item',
  addMessage: 'Add item',
  fieldsets: [
    { id: 'default', title: 'Default', fields: ['title', 'description', 'bgColor'] },
  ],
  properties: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    bgColor: { title: 'Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#333' },
  },
  required: [],
});

export const HorizontalScrollSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.HorizontalScrollBlock),
    fieldsets: [
      { id: 'default', title: 'Items', fields: ['items'] },
      { id: 'styling', title: 'Layout', fields: ['sectionHeight', 'itemWidth', 'gap'] },
    ],
    properties: {
      items: {
        title: intl.formatMessage(messages.items),
        widget: 'object_list',
        schema: ItemSchema(props),
      },
      sectionHeight: {
        title: intl.formatMessage(messages.sectionHeight),
        description: 'How many screen-heights tall the scroll section is (more = slower panning)',
        default: '3',
        choices: [['2', '2x'], ['3', '3x'], ['4', '4x'], ['5', '5x']],
      },
      itemWidth: {
        title: intl.formatMessage(messages.itemWidth),
        default: '400px',
        choices: [['300px', 'Small'], ['400px', 'Medium'], ['500px', 'Large'], ['600px', 'Extra Large']],
      },
      gap: {
        title: intl.formatMessage(messages.gap),
        default: '2rem',
        choices: [['1rem', 'Small'], ['2rem', 'Medium'], ['3rem', 'Large']],
      },
    },
    required: [],
  };
};
