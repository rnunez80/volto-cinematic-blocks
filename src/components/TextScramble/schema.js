import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  TextScrambleBlock: { id: 'cinematicTextScramble', defaultMessage: 'Text Scramble' },
  headline: { id: 'cinematicTextScrambleHeadline', defaultMessage: 'Headline Text' },
  trigger: { id: 'cinematicTextScrambleTrigger', defaultMessage: 'Trigger' },
  scrambleChars: { id: 'cinematicTextScrambleChars', defaultMessage: 'Scramble Characters' },
  decodeSpeed: { id: 'cinematicTextScrambleDecodeSpeed', defaultMessage: 'Decode Speed (ms)' },
  fontSize: { id: 'cinematicTextScrambleFontSize', defaultMessage: 'Font Size' },

  textAlign: { id: 'cinematicTextScrambleAlign', defaultMessage: 'Text Alignment' },
  fontFamily: { id: 'cinematicTextScrambleFont', defaultMessage: 'Font Family' },
  blockHeight: { id: 'cinematicTextScrambleBlockHeight', defaultMessage: 'Block Height' },
  textColor: { id: 'cinematicTextScrambleTextColor', defaultMessage: 'Text Color' },
  backgroundImage: { id: 'cinematicTextScrambleBackgroundImage', defaultMessage: 'Background Image' },
});

export const TextScrambleSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.TextScrambleBlock),
    fieldsets: [
      { id: 'default', title: 'Content', fields: ['headline'] },
      { id: 'animation', title: 'Animation', fields: ['trigger', 'scrambleChars', 'decodeSpeed'] },
      { id: 'styling', title: 'Styling', fields: ['fontSize', 'textAlign', 'fontFamily', 'blockHeight', 'textColor', 'backgroundImage'] },
    ],
    properties: {
      headline: {
        title: intl.formatMessage(messages.headline),
        default: 'Characters decode into your headline',
      },
      trigger: {
        title: intl.formatMessage(messages.trigger),
        default: 'on-scroll',
        choices: [['on-scroll', 'On Scroll'], ['on-load', 'On Load']],
      },
      scrambleChars: {
        title: intl.formatMessage(messages.scrambleChars),
        default: '!<>-_\\/[]{}—=+*^?#________',
      },
      decodeSpeed: {
        title: intl.formatMessage(messages.decodeSpeed),
        type: 'integer',
        default: 50,
        minimum: 10,
        maximum: 200,
      },
      fontSize: {
        title: intl.formatMessage(messages.fontSize),
        default: '3rem',
        choices: [['1.5rem', 'Small'], ['2rem', 'Medium'], ['3rem', 'Large'], ['4rem', 'Extra Large'], ['5rem', 'Huge']],
      },

      textAlign: {
        title: intl.formatMessage(messages.textAlign),
        widget: 'align',
        actions: ['left', 'center', 'right'],
        default: 'center',
      },
      fontFamily: {
        title: intl.formatMessage(messages.fontFamily),
        default: 'monospace',
        choices: [['monospace', 'Monospace'], ['inherit', 'Inherit'], ['sans-serif', 'Sans Serif']],
      },
      blockHeight: {
        title: intl.formatMessage(messages.blockHeight),
        widget: 'image_size',
        default: 'm',
      },
      textColor: {
        title: intl.formatMessage(messages.textColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
      },
      backgroundImage: {
        title: intl.formatMessage(messages.backgroundImage),
        widget: 'image',
      },
    },
    required: [],
  };
};
