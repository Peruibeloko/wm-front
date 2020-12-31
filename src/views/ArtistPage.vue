<template>
  <main>
    <h1 class="title">{{ name }}</h1>
    <section class="info-style bg-image" :style="artistPicStyle">
      <div class="block">
        <h2 class="big-text">Gêneros</h2>
        <br />
        <span class="small-text">
          {{ genreString }}
        </span>
      </div>
      <div class="block">
        <h2 class="big-text">Bio</h2>
        <br />
        <blockquote class="small-text bio">{{ description }}</blockquote>
      </div>
      <div class="block">
        <h2 class="big-text">Redes</h2>
        <div class="social-media">
          <ul class="small-text links">
            <li :key="link" v-for="link in Object.keys(networks)">
              <a target="_blank" :href="networks[link]">{{ link }}</a>
            </li>
          </ul>
          <ul class="small-text icons">
            <li :key="link" v-for="link in Object.keys(networks)">
              <a target="_blank" :href="networks[link]"><i :class="'fab fa-' + link"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'artistPage',
  data() {
    return {
      name: '',
      genres: [],
      genreString: '',
      description: '',
      networks: {}
    };
  },
  mounted() {
    const fontAwesome = document.createElement('script');
    fontAwesome.setAttribute('src', 'https://kit.fontawesome.com/4a25233ce5.js');
    document.head.appendChild(fontAwesome);

    axios
      .get(`http://${process.env.VUE_APP_BACKEND_URL}/artists/${this.$route.params.name}`)
      .then(res => {
        this.name = res.data.name;
        this.genres = res.data.genres;
        this.genreString = res.data.genres.reduce(
          (out, curr, idx, src) => out + (idx < src.length ? ', ' : '') + curr
        );
        this.description = res.data.description;
        this.networks = res.data.networks;
      })
      .catch(err => {
        console.error(err);
      });
  },
  computed: {
    imgName() {
      return this.name.toLowerCase().replace(/[^a-z]/g, '');
    },
    artistPicStyle() {
      return `background-image: url(http://${process.env.VUE_APP_BACKEND_URL}/img/${this.imgName}.png), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 95%, rgba(0,0,0,1) 100%);`;
    }
  }
};
</script>

<style scoped>
* {
  font-family: var(--titulo);
  color: var(--realce);
  list-style-type: none;
}

.small-text,
.small-text * {
  font-family: var(--texto);
  font-size: 1.5rem;
}

.bio {
  font-family: var(--texto);
  font-size: 1.5rem;
  max-width: 40%;
  float: right;
}

.big-text {
  font-size: 5rem;
  border-bottom: var(--cor-principal) solid 10px;
  display: inline-block;
  line-height: 4rem;
  margin-bottom: 2rem;
}

.info-style {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 30rem;
  text-align: right;
}

.block {
  padding: 2rem;
  padding-right: 4rem;
}

.social-media {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.social-media .links li a {
  padding-right: 1rem;
  text-decoration: none;
  text-transform: capitalize;
}

.social-media .icons li a {
  text-align: center;
}

.social-media .icons li a i {
  text-align: center;
  font-family: 'Font Awesome 5 Brands', sans-serif !important;
}

.bg-image {
  background-blend-mode: overlay;
  background-size: 70%;
  background-position: top 50% left -30%;
  background-repeat: no-repeat;
}
</style>
