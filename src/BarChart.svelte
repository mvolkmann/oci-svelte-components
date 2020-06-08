<script>
  import * as d3 from 'd3';
  import {onMount} from 'svelte';

  export let className = ''; // to give parent components a handle on styling
  export let data; // array typically containing objects
  export let height; // of chart area
  export let horizontal = false; // true for horizontal bars; false for vertical
  export let labelAccessor; // function that computes a label from a data element
  export let maxValue; // maximum computed value of a data element
  export let padding = 20; // on all sides of SVG
  export let valueAccessor; // function that computes a value from a data element
  export let width; // of chart area

  // We could compute this based on the rendered height of the x-axis,
  // but it is needed before that is rendered.
  const BOTTOM_AXIS_HEIGHT = 30;
  const LABEL_WIDTH = 50;

  const usableHeight = height - padding * 2 - BOTTOM_AXIS_HEIGHT;
  const usableWidth = width - padding * 2 - LABEL_WIDTH;

  let container, labelAxis, labelAxisSelector, labelAxisTransform, labelScale;
  let majorPosition, majorSize, minorPosition, minorSize, svg, tooltip;
  let valueAxisMajor, valueAxisMinor, valueAxisTransform, valueScale;
  let usableMajor, usableMinor;

  let lastHorizontal = horizontal;

  $: classes =
    'bar-chart' +
    (className ? ' ' + className : '') +
    (horizontal ? ' horizontal' : ' vertical');

  $: {
    if (horizontal) {
      majorPosition = 'x';
      majorSize = 'width';
      minorPosition = 'y';
      minorSize = 'height';
    } else {
      majorPosition = 'y';
      majorSize = 'height';
      minorPosition = 'x';
      minorSize = 'width';
    }

    usableMajor = horizontal ? usableWidth : usableHeight;
    usableMinor = horizontal ? usableHeight : usableWidth;

    valueScale = d3.scaleLinear().domain([0, maxValue]).range([0, usableMajor]);

    const valueAxisMethodName = horizontal ? 'axisBottom' : 'axisLeft';
    const labelAxisMethodName = horizontal ? 'axisLeft' : 'axisBottom';

    const valueAxisScale = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range(horizontal ? [0, usableMajor] : [usableMajor, 0]);
    valueAxisMinor = d3[valueAxisMethodName](valueAxisScale)
      .ticks(maxValue) // show a tick at every 1
      .tickFormat('') // hides labels
      .tickSize(5); // length of each tick (default is 6)
    valueAxisMajor = d3[valueAxisMethodName](valueAxisScale)
      .ticks(maxValue / 10) // show a tick at every multiple of 10
      .tickPadding(10) // space between end of tick and label; default is 3
      .tickSize(10); // length of each tick (default is 6)
    const valueAxisTranslateX = padding + LABEL_WIDTH;
    const valueAxisTranslateY = horizontal ? padding + usableMinor : padding;
    valueAxisTransform = `translate(${valueAxisTranslateX}, ${valueAxisTranslateY})`;

    labelScale = d3
      .scaleBand()
      .rangeRound([0, usableMinor])
      .padding(0.1) // 10% spread between all the bars
      .domain(data.map(labelAccessor))
      .range([0, usableMinor]);
    labelAxis = d3[labelAxisMethodName](labelScale);
    const labelAxisTranslateX = padding + LABEL_WIDTH;
    const labelAxisTranslateY = horizontal ? padding : padding + usableMajor;
    labelAxisTransform = `translate(${labelAxisTranslateX}, ${labelAxisTranslateY})`;

    if (svg) {
      renderChart(data);

      // If the chart direction has changed, recreate the axes.
      if (horizontal !== lastHorizontal) {
        svg.selectAll('.axis').remove();
        addAxes();
        lastHorizontal = horizontal;
      }
    }
  }

  onMount(() => {
    // Create a D3 selection from a DOM element.
    const containerSelection = d3.select(container);

    svg = containerSelection.select('svg');
    tooltip = containerSelection.select('.tooltip');

    addAxes();
  });

  function addAxes() {
    // Add the value axis with minor tick marks.
    if (usableMajor > 150)
      // otherwise not enough room for minor ticks
      svg
        .append('g')
        .call(valueAxisMinor)
        .attr('class', 'axis value-axis-minor')
        .attr('transform', valueAxisTransform);

    // Add the value axis with major tick marks.
    svg
      .append('g')
      .call(valueAxisMajor)
      .attr('class', 'axis value-axis-major')
      .attr('transform', valueAxisTransform);

    // Add the label axis with label values.
    labelAxisSelector = svg
      .append('g')
      .call(labelAxis)
      .attr('class', 'axis label-axis')
      .attr('transform', labelAxisTransform);
  }

  const getScaledLabel = data => labelScale(labelAccessor(data));

  const getScaledValue = data => valueScale(valueAccessor(data));

  function getTextMajorPosition(data) {
    return horizontal
      ? padding + LABEL_WIDTH + getScaledValue(data) - 3
      : padding + usableMajor - getScaledValue(data) + 15;
  }

  //TODO: Is it correct that this function just
  //TODO: returns the opposite values of getTextX?
  function getTextMinorPosition(data) {
    return horizontal
      ? padding + getScaledLabel(data) + 2 + labelScale.bandwidth() / 2
      : padding +
          LABEL_WIDTH +
          getScaledLabel(data) +
          labelScale.bandwidth() / 2;
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
    console.log('BarChart.svelte renderChart: entered');

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
        },
        exit => exit.remove()
      );
  }

  function updateLabelAxis(data) {
    labelScale.domain(data.map(labelAccessor));
    labelAxisSelector.call(labelAxis);
  }

  function updateRect(rect) {
    rect
      .attr(majorSize, getScaledValue)
      .attr(minorSize, labelScale.bandwidth())
      .attr(majorPosition, data =>
        horizontal
          ? padding + LABEL_WIDTH
          : padding + usableHeight - getScaledValue(data)
      )
      .attr(
        minorPosition,
        data => padding + (horizontal ? 0 : LABEL_WIDTH) + getScaledLabel(data)
      );
  }

  function updateText(text) {
    const minSize = horizontal ? 5 : 20;
    text
      // Hide the text with CSS if it won't fit on the bar.
      .classed('hide', data => valueAccessor(data) < minSize)
      .text(valueAccessor)
      .attr(majorPosition, getTextMajorPosition)
      .attr(minorPosition, getTextMinorPosition);
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
  }

  .bar-chart :global(.hide) {
    display: none;
  }

  .bar-chart :global(.label-axis .domain) {
    display: none;
  }

  .bar-chart :global(svg) {
    background-color: linen;
  }

  .bar-chart :global(.value-axis-major > .tick > line) {
    stroke-width: 2;
  }

  .bar-chart :global(.value-axis-minor) {
    color: orange;
  }

  .horizontal :global(.bar text) {
    text-anchor: end;
  }

  .vertical :global(.bar text) {
    text-anchor: middle;
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
