<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap&subset=cyrillic');

html, body {
  padding: 0;
  margin: 0;
}

html *:not(i) {
  font-family: 'Montserrat', sans-serif !important;
}

body {
  background-color: #F5F6FA;
  height: 100vh;
}

#app {
  height: 100%;
  width: 100%;
}
</style>