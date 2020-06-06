<script>
  import * as d3 from 'd3';
  import {onMount} from 'svelte';

  export let className = '';
  export let data;
  export let height;
  //export let horizontal = false;
  export let id;
  export let labelAccessor;
  export let valueAccessor;
  export let width;

  $: classes = 'bar-chart' + (className ? ' ' + className : '');

  const BAR_HEIGHT = 20;
  const BAR_MARGIN = 4; // vertical spacing between
  const LEFT_PADDING = 70;
  const PADDING = 20;
  const SVG_WIDTH = 400;

  const barTotal = BAR_HEIGHT + BAR_MARGIN;
  const usableHeight = data.length * barTotal;
  const usableWidth = SVG_WIDTH - LEFT_PADDING - PADDING;

  const maxValue = d3.max(data, valueAccessor);

  // Create a linear scale that maps values from zero to the maximum score
  // to values from zero to the width of the SVG.
  const widthScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, usableWidth]);

  const xAxisScale = d3
    .scaleLinear()
    .domain([0, maxValue])
    .range([0, usableWidth]);
  const xAxisMinor = d3
    .axisBottom(xAxisScale)
    .ticks(maxValue) // show a tick at every 1
    .tickFormat('') // hides labels
    .tickSize(5); // length of each tick (default is 6)
  const xAxisMajor = d3
    .axisBottom(xAxisScale)
    .ticks(maxValue / 10) // show a tick at every multiple of 10
    // highStore is guaranteed to be a multiple of 10.
    .tickPadding(10) // space between end of tick and label; default is 3
    .tickSize(10);
  //.tickSize(-usableHeight); // to draw across chart
  const xAxisTransform = `translate(${LEFT_PADDING}, ${
    PADDING + data.length * barTotal
  })`;

  // Generate tick values that will place the ticks
  // at the vertical center of each of the bars.
  const yTickValues = data.map((_, i) => i + 0.5);

  const yAxisScale = d3
    .scaleLinear()
    .domain([data.length, 0]) // reversed order
    .range([usableHeight, 0]); // top to bottom
  const yAxis = d3
    .axisLeft(yAxisScale)
    .ticks(data.length)
    .tickFormat((_, i) => {
      const datum = data[i];
      return datum ? labelAccessor(datum) : '';
    })
    .tickValues(yTickValues);

  onMount(() => {
    // Create an SVG element.
    const container = d3.select('#' + id);
    console.log('BarChart.svelte x: container =', container);
    const svg = container.select('svg');
    console.log('BarChart.svelte x: svg =', svg);
    const tooltip = container.select('.tooltip');

    // Create a selection containing one SVG group for each data value
    // that are translated in the y-direction so they are visually separated.
    const barGroups = svg
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr(
        'transform',
        (_, i) => `translate(${LEFT_PADDING}, ${PADDING + i * barTotal})`
      );

    // Create a rect for each data value.
    barGroups
      .append('rect')
      .attr('width', data => widthScale(valueAccessor(data)))
      .attr('height', BAR_HEIGHT)
      // Cannot use an arrow function because we need the value of "this".
      .on('mousemove', function (data) {
        // Configure the tooltip.
        tooltip
          .text(valueAccessor(data))
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY + 'px');
        // Show the tooltip.
        tooltip.style('opacity', 1);
        // Fade the bar.
        d3.select(this).style('opacity', 0.5);
      })
      // Cannot use an arrow function because we need the value of "this".
      .on('mouseout', function () {
        // Hide the tooltip.
        tooltip.style('opacity', 0);
        // Restore the bar opacity.
        d3.select(this).style('opacity', 1);
      });

    // Create text for each data value.
    barGroups
      .append('text')
      .text(data => valueAccessor(data))
      .attr('x', data => widthScale(valueAccessor(data)) - 24) // at end of bar
      .attr('y', barTotal / 2 + 3); // centered vertically

    svg
      .append('g')
      .call(xAxisMinor)
      .attr('class', 'minor-x-axis')
      .attr('transform', xAxisTransform);
    svg
      .append('g')
      .call(xAxisMajor)
      .attr('class', 'major-x-axis')
      .attr('transform', xAxisTransform);

    svg
      .append('g')
      .call(yAxis)
      .attr('class', 'y-axis')
      .attr(
        'transform',
        `translate(${LEFT_PADDING}, ${PADDING - BAR_MARGIN / 2})`
      );
  });
</script>

<div class={classes} {id}>
  <svg {width} {height} />
  <div class="tooltip" />
</div>

<style>
  .bar-chart :global(.bar text) {
    fill: white;
    pointer-events: none;
  }

  .bar-chart :global(.major-x-axis > .tick > line) {
    stroke-width: 2;
  }

  .bar-chart :global(.minor-x-axis) {
    color: orange;
  }

  .bar-chart :global(rect) {
    fill: cornflowerblue;
  }

  .bar-chart :global(svg) {
    background-color: linen;
  }

  .tooltip {
    position: absolute;
    background: pink;
    border: solid gray 1px;
    border-radius: 5px;
    opacity: 0; /* initially hidden */
    padding: 0.5rem;
    pointer-events: none;
  }

  .bar-chart :global(.y-axis .domain) {
    display: none;
  }
</style>
