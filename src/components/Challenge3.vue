<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="vc3" class="vc3-container">
    <h1 class="vc3Title">Challenge 3: Economics</h1>
    <p>
      Considers the financial health of the city. Over time, are businesses growing or shrinking? How are people changing jobs? Are standards of living improving or declining over time?
    </p>

    <!-- QUESTION 1  -->
    <button class="accordion3" @click="toggleAccordion(1)">
      Over the period covered by the dataset, which businesses appear to be more prosperous? Which appear to be struggling?
    </button>
    <div class="panel" :style="{ maxHeight: panels[1].maxHeight }">
      <h4>Business Status Analysis</h4>
      <div class="report">
        <p>The map below allows us to identify different types of businesses categorized by price ranges. </p>
        <h4>Findings</h4>
        <p>When it comes to pubs, the most prosperous ones are predominantly located in the central area of Engagement, near the city's commercial zone. There is an exception with one suburban pub that still falls within the higher price range.
          On the other hand, when it comes to restaurants, the price ranges are more heterogeneous across different areas of the city. However, it can be observed that the western part of the city features more prosperous restaurants.</p>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="button-container">
            <button :class="{ active: pubsActive }" @click="togglePubs" class="PubsButton">Pubs</button>
            <button :class="{ active: restaurantsActive }" @click="toggleRestaurants" class="RestButton">Restaurants</button>
          </div>
        </div>
      </div>
      <svg width="100%" height="700px" ref="map">
        <g class="buildings"></g>
        <g class="pubs" :opacity="pubsActive ? 1 : 0"></g>
        <g class="restaurants" :opacity="restaurantsActive ? 1 : 0"></g>
        <g class="pubs hidden"></g>
        <g class="restaurants hidden"></g>
      </svg>
    </div>

    <!-- QUESTION 2  -->
    <button class="accordion3" @click="toggleAccordion(2)">
      How does the financial health of the residents change over the period covered by the dataset? Are there groups that appear to exhibit similar patterns?
    </button>
    <div class="panel" :style="{ maxHeight: panels[2].maxHeight }">
      <h4>Financial Health Analysis</h4>
      <div class="report">
        <p>The line chart below depicts the financial health level, as indicated by the variation in participants' available balance over the entire observation period. The analysis specifically considers the participants' different education levels.</p>
        <h4>Findings</h4>
        <p>The growth pattern over time is common across all education levels. However, two distinct subpatterns can be observed, which closely align with the division of education levels:</p>
        <ul>
          <li>Low education and High School or College education: These two groups exhibit similar growth patterns, closely aligned with each other.</li>
          <li>Graduate and Bachelor degree: Although there is a wider gap between these two groups, they form a cluster representing higher maximum values of available balance. However, it is important to consider that Graduate degree holders, in particular, have a maximum value that exceeds Bachelor degree holders by more than $15,000.</li>
        </ul>
      </div>
      <div id="lineChart"></div>
    </div>

    <!-- QUESTION 3  -->
    <button class="accordion3" @click="toggleAccordion(3)">
      What employment patterns do you observe? Do you notice any particularly high or low turnover?
    </button>
    <div class="panel" :style="{ maxHeight: panels[3].maxHeight }">
      <div class="report">
        <h4>Turnover Rate Analysis</h4>
        <p>The scatter plot below depicts the relationship between turnover rate, defined as the number of employees transitioning to another company, and hourly wages. It is interesting to observe how higher turnover rates are associated with lower hourly wages, with some companies experiencing a loss of more than 40 employees. Notably, Company with JobID 975 reached a total of 56 employees lost.</p>
        <h4>Findings</h4>
        <p>For companies offering lower hourly wages, higher turnover rates are evident. On the other hand, for companies offering moderate hourly wages, turnover rates are relatively low. For companies offering higher wages, the turnover rate is almost negligible.</p>
      </div>
      <div id="turnover"></div>
    </div>
  </div>
</template>

<script>
import { getSingleEndpoint } from "../assets/apiConnector";
const wkx = require('wkx');
const d3 = require('d3');

import { BuildingMap, BuildingPub, BuildingRestaurant } from "@/assets/BusinessStatus";
const bm = new BuildingMap();
const pub = new BuildingPub();
const rest = new BuildingRestaurant();

import { createFinancialHealth } from '@/assets/FinancialHealth.js';
import { createScatterplot } from '@/assets/Turnover.js';

export default {
  name: 'App',
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
      pubs: [],
      restaurants: [],
      pubsActive: false,
      restaurantsActive: false,
    }
  },
  mounted() {
    // DRAW THE MAP
    getSingleEndpoint({}, 'Buildings').then((response) => {
      this.buildings = response.data.map(d => ({
        type: "Feature",
        geometry: wkx.Geometry.parse(Buffer.from(d.location, 'hex')).toGeoJSON(),
        properties: {
          buildingId: d.buildingId,
          buildingType: d.buildingType,
          maxOccupancy: d.maxOccupancy,
          units: d.units,
        },
      }));

      // DRAW PUBS
      getSingleEndpoint({}, 'Pubs').then((response) => {
        this.pubs = response.data.map(d => ({
          type: "Feature",
          geometry: wkx.Geometry.parse(Buffer.from(d.location, 'hex')).toGeoJSON(),
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
      getSingleEndpoint({}, 'Restaurants').then((response) => {
        this.restaurants = response.data.map(d => ({
          type: "Feature",
          geometry: wkx.Geometry.parse(Buffer.from(d.location, 'hex')).toGeoJSON(),
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
    });
    // FINANCIAL HEALTH
    d3.csv("financialHealth.csv").then((data) => {
      createFinancialHealth(data, "#lineChart");
    });
    // DRAW THE TURNOVER SCATTERPLOT
    d3.csv('turnover.csv').then(data => {
      createScatterplot(data, "#turnover");
    });
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
        .select('g.buildings')
        .datum(this.buildings)
        .call(bm);
    },
    drawPub() {
      d3.select(this.$refs.map)
        .select('g.pubs')
        .datum(this.pubs)
        .call(pub, bm.extent());
    },
    drawRestaurants() {
      d3.select(this.$refs.map)
        .select('g.restaurants')
        .datum(this.restaurants)
        .call(rest, bm.extent());
    },
    togglePubs() {
      this.pubsActive = true;
      this.restaurantsActive = false;
    },
    toggleRestaurants() {
      this.restaurantsActive = true;
      this.pubsActive = false;
    },
  }
}
</script>

<style>
  #vc3 {
    position: relative;
  }

  .vc3Title {
    color: #FB8500;
  }

  .accordion3 {
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
  .accordion3:hover {
    background-color: #FB8500;
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

  /* BUSINESS HEALTH STYLE */
  #map {
    margin-top: 50px;
    position: relative;
  }

  svg g.buildings {
    fill-opacity: 0.3;
    stroke: grey;
  }

  .tooltip {
    position: absolute;
    padding: 6px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-weight: bold;
  }

  .button-container {
    position: absolute;
    top: 60px;
    right: 30px;
  }

  .button-container button {
    margin-left: 10px;
    background-color: transparent;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
    transition: background-color 0.3s ease;
    opacity: 0.3;
  }

  .button-container .PubsButton {
    background-color: #0051ba;
  }

  .button-container .RestButton {
    background-color: #ff06fa;
  }

  .button-container .active {
    opacity: 1;
  }

  .button-container .hidden {
    display: none;
  }
</style>
