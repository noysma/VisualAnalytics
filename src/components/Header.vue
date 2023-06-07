<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-brand id="home" href="#" @click="setCurrentChallenge('')">VAST Challenge 2022</b-navbar-brand>
    <b-navbar-toggle target="navbarNav"></b-navbar-toggle>
    <b-collapse id="navbarNav" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="c2 nav-item" @click="setCurrentChallenge('Challenge2')">Challenge 2</b-nav-item>
        <b-nav-item class="c3 nav-item" @click="setCurrentChallenge('Challenge3')">Challenge 3</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
  
<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    methods: {
      setCurrentChallenge(challenge) {
        this.$emit('challenge-selected', challenge);
      },
    },
  };
</script>
  

<style>
  nav {
    margin-bottom: 20px;
  }
  #home{
    color: black;
    font-weight: lighter;
  }
  /* Stile per i nav-item */
  .nav-item.nav-item {
    color: white; 
    padding: 0.5rem 1rem; 
    transition: opacity 0.3s; 
  }
  .c2 {
    background-color: #0079FF; 
    border-radius: 20px;
    margin-right: 10px;
  }
  .c3 {
    background-color: #FB8500; 
    border-radius: 20px;
  }
</style>


