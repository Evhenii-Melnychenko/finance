<script setup lang="ts">
    const currentYear:number = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="app-footer__inner layout-container">
      <RouterLink class="app-footer__brand" to="/">Brand<span>name</span></RouterLink>
      <p class="app-footer__copy">Finance that works for you.</p>
      <p class="app-footer__legal">© {{ currentYear }} Brand name</p>
    </div>
  </footer>
</template>
