<script>
  import get from 'lodash-es/get';
  import {globalStore} from './stores';
  import {styleObjectToString} from './util';

  const BORDER_WIDTH = 2;
  const PADDING = 4;
  const SUM = BORDER_WIDTH + PADDING;

  export let backgroundColor = '#DADADA';
  export let className = '';
  export let color = 'var(--osc-primary-color, cornflowerblue)';
  export let height = 50;
  export let labelColor = 'var(--osc-secondary-color, orange)';
  export let path;
  export let store = globalStore;
  export let width = 300;

  let fillPercent = 0;
  $: if (path) fillPercent = get($store, path);

  $: left = (width * fillPercent) / 100;

  $: topStyle = {
    '--border-width': BORDER_WIDTH + 'px',
    '--height': height + 'px',
    '--padding': PADDING + 'px',
    width: width + 'px'
  };

  $: outerStyle = {width: width + 'px'};

  $: barStyle = {backgroundColor, width: width + 'px'};

  $: labelStyle = {color: labelColor, left: left + SUM + 'px'};

  $: fillStyle = {
    backgroundColor: color,
    width: left + 'px'
  };

  const classes = 'thermometer' + (className ? ' ' + className : '');
</script>

<div class={classes} style={styleObjectToString(topStyle)}>
  <div class="outer" style={styleObjectToString(outerStyle)}>
    <div class="bar" style={styleObjectToString(barStyle)}>
      <div class="fill" style={styleObjectToString(fillStyle)} />
    </div>
  </div>
  <div class="label" style={styleObjectToString(labelStyle)}>
    <div class="arrow" />
    {fillPercent}%
  </div>
</div>

<style>
  .arrow {
    --size: 10px;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid black;
  }

  .bar {
    border-radius: calc(
      var(--border-radius) - var(--border-width) - var(--padding)
    );
    height: var(--height);
    overflow: hidden;
  }

  .fill {
    background-color: var(--osc-primary-color, cornflowerblue);
    height: var(--height);
  }

  .label {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-weight: bold;
    position: absolute;
    bottom: -var(--height) - var(--border-width) - var(--padding);
    transform: translate(-50%);
  }

  .outer {
    border: solid black var(--border-width);
    border-radius: var(--border-radius);
    padding: var(--padding);
  }

  .thermometer {
    /* --height, --border-width and --padding are set in JavaScript above */
    --border-radius: calc(
      var(--height) / 2 + var(--padding) + var(--border-width)
    );

    margin-left: 0.5rem;
    position: relative;
  }
</style>
