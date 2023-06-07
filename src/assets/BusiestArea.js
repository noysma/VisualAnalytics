import * as d3 from 'd3';

function BusiestArea() {
  const color = "#ffffff"; // White color for non-residential buildings
  let extent;

  function me(selection) {
    const data = selection.datum(); 

    extent = {
      type: "GeometryCollection",
      geometries: data.map((d) => d.geometry),
    };

    const projection = d3.geoIdentity().reflectY(true).fitSize([650, 650], extent);

    const path = d3.geoPath().projection(projection);

    selection
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("d", path)
      .attr("fill", color)
      .attr("stroke", "grey")
      .attr("stroke-width", 0.5);

    d3.csv("weekdays.csv").then((weekdayData) => {
      const parsedWeekdayData = weekdayData.map((d) => {
        const coordinates = d.currentLocation
          .replace("POINT (", "")
          .replace(")", "")
          .split(" ");

        return {
          geometry: {
            type: "Point",
            coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
          },
          count: parseInt(d.count),
        };
      });

      selection
        .selectAll(".weekday-circle")
        .data(parsedWeekdayData)
        .join("circle")
        .attr("class", "weekday-circle")
        .attr("cx", (d) => projection(d.geometry.coordinates)[0])
        .attr("cy", (d) => projection(d.geometry.coordinates)[1])
        .attr("r", (d) => d.count * 0.09)
        .attr("fill", "red")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("visibility", "hidden");
    });

    d3.csv("weekends.csv").then((weekendData) => {
      const parsedWeekendData = weekendData.map((d) => {
        const coordinates = d.currentLocation
          .replace("POINT (", "")
          .replace(")", "")
          .split(" ");

        return {
          geometry: {
            type: "Point",
            coordinates: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
          },
          count: parseInt(d.count),
        };
      });

      selection
        .selectAll(".weekend-circle")
        .data(parsedWeekendData)
        .join("circle")
        .attr("class", "weekend-circle")
        .attr("cx", (d) => projection(d.geometry.coordinates)[0])
        .attr("cy", (d) => projection(d.geometry.coordinates)[1])
        .attr("r", (d) => d.count * 0.09)
        .attr("fill", "#0079FF")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("visibility", "hidden");
    });
  }

  me.color = function () {
    return color;
  };

  me.extent = function () {
    return extent;
  };

  return me;
}

export { BusiestArea };