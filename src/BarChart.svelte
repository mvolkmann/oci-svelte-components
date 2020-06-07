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

  const TEXT_HEIGHT = 15;
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

  function mouseMove(data) {
    // Configure the tooltip.
    tooltip
      .text(valueAccessor(data))
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px');
    // Show the tooltip.
    tooltip.style('opacity', 1);
    // Fade the bar.
    d3.select(this).style('opacity', 0.5);
  }

  function mouseOut() {
    // Hide the tooltip.
    tooltip.style('opacity', 0);
    // Restore the bar opacity.
    d3.select(this).style('opacity', 1);
  }

  function renderChart(data) {
    updateLabelAxis(data);

    // Create a selection containing one SVG group for each data value.
    const barGroups = svg
      .selectAll('.bar')
      //TODO: Do you need to pass a key function to data?
      .data(data, data => labelAccessor(data))
      .join(
        enter => {
          const bar = enter.append('g');
          bar.attr('class', 'bar');

          const rect = bar
            .append('rect')
            .attr('x', leftPadding)
            .on('mousemove', mouseMove)
            .on('mouseout', mouseOut);
          updateRect(rect);

          bar
            .append('text')
            .text(data => valueAccessor(data))
            .classed('hide', data => valueAccessor(data) <= 5)
            .attr(
              'x',
              data => leftPadding + valueScale(valueAccessor(data)) - 3
            ) // at end of bar
            .attr(
              'y',
              data => padding + labelScale(labelAccessor(data)) + TEXT_HEIGHT
            );

          return bar;
        },
        update => {
          updateRect(update.select('rect'));

          update
            .select('text')
            .classed('hide', data => valueAccessor(data) <= 5)
            .text(data => valueAccessor(data))
            .attr(
              'x',
              data => leftPadding + valueScale(valueAccessor(data)) - 3
            ) // at end of bar
            .attr(
              'y',
              data => padding + labelScale(labelAccessor(data)) + TEXT_HEIGHT
            );

          return update;
        },
        exit => {
          return exit.remove();
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
