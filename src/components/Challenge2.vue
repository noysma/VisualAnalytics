<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="vc2" class="vc2-container">
    <h1 class="vc2Title">Challenge 2: Patterns of Life</h1>
    <p>
      Considers the patterns of daily life throughout the city.
      You will describe the daily routines for some representative people, characterize the travel patterns to identify potential bottlenecks or hazards, and examine how these patterns change over time and seasons.
    </p>

    <!-- QUESTION 1 -->
    <button class="accordion2" @click="toggleAccordion(1)">
      Assuming the volunteers are representative of the city’s population, characterize the distinct areas of the city that you identify.
    </button>
    <div class="panel" :style="{ maxHeight: panels[1].maxHeight }">
      <h4>Spatial Distribution of Commercial, Residential, and Entertainment Establishments in the City</h4>

      <div class="report">
        <p>The graph illustrates the Engagement map of the city, showcasing the spatial distribution of different types of establishments. The map reveals that commercial areas extensively cover a significant portion of the city, while residential zones and schools are predominantly situated at the city's periphery. By analyzing the map using interactive buttons to highlight pubs and restaurants, interesting patterns emerge, particularly in terms of their distribution across the city.</p>

        <h4>Findings</h4>
        <ol>
          <li>Scarcity of Pubs and Restaurants in the Southern Area:</li>
          <p>The visualization demonstrates that the southern section of the city lacks a substantial number of pubs and restaurants. Only three restaurants and one pub are present in this region, indicating a significant disparity compared to other areas.</p>
          <li>Restaurant Dominance in the Central Core:</li>
          <p>The city's central core, which serves as the primary commercial district, exhibits a higher concentration of restaurants. However, it is noteworthy that the presence of pubs in this area is comparatively lower than expected. This finding deviates from the usual balanced distribution observed across other parts of the city.</p>
        </ol>

        <h4>Conclusion</h4>
        <p>The spatial analysis of the city's Engagement map highlights the influence of commercial activities on its layout. The concentration of commercial areas is prominently visible, occupying a significant portion of the city. Additionally, the scarcity of pubs in the southern region and the preponderance of restaurants in the central core add interesting nuances to the city's overall entertainment landscape.</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="button-container">
            <button :class="{ active: pubsActive }" @click="togglePubs" class="pubsButton">Pubs</button>
            <button :class="{ active: restaurantsActive }" @click="toggleRestaurants" class="restButton">Restaurants</button>
          </div>
        </div>
      </div>
      <svg width="100%" height="700px" ref="map">
        <g class="buildings"></g>
        <g class="legend"></g>
        <g class="apartments"></g>
        <g class="pubs" :opacity="pubsActive ? 1 : 0"></g>
        <g class="restaurants" :opacity="restaurantsActive ? 1 : 0"></g>
      </svg>
    </div>

    <!-- QUESTION 2 -->
    <button class="accordion2" @click="toggleAccordion(2)">
      Where are the busiest areas in Engagement?
    </button>
    <div class="panel" :style="{ maxHeight: panels[2].maxHeight }">

      <h4>Analysis of Population Concentration in the City</h4>

      <div class="report">
        <p>The city map displays the varying intensity of population concentration in the city, distinguishing between weekdays and weekends. The visualization highlights that the population concentration primarily occurs in residential areas, with a notable dense area in the northwest region. It is also interesting to observe that when switching between weekdays and weekends, there is a significant decrease in population concentration in the city. Could it be that the residents of Engagement love spending weekends out of town?</p>

        <h4>Findings</h4>
        <p>The analysis reveals the following key findings:</p>
        <ul>
          <li>High Population Concentration in Residential Areas:</li>
          <p>The map clearly demonstrates that the population concentration is predominantly observed in residential areas, with a particular emphasis on the densely populated northwest zone.</p>
          <li>Difference between Weekdays and Weekends:</li>
          <p>Switching between weekdays and weekends on the graph reveals a noticeable decrease in population concentration during the weekends. This finding raises the intriguing possibility that the residents of Engagement enjoy spending their weekends away from the city.</p>
        </ul>

        <h4>Conclusion</h4>
        <p>The analysis of population concentration in the city highlights the significance of residential areas as the primary hub of population activity. The dense population in the northwest region suggests a higher concentration of residents in that area. Furthermore, the distinct decrease in population concentration during weekends implies a potential preference among Engagement residents for weekends outside the city. </p>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="bottle-btn">
            <button size="sm" @click="toggleWeekdayCircles" class="weekdaysButton" :class="{ 'selected': weekdaysSelected }">Weekdays</button>
            <button size="sm" @click="toggleWeekendCircles" class="weekendButton" :class="{ 'selected': weekendSelected }">Weekend</button>
          </div>
        </div>
      </div>
      <div id="BusiestArea"></div>
    </div>

    <!-- QUESTION 3 -->
    <button class="accordion2" @click="toggleAccordion(3)">
      Participants have given permission to have their daily routines captured. Choose two different participants with different routines and describe their daily patterns.
    </button>
    <div class="panel" :style="{ maxHeight: panels[3].maxHeight }">

      <h4>Comparison of Participant Routines</h4>
      <div class="report">

        <p>The graph below visually represents the routines of two participants. When reading the graph horizontally, we observe individual days, while vertically, we see the entire duration of the study, spanning 15 months.</p>

        <p>There are four IDs representing two pairs of participants, each with distinct characteristics:</p>

        <ul>
          <li>ID 179 and ID 728: Most Dissimilar Routines</li>
          <p>Participant 179, aged 44, holds a Bachelor's degree, whereas participant 728, aged 38, has a low level of education.</p>

          <li>ID 902 and ID 911: Most Similar Routines</li>
          <p>Despite a significant age difference (27 and 50 years old, respectively), they share the same level of education.</p>
        </ul>


        <h4>Findings</h4>
        <p>It is interesting to note that all participants exhibited consistent and habitual routines throughout the entire 15-month duration of the study, with minimal variations.</p>

        <h4>Conclusion</h4>
        <p>The graph effectively illustrates the comparison of participant routines. Pair ID 179 and 728 exemplify the most dissimilar routines, with differing ages and education levels. On the other hand, pair ID 902 and 911 showcase the most similar routines, despite the significant age difference.</p>

      </div>

      <div class="heatmap-container">

        <div class="legend">
          <div v-for="(label, index) in labels" :key="index" class="legend-item">
            <span :style="{ backgroundColor: categoryColors[index] }" class="legend-color"></span>
            <span class="legend-label">{{ label }}</span>
          </div>
        </div>


        <b-row>
          <b-col>
            <select id="csvSelect1" v-model="selectedCsv1" @change="handleCsvSelect1">
              <option value="">Choose participantID</option>
              <option value="routine_179.csv">ID 179</option>
              <option value="routine_728.csv">ID 728</option>
              <option value="routine_902.csv">ID 902</option>
              <option value="routine_911.csv">ID 911</option>
            </select>
            <div class="heatmap" :id="heatmapId1"></div>
          </b-col>
          <b-col>
            <select id="csvSelect2" v-model="selectedCsv2" @change="handleCsvSelect2">
              <option value="">Choose participantID</option>
              <option value="routine_179.csv">ID 179</option>
              <option value="routine_728.csv">ID 728</option>
              <option value="routine_902.csv">ID 902</option>
              <option value="routine_911.csv">ID 911</option>
            </select>
            <div class="heatmap" :id="heatmapId2"></div>
          </b-col>
        </b-row>
      </div>

    </div>

    <!-- QUESTION 4 -->
    <button class="accordion2" @click="toggleAccordion(4)">Over the span of the dataset, how do traffic pattern change?</button>
    <div class="panel" :style="{ maxHeight: panels[4].maxHeight }">

      <h4>Traffic Time Analysis</h4>
      <div class="report">

        <p>The graph below represents the amount of time, expressed in hours, that participants spend in traffic, discretized for each day of the week. By using the provided slider, you can navigate through the 15-month period and visualize the desired weekly time window.</p>

        <h4>Findings</h4>
        <p>Initially, particularly in the first week, the time spent in traffic exceeds 60 hours on some days, gradually decreasing and stabilizing around 30 hours in the subsequent weeks.</p>

        <p>It was expected to observe a significant decrease in traffic during weekends. However, the data shows that traffic levels remain relatively stable throughout the week, with the exception of Saturdays exceeding the weekly average. Notably, on Saturday, March 13, there is a significant increase in traffic time.</p>

      </div>

      <input type="range" class="custom-range" v-model="selectedWeek" min="0" :max="totalWeeks - 1" style="width: 245px">
      <p class="slider-text">{{ weekDetails }}</p>
      <div ref="chart" class="traffic-chart"></div>
    </div>

  </div>
</template>

<script>
  import { getSingleEndpoint } from "../assets/apiConnector";
  import { format } from 'date-fns';
  import { schemeCategory10 } from 'd3-scale-chromatic';
  let Buffer = require("buffer/").Buffer;
  const wkx = require("wkx");
  const d3 = require("d3");

  import {
    BuildingMap,
    BuildingTypeLegend,
    BuildingApt,
    BuildingPub,
    BuildingRestaurant,
  } from "@/assets/Map";

  const bm = new BuildingMap();
  const bl = new BuildingTypeLegend();
  const apt = new BuildingApt();
  const pub = new BuildingPub();
  const rest = new BuildingRestaurant();

  import { drawChart, updateChart } from '@/assets/TrafficPlot.js';

  import { BusiestArea } from "@/assets/BusiestArea.js";
  const dm = new BusiestArea();

  import { createRoutine } from "@/assets/RoutineComparison.js";

  export default {
    name: "App",
    components: {},
    data() {
      return {
        panels: {
          1: { active: false, maxHeight: null },
          2: { active: false, maxHeight: null },
          3: { active: false, maxHeight: null },
          4: { active: false, maxHeight: null },
        },
        buildings: [],
        apartments: [],
        pubs: [],
        restaurants: [],
        pubsActive: false,
        restaurantsActive: false,
        data: [],
        selectedWeek: 0,
        totalWeeks: 0,
        weekdaysSelected: false,
        weekendSelected: false,
        labels: ['Home', 'Transport', 'Work', 'Restaurant', 'Recreation'],
        categoryColors: schemeCategory10,
        heatmapContainer: null,
        selectedCsv1: '', 
        selectedCsv2: '', 
        heatmapId1: 'heatmap-1', 
        heatmapId2: 'heatmap-2', 
      };
    },
    computed: {
      weekDetails() {
        const startDate = this.data[this.selectedWeek * 7]?.date;
        const endDate = this.data[this.selectedWeek * 7 + 6]?.date;
        const formattedStartDate = startDate ? format(new Date(startDate), 'dd MMMM yyyy') : '';
        const formattedEndDate = endDate ? format(new Date(endDate), 'dd MMMM yyyy') : '';
        return startDate && endDate ? `${formattedStartDate} - ${formattedEndDate}` : '';
      },
    },
    mounted() {
      // DRAW THE MAP
      getSingleEndpoint({}, "Buildings").then((response) => {
        this.buildings = response.data.map((d) => ({
          type: "Feature",
          geometry: wkx.Geometry.parse(Buffer.from(d.location, "hex")).toGeoJSON(),
          properties: {
            buildingId: d.buildingId,
            buildingType: d.buildingType,
            maxOccupancy: d.maxOccupancy,
            units: d.units,
          },
        }));
        // DRAW APARTMENTS
        getSingleEndpoint({}, "Apartments").then((response) => {
          this.apartments = response.data.map((d) => ({
            type: "Feature",
            geometry: wkx.Geometry.parse(Buffer.from(d.location, "hex")).toGeoJSON(),
            properties: {
              numberOfRooms: d.numberOfRooms,
              apartmentId: d.apartmentId,
              buildingId: d.buildingId,
              rentalCost: d.rentalCost,
              maxOccupancy: d.maxOccupancy,
            },
          }));
          this.drawApt();
        });
        // DRAW PUBS
        getSingleEndpoint({}, "Pubs").then((response) => {
          this.pubs = response.data.map((d) => ({
            type: "Feature",
            geometry: wkx.Geometry.parse(Buffer.from(d.location, "hex")).toGeoJSON(),
            properties: {
              pubId: d.pubId,
              hourlyCost: d.hourlyCost,
              maxOccupancy: d.maxOccupancy,
              buildingId: d.buildingId,
            },
          }));
          this.drawPub();
        });
        // DRAW RESTAURANTS
        getSingleEndpoint({}, "Restaurants").then((response) => {
          this.restaurants = response.data.map((d) => ({
            type: "Feature",
            geometry: wkx.Geometry.parse(Buffer.from(d.location, "hex")).toGeoJSON(),
            properties: {
              restaurantId: d.restaurantId,
              maxOccupancy: d.maxOccupancy,
              foodCost: d.foodCost,
              buildingId: d.buildingId,
            },
          }));
          this.drawRestaurants();
        });
        this.drawBuildings();
        this.drawBusiestArea()
      });
      // DRAW THE ROUTINE COMPARISON CHART
      this.loadCsvData(this.selectedCsv1, this.heatmapId1);
      this.loadCsvData(this.selectedCsv2, this.heatmapId2);

      // DRAW THE TRAFFIC PLOT
      d3.csv('travelDuration.csv').then((data) => {
        this.data = data;
        this.totalWeeks = Math.floor(data.length / 7);
        drawChart(this.data.slice(0, 7), this.$refs.chart);
      });
    },
    watch: {
      selectedCsv1(newValue) {
        if (newValue) {
          this.loadCsvData(newValue, this.heatmapId1);
        }
      },
      selectedCsv2(newValue) {
        if (newValue) {
          this.loadCsvData(newValue, this.heatmapId2);
        }
      },
      selectedWeek() {
        updateChart(this.data, this.selectedWeek, this.$refs.chart);
      },
    },
    methods: {
      toggleAccordion(section) {
        this.panels[section].active = !this.panels[section].active;
        if (this.panels[section].active) {
          this.panels[section].maxHeight = "none";
        } else {
          this.panels[section].maxHeight = null;
        }
      },
      drawBuildings() {
        d3.select(this.$refs.map)
          .select("g.buildings")
          .datum(this.buildings)
          .call(bm);

        const colorScale = bm.color().domain().concat("apartments");
        bl.color(d3.scaleOrdinal(d3.schemeCategory10).domain(colorScale));

        d3.select(this.$refs.map).select("g.legend").call(bl);
      },
      drawApt() {
        d3.select(this.$refs.map)
          .select("g.apartments")
          .datum(this.apartments)
          .call(apt, bm.extent());
      },
      drawPub() {
        d3.select(this.$refs.map)
          .select("g.pubs")
          .datum(this.pubs)
          .call(pub, bm.extent());
      },
      drawRestaurants() {
        d3.select(this.$refs.map)
          .select("g.restaurants")
          .datum(this.restaurants)
          .call(rest, bm.extent());
      },
      togglePubs() {
        this.pubsActive = !this.pubsActive;
      },
      toggleRestaurants() {
        this.restaurantsActive = !this.restaurantsActive;
      },
      drawBusiestArea() {
        d3.select("#BusiestArea")
          .append("svg")
          .attr("width", "100%")
          .attr("height", "700px")
          .append("g")
          .classed("density", true)
          .datum(this.buildings)
          .call(dm);
      },

      // ROUTINE CHART FUNCTIONS
      loadCsvData(csvFile, heatmapId) {
        if (csvFile) {
          this.heatmapContainer = `#${heatmapId}`;
          if (this.heatmapContainer) {
            d3.select(this.heatmapContainer).select('svg').remove();
          }

          this.heatmapContainer = `#${heatmapId}`;

          d3.csv(csvFile).then((data) => {
            createRoutine(data, this.heatmapContainer, 300, 900);
          });
        }
      },

      toggleWeekdayCircles() {
        const weekdayCircles = d3.select("#BusiestArea").selectAll(".weekday-circle");
        const isHidden = weekdayCircles.style("visibility") === "hidden";

        if (!isHidden) {
          return; 
        }

        const weekendCircles = d3.select("#BusiestArea").selectAll(".weekend-circle");
        weekendCircles.style("visibility", "hidden");
        this.weekendSelected = false;

        weekdayCircles.style("visibility", "visible");
        this.weekdaysSelected = true;
      },
      toggleWeekendCircles() {
        const weekendCircles = d3.select("#BusiestArea").selectAll(".weekend-circle");
        const isHidden = weekendCircles.style("visibility") === "hidden";

        if (!isHidden) {
          return; 
        }

        const weekdayCircles = d3.select("#BusiestArea").selectAll(".weekday-circle");
        weekdayCircles.style("visibility", "hidden");
        this.weekdaysSelected = false;

        weekendCircles.style("visibility", "visible");
        this.weekendSelected = true;
      },
    },
  };
</script>

<style>
  #vc2 {
    position: relative;
  }

  .vc2Title {
    color: #0079FF;
  }

  /* CARDS STYLE */
  .accordion2 {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    text-align: justify;
    transition: 0.4s;
    margin-bottom: 20px;
    border-radius: 20px;
  }

  .active,
  .accordion2:hover {
    background-color: #0079FF;
    color: white;
  }

  .panel {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }

  .report{
    text-align: justify;
  }
  
  h4 {
    color: darkgrey;
  }

  /* DISTINCT AREA STYLE */
  svg g.buildings {
    fill-opacity: 0.3;
    stroke: grey;
  }

  .button-container {
    position: absolute;
    top: 10px;
    right: 30px;
  }

  .button-container button {
    margin-left: 10px;
    background-color: transparent;
    border: none;
    color: white;
    border-radius: 20px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
    opacity: 0.3;
  }

  .button-container .active {
    opacity: 1;
  }

  .button-container .pubsButton {
    background-color: #0079FF;
  }

  .button-container .restButton {
    background-color: #ff06fa;
  }

  /* BUSIEST AREA STYLE */
  .bottle-btn {
    position: absolute;
    top: 10px;
    right: 30px;
  }

  button.weekdaysButton,
  button.weekendButton {
    margin-left: 10px;
    background-color: transparent;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    transition: background-color 0.3s ease, opacity 0.3s ease;
    opacity: 0.3;
    color: white;
  }

  button.weekdaysButton,
  button.weekendButton {
    color: white;
  }

  button.weekdaysButton {
    background-color: red;
  }

  button.weekendButton {
    background-color: #0079FF;
  }

  button.weekdaysButton,
  button.weekendButton {
    opacity: 0.3;
    color: white;
    transition: opacity 0.3s ease;
  }

  button.weekdaysButton.selected,
  button.weekendButton.selected {
    opacity: 1;
  }

  /* LEGENDA ROUTINE */
  .legend {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  .legend-color {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  .legend-label {
    font-size: 14px;
  }

  #heatmap {
    margin-top: 50px;
  }

</style>
