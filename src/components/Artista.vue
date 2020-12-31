<template>
  <router-link class="artist" :style="this.sectionStyle" :to="`artista/${this.$props.artist.name}`">
    <header>{{ artist.name }}</header>
    <footer>{{ artist.genres[0] }}</footer>
  </router-link>
</template>

<script>
export default {
  name: 'Artista',
  props: {
    artist: Object
  },
  computed: {
    imgName() {
      return this.artist.name.toLowerCase().replace(/[^a-z]/g, '');
    },
    sectionStyle() {
      return `background-image: url(http://${process.env.VUE_APP_BACKEND_URL}/img/${this.imgName}.png);`;
    }
  }
};
</script>

<style scoped>
.artist {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(100%);

  cursor: pointer;
  transition-duration: 0.3s;
}

.artist:hover {
  color: var(--cor-principal);
  filter: grayscale(0%);
  transition-duration: 0.2s;
}

header {
  background-color: var(--realce);
  font-family: var(--titulo);
  font-size: 2rem;
  width: 100%;
  align-self: flex-start;
}

footer {
  background-color: var(--realce);
  font-family: var(--titulo);
  width: 100%;
}
</style>
