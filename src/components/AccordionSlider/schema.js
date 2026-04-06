import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  AccordionSliderBlock: { id: 'cinematicAccordionSlider', defaultMessage: 'Accordion Slider' },
  panels: { id: 'cinematicAccordionPanels', defaultMessage: 'Panels' },
  panelHeight: { id: 'cinematicAccordionHeight', defaultMessage: 'Panel Height' },
  transitionSpeed: { id: 'cinematicAccordionSpeed', defaultMessage: 'Transition Speed (ms)' },
  expandedRatio: { id: 'cinematicAccordionRatio', defaultMessage: 'Expanded Width Ratio' },
  overlayOpacity: { id: 'cinematicAccordionOverlay', defaultMessage: 'Overlay Opacity' },
  borderRadius: { id: 'cinematicAccordionRadius', defaultMessage: 'Border Radius' },
});

const PanelSchema = (props) => ({
  title: 'Panel',
  addMessage: 'Add panel',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['title', 'description', 'image', 'bgColor'],
    },
  ],
  properties: {
    title: { title: 'Title' },
    description: { title: 'Description' },
    image: { title: 'Background Image', widget: 'image' },
    bgColor: { title: 'Fallback Color', type: 'color', widget: 'style_simple_color', available_colors: config.settings?.available_colors, default: '#333' },
  },
  required: [],
});

export const AccordionSliderSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.AccordionSliderBlock),
    fieldsets: [
      { id: 'default', title: 'Panels', fields: ['panels'] },
      { id: 'styling', title: 'Styling', fields: ['panelHeight', 'transitionSpeed', 'expandedRatio', 'overlayOpacity', 'borderRadius'] },
    ],
    properties: {
      panels: {
        title: intl.formatMessage(messages.panels),
        widget: 'object_list',
        schema: PanelSchema(props),
      },
      panelHeight: {
        title: intl.formatMessage(messages.panelHeight),
        default: '500px',
        choices: [['350px', 'Small'], ['500px', 'Medium'], ['700px', 'Large'], ['100vh', 'Full Screen']],
      },
      transitionSpeed: {
        title: intl.formatMessage(messages.transitionSpeed),
        type: 'integer',
        default: 500,
        minimum: 200,
        maximum: 2000,
      },
      expandedRatio: {
        title: intl.formatMessage(messages.expandedRatio),
        type: 'integer',
        description: 'How many times wider the expanded panel is vs collapsed (2-6)',
        default: 4,
        minimum: 2,
        maximum: 6,
      },
      overlayOpacity: {
        title: intl.formatMessage(messages.overlayOpacity),
        description: 'Overlay darkness on collapsed panels (0-1)',
        default: '0.4',
        choices: [['0', 'None'], ['0.2', 'Light'], ['0.4', 'Medium'], ['0.6', 'Dark'], ['0.8', 'Very Dark']],
      },
      borderRadius: {
        title: intl.formatMessage(messages.borderRadius),
        default: '12px',
        choices: [['0', 'None'], ['8px', 'Small'], ['12px', 'Medium'], ['20px', 'Large']],
      },
    },
    required: [],
  };
};
