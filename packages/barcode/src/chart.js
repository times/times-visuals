import * as selection from "d3-selection";
import * as scale from "d3-scale";
import * as array from "d3-array";
import * as jetpack from "d3-jetpack";
import * as annotation from "d3-svg-annotation";
import * as axis from "d3-axis";
import * as format from "d3-format";

const d3 = {
  ...selection,
  ...scale,
  ...array,
  ...jetpack,
  ...annotation,
  ...axis,
  ...format
};

const convertNumber = numberString => {
  const number = parseInt(numberString);

  if (!number) return "£0";

  if (number > 1000) return `£${(number / 1000).toFixed(0)}bn`;

  return `£${number}m`;
};

const checkAlignment = numberString => {
  const number = parseInt(numberString);
  const defaultTransform = "-12px";

  switch (true) {
    case number < 25:
      return "-1px";
    case number > 200:
      return "-79px";
    default:
      return defaultTransform;
  }
};

export const drawChart = (
  node,
  data,
  valueField,
  { barColor = { r: 0, g: 0, b: 0 } } = {}
) => {
  if (!node) return;

  const elementBoundingBox = node.getBoundingClientRect();

  const config = {
    width: elementBoundingBox.width,
    height: 50,
    barWidth: 2,
    margin: {
      left: 10,
      right: 10
    },
    get usableWidth() {
      return this.width - this.margin.left - this.margin.right;
    },
    barColor: `rgb(${barColor.r}, ${barColor.g}, ${barColor.b})`,
    maxRange: d3.max(data, d => d[valueField]),
    title: convertNumber(data[valueField])
  };

  //Scale
  const chartScale = d3
    .scaleLinear()
    .domain([0, config.maxRange])
    .range([0, config.usableWidth]);

  //SVG
  const svg = d3.select(node).at({
    width: config.usableWidth,
    height: config.height
  });

  //Setup xAxis
  const xAxis = d3
    .axisBottom(chartScale)
    .tickValues([0, config.maxRange])
    .tickFormat(d => convertNumber(d));

  svg
    .append("g")
    .at({
      class: "xAxis",
      transform: `translate(${config.margin.left}, 75)`
    })
    .call(xAxis);

  //Little hack to ensure axis displays inside the line
  d3.selectAll(".xAxis text").st({
    "text-anchor": (d, i) => {
      return i % 2 ? "end" : "start";
    }
  });

  //Annotations
  const annotations = [
    {
      type: annotation.annotationLabel,
      note: {
        title: config.title,
        label: "",
        wrap: 300
      },
      x: chartScale(data[valueField]) + 0.5,
      y: config.height,
      dy: -55,
      dx: 0
    }
  ];

  const makeAnnotation = annotation
    .annotation()
    .type(annotation.annotationLabel)
    .annotations(annotations);

  //Barcodes
  const barcodeGroup = svg
    .append("g")
    .at({
      transform: `translate(${config.margin.left}, ${config.height / 2})`
    })
    .call(makeAnnotation);

  // Change how label shows depending on where it is on the barcode, so it doesn't hang off either end
  d3.selectAll(".annotation-note-content").st({
    transform: `translate(${checkAlignment(
      chartScale(data[valueField])
    )},-30px)`
  });

  d3.selectAll(".annotation-note-title").st({
    transform: "translate(2px,4px)"
  });

  barcodeGroup
    .append("rect")
    .at({
      width: config.usableWidth,
      height: config.height
    })
    .st({
      fill: "#eee"
    });

  barcodeGroup
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .at({
      width: config.barWidth,
      height: config.height,
      x: d => {
        return Math.floor(chartScale(d[valueField]));
      }
    })
    .st({
      fill: config.barColor,
      opacity: d => {
        return "0.2";
      }
    });
};
