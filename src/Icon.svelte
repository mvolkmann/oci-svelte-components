<script>
  /*
    Example usage:

    <script>
      import * as solid from '@fortawesome/free-solid-svg-icons';
      import * as brands from '@fortawesome/free-brands-svg-icons';
      import Icon from './Icon.svelte';
    </script>

    <Icon className="icon" icon={solid.faHeart} />
    <Icon className="icon" icon={brands.faJs} />

    <style>
      :global(.icon) {
        color: green;
        font-size: 5rem;
      }
    </style>
  */

  import Icon from 'fa-svelte';

  // See list of supported icons at
  // https://github.com/FortAwesome/Font-Awesome/blob/master/js-packages/%40fortawesome/fontawesome-common-types/index.d.ts.
  // Examples of importing icons are below.
  // Do this in components that wish to render an icon.

  /*
  import {
    faAngleDown,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faChevronCircleDown,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronCircleUp,
    faCloudDownloadAlt,
    faCoffee,
    faCaretDown,
    faCaretUp,
    faEnvelope,
    faFilter,
    faHeart,
    faInfoCircle,
    faMobileAlt,
    faSort,
    faSortAlphaDown,
    faSortAlphaDownAlt,
    faSortAmountDown,
    faSortAmountDownAlt,
    faSortNumericDown,
    faSortNumericDownAlt
  } from '@fortawesome/free-solid-svg-icons';

  // This includes hollow variants of the solid icons above.
  import {
    faHeart as farHeart,
    faEdit as farEdit
  } from '@fortawesome/free-regular-svg-icons';

  // This are brand icons like faAmazon, faAndroid, faApplePay, faAws,
  // faBluetooth, faCcDiscover, faCcDiscover, faCcMastercard,
  // faCcPaypal, faCcVisa, faChrome, faCss3, faDocker, faDropbox,
  // faEbay, faEdge, faEthereum, faFacebook, faFirefox, faGithub, faGitlab,
  // faGoogle, faHtml5, faInstagram, faJava, faJs, faJsSquare,
  // faLinkedIn, faMarkdown, faMicrosoft, faNode, faNodeJs, faNpm,
  // faPaypal, faPython, faReact, faSafari, faSass, faSpotify, faTwitter,
  // faUbuntu, faVuejs, faYoutube
  import {fab} from '@fortawesome/free-brands-svg-icons';
  */

  // The specified CSS class can specify color and font-size.
  export let className = undefined;

  // This is an icon imported from a @fortawesome package.
  export let icon;

  const classes = 'osc-icon' + (className ? ' ' + className : '');
</script>

<Icon {icon} class={classes} />

<style>
  .osc-icon svg {
    color: var(--osc-primary-color, black);
  }
</style>
