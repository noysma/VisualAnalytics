import * as d3 from "d3";

export function createFinancialHealth(data) {
  const educationLevels = [...new Set(data.map(entry => entry.educationLevel))];
  const monthYears = [...new Set(data.map(entry => entry.monthYear))];

  const margin = { top: 20, right: 20, bottom: 50, left: 50 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const cleanedData = data.map(entry => ({
    ...entry,
    availableBalance: +entry.availableBalance.replace(/,/g, "")
  }));

  const svg = d3.select("#lineChart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const parseTime = d3.timeParse("%Y-%m");
  const formatTime = d3.timeFormat("%b %y");

  const x = d3.scalePoint()
    .domain(monthYears.map(parseTime))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, 70000])
    .range([height, 0]);

  const color = d3.scaleOrdinal()
    .domain(educationLevels)
    .range(d3.schemeCategory10);

  const line = d3.line()
    .x(d => x(parseTime(d.monthYear)))
    .y(d => y(d.availableBalance));

  const tooltip = d3.select("#lineChart").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  educationLevels.forEach(level => {
    const filteredData = cleanedData.filter(entry => entry.educationLevel === level);

    svg.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", color(level))
      .attr("stroke-width", 1.5)
      .attr("d", line);

    svg.selectAll(".dot")
      .data(filteredData, (d, i) => level + "-" + i)
      .enter()
      .append("circle")
      .attr("class", "dot-" + level)
      .attr("cx", d => x(parseTime(d.monthYear)))
      .attr("cy", d => y(d.availableBalance))
      .attr("r", 4)
      .attr("fill", color(level))
      .on("mouseover", function (event, d) {
        const tooltipWidth = parseFloat(tooltip.style("width"));
        const tooltipHeight = parseFloat(tooltip.style("height"));
        const xPosition = x(parseTime(d.monthYear)) + margin.left - tooltipWidth / 2;
        const yPosition = event.pageY - tooltipHeight - 100;

        tooltip.transition()
          .duration(500)
          .style("opacity", 0.9)
          .style("left", xPosition + "px")
          .style("top", yPosition + "px");

        tooltip.html("Available Balance: $" + d3.format(",.2f")(d.availableBalance));

        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 8);
      })
      .on("mouseout", function () {
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);

        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", 4);
      });

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(formatTime))

    const yAxis = d3.axisLeft(y).tickFormat(d => d / 1000 + "k");


      svg.append('g')
      .call(yAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -30)
      .attr("fill", "#000")
      .style("text-anchor", "middle")
      .text("Available Balance (in thousands)")
      .style("font-size", "12px")
      .style("font-weight", "300");

    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(" + (width - 100) + ", 20)");

    const legendItems = legend.selectAll(".legend-item")
      .data(educationLevels)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => "translate(0," + (i * 20) + ")");

    legendItems.append("rect")
      .attr("x", -500)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", color);

    legendItems.append("text")
      .attr("x", -485)
      .attr("y", 3)
      .attr("dy", "0.5em")
      .style("font-size", "12px")
      .style("font-weight", "300")
      .text(d => {
        if (d === "Graduate") return "Graduate";
        if (d === "Bachelors") return "Bachelor Degree";
        if (d === "HighSchoolOrCollege") return "High School / College";
        if (d === "Low") return "Low education level";
      });
  });
}
