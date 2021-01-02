<template>
  <main class="main-wrapper">
    <aside class="artist-list">
      <button :key="artist" v-for="artist in artists" @click="loadData(artist)">
        {{ artist }}
      </button>
    </aside>
    <section class="form-section" :style="`${loadedArtist ? bgArtist : ''}`">
      <form @submit="submitForm">
        <div class="form-row">
          <div class="col">
            <label for="name">Nome Artístico</label>
            <input id="name" type="text" class="form-control" v-model="name" required />
          </div>
          <div class="col">
            <label for="genres">Gêneros</label>
            <v-select
              class="genres"
              id="genres"
              v-model="genres"
              :no-drop="true"
              :close-on-select="false"
              multiple
              taggable
            ></v-select>
          </div>
        </div>
        <div class="form-group">
          <label for="description">Bio</label>
          <textarea
            id="description"
            v-model="description"
            cols="40"
            rows="5"
            class="form-control"
            required
          ></textarea>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label for="spotify">Spotify</label>
            <input id="spotify" v-model="networks.spotify" type="url" class="form-control" />
          </div>
          <div class="form-group col">
            <label for="instagram">Instagram</label>
            <input id="instagram" v-model="networks.instagram" type="url" class="form-control" />
          </div>
          <div class="form-group col">
            <label for="facebook">Facebook</label>
            <input id="facebook" v-model="networks.facebook" type="url" class="form-control" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col">
            <label for="twitter">Twitter</label>
            <input id="twitter" v-model="networks.twitter" type="url" class="form-control" />
          </div>
          <div class="form-group col">
            <label for="soundcloud">Soundcloud</label>
            <input id="soundcloud" v-model="networks.soundcloud" type="url" class="form-control" />
          </div>
          <div class="form-group col">
            <label for="youtube">Youtube</label>
            <input id="youtube" v-model="networks.youtube" type="url" class="form-control" />
          </div>
        </div>
        <div class="form-row">
          <div class="col-4">
            <div class="input-group">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="inputGroupFile01"
                  @change="onFileChange"
                />
                <label class="custom-file-label" for="inputGroupFile01">Foto do Artista</label>
              </div>
            </div>
          </div>
          <div class="col-2">
            <button name="submit" type="submit" class="btn btn-azul">
              {{ loadedArtist ? 'Atualizar' : 'Cadastrar' }}
            </button>
          </div>
          <div class="col-2">
            <button
              v-if="loadedArtist"
              name="submit"
              type="submit"
              class="btn btn-vermelho"
              @click="confirmRemove"
            >
              Remover
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import vSelect from 'vue-select';
import axios from 'axios';

export default {
  name: 'ArtistManagement',
  components: {
    vSelect
  },
  data() {
    return {
      loadedArtist: false,
      artists: [],
      name: '',
      genres: [],
      description: '',
      networks: {},
      artistPic: ''
    };
  },
  methods: {
    resetForm() {
      this.loadedArtist = false;
      this.name = '';
      this.genres = [];
      this.description = '';
      this.networks = {};
      this.artistPic = '';
    },
    confirmRemove() {
      const confDeletion = confirm(`Deseja mesmo eliminar ${this.name}?`);
      if (confDeletion) {
        axios
          .delete(`${this.$root.apiUrl}/artists/${this.name}`)
          .then(res => {
            console.debug(res);
            this.resetForm();
            this.loadedArtist = false;
            this.getArtists();
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    getArtists() {
      const oldThis = this;
      axios
        .get(`${this.$root.apiUrl}/artistNames`)
        .then(res => {
          console.debug(res);
          oldThis.artists = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    loadData(artist) {
      const oldThis = this;
      const confChanges = confirm('Deseja descartar suas alterações?');
      if (!this.loadedArtist || (this.loadedArtist && confChanges)) {
        axios
          .get(`${this.$root.apiUrl}/artists/${artist}`)
          .then(res => {
            console.debug(res);
            const resData = res.data;
            oldThis.name = resData.name;
            oldThis.genres = resData.genres;
            oldThis.description = resData.description;
            oldThis.networks = resData.networks;
            oldThis.artistPic = resData.artistPic;
            oldThis.loadedArtist = true;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    submitForm(event) {
      event.preventDefault();
      if (this.genres.length === 0) {
        alert('Forneça pelo menos um gênero');
        return false;
      }

      if (!this.loadedArtist && this.artistPic === '') {
        alert('Selecione uma foto para o artista');
        return false;
      }

      const payload = {
        name: this.name.trim(),
        genres: this.genres,
        description: this.description.trim(),
        networks: Object.values(this.networks).map(e => e.trim()),
        artistPic: this.artistPic
      };

      console.debug(payload);

      if (this.loadedArtist) {
        axios
          .put(`${this.$root.apiUrl}/artists/${this.name}`, payload)
          .then(res => {
            console.debug(res);
            this.resetForm();
            this.loadedArtist = false;
            this.getArtists();
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        axios
          .post(`${this.$root.apiUrl}/artists`, payload)
          .then(res => {
            console.debug(res);
            this.resetForm();
            this.loadedArtist = false;
            this.getArtists();
          })
          .catch(err => {
            console.error(err);
          });
      }
      return true;
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      const oldThis = this;

      reader.onload = e => {
        oldThis.artistPic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  },
  mounted() {
    // load 3rd party stuff
    const vueSelectStyle = document.createElement('link');
    vueSelectStyle.setAttribute('rel', 'stylesheet');
    vueSelectStyle.setAttribute('href', 'https://unpkg.com/vue-select@latest/dist/vue-select.css');
    document.head.appendChild(vueSelectStyle);

    const bootstrap = document.createElement('link');
    bootstrap.setAttribute('rel', 'stylesheet');
    bootstrap.setAttribute(
      'href',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
    );
    bootstrap.setAttribute(
      'integrity',
      'sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
    );
    bootstrap.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(bootstrap);
    // load 3rd party stuff

    this.getArtists();
  },
  computed: {
    imgName() {
      return this.name.toLowerCase().replace(/[^a-z]/g, '');
    },
    bgArtist() {
      return `background-image: url(${this.$root.apiUrl}/img/${this.imgName}.png);`;
    }
  }
};
</script>

<style scoped>
.main-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 3rem;
}

.artist-list {
  width: 20%;
  border: solid #ced4da 1px;
  border-radius: 0.25rem;
  overflow: scroll;
}

.form-section {
  flex-grow: 1;
  margin-left: 3rem;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.form-section label {
  color: white;
  font-family: var(--titulo);
  font-size: 1.5rem;
}

.form-section input,
.form-section textarea {
  color: white;
  background-color: black;
}

#description {
  resize: none;
}

.artist-list button {
  font-family: var(--titulo);
  font-size: 2rem;
  transition-duration: 0.15s;
  background-color: inherit;
  font-weight: bold;
  color: white;
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
}

.artist-list button:hover {
  transition-duration: 0.15s;
  background-color: var(--cor-principal);
  color: white;
  cursor: pointer;
}

.genres {
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  height: calc(1.5em + 0.75rem + 2px);
}

input.custom-file-input {
  cursor: pointer;
  z-index: 900;
}

.custom-file-label {
  background-color: black;
  cursor: pointer;
}

.custom-file-label::after {
  background-color: white;
  color: black;
  font-family: var(--titulo);
  font-size: 1.5rem;
  content: 'buscar' !important;
  cursor: pointer;
}

.btn-azul {
  background-color: var(--cor-principal);
  color: white;
  font-family: var(--titulo);
  font-size: 1.5rem;
  width: 100%;
}

.btn-azul:hover {
  background-color: dodgerblue;
  color: white;
}

.btn-vermelho {
  background-color: #b60000;
  color: white;
  font-family: var(--titulo);
  font-size: 1.5rem;
  width: 100%;
}

.btn-vermelho:hover {
  background-color: red;
  color: white;
}
</style>
