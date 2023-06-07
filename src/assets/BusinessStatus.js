import * as d3 from "d3";

// M A P
function BuildingMap() {
  const color = "#ffffff";
  let extent;

  function me(selection) {
    const buildingTypes = d3
      .groups(selection.datum().map(d => d.properties.buildingType), d => d)
      .map(d => d[0]);
    console.log("buildingTypes", buildingTypes);

    extent = {
      type: "GeometryCollection",
      geometries: selection.datum().map(d => d.geometry)
    };

    const projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([650, 650], extent);

    const path = d3.geoPath().projection(projection);

    selection
      .selectAll("path")
      .data(selection.datum())
      .join("path")
      .attr("d", path)
      .attr("fill", color)
      .style("stroke", "grey");
  }

  me.color = function () {
    return color;
  };

  me.extent = function() {
    return extent
  };

  return me;
}


function BuildingPub() {
  const colorScale = d3.scaleThreshold()
    .domain([8, 10, 12])
    .range(["#f1f1f1", "#a6bddb", "#2b8cbe", "#045a8d"]);

  function me(selection, extent) {
    const projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([650, 650], extent);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const legendSvg = selection.append("svg")
      .attr("width", 1000) 
      .attr("height", 50); 

    const legendData = [
      { range: "< $8,00", color: "#f1f1f1" },
      { range: "$8,00 - $9.99", color: "#a6bddb" },
      { range: "$10,00 - $12,00", color: "#2b8cbe" },
      { range: "> $12,00", color: "#045a8d" }
    ];

    const legendWidth = 300; 
    const rectWidth = legendWidth / legendData.length;
    const offset = 350; 

    legendSvg.selectAll(".legend-rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("class", "legend-rect")
      .attr("x", (d, i) => i * rectWidth + offset)
      .attr("y", 10)
      .attr("width", rectWidth)
      .attr("height", 15)
      .attr("fill", d => d.color);

    legendSvg.selectAll(".legend-label")
      .data(legendData)
      .enter()
      .append("text")
      .attr("class", "legend-label")
      .attr("x", (d, i) => i * rectWidth + rectWidth / 2 + offset)
      .attr("y", 40)
      .text(d => d.range)
      .attr("text-anchor", "middle")
      .style("font-size", "10px"); 


    selection
      .selectAll(".pub")
      .data(selection.datum())
      .join("circle")
      .attr("class", "pub")
      .attr("cx", d => projection(d.geometry.coordinates)[0])
      .attr("cy", d => projection(d.geometry.coordinates)[1])
      .attr("r", 10)
      .attr("fill", d => {
        const hourlyCost = d.properties.hourlyCost;
        if (hourlyCost < 8) {
          return colorScale(0);
        } else if (hourlyCost >= 8 && hourlyCost < 10) {
          return colorScale(8);
        } else if (hourlyCost >= 10 && hourlyCost <= 12) {
          return colorScale(10);
        } else {
          return colorScale(12);
        }
      })
      .style("stroke", "black")
      .on("mouseover", (event, d) => {
        const hourlyCost = d.properties.hourlyCost;
        tooltip
          .style("opacity", 1)
          .html(`Hourly cost: $ ${d3.format(".2f")(hourlyCost)}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  }

  return me;
}

function BuildingRestaurant() {
  const colorScale = d3.scaleThreshold()
    .domain([4.50, 5, 5.50])
    .range(["#FFF5F0", "#FEB8A3", "#F768A1", "#AE017E"]);

  function me(selection, extent) {

    const projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([650, 650], extent);

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    const legendSvg = selection.append("svg")
      .attr("width", 1000) 
      .attr("height", 50); 

    const legendData = [
      { range: "< $4,50", color: "#FFF5F0" },
      { range: "$4,50 - $4.99", color: "#FEB8A3" },
      { range: "$5,00 - $5,50", color: "#F768A1" },
      { range: "> $5,50", color: "#AE017E" }
    ];

    const legendWidth = 300; 
    const rectWidth = legendWidth / legendData.length; 
    const offset = 350; 

    legendSvg.selectAll(".legend-rect")
      .data(legendData)
      .enter()
      .append("rect")
      .attr("class", "legend-rect")
      .attr("x", (d, i) => i * rectWidth + offset)
      .attr("y", 10)
      .attr("width", rectWidth)
      .attr("height", 15)
      .attr("fill", d => d.color);

    legendSvg.selectAll(".legend-label")
      .data(legendData)
      .enter()
      .append("text")
      .attr("class", "legend-label")
      .attr("x", (d, i) => i * rectWidth + rectWidth / 2 + offset)
      .attr("y", 40)
      .text(d => d.range)
      .attr("text-anchor", "middle")
      .style("font-size", "10px"); 


    selection
      .selectAll(".restaurant")
      .data(selection.datum())
      .join("circle")
      .attr("class", "restaurant")
      .attr("cx", d => projection(d.geometry.coordinates)[0])
      .attr("cy", d => projection(d.geometry.coordinates)[1])
      .attr("r", 10)
      .attr("fill", d => {
        const foodCost = d.properties.foodCost;
        if (foodCost < 4.50) {
          return colorScale(0);
        } else if (foodCost >= 4.50 && foodCost < 5) {
          return colorScale(4.50);
        } else if (foodCost >= 5 && foodCost <= 5.50) {
          return colorScale(5);
        } else {
          return colorScale(5.50);
        }
      })
      .style("stroke", "black")
      .on("mouseover", (event, d) => {
        const foodCost = d.properties.foodCost;
        tooltip
          .style("opacity", 1)
          .html(`Food cost: $ ${d3.format(".2f")(foodCost)}`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });
  }

  return me;
}
export { BuildingMap, BuildingPub, BuildingRestaurant };
