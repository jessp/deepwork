/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import linkFix from './utils/link-fix';
import modalSetup from './utils/modal-a11y';
import graphic from './graphic';
import footer from './footer';
import {ThoughtLeadership} from './thought-leadership-demo';
import {PhotoSlider} from './photo-slider';
import {StudioB} from './studio-b';
import {StudioA} from './studio-a';
import {Resume} from './resume';

const $body = d3.select('body');
let previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
  }
}

function setupStickyHeader() {
  const $header = $body.select('header');
  if ($header.classed('is-sticky')) {
    const $menu = $body.select('#slide__menu');
    const $toggle = $body.select('.header__toggle');

    modalSetup($toggle, $toggle, $header, $menu, 'a, button, .logo', true);
  }
}

function init() {
  // adds rel="noopener" to all target="_blank" links
  linkFix();
  // add mobile class to body tag
  $body.classed('is-mobile', isMobile.any());
  // setup resize event
  window.addEventListener('resize', debounce(resize, 150));
  // setup sticky header menu
  // setupStickyHeader();
  // kick off graphic code
  graphic.init();
  // load footer stories
  footer.init();

  new ThoughtLeadership("#influencerA", "#influencerB", "15828408", "1636590253", "#thought-leadership .demo-body");
  const photoA = new PhotoSlider("#studioA", 5, 9, null);
  const studA = new StudioA("#studio-a-container", photoA);

  const studB = new StudioB("#studio-b-container", "#pic-mix", 5, 9, 0, 8);
  new PhotoSlider("#studioB1", 0, 9, (e) => studB.updateVar(true, e));
  new PhotoSlider("#studioB2", 8, 9, (e) => studB.updateVar(false, e));

  new Resume("#resume", "intermediate");

  //TODO PLACEHOLDER
  d3.select("#B")
    .on("click", d => d3.selectAll(".photo-studio-holder .photo-studio-container")
        .style("top", "-100%"))

  d3.select("#A")
    .on("click", d => d3.selectAll(".photo-studio-holder .photo-studio-container")
        .style("top", "0px"))
}

init();