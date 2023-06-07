import * as d3 from "d3";

// M A P
function BuildingMap() {
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  let extent;

  function me(selection) {
    const buildingTypes = d3
      .groups(selection.datum().map(d => d.properties.buildingType), d => d)
      .map(d => d[0]);

    console.log("buildingTypes", buildingTypes);
    color.domain(buildingTypes);

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
      .attr("fill", d => color(d.properties.buildingType));
  }

  me.color = function () {
    return color;
  };

  me.extent = function() {
    return extent
  };

  return me;
}

// A P A R T M E N T S
function BuildingApt() {
  function me(selection, extent) {
    const apartmentIds = d3
      .groups(selection.datum().map(d => d.properties.apartmentId), d => d)
      .map(d => d[0]);

    console.log("apartmentIds", apartmentIds);
    
    const projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([650, 650], extent);
    
    selection
      .selectAll(".apt")
      .data(selection.datum())
      .join("circle")
      .attr("class", "apt")
      .attr("cx", d => projection(d.geometry.coordinates)[0])
      .attr("cy", d => projection(d.geometry.coordinates)[1])
      .attr("r", 1.2); 
  }

  return me;
}

// P U B S
function BuildingPub() {
  const color = '#0079FF';
  
  function me(selection, extent) {
    const pubIds = d3
      .groups(selection.datum().map(d => d.properties.pubId), d => d)
      .map(d => d[0]);

    console.log("pubIds", pubIds);
    
    const projection = d3
    .geoIdentity()
    .reflectY(true)
    .fitSize([650, 650], extent);
    
    selection
      .selectAll(".pub")
      .data(selection.datum())
      .join("circle")
      .attr("class", "pub")
      .attr("cx", d => projection(d.geometry.coordinates)[0])
      .attr("cy", d => projection(d.geometry.coordinates)[1])
      .attr("r", 4.5) 
      .attr("fill", color)
      .attr("fill-opacity", 1);
  }
 
  return me;
}

// R E S T A U R A N T S
function BuildingRestaurant() {
  const color = '#FF06FA';
  
  function me(selection, extent) {
    const restaurantId = d3
      .groups(selection.datum().map(d => d.properties.restaurantId), d => d)
      .map(d => d[0]);

    console.log("restaurantId", restaurantId);

    const projection = d3
      .geoIdentity()
      .reflectY(true)
      .fitSize([650, 650], extent);

    selection
      .selectAll(".restaurant")
      .data(selection.datum())
      .join("circle")
      .attr("class", "restaurant")
      .attr("cx", d => projection(d.geometry.coordinates)[0])
      .attr("cy", d => projection(d.geometry.coordinates)[1])
      .attr("r", 4.5) 
      .attr("fill", color)
      .attr("fill-opacity", 0.7);
  }

  return me;
}

// L E G E N D
function BuildingTypeLegend() {
  let color = d3.scaleOrdinal(d3.schemeCategory10);

  function me(selection) {
    const legend = selection.append("g").attr("transform", "translate(20, 450)");

    const legendItem = legend
      .selectAll("g")
      .data(color.domain())
      .join("g")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`);

    legendItem
      .filter(d => d === "apartments") 
      .append("circle") 
      .attr("r", 5)
      .attr("cx", 5)
      .attr("cy", 5)
      .attr("fill", "black");

    legendItem
      .append("rect") 
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill-opacity", 0.4)
      .attr("fill", d => (d === "apartments" ? "none" : color(d)));

    legendItem
      .append("text")
      .attr("x", 20)
      .attr("y", 10)
      .text(d => {
        if (d === "apartments") {
          return "Apartments"; 
        } else {
          return d; 
        }
      });
  }
  me.color = function (_) {
    if (!arguments.length) return color;
    color = _;
    return me;
  };

  return me;
}

export { BuildingMap, BuildingTypeLegend, BuildingApt, BuildingPub, BuildingRestaurant };
