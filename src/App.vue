<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class="bg-dark text-light">

  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    // NOTE this sets the active monster once when the application starts!
    AppState.activeMonster = ref(AppState.monsters.shift())

    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
