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
import {VideoPlayer} from './video';
import {MenuLinker} from './menu';
import {Toggler} from './toggler';

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

  d3.select(".nav-button").on("click", () => {
    let mainInfo = d3.select(".main");
    let aboutInfo = d3.select(".about");
    let isMainClosed = mainInfo.classed("closed");

    mainInfo.classed("closed", !isMainClosed);
    aboutInfo.classed("closed", isMainClosed);
    d3.select(".nav-button p").html(`${isMainClosed ? "about us" : "our offerings"}`)

  });

  d3.selectAll(".banner-click").on("click", () => {
    let mainInfo = d3.select(".main");
    let aboutInfo = d3.select(".about");

    mainInfo.classed("closed", false);
    aboutInfo.classed("closed", true);
    d3.select(".nav-button p").html("about us");
  })

  

  const thoughtLeader = new ThoughtLeadership("#influencerA", "#influencerB", "15828408", "1636590253", "#thought-leadership .demo-body");
  const photoA = new PhotoSlider("#studioA", 6, 9, null);
  const studA = new StudioA("#studio-a-container", photoA);

  const vid = new VideoPlayer("#video-call");
  const studB = new StudioB("#studio-b-container", "#pic-mix", 5, 9, 2, 8, (a, b, c) => vid.changeVid(a, b, c), (a, b, c) => thoughtLeader.changePic(a, b, c));
  new PhotoSlider("#studioB1", 2, 9, (e) => studB.updateVar(true, e));
  new PhotoSlider("#studioB2", 8, 9, (e) => studB.updateVar(false, e));

  new Resume("#resume", "intermediate");

  new MenuLinker(".menu-item-wrapper", ".main-link");

  new Toggler("beauty-ai", "more", "less");
  new Toggler("pic-info", "Show", "Hide");


}

init();