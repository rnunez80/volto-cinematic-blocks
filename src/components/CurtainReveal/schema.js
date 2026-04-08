import { defineMessages } from 'react-intl';

const messages = defineMessages({
  CurtainRevealBlock: { id: 'cinematicCurtainReveal', defaultMessage: 'Curtain Reveal' },
  curtainColor: { id: 'cinematicCurtainColor', defaultMessage: 'Curtain Color' },
  curtainGradient: { id: 'cinematicCurtainGradient', defaultMessage: 'Curtain Gradient' },
  curtainGradientStart: { id: 'cinematicCurtainGradientStart', defaultMessage: 'Gradient Start' },
  curtainGradientEnd: { id: 'cinematicCurtainGradientEnd', defaultMessage: 'Gradient End' },
  curtainGradientAngle: { id: 'cinematicCurtainGradientAngle', defaultMessage: 'Gradient Angle' },
  revealDirection: { id: 'cinematicCurtainDirection', defaultMessage: 'Reveal Direction' },
  title: { id: 'cinematicCurtainTitle', defaultMessage: 'Title' },
  description: { id: 'cinematicCurtainDescription', defaultMessage: 'Description' },
  sectionHeight: { id: 'cinematicCurtainHeight', defaultMessage: 'Section Height' },
  ctaText: { id: 'cinematicCurtainCTAText', defaultMessage: 'CTA Button Text' },
  ctaLink: { id: 'cinematicCurtainCTALink', defaultMessage: 'CTA Link' },
  ctaPrimary: { id: 'cinematicCurtainCTAPrimary', defaultMessage: 'Primary CTA' },
  ctaColor: { id: 'cinematicCurtainCTAColor', defaultMessage: 'Button Color' },
  ctaTextColor: { id: 'cinematicCurtainCTATextColor', defaultMessage: 'Button Text Color' },
});

export const CurtainRevealSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.CurtainRevealBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['title', 'description'] },
      { id: 'styling', title: 'Styling', fields: ['fallbackBgColor', 'textColor', 'curtainColor', 'curtainGradient', 'curtainGradientStart', 'curtainGradientEnd', 'curtainGradientAngle', 'revealDirection', 'sectionHeight', 'backgroundImage'] },
      { id: 'cta', title: 'Call to Action', fields: ['ctaText', 'ctaLink', 'ctaPrimary', 'ctaColor', 'ctaTextColor'] },
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
        default: null,
      },
      fallbackBgColor: {
        title: 'Fallback Background Color',
        type: 'color',
        widget: 'style_simple_color',
        default: '#eeeeee',
      },
      textColor: {
        title: 'Text Color',
        type: 'color',
        widget: 'style_simple_color',
        default: '#000000',
      },
      curtainGradient: {
        title: intl.formatMessage(messages.curtainGradient),
        description: 'Enable gradient curtain',
        type: 'boolean',
        default: false,
      },
      curtainColor: {
        title: intl.formatMessage(messages.curtainColor),
        type: 'color',
        widget: 'style_simple_color',
        default: '#1a1a2e',
      },
      curtainGradient: {
        title: intl.formatMessage(messages.curtainGradient),
        description: 'Enable gradient curtain',
        type: 'boolean',
        default: false,
      },
      curtainGradientStart: {
        title: intl.formatMessage(messages.curtainGradientStart),
        type: 'color',
        widget: 'style_simple_color',
        default: '#1a1a2e',
      },
      curtainGradientStart: {
        title: intl.formatMessage(messages.curtainGradientStart),
        type: 'color',
        widget: 'style_simple_color',
        default: '#1a1a2e',
      },
      curtainGradientEnd: {
        title: intl.formatMessage(messages.curtainGradientEnd),
        type: 'color',
        widget: 'style_simple_color',
        default: '#e94560',
      },
      curtainGradientAngle: {
        title: intl.formatMessage(messages.curtainGradientAngle),
        type: 'integer',
        default: 45,
        minimum: 0,
        maximum: 360,
      },
      revealDirection: {
        title: intl.formatMessage(messages.revealDirection),
        default: 'left',
        choices: [['left', 'Left'], ['right', 'Right'], ['up', 'Up'], ['down', 'Down']],
      },
      sectionHeight: {
        title: intl.formatMessage(messages.sectionHeight),
        default: '60vh',
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
      ctaColor: {
        title: intl.formatMessage(messages.ctaColor),
        type: 'color',
        widget: 'style_simple_color',
        default: '#e74c3c',
      },
      ctaTextColor: {
        title: intl.formatMessage(messages.ctaTextColor),
        type: 'color',
        widget: 'style_simple_color',
        default: '#ffffff',
      },
    },
    required: [],
  };
};
