<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)
const isLightTheme = ref(false)

function applyTheme(isLight: boolean) {
  isLightTheme.value = isLight
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark'
  localStorage.setItem('nexa-theme', isLight ? 'light' : 'dark')
}

function toggleTheme() {
  applyTheme(!isLightTheme.value)
}

function closeMenu() {
  isMenuOpen.value = false
}

onMounted(() => {
  applyTheme(localStorage.getItem('nexa-theme') === 'light')
})
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner layout-container">
      <RouterLink class="app-header__brand" to="/" aria-label="Brand name" @click="closeMenu">
        <span class="app-header__brand-mark">B</span>
        <span class="app-header__brand-name">Brand<span> name</span></span>
      </RouterLink>
      <button class="app-header__menu-toggle" type="button" :aria-expanded="isMenuOpen" aria-label="Open menu" @click="isMenuOpen = !isMenuOpen">
        <span></span><span></span>
      </button>
      <nav class="app-header__nav" :class="{ 'app-header__nav--open': isMenuOpen }" aria-label="Main navigation">
        <RouterLink class="app-header__link" to="/" exact-active-class="app-header__link--active" @click="closeMenu">Overview</RouterLink>
        <RouterLink class="app-header__link" to="/products" active-class="app-header__link--active" @click="closeMenu">Products</RouterLink>
        <RouterLink class="app-header__link" to="/team" active-class="app-header__link--active" @click="closeMenu">Our team</RouterLink>
        <RouterLink class="app-header__link" to="/contacts" active-class="app-header__link--active" @click="closeMenu">Contact</RouterLink>
        <button
          class="app-header__theme-toggle"
          type="button"
          :aria-label="isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'"
          :title="isLightTheme ? 'Switch to dark theme' : 'Switch to light theme'"
          @click="toggleTheme"
        >
          <span aria-hidden="true">{{ isLightTheme ? '☾' : '☀' }}</span>
        </button>
        <RouterLink class="button button--small app-header__cta" to="/contacts" @click="closeMenu">Get started</RouterLink>
      </nav>
    </div>
  </header>
</template>
