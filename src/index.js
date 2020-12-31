import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Loja from '@/views/Loja.vue';
import Artistas from '@/views/Artistas.vue';
import Lancamentos from '@/views/Lancamentos.vue';
import Contato from '@/views/Contato.vue';
import ArtistPage from '@/views/ArtistPage.vue';
import NotFound from '@/views/NotFound.vue';
import ArtistManagement from '@/views/ArtistManagement.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/loja',
    component: Loja,
    meta: { title: 'Loja' }
  },
  {
    path: '/artistas',
    component: Artistas,
    meta: { title: 'Artistas' }
  },
  {
    path: '/artista/:name',
    component: ArtistPage
  },
  {
    path: '/artistMgmt',
    component: ArtistManagement,
    meta: { title: 'Administração' }
  },
  {
    path: '/lancamentos',
    component: Lancamentos,
    meta: { title: 'Lancamentos' }
  },
  {
    path: '/contato',
    component: Contato,
    meta: { title: 'Contato' }
  },
  {
    path: '*',
    component: NotFound,
    meta: { title: '404' }
  }
];

const router = new VueRouter({
  routes
});

router.afterEach(to => {
  document.title = `WobbleMakers - ${to.meta.title || to.params.name}`;
});

export default router;
