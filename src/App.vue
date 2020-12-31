<template>
  <div id="app">
    <NavigationBar />
    <transition
      name="fade"
      mode="out-in"
      @beforeLeave="beforeLeave"
      @enter="enter"
      @afterEnter="afterEnter"
    >
      <router-view class="main-content" />
    </transition>
    <FooterBar />
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import FooterBar from '@/components/FooterBar.vue';

export default {
  components: {
    NavigationBar,
    FooterBar
  },
  data() {
    return {
      prevHeight: 0
    };
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&display=swap');

:root {
  --cor-principal: #191970;
  --sombra: black;
  --realce: #f9f9f9;
  --titulo: 'Bebas Neue', Arial, sans-serif;
  --texto: 'Fira Sans Condensed', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*::selection {
  background-color: var(--cor-principal);
  text-shadow: var(--sombra) 0.02em 0.02em 0.05em;
  color: var(--realce);
}

#app {
  background-color: var(--sombra);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(min-content, max-content);
  min-height: 100vh;
}

h1.title {
  font-family: var(--titulo);
  text-align: center;
  font-size: 5rem;
  color: var(--realce);
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

@media (max-device-width: 812px) {
  h1.title {
    font-size: 3rem;
  }
}
</style>
