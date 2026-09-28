<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const typedMessage = ref('')
const message = "This page isn't where it should be."
let typingTimer = 0

function typeMessage() {
  if (typedMessage.value.length >= message.length) return

  typedMessage.value = message.slice(0, typedMessage.value.length + 1)
  typingTimer = window.setTimeout(typeMessage, 55)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedMessage.value = message
    return
  }

  typeMessage()
})

onBeforeUnmount(() => {
  window.clearTimeout(typingTimer)
})
</script>

<template>
  <section class="not-found-view layout-container page-view" aria-labelledby="not-found-title">
    <div class="not-found-view__copy">
      <p class="eyebrow"><span class="eyebrow__dot"></span>ERROR / 404</p>
      <h1 id="not-found-title" class="not-found-view__title">
        <span class="not-found-view__typed" aria-live="polite">{{ typedMessage }}</span><span class="page-intro__caret" aria-hidden="true"></span>
      </h1>
      <p class="not-found-view__description">
        The link may be outdated, or the page may have moved. Let's get you back on track.
      </p>
      <RouterLink class="button not-found-view__button" to="/">Back to overview <span aria-hidden="true">↗</span></RouterLink>
    </div>

    <div class="not-found-view__visual" aria-hidden="true">
      <span class="not-found-view__orbit not-found-view__orbit--outer"></span>
      <span class="not-found-view__orbit not-found-view__orbit--inner"></span>
      <span class="not-found-view__spark not-found-view__spark--one"></span>
      <span class="not-found-view__spark not-found-view__spark--two"></span>
      <span class="not-found-view__code">404</span>
      <span class="not-found-view__coordinate">SIGNAL LOST <i></i></span>
    </div>
  </section>
</template>