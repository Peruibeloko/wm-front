<template>
  <footer class="site-footer">
    <nav class="footer-nav">
      <ul class="nav-items">
        <li>
          <router-link to="/">Look</router-link>
        </li>
        <li>
          <router-link to="/">at</router-link>
        </li>
        <li>
          <router-link to="/">these</router-link>
        </li>
        <li>
          <router-link to="/">footer</router-link>
        </li>
        <li>
          <router-link to="/">links</router-link>
        </li>
      </ul>
    </nav>
    <small class="legal-notices">© WobbleMakers Records 2020</small>
  </footer>
</template>

<script>
export default {
  name: 'FooterBar'
};
</script>

<style scoped>
.site-footer {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: end;
}

.legal-notices {
  color: var(--realce);
  font-family: var(--titulo);
}

.footer-nav {
  width: fit-content;
}

.nav-items {
  display: flex;
  list-style: none;
  font-family: var(--titulo);
  font-size: 1.5rem;
}

.nav-items li {
  padding: 1rem;
}

.nav-items li * {
  text-decoration: none;
  color: var(--realce);
}

.nav-items li *:hover {
  color: var(--cor-principal);
}
</style>
