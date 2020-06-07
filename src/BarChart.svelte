<script>
  import * as d3 from 'd3';
  import {onMount} from 'svelte';

  export let className = '';
  export let data;
  export let height;
  //export let horizontal = false;
  export let id;
  export let labelAccessor;
  export let maxValue;
  export let valueAccessor;
  export let width;

  const LEFT_PADDING = 70;
  const PADDING = 20;
  const TEXT_HEIGHT = 15;
  const X_AXIS_HEIGHT = 30;

  const usableHeight = height - PADDING * 2 - X_AXIS_HEIGHT;
  const usableWidth = width - LEFT_PADDING - PADDING;

  $: classes = 'bar-chart' + (className ? ' ' + className : '');

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
  const valueAxisTransform = `translate(${LEFT_PADDING}, ${
    PADDING + usableHeight
  })`;

  const labelScale = d3
    .scaleBand()
    .rangeRound([0, usableHeight])
    .padding(0.1) // 10% spread between all the bars
    .domain(data.map(labelAccessor))
    .range([0, usableHeight]);
  const labelAxis = d3.axisLeft(labelScale);
  const barSize = labelScale.bandwidth();
  const labelAxisTransform = `translate(${LEFT_PADDING}, ${PADDING})`;

  let container, svg, tooltip;

  onMount(() => {
    container = d3.select('#' + id);
    svg = container.select('svg');
    tooltip = container.select('.tooltip');
  });

  // Re-render the chart any time data changes.
  $: if (svg && data) renderChart(data);

  function renderChart(data) {
    console.log('BarChart.svelte renderChart: data =', data);

    // Create a selection containing one SVG group for each data value.
    const barGroups = svg
      .selectAll('.bar')
      .data(data, data => labelAccessor(data) + valueAccessor(data))
      .enter()
      .append('g');

    // Create a rect in each SVG group.
    barGroups
      .attr('class', 'bar')
      .append('rect')
      .attr('height', barSize)
      .attr('width', data => {
        //TODO: This code is not executed again when data changes!
        const value = valueAccessor(data);
        console.log('BarChart.svelte x: value =', value);
        const width = valueScale(value);
        console.log('BarChart.svelte x: width =', width);
        return width;
      })
      .attr('x', LEFT_PADDING)
      .attr('y', data => PADDING + labelScale(labelAccessor(data)))
      //.attr('height', labelScale.bandwidth())
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

    // Create text for each SVG group.
    barGroups
      .append('text')
      .text(data => valueAccessor(data))
      .attr('x', data => LEFT_PADDING + valueScale(valueAccessor(data)) - 24) // at end of bar
      .attr(
        'y',
        data => PADDING + labelScale(labelAccessor(data)) + TEXT_HEIGHT
      );

    //TODO: Why does adding this remove all the bars?
    barGroups.exit().remove();

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
    svg
      .append('g')
      .call(labelAxis)
      .attr('class', 'y-axis')
      .attr('transform', labelAxisTransform);
  }
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
