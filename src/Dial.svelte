<script>
  import get from 'lodash-es/get';
  import {globalStore} from './stores';

  export let className = '';
  export let label = '';
  export let max = 100;
  export let path = undefined;
  export let size = 300;
  export let store = undefined;

  const STROKE_WIDTH = 40;
  const HALF_STROKE = STROKE_WIDTH / 2;

  const GAP = 20;
  const SWEEP = 1;
  const X_AXIS_ROTATION = 0;

  const classes = 'osc-dial' + (className ? ' ' + className : '');
  const halfSize = size / 2;
  const radius = halfSize - HALF_STROKE;
  const startDegrees = 270 - GAP / 2;
  const styles = `height: ${size}; width: ${size}`;

  let ref;

  if (path && !store) store = globalStore;
  $: value = get($store, path) || 0;

  $: percent = (value / max) * 100;
  $: if (ref) {
    ref.style.height = size + 'px';
    ref.style.width = size + 'px';
  }

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function getPath(percent) {
    const endDegrees = startDegrees - ((360 - GAP) * percent) / 100;
    const startAngle = degreesToRadians(startDegrees);
    const endAngle = degreesToRadians(endDegrees);

    const startX = halfSize + radius * Math.cos(startAngle);
    const startY = halfSize - radius * Math.sin(startAngle);
    const endX = halfSize + radius * Math.cos(endAngle);
    const endY = halfSize - radius * Math.sin(endAngle);
    const largeArc = percent > 52 ? 1 : 0;

    const move = `M ${startX} ${startY}`;
    const arc = `A ${radius} ${radius} ${X_AXIS_ROTATION} ${largeArc} ${SWEEP} ${endX} ${endY}`;
    const path = move + ' ' + arc;
    return path;
  }
</script>

<div bind:this={ref} class={classes} style={styles}>
  <svg
    className="arc"
    viewBox={`0 0 ${size} ${size}`}
    width={size}
    height={size}>
    <path
      fill="none"
      stroke="var(--osc-secondary-color)"
      stroke-width={STROKE_WIDTH}
      d={getPath(100)} />
    <path
      fill="none"
      stroke="var(--osc-primary-color)"
      stroke-width={STROKE_WIDTH}
      d={getPath(percent)} />
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
    color: var(--osc-dial-svg-color, var(--white));
  }

  .label {
    font-size: var(--osc-dial-label-font-size, 2.25rem);
    font-weight: bold;
  }

  .value {
    font-size: var(--osc-dial-value-font-size, 1.5rem);
  }
</style>
