import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';
import { imageSizeChoices } from '@plone/volto/components/theme/ImageSize/ImageSizeWidget';

const messages = defineMessages({
  TypewriterBlock: {
    id: 'Typewriter Block',
    defaultMessage: 'Typewriter Block',
  },
  staticText: {
    id: 'cinematicTypewriterStaticText',
    defaultMessage: 'Static Text',
  },
  phrases: {
    id: 'cinematicTypewriterPhrases',
    defaultMessage: 'Cycling Phrases',
  },
  postfixText: {
    id: 'cinematicTypewriterPostfixText',
    defaultMessage: 'Text After',
  },
  typingSpeed: {
    id: 'cinematicTypewriterTypingSpeed',
    defaultMessage: 'Typing Speed (ms)',
  },
  deleteSpeed: {
    id: 'cinematicTypewriterDeleteSpeed',
    defaultMessage: 'Delete Speed (ms)',
  },
  pauseDuration: {
    id: 'cinematicTypewriterPauseDuration',
    defaultMessage: 'Pause Duration (ms)',
  },
  cursorChar: {
    id: 'cinematicTypewriterCursorChar',
    defaultMessage: 'Cursor Character',
  },
  cursorColor: {
    id: 'cinematicTypewriterCursorColor',
    defaultMessage: 'Cursor Color',
  },
  fontSize: {
    id: 'cinematicTypewriterFontSize',
    defaultMessage: 'Font Size',
  },
  textAlign: {
    id: 'cinematicTypewriterTextAlign',
    defaultMessage: 'Text Alignment',
  },
  loop: {
    id: 'cinematicTypewriterLoop',
    defaultMessage: 'Loop Animation',
  },
  blockHeight: {
    id: 'cinematicTypewriterBlockHeight',
    defaultMessage: 'Block Height',
  },
  foregroundText: {
    id: 'cinematicTypewriterForegroundText',
    defaultMessage: 'Foreground Text',
  },
  ctaText: {
    id: 'cinematicTypewriterCTAText',
    defaultMessage: 'CTA Button Text',
  },
  ctaLink: {
    id: 'cinematicTypewriterCTALink',
    defaultMessage: 'CTA Link',
  },
  ctaPrimary: {
    id: 'cinematicTypewriterCTAPrimary',
    defaultMessage: 'Primary CTA',
  },
});

export const TypewriterSchema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.TypewriterBlock),
    fieldsets: [
      { id: 'content', title: 'Content', fields: ['staticText', 'phrases', 'postfixText', 'ctaText', 'ctaLink', 'ctaPrimary'] },
      { id: 'styling', title: 'Styling', fields: ['backgroundImage', 'fallbackBgColor', 'fontSize', 'textColor', 'cursorChar', 'cursorColor', 'textAlign', 'blockHeight', 'typingSpeed', 'deleteSpeed', 'pauseDuration', 'loop'] },
    ],
    properties: {
      staticText: {
        title: intl.formatMessage(messages.staticText),
        description: 'Text that stays fixed before the cycling portion',
        default: 'We build ',
      },
      phrases: {
        title: intl.formatMessage(messages.phrases),
        description:
          'Comma-separated list of phrases to cycle through (e.g. "websites, apps, experiences")',
        default: 'websites, applications, experiences',
      },
      postfixText: {
        title: intl.formatMessage(messages.postfixText),
        description: 'Text that stays fixed after the cycling portion (optional)',
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
        default: '#000000',
      },
      typingSpeed: {
        title: intl.formatMessage(messages.typingSpeed),
        type: 'integer',
        default: 80,
        minimum: 20,
        maximum: 300,
      },
      deleteSpeed: {
        title: intl.formatMessage(messages.deleteSpeed),
        type: 'integer',
        default: 40,
        minimum: 10,
        maximum: 200,
      },
      pauseDuration: {
        title: intl.formatMessage(messages.pauseDuration),
        type: 'integer',
        default: 1500,
        minimum: 300,
        maximum: 5000,
      },
      loop: {
        title: intl.formatMessage(messages.loop),
        type: 'boolean',
        default: true,
      },
      cursorChar: {
        title: intl.formatMessage(messages.cursorChar),
        default: '|',
      },
      cursorColor: {
        title: intl.formatMessage(messages.cursorColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
        default: '#e74c3c',
      },
      fontSize: {
        title: intl.formatMessage(messages.fontSize),
        default: '3rem',
        choices: [
          ['1.5rem', 'Small'],
          ['2rem', 'Medium'],
          ['3rem', 'Large'],
          ['4rem', 'Extra Large'],
          ['5rem', 'Huge'],
        ],
      },
      textColor: {
        title: 'Text Color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings?.available_colors,
      },
      textAlign: {
        title: intl.formatMessage(messages.textAlign),
        widget: 'align',
        actions: ['left', 'center', 'right'],
        default: 'center',
      },
      blockHeight: {
        title: intl.formatMessage(messages.blockHeight),
        widget: 'image_size',
        default: 'm',
      },
      foregroundText: {
        title: intl.formatMessage(messages.foregroundText),
        description: 'Optional foreground text',
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
    required: ['phrases'],
  };
};
