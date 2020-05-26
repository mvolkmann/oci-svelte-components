<script>
  import get from 'lodash-es/get';
  import {globalStore} from './stores';

  export let className = '';
  export let gap = 20;
  export let label = '';
  export let max = 100;
  export let path = undefined;
  export let size = 300;
  export let store = globalStore;
  export let strokeWidth = 40;
  export let value = undefined;

  const SWEEP = 1;
  const X_AXIS_ROTATION = 0;
  const classes = 'osc-dial' + (className ? ' ' + className : '');

  $: styles = `height: ${size}px; width: ${size}px`;
  $: if (path) value = get($store, path) || 0;

  let filledPath = '';
  let fullPath = '';

  // Compute new arc paths if the gap or size changes.
  $: if (gap || size) {
    fullPath = getPath(100);
    filledPath = getPath((value / max) * 100, true);
  }

  let ref;
  $: if (ref) {
    ref.style.height = size + 'px';
    ref.style.width = size + 'px';
  }

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function getPath(percent, log) {
    if (log) console.log('Dial.svelte getPath: percent =', percent);
    const startDegrees = 270 - gap / 2;
    const endDegrees = startDegrees - ((360 - gap) * percent) / 100;
    const startAngle = degreesToRadians(startDegrees);
    const endAngle = degreesToRadians(endDegrees);

    const halfSize = size / 2;
    const halfStroke = strokeWidth / 2;
    const radius = halfSize - halfStroke;
    const startX = halfSize + radius * Math.cos(startAngle);
    const startY = halfSize - radius * Math.sin(startAngle);
    const endX = halfSize + radius * Math.cos(endAngle);
    const endY = halfSize - radius * Math.sin(endAngle);
    const largeArc = percent > 52 ? 1 : 0;

    const move = `M ${startX} ${startY}`;
    const arc = `A ${radius} ${radius} ${X_AXIS_ROTATION} ${largeArc} ${SWEEP} ${endX} ${endY}`;
    return move + ' ' + arc;
  }
</script>

<div bind:this={ref} class={classes} style={styles}>
  <svg
    className="arc"
    viewBox={`0 0 ${size} ${size}`}
    width={size + 'px'}
    height={size + 'px'}>
    <path
      fill="none"
      stroke="var(--osc-secondary-color, orange)"
      stroke-width={strokeWidth}
      d={fullPath} />
    <path
      fill="none"
      stroke="var(--osc-primary-color, cornflowerblue)"
      stroke-width={strokeWidth}
      d={filledPath} />
  </svg>
  <div class="label">{label}</div>
  <div class="value">{value}</div>
</div>

<style>
  .osc-dial {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    margin: var(--osc-dial-margin, 1.25rem) 0;
    padding: 0 !important;
    position: relative;
  }

  svg {
    position: absolute;
    color: var(--osc-dial-svg-color, white);
  }

  .label {
    font-size: var(--osc-dial-label-font-size, 2.25rem);
    font-weight: bold;
  }

  .value {
    font-size: var(--osc-dial-value-font-size, 1.5rem);
  }
</style>
