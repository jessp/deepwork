/* global d3 */
import debounce from 'lodash.debounce';
import isMobile from './utils/is-mobile';
import linkFix from './utils/link-fix';
import modalSetup from './utils/modal-a11y';
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
  // setup resize event -- not used
  // window.addEventListener('resize', debounce(resize, 150));
  // setup sticky header menu
  // setupStickyHeader();
  // load footer stories
  footer.init();

  
  //note that order here is important due to the use of callbacks

  const thoughtLeader = new ThoughtLeadership("#influencerA", "#influencerB", "15828408", "1636590253", "#thought-leadership .demo-body .content");

  const photoA = new PhotoSlider("#studioA", 6, 9, null);

  const studASliders = [
    {att: "gender", min: 0, max: 6, start: 3, minLabel: "More Masculine", maxLabel: "More Feminine"},
    {att: "age", min: 0, max: 6, start: 3, minLabel: "Younger", maxLabel: "Older"},
    {att: "beauty", min: 0, max: 6, start: 0, minLabel: "Basic", maxLabel: "Yassified"}
  ];

  const studA = new StudioA("#studio-a-container", photoA, studASliders);

  const vid = new VideoPlayer("#video-call");

  const studBSlider = {id: "pic-mix", min: 0, max: 9, start: 5, minLabel: "Photo A", maxLabel: "Photo B"}
  const studB = new StudioB("#studio-b-container", studBSlider, 2, 8, (a, b, c) => vid.changeVid(a, b, c), (a, b, c) => thoughtLeader.changePic(a, b, c));
  new PhotoSlider("#studioB1", 2, 9, (e) => studB.updateVar(true, e));
  new PhotoSlider("#studioB2", 8, 9, (e) => studB.updateVar(false, e));

  new Resume("#resume", "intermediate");

  new MenuLinker(".menu-item-wrapper", ".main-link");

  new Toggler("beauty-ai", "more", "less");
  new Toggler("pic-info", "Show", "Hide");


}

init();