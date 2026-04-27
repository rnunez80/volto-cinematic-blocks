import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  SliderCrazyEffectsBlock: { id: 'cinematicSlider', defaultMessage: 'Slider Hero' },
  slides: { id: 'cinematicSliderSlides', defaultMessage: 'Slides' },
  autoPlay: { id: 'cinematicSliderAutoPlay', defaultMessage: 'Auto Play' },
  interval: { id: 'cinematicSliderInterval', defaultMessage: 'Interval (ms)' },
  transitionSpeed: { id: 'cinematicSliderSpeed', defaultMessage: 'Transition Speed (ms)' },
  showArrows: { id: 'cinematicSliderShowArrows', defaultMessage: 'Show Arrows' },
  showThumbnails: { id: 'cinematicSliderShowThumbnails', defaultMessage: 'Show Thumbnails' },
});

const SlideSchema = (props) => ({
  title: 'Slide',
  addMessage: 'Add slide',
  fieldsets: [
    { id: 'content', title: 'Content', fields: ['image','title', 'topic', 'description', 'buttonLabel', 'buttonLink', 'buttonPrimary', 'button2Label', 'button2Link', 'button2Primary'] },
    { id: 'styling', title: 'Styling', fields: ['titleColor', 'topicColor', 'descriptionColor'] },
  ],
  properties: {
    title: { title: 'Title' },
    topic: { title: 'Topic' },
    description: { title: 'Description' },
    image: { title: 'Image', widget: 'image', default: null },
    titleColor: { title: 'Title Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#ffffff' },
    topicColor: { title: 'Topic Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#F15B4E' },
    descriptionColor: { title: 'Description Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#ffffff' },
    buttonLabel: { title: 'First Button Label' },
    buttonLink: { title: 'First Button Link', widget: 'url' },
    buttonPrimary: { title: 'First Button Primary', type: 'boolean', default: true },
    button2Label: { title: 'Second Button Label' },
    button2Link: { title: 'Second Button Link', widget: 'url' },
    button2Primary: { title: 'Second Button Primary', type: 'boolean', default: false },
  },
  required: [],
});

export const SliderCrazyEffectsSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.SliderCrazyEffectsBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['slides'] },
      { id: 'styling', title: 'Settings', fields: ['autoPlay', 'interval', 'transitionSpeed', 'showArrows', 'showThumbnails'] },
    ],
    properties: {
      slides: {
        title: intl.formatMessage(messages.slides),
        widget: 'object_list',
        schema: SlideSchema(props),
      },
      autoPlay: {
        title: intl.formatMessage(messages.autoPlay),
        type: 'boolean',
        default: true,
      },
      interval: {
        title: intl.formatMessage(messages.interval),
        type: 'integer',
        default: 7000,
        minimum: 3000,
        maximum: 20000,
      },
      transitionSpeed: {
        title: intl.formatMessage(messages.transitionSpeed),
        type: 'integer',
        default: 3000,
        minimum: 500,
        maximum: 5000,
      },
      showArrows: {
        title: intl.formatMessage(messages.showArrows),
        type: 'boolean',
        default: true,
      },
      showThumbnails: {
        title: intl.formatMessage(messages.showThumbnails),
        type: 'boolean',
        default: true,
      },
    },
    required: [],
  };
};
