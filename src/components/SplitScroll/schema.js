import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  SplitScrollBlock: { id: 'cinematicSplitScroll', defaultMessage: 'Split Scroll' },
  leftItems: { id: 'cinematicSplitLeft', defaultMessage: 'Left Column Items' },
  rightItems: { id: 'cinematicSplitRight', defaultMessage: 'Right Column Items' },
  sectionHeight: { id: 'cinematicSplitHeight', defaultMessage: 'Section Height' },
  gap: { id: 'cinematicSplitGap', defaultMessage: 'Column Gap' },
  scrollRatio: { id: 'cinematicSplitRatio', defaultMessage: 'Scroll Speed Ratio' },
});

const ItemSchema = (props) => ({
  title: 'Item',
  addMessage: 'Add item',
  fieldsets: [
    { id: 'content', title: 'Content', fields: ['title', 'description', 'buttonLabel', 'buttonLink', 'buttonPrimary'] },
    { id: 'styling', title: 'Styling', fields: ['image', 'bgImage', 'bgColor', 'textColor'] },
  ],
  properties: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    image: { title: 'Image', widget: 'image', default: null },
    bgImage: { title: 'Background Image', widget: 'image', default: null },
    bgColor: { title: 'Fallback Background Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#eeeeee' },
    textColor: { title: 'Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#000000' },
    buttonLabel: { title: 'Button Label' },
    buttonLink: { title: 'Button Link', widget: 'url' },
    buttonPrimary: { title: 'Primary Button', type: 'boolean', default: true },
  },
  required: [],
});

export const SplitScrollSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.SplitScrollBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['leftItems', 'rightItems'] },
      { id: 'styling', title: 'Layout', fields: ['sectionHeight', 'gap', 'scrollRatio'] },
    ],
    properties: {
      leftItems: {
        title: intl.formatMessage(messages.leftItems),
        widget: 'object_list',
        schema: ItemSchema(props),
      },
      rightItems: {
        title: intl.formatMessage(messages.rightItems),
        widget: 'object_list',
        schema: ItemSchema(props),
      },
      sectionHeight: {
        title: intl.formatMessage(messages.sectionHeight),
        default: '100vh',
        choices: [['50vh', 'Half'], ['100vh', 'Full Screen'], ['150vh', 'Extra Tall']],
      },
      gap: {
        title: intl.formatMessage(messages.gap),
        default: '2rem',
        choices: [['1rem', 'Small'], ['2rem', 'Medium'], ['4rem', 'Large']],
      },
      scrollRatio: {
        title: intl.formatMessage(messages.scrollRatio),
        description: 'How much faster the right column scrolls relative to the left',
        default: '1.5',
        choices: [['1.2', 'Subtle'], ['1.5', 'Medium'], ['2', 'Strong']],
      },
    },
    required: [],
  };
};
