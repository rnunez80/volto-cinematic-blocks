import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  CurtainRevealBlock: { id: 'cinematicCurtainReveal', defaultMessage: 'Curtain Reveal' },
  curtainColor: { id: 'cinematicCurtainColor', defaultMessage: 'Curtain Color' },
  curtainGradient: { id: 'cinematicCurtainGradient', defaultMessage: 'Curtain Gradient' },
  revealDirection: { id: 'cinematicCurtainDirection', defaultMessage: 'Reveal Direction' },
  title: { id: 'cinematicCurtainTitle', defaultMessage: 'Title' },
  description: { id: 'cinematicCurtainDescription', defaultMessage: 'Description' },
  sectionHeight: { id: 'cinematicCurtainHeight', defaultMessage: 'Section Height' },
  ctaText: { id: 'cinematicCurtainCTAText', defaultMessage: 'CTA Button Text' },
  ctaLink: { id: 'cinematicCurtainCTALink', defaultMessage: 'CTA Link' },
  ctaPrimary: { id: 'cinematicCurtainCTAPrimary', defaultMessage: 'Primary CTA' },
});

export const CurtainRevealSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.CurtainRevealBlock),
    fieldsets: [
      { id: 'content', title: 'Content', fields: ['title', 'description', 'backgroundImage', 'ctaText', 'ctaLink', 'ctaPrimary'] },
      { id: 'styling', title: 'Styling', fields: ['fallbackBgColor', 'textColor', 'curtainColor', 'curtainGradient', 'revealDirection', 'sectionHeight'] },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.title),
        default: 'Reveal what matters',
      },
      description: {
        title: intl.formatMessage(messages.description),
        widget: 'textarea',
        default: 'Content emerges as the curtain slides away, creating a dramatic reveal moment.',
      },
      backgroundImage: {
        title: 'Background Image',
        widget: 'image',
      },
      fallbackBgColor: {
        title: 'Fallback Background Color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#eeeeee',
      },
      textColor: {
        title: 'Text Color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#000000',
      },
      curtainColor: {
        title: intl.formatMessage(messages.curtainColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#1a1a2e',
      },
      curtainGradient: {
        title: intl.formatMessage(messages.curtainGradient),
        description: 'Optional CSS gradient (overrides curtain color). E.g. "linear-gradient(135deg, #1a1a2e, #e94560)"',
        default: '',
      },
      revealDirection: {
        title: intl.formatMessage(messages.revealDirection),
        default: 'left',
        choices: [['left', 'Left'], ['right', 'Right'], ['up', 'Up'], ['down', 'Down']],
      },
      sectionHeight: {
        title: intl.formatMessage(messages.sectionHeight),
        default: '100vh',
        choices: [['60vh', 'Short'], ['80vh', 'Medium'], ['100vh', 'Full Screen']],
      },
      ctaText: {
        title: intl.formatMessage(messages.ctaText),
      },
      ctaLink: {
        title: intl.formatMessage(messages.ctaLink),
        widget: 'url',
      },
      ctaPrimary: {
        title: intl.formatMessage(messages.ctaPrimary),
        type: 'boolean',
        default: true,
      },
    },
    required: [],
  };
};
