import * as d3 from "d3";

export function createRoutine(data, container, width, height) {
  const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%SZ");

  const formattedData = data.map((d) => {
    return {
      participantId: +d.participantId,
      timestamp: parseTime(d.timestamp),
      currentMode: d.currentMode,
    };
  });

  const groupedData = d3.group(formattedData, (d) => d3.timeDay.floor(d.timestamp));

  const modes = Array.from(new Set(formattedData.map((d) => d.currentMode)));

  const colorScale = d3
    .scaleOrdinal()
    .domain(modes)
    .range(d3.schemeCategory10);

  const rectWidth = width / (1440 / 5); 
  const rectHeight = height / groupedData.size;

  const svg = d3.select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height + 50);

  const heatmap = svg.selectAll("g")
    .data(Array.from(groupedData))
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(0, ${i * rectHeight + 20})`); 

  heatmap.selectAll("rect")
    .data((d) => d[1])
    .enter()
    .append("rect")
    .attr("x", (d) => {
      const dayStart = d3.timeDay.floor(d.timestamp);
      const minutesSinceStart = d3.timeMinute.count(dayStart, d.timestamp);
      return (minutesSinceStart * rectWidth) / 5; 
    })
    .attr("y", 0)
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .style("fill", (d) => colorScale(d.currentMode));

  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); 

  const endTime = new Date();
  endTime.setHours(24, 0, 0, 0);

  let xScale = d3.scaleTime()
    .domain([startTime, endTime])
    .range([15, width-15]);
  
    const xAxisTickFormat = (date) => {
      const hours = date.getHours();
      return hours === 0 ? "00:00" : d3.timeFormat("%H:%M")(date);
    };  

  const xAxis = d3.axisBottom(xScale)
    .ticks(d3.timeHour.every(3)) 
    .tickFormat(xAxisTickFormat);

  const xAxisGroup = svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0)`)
    .call(xAxis);

  xAxisGroup.select(".domain").remove(); 
  xAxisGroup.selectAll(".tick line").remove(); 
  xAxisGroup.selectAll(".tick text").style("font-size", "11px");
  xAxisGroup.selectAll(".tick text").style("text-anchor", "middle");

  const yScale = d3.scaleTime()
    .domain([
      d3.timeDay.floor(d3.min(formattedData, (d) => d.timestamp)),
      d3.timeDay.ceil(d3.max(formattedData, (d) => d.timestamp)),
    ])
    .range([0, height]);

  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.timeFormat("%Y-%m-%d"));
  
  const yAxisGroup = svg.append("g")
      .call(yAxis);
    
  yAxisGroup.select(".domain").remove();

  const lineGroup = heatmap.append("g");

  xScale = d3.scaleTime()
    .domain([startTime, endTime])
    .range([0, width]);

  lineGroup.selectAll("line")
    .data(xAxisGroup.selectAll(".tick").data())
    .enter()
    .append("line")
    .attr("x1", (d) => xScale(d))
    .attr("y1", 0)
    .attr("x2", (d) => xScale(d))
    .attr("y2", rectHeight)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

}