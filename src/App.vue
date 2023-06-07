<template>
  <div id="app">
    <Header @challenge-selected="setCurrentChallenge" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div v-if="!currentChallenge">
            <!-- Contenuto specifico dell'homepage -->
            <div class="content-wrapper">
              <h1>Challenge Overview</h1>
              <i>In Engagement, Ohio, the future is now! For years this sleepy bedroom community was a secret gem in the heart of the state. But now the word is out and the people are running, not walking, to buy up their claim on this bit of paradise!</i>
              <p class="empty-space">Anticipating rapid growth, the city of Engagement, Ohio USA is doing a participatory urban planning exercise to understand the current state of the city and identify opportunities for future growth. About 1000 representative residents in this modest-sized city have agreed to provide data using the city’s urban planning app, which records the places they visit, their spending, and their purchases, among other things. From these volunteers, the city will have data to assist with their major community revitalization efforts, including how to allocate a very large city renewal grant they have recently received. As a visual analytics expert, you have joined the city planning team to make sense of the data provided by these residents.</p>
            </div>
          </div>
          <component :is="currentChallenge"></component>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Challenge2 from '@/components/Challenge2';
import Challenge3 from '@/components/Challenge3';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Challenge2,
    Challenge3,
  },
  data() {
    return {
      currentChallenge: '',
    };
  },
  methods: {
    setCurrentChallenge(challenge) {
      this.currentChallenge = challenge;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.empty-space {
  margin-top: 1em;
}
body {
  padding-bottom: 100px;
}
</style>
