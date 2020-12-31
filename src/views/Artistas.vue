<template>
  <main>
    <h1 class="title">{{ this.$options.name }}</h1>
    <div class="artists">
      <Artista v-for="art in artists" :key="art.name" :artist="art" />
    </div>
  </main>
</template>

<script>
import Artista from '@/components/Artista.vue';
import axios from 'axios';

export default {
  name: 'artistas',
  components: { Artista },
  data() {
    return {
      artists: []
    };
  },
  mounted() {
    axios
      .get(`http://${process.env.VUE_APP_BACKEND_URL}/artists`)
      .then(res => {
        this.artists = res.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style scoped>
.artists {
  text-align: center;
  margin: 2rem 5rem;
  display: grid !important;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, 15rem);
  grid-auto-rows: 15rem;
  grid-gap: 2rem;
  justify-content: center;
}
</style>
