<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner layout-container">
      <RouterLink class="app-header__brand" to="/" aria-label="Brand name" @click="closeMenu">
        <span class="app-header__brand-mark">B</span>
        <span class="app-header__brand-name">Brand<span>name</span></span>
      </RouterLink>
      <button class="app-header__menu-toggle" type="button" :aria-expanded="isMenuOpen" aria-label="Open menu" @click="isMenuOpen = !isMenuOpen">
        <span></span><span></span>
      </button>
      <nav class="app-header__nav" :class="{ 'app-header__nav--open': isMenuOpen }" aria-label="Main navigation">
        <RouterLink class="app-header__link" to="/" exact-active-class="app-header__link--active" @click="closeMenu">Overview</RouterLink>
        <RouterLink class="app-header__link" to="/products" active-class="app-header__link--active" @click="closeMenu">Products</RouterLink>
        <RouterLink class="app-header__link" to="/contacts" active-class="app-header__link--active" @click="closeMenu">Contact</RouterLink>
        <RouterLink class="button button--small app-header__cta" to="/contacts" @click="closeMenu">Get started</RouterLink>
      </nav>
    </div>
  </header>
</template>
