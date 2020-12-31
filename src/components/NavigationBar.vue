<template>
  <header class="site-header">
    <router-link class="navbar-logo" to="/home">
      <img src="@/assets/logo.png" alt="Logo" />
    </router-link>
    <nav class="navbar">
      <ul class="navbar-items">
        <li>
          <router-link :to="{ path: '/artistas' }" replace>Artistas</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/lancamentos' }" replace>Lançamentos</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/loja' }" replace>Loja</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/contato' }" replace>Contato</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'NavigationBar'
};
</script>

<style scoped>
.site-header {
  display: flex;
  padding: 3rem;
  justify-content: space-between;
  align-self: start;
}

.navbar {
  width: fit-content;
  display: flex;
}

.navbar-items {
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: center;
}

.navbar-items li {
  margin: 0.5rem;
}

.navbar-items li * {
  transition-duration: 0.15s;
  text-decoration: none;
  font-family: var(--titulo);
  font-size: 2rem;
  padding: 0.5rem;
  color: var(--sombra);
  background-color: var(--realce);
  border-bottom: 6px solid var(--cor-principal);
}

.navbar-items li *:hover {
  transition-duration: 0.15s;
  color: var(--realce);
  background-color: var(--sombra);
  border-bottom: 6px solid var(--realce);
}

.navbar-logo img {
  height: 6rem;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
}

@media (max-width: 360px) {
  /* pegar do curso de css */
  .navbar-logo img {
    height: 2rem;
  }

  .navbar-items li * {
    font-size: 1.5rem;
  }

  .navbar-items {
    flex-direction: column;
  }

  h1.title {
    font-size: 1rem;
  }
}
</style>
