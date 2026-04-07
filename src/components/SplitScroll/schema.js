import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  SplitScrollBlock: { id: 'cinematicSplitScroll', defaultMessage: 'Split Scroll' },
  leftItems: { id: 'cinematicSplitLeft', defaultMessage: 'Left Column Items' },
  rightItems: { id: 'cinematicSplitRight', defaultMessage: 'Right Column Items' },
  sectionHeight: { id: 'cinematicSplitHeight', defaultMessage: 'Section Height' },
  gap: { id: 'cinematicSplitGap', defaultMessage: 'Column Gap' },
  stickyColumn: { id: 'cinematicSplitSticky', defaultMessage: 'Sticky Column' },
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
    description: { title: 'Description', widget: 'textarea' },
    image: { title: 'Image', widget: 'image', default: null },
    bgImage: { title: 'Background Image', widget: 'image', default: null },
    bgColor: { title: 'Fallback Background Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: 'transparent' },
    textColor: { title: 'Text Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: 'inherit' },
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
      { id: 'styling', title: 'Layout', fields: ['sectionHeight', 'gap', 'stickyColumn'] },
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
        default: '0rem',
        choices: [['0rem', 'None'], ['1rem', 'Small'], ['2rem', 'Medium'], ['4rem', 'Large']],
      },
      stickyColumn: {
        title: intl.formatMessage(messages.stickyColumn),
        description: 'Which column stays pinned while the other side scrolls relative to it.',
        default: 'left',
        choices: [['left', 'Left Column'], ['right', 'Right Column'], ['none', 'None (Standard Scroll)']],
      },
    },
    required: [],
  };
};
