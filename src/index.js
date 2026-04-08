import paintSVG from '@plone/volto/icons/paint.svg';
import { applyStyleWrapperToBlock } from '@eeacms/volto-block-style';
import './theme/main.less';

// Direct imports for local addon components (loadable causes cross-origin errors in workspaces)
import TypewriterEdit from './components/Typewriter/Edit';
import TypewriterView from './components/Typewriter/View';

import AccordionSliderEdit from './components/AccordionSlider/Edit';
import AccordionSliderView from './components/AccordionSlider/View';

import FlipCardsEdit from './components/FlipCards/Edit';
import FlipCardsView from './components/FlipCards/View';

import MarqueeEdit from './components/Marquee/Edit';
import MarqueeView from './components/Marquee/View';

import TextScrambleEdit from './components/TextScramble/Edit';
import TextScrambleView from './components/TextScramble/View';

import StickyCardsEdit from './components/StickyCards/Edit';
import StickyCardsView from './components/StickyCards/View';

import HorizontalScrollEdit from './components/HorizontalScroll/Edit';
import HorizontalScrollView from './components/HorizontalScroll/View';

import ZoomParallaxEdit from './components/ZoomParallax/Edit';
import ZoomParallaxView from './components/ZoomParallax/View';

import SplitScrollEdit from './components/SplitScroll/Edit';
import SplitScrollView from './components/SplitScroll/View';

import CurtainRevealEdit from './components/CurtainReveal/Edit';
import CurtainRevealView from './components/CurtainReveal/View';

import SliderCrazyEffectsEdit from './components/SliderCrazyEffects/Edit';
import SliderCrazyEffectsView from './components/SliderCrazyEffects/View';

// All cinematic block IDs — used to apply volto-block-style wrapper after registration
const CINEMATIC_BLOCKS = [
  'cinematicTypewriter',
  'cinematicAccordionSlider',
  'cinematicFlipCards',
  'cinematicMarquee',
  'cinematicTextScramble',
  'cinematicStickyCards',
  'cinematicHorizontalScroll',
  'cinematicZoomParallax',
  'cinematicSplitScroll',
  'cinematicCurtainReveal',
  'cinematicSlider',
];

const applyConfig = (config) => {
  // Register 'cinematic' block group
  config.blocks.groupBlocksOrder = [
    ...(config.blocks.groupBlocksOrder || []),
    { id: 'cinematic', title: 'Cinematic' },
  ];

  // 1. Typewriter
  config.blocks.blocksConfig.cinematicTypewriter = {
    id: 'cinematicTypewriter',
    title: 'Typewriter',
    icon: paintSVG,
    group: 'cinematic',
    view: TypewriterView,
    edit: TypewriterEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 2. Accordion Gallery
  config.blocks.blocksConfig.cinematicAccordionSlider = {
    id: 'cinematicAccordionSlider',
    title: 'Accordion Gallery',
    icon: paintSVG,
    group: 'cinematic',
    view: AccordionSliderView,
    edit: AccordionSliderEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 3. Flip Cards
  config.blocks.blocksConfig.cinematicFlipCards = {
    id: 'cinematicFlipCards',
    title: 'Flip Cards',
    icon: paintSVG,
    group: 'cinematic',
    view: FlipCardsView,
    edit: FlipCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 4. Kinetic Marquee
  config.blocks.blocksConfig.cinematicMarquee = {
    id: 'cinematicMarquee',
    title: 'Kinetic Marquee',
    icon: paintSVG,
    group: 'cinematic',
    view: MarqueeView,
    edit: MarqueeEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 5. Text Scramble
  config.blocks.blocksConfig.cinematicTextScramble = {
    id: 'cinematicTextScramble',
    title: 'Text Scramble',
    icon: paintSVG,
    group: 'cinematic',
    view: TextScrambleView,
    edit: TextScrambleEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 6. Sticky Cards
  config.blocks.blocksConfig.cinematicStickyCards = {
    id: 'cinematicStickyCards',
    title: 'Sticky Cards',
    icon: paintSVG,
    group: 'cinematic',
    view: StickyCardsView,
    edit: StickyCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 7. Horizontal Scroll
  config.blocks.blocksConfig.cinematicHorizontalScroll = {
    id: 'cinematicHorizontalScroll',
    title: 'Horizontal Scroll',
    icon: paintSVG,
    group: 'cinematic',
    view: HorizontalScrollView,
    edit: HorizontalScrollEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 8. Zoom Parallax
  config.blocks.blocksConfig.cinematicZoomParallax = {
    id: 'cinematicZoomParallax',
    title: 'Zoom Parallax',
    icon: paintSVG,
    group: 'cinematic',
    view: ZoomParallaxView,
    edit: ZoomParallaxEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 9. Split Scroll
  config.blocks.blocksConfig.cinematicSplitScroll = {
    id: 'cinematicSplitScroll',
    title: 'Split Scroll',
    icon: paintSVG,
    group: 'cinematic',
    view: SplitScrollView,
    edit: SplitScrollEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 10. Curtain Reveal
  config.blocks.blocksConfig.cinematicCurtainReveal = {
    id: 'cinematicCurtainReveal',
    title: 'Curtain Reveal',
    icon: paintSVG,
    group: 'cinematic',
    view: CurtainRevealView,
    edit: CurtainRevealEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // 11. Slider Crazy Effects
  config.blocks.blocksConfig.cinematicSlider = {
    id: 'cinematicSlider',
    title: 'Slider Crazy Effects',
    icon: paintSVG, // Temporarily using paintSVG as per existing pattern
    group: 'cinematic',
    view: SliderCrazyEffectsView,
    edit: SliderCrazyEffectsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
  };

  // Apply volto-block-style wrapper to all cinematic blocks.
  // Because this addon loads AFTER @eeacms/volto-block-style,
  // the automatic wrapping pass has already finished — so we
  // wrap each block explicitly to get the Styles button (open-styles-button)
  // and DECORATIONS panel (background image/color, text color, etc.).
  CINEMATIC_BLOCKS.forEach((blockId) => {
    if (config.blocks.blocksConfig[blockId]) {
      config.blocks.blocksConfig[blockId] = applyStyleWrapperToBlock(
        config.blocks.blocksConfig[blockId],
      );
    }
  });

  return config;
};

export default applyConfig;
