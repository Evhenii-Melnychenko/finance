<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const isSubmitted = ref(false)

function submitForm() {
  errors.name = form.name.trim() ? '' : 'Enter your name'
  errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Check your email address'
  errors.message = form.message.trim().length >= 10 ? '' : 'Message must be at least 10 characters'
  if (errors.name || errors.email || errors.message) return
  store.markContactSent()
  isSubmitted.value = true
}
</script>

<template>
  <div class="contacts-view layout-container page-view">
    <section class="page-intro page-intro--contacts reveal-item"><div><p class="eyebrow"><span class="eyebrow__dot"></span>Let's connect</p><h1 class="page-intro__title">Let's discuss<br /><em>your plans.</em></h1></div><p class="page-intro__description">Tell us what you want to achieve. A specialist will reply within one business day.</p></section>
    <div class="contacts-view__grid">
      <form class="contact-form reveal-item" novalidate @submit.prevent="submitForm"><h2>Send us a message</h2><p>Fill out the form and we will get back to you.</p><label class="form-field"><span>Your name</span><input v-model="form.name" type="text" placeholder="Alex Morgan" /><small v-if="errors.name">{{ errors.name }}</small></label><label class="form-field"><span>Email</span><input v-model="form.email" type="email" placeholder="you@example.com" /><small v-if="errors.email">{{ errors.email }}</small></label><label class="form-field"><span>Message</span><textarea v-model="form.message" rows="4" placeholder="Tell us about your goals"></textarea><small v-if="errors.message">{{ errors.message }}</small></label><button class="button contact-form__submit" type="submit">{{ isSubmitted ? 'Message sent ✓' : 'Send message ↗' }}</button></form>
      <aside class="contact-info reveal-item reveal-item--delay"><div class="contact-info__top"><span class="contact-info__orb">✦</span><h2>Always<br /><em>close by.</em></h2></div><p>A personal approach starts with a simple conversation.</p><dl><div><dt>Office</dt><dd>1 Canada Square, London E14 5AB</dd></div><div><dt>Support</dt><dd>hello@Brand.capital<br />+44 20 7946 0958</dd></div><div><dt>Socials</dt><dd class="contact-info__socials"><a href="https://t.me" target="_blank" rel="noreferrer">Telegram</a><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></dd></div></dl></aside>
    </div>
  </div>
</template>
