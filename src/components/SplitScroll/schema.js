import { defineMessages } from 'react-intl';

const messages = defineMessages({
  SplitScrollBlock: { id: 'cinematicSplitScroll', defaultMessage: 'Split Scroll' },
  leftItems: { id: 'cinematicSplitLeft', defaultMessage: 'Left Column Items' },
  rightItems: { id: 'cinematicSplitRight', defaultMessage: 'Right Column Items' },
  sectionHeight: { id: 'cinematicSplitHeight', defaultMessage: 'Section Height' },
  gap: { id: 'cinematicSplitGap', defaultMessage: 'Column Gap' },
  scrollRatio: { id: 'cinematicSplitRatio', defaultMessage: 'Scroll Speed Ratio' },
});

const ItemSchema = {
  title: 'Item',
  addMessage: 'Add item',
  fieldsets: [
    { id: 'default', title: 'Default', fields: ['title', 'description', 'image'] },
  ],
  properties: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    image: { title: 'Image', widget: 'image' },
  },
  required: [],
};

export const SplitScrollSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.SplitScrollBlock),
    fieldsets: [
      { id: 'default', title: 'Left Column', fields: ['leftItems'] },
      { id: 'right', title: 'Right Column', fields: ['rightItems'] },
      { id: 'styling', title: 'Layout', fields: ['sectionHeight', 'gap', 'scrollRatio'] },
    ],
    properties: {
      leftItems: {
        title: intl.formatMessage(messages.leftItems),
        widget: 'object_list',
        schema: ItemSchema,
      },
      rightItems: {
        title: intl.formatMessage(messages.rightItems),
        widget: 'object_list',
        schema: ItemSchema,
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
