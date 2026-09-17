<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-shell__main">
      <Transition name="page" mode="out-in">
        <RouterView />
      </Transition>
    </main>
    <AppFooter />
  </div>
</template>
