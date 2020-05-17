<script>
  import get from 'lodash/get';
  import {globalStore} from './stores';

  export let className = '';
  export let max = 100;
  export let size = 300;
  export let statePath;
  export let text = '';

  const STROKE_WIDTH = 40;
  const HALF_STROKE = STROKE_WIDTH / 2;

  const SWEEP = 0;
  const TEXT_HEIGHT_GUESS = 43;
  const TEXT_WIDTH_GUESS = 125;
  const X_AXIS_ROTATION = 0;

  const classes = 'dial' + (className ? ' ' + className : '');
  const halfSize = size / 2;
  const radius = halfSize - HALF_STROKE;
  const startDegrees = -80;
  const styles = `height: ${size}; width: ${size}`;

  $: value = get($globalStore, statePath) || 0;
  $: percent = (value / max) * 100;

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function getPath(percent) {
    const endDegrees = startDegrees + (340 * percent) / 100;
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

<div className={classes} style={styles}>
  <svg
    className="arc"
    viewBox={`0 0 ${size} ${size}`}
    width={size}
    height={size}>
    <path
      fill="none"
      stroke="var(--secondary-color)"
      stroke-width={STROKE_WIDTH}
      d={getPath(100)} />
    <path
      fill="none"
      stroke="var(--primary-color)"
      stroke-width={STROKE_WIDTH}
      d={getPath(percent)} />
    <text
      x={halfSize - TEXT_WIDTH_GUESS / 2}
      y={halfSize - TEXT_HEIGHT_GUESS / 2}>
      {text}
    </text>
    <text
      x={halfSize - TEXT_WIDTH_GUESS / 2}
      y={halfSize + TEXT_HEIGHT_GUESS / 2}>
      {value}
    </text>
  </svg>
</div>

<style>
  .dial {
    background-color: transparent;
    display: inline-block;
    margin: var(--dial-margin, 1.25rem);
    padding: 0 !important;
  }

  svg {
    color: var(--dial-svg-color, var(--white));
  }

  text {
    font-size: var(--dial-text-font-size, 2.25rem);
    font-weight: bold;
  }
</style>
