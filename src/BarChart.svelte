<script>
  import * as d3 from 'd3';
  import {onMount} from 'svelte';

  export let className = '';
  export let data;
  export let height;
  //export let horizontal = false;
  export let labelAccessor;
  export let leftPadding = 70;
  export let maxValue;
  export let padding = 20;
  export let valueAccessor;
  export let width;

  const X_AXIS_HEIGHT = 30;
  const usableHeight = height - padding * 2 - X_AXIS_HEIGHT;
  const usableWidth = width - leftPadding - padding;

  let container, svg, tooltip;

  $: classes = 'bar-chart' + (className ? ' ' + className : '');

  // Re-render the chart any time data changes.
  $: if (svg && data) renderChart(data);

  // This is passed as a prop now.
  //const maxValue = d3.max(data, valueAccessor);

  // Create a linear scale that maps values from zero to the maximum score
  // to values from zero to the usable width of the SVG.
  const valueScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, usableWidth]);

  const valueAxisScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, usableWidth]);
  const valueAxisMinor = d3
    .axisBottom(valueAxisScale)
    .ticks(maxValue) // show a tick at every 1
    .tickFormat('') // hides labels
    .tickSize(5); // length of each tick (default is 6)
  const valueAxisMajor = d3
    .axisBottom(valueAxisScale)
    .ticks(maxValue / 10) // show a tick at every multiple of 10
    // highStore is guaranteed to be a multiple of 10.
    .tickPadding(10) // space between end of tick and label; default is 3
    .tickSize(10);
  const valueAxisTransform = `translate(${leftPadding}, ${
    padding + usableHeight
  })`;

  const labelScale = d3
    .scaleBand()
    .rangeRound([0, usableHeight])
    .padding(0.1) // 10% spread between all the bars
    .domain(data.map(labelAccessor))
    .range([0, usableHeight]);
  const labelAxis = d3.axisLeft(labelScale);
  const labelAxisTransform = `translate(${leftPadding}, ${padding})`;
  let labelAxisSelector;

  onMount(() => {
    // Create a D3 selection from a DOM element.
    const containerSelection = d3.select(container);

    svg = containerSelection.select('svg');
    tooltip = containerSelection.select('.tooltip');

    // Add the value axis with minor tick marks.
    svg
      .append('g')
      .call(valueAxisMinor)
      .attr('class', 'minor-x-axis')
      .attr('transform', valueAxisTransform);

    // Add the value axis with major tick marks.
    svg
      .append('g')
      .call(valueAxisMajor)
      .attr('class', 'major-x-axis')
      .attr('transform', valueAxisTransform);

    // Add the label axis with label values.
    labelAxisSelector = svg
      .append('g')
      .call(labelAxis)
      .attr('class', 'y-axis')
      .attr('transform', labelAxisTransform);
  });

  function getTextY(data) {
    const barHeight = labelScale.bandwidth();
    return padding + labelScale(labelAccessor(data)) + 2 + barHeight / 2;
  }

  function mouseMove(data) {
    // Configure the tooltip.
    tooltip
      .text(valueAccessor(data))
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px');
    tooltip.style('opacity', 1); // shows tooltip
    d3.select(this).style('opacity', 0.5); // fades bar
  }

  function mouseOut() {
    tooltip.style('opacity', 0); // hides tooltip
    d3.select(this).style('opacity', 1); // restores bar opacity
  }

  function renderChart(data) {
    updateLabelAxis(data);

    svg
      .selectAll('.bar')
      .data(data)
      .join(
        enter => {
          // Create an SVG group for each data value.
          const bar = enter.append('g');
          bar.attr('class', 'bar');

          // Append an SVG rect element to the group.
          const rect = bar
            .append('rect')
            .attr('x', leftPadding)
            .on('mousemove', mouseMove)
            .on('mouseout', mouseOut);
          updateRect(rect);

          // Append an SVG text element to the group.
          const text = bar.append('text').attr('alignment-baseline', 'middle');
          updateText(text);
        },
        update => {
          updateRect(update.select('rect'));
          updateText(update.select('text'));
          return update; // must return this
        },
        exit => {
          exit.remove();
        }
      )
      .attr('class', 'bar');
  }

  function updateLabelAxis(data) {
    labelScale.domain(data.map(labelAccessor));
    labelAxisSelector.call(labelAxis);
  }

  function updateRect(rect) {
    rect
      .attr('height', labelScale.bandwidth())
      .attr('width', data => valueScale(valueAccessor(data)))
      .attr('y', data => padding + labelScale(labelAccessor(data)));
  }

  function updateText(text) {
    text
      .classed('hide', data => valueAccessor(data) <= 5)
      .text(data => valueAccessor(data))
      .attr('x', data => leftPadding + valueScale(valueAccessor(data)) - 3)
      .attr('y', getTextY);
  }
</script>

<div bind:this={container} class={classes}>
  <svg {width} {height} />
  <div class="tooltip" />
</div>

<style>
  .bar-chart :global(.bar rect) {
    fill: cornflowerblue;
  }

  .bar-chart :global(.bar text) {
    fill: white;
    pointer-events: none;
    text-anchor: end;
  }

  .bar-chart :global(.hide) {
    display: none;
  }

  .bar-chart :global(.major-x-axis > .tick > line) {
    stroke-width: 2;
  }

  .bar-chart :global(.minor-x-axis) {
    color: orange;
  }

  .bar-chart :global(svg) {
    background-color: linen;
  }

  .bar-chart :global(.y-axis .domain) {
    display: none;
  }

  .tooltip {
    position: absolute;
    background: orange;
    border: none;
    border-radius: 5px;
    color: white;
    opacity: 0; /* initially hidden */
    padding: 0.5rem;
    pointer-events: none;
  }
</style>
