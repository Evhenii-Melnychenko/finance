<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

interface TeamMember {
  name: string
  role: string
  initials: string
  accent: 'violet' | 'cyan' | 'pink' | 'green'
  bio: string
  focus: string
}

const teamMembers: TeamMember[] = [
  { name: 'Maya Chen', role: 'Chief investment officer', initials: 'MC', accent: 'violet', bio: 'Turns long-term ambition into calm, considered investment strategy.', focus: 'Portfolio strategy' },
  { name: 'Noah Williams', role: 'Head of private clients', initials: 'NW', accent: 'cyan', bio: 'Makes complex financial decisions feel clear, personal, and actionable.', focus: 'Private wealth' },
  { name: 'Elena Rossi', role: 'Digital assets lead', initials: 'ER', accent: 'pink', bio: 'Brings thoughtful risk management to the future of digital ownership.', focus: 'Digital assets' },
  { name: 'Sam Okafor', role: 'Product & experience', initials: 'SO', accent: 'green', bio: 'Designs the quiet details that make every money moment work better.', focus: 'Product design' },
]

const activeMember = ref<TeamMember | null>(null)
const tiltStyles = new Map<string, Record<string, string>>()
const introTexts = ['Good money.', 'Smart money.', 'Your money.']
const typedIntro = ref('')
let introTimer = 0
let introIndex = 0
let introCharacterIndex = 0
let isDeletingIntro = false

function typeIntro() {
  const currentText = introTexts[introIndex] ?? introTexts[0] ?? ''
  const typingSpeed = isDeletingIntro ? 55 : 95

  introCharacterIndex += isDeletingIntro ? -1 : 1
  typedIntro.value = currentText.slice(0, introCharacterIndex)

  if (!isDeletingIntro && introCharacterIndex === currentText.length) {
    isDeletingIntro = true
    introTimer = window.setTimeout(typeIntro, 1600)
    return
  }

  if (isDeletingIntro && introCharacterIndex === 0) {
    isDeletingIntro = false
    introIndex = (introIndex + 1) % introTexts.length
    introTimer = window.setTimeout(typeIntro, 300)
    return
  }

  introTimer = window.setTimeout(typeIntro, typingSpeed)
}

function handleTilt(event: MouseEvent, member: TeamMember) {
  const card = event.currentTarget as HTMLElement
  const bounds = card.getBoundingClientRect()
  const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7
  const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 9
  const style = { '--rotate-x': `${rotateX}deg`, '--rotate-y': `${rotateY}deg` }
  tiltStyles.set(member.name, style)
}

function resetTilt(member: TeamMember) {
  tiltStyles.set(member.name, { '--rotate-x': '0deg', '--rotate-y': '0deg' })
}

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    typedIntro.value = introTexts[0] ?? ''
    return
  }

  typeIntro()
})

onBeforeUnmount(() => {
  window.clearTimeout(introTimer)
})
</script>

<template>
  <div class="team-view layout-container page-view">
    <section class="page-intro team-view__intro reveal-item">
      <div>
        <p class="eyebrow"><span class="eyebrow__dot"></span>The people behind Brand name</p>
        <h1 class="page-intro__title"><span class="page-intro__typed-title">{{ typedIntro }}</span><span class="page-intro__caret" aria-hidden="true"></span><br /><em>needs good people.</em></h1>
      </div>
      <p class="page-intro__description">A small, experienced team helping you make decisions with more clarity and less noise.</p>
    </section>

    <section class="team-grid" aria-label="Our team">
      <article
        v-for="(member, index) in teamMembers"
        :key="member.name"
        class="team-card reveal-item"
        :class="`team-card--${member.accent}`"
        :style="tiltStyles.get(member.name)"
        @mousemove="handleTilt($event, member)"
        @mouseleave="resetTilt(member)"
      >
        <div class="team-card__aurora"></div>
        <div class="team-card__topline"><span>0{{ index + 1 }}</span><span>{{ member.focus }}</span></div>
        <div class="team-card__portrait" aria-hidden="true"><span>{{ member.initials }}</span><i></i></div>
        <div class="team-card__identity"><h2>{{ member.name }}</h2><p>{{ member.role }}</p></div>
        <button class="team-card__info" type="button" :aria-label="`View ${member.name}'s profile`" @click="activeMember = member"><span>Profile</span><b>↗</b></button>
        <div class="team-card__shine"></div>
      </article>
    </section>

    <section class="team-view__footer reveal-item">
      <p><span class="eyebrow__dot"></span>One team. One clear direction.</p>
      <RouterLink class="text-link" to="/contacts">Start a conversation <span>→</span></RouterLink>
    </section>
  </div>

  <div v-if="activeMember" class="team-modal" @click.self="activeMember = null">
    <article class="team-modal__dialog" :class="`team-modal__dialog--${activeMember.accent}`" role="dialog" aria-modal="true" :aria-label="activeMember.name">
      <button class="team-modal__close" type="button" aria-label="Close profile" @click="activeMember = null">×</button>
      <div class="team-modal__portrait">{{ activeMember.initials }}</div>
      <p class="eyebrow"><span class="eyebrow__dot"></span>{{ activeMember.role }}</p>
      <h2>{{ activeMember.name }}</h2>
      <p>{{ activeMember.bio }}</p>
      <div class="team-modal__links"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a><RouterLink to="/contacts" @click="activeMember = null">Connect ↗</RouterLink></div>
    </article>
  </div>
</template>