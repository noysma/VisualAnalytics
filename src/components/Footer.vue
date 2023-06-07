<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="bg-dark py-3 fixed-bottom">
    <div class="container">
      <div class="row text-center students">
        <div class="col-md-6">
          <p class="mb-0 name">Camilla Chiruzzi</p>
          <p class="mb-0 matr">Matricola 665334</p>
        </div>
        <div class="col-md-6">
          <p class="mb-0 name">Ismaele Gorgoglione</p>
          <p class="mb-0 matr">Matricola 544853</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
  .students{
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  }
  .name{
    font-weight: bold;
  }
  .matr{
    font-size: 0.9rem;
    font-weight: lighter;
  }
</style>