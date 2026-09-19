<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const benefits = [
  { icon: '◈', title: 'Stay in control', text: 'One hub for your money, investments, and everyday spending.' },
  { icon: '↗', title: 'Grow with confidence', text: 'Insights and guidance help you make better decisions on time.' },
  { icon: '⌁', title: 'Transfers in seconds', text: 'Send money to the people you care about without the wait.' },
]

interface StatItem {
  value: number
  target: number
  decimals: number
  prefix?: string
  suffix?: string
  label: string
}

const stats = ref<StatItem[]>([
  { value: 0, target: 860, decimals: 0, prefix: '$', suffix: 'M', label: 'assets under management' },
  { value: 0, target: 99.9, decimals: 1, suffix: '%', label: 'platform uptime' },
  { value: 0, target: 4.9, decimals: 1, suffix: ' ★', label: 'average client rating' },
])

const heroTitleTexts = ['Your capital.', 'Your future.', 'Your freedom.']
const typedHeroTitle = ref('')
let animationFrame = 0
let typingTimer = 0
let heroTitleIndex = 0
let heroCharacterIndex = 0
let isDeletingHeroTitle = false

function typeHeroTitle() {
  const currentTitle = heroTitleTexts[heroTitleIndex] ?? heroTitleTexts[0] ?? ''
  const typingSpeed = isDeletingHeroTitle ? 55 : 95

  heroCharacterIndex += isDeletingHeroTitle ? -1 : 1
  typedHeroTitle.value = currentTitle.slice(0, heroCharacterIndex)

  if (!isDeletingHeroTitle && heroCharacterIndex === currentTitle.length) {
    isDeletingHeroTitle = true
    typingTimer = window.setTimeout(typeHeroTitle, 1600)
    return
  }

  if (isDeletingHeroTitle && heroCharacterIndex === 0) {
    isDeletingHeroTitle = false
    heroTitleIndex = (heroTitleIndex + 1) % heroTitleTexts.length
    typingTimer = window.setTimeout(typeHeroTitle, 300)
    return
  }

  typingTimer = window.setTimeout(typeHeroTitle, typingSpeed)
}

function animateStats() {
  const startedAt = performance.now()
  const duration = 1500

  function updateStats(currentTime: number) {
    const progress = Math.min((currentTime - startedAt) / duration, 1)
    const easedProgress = 1 - Math.pow(1 - progress, 3)

    stats.value.forEach((stat) => {
      stat.value = stat.target * easedProgress
    })

    if (progress < 1) {
      animationFrame = requestAnimationFrame(updateStats)
    }
  }

  animationFrame = requestAnimationFrame(updateStats)
}

onMounted(() => {
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (shouldReduceMotion) {
    typedHeroTitle.value = heroTitleTexts[0] ?? ''
    stats.value.forEach((stat) => { stat.value = stat.target })
    return
  }

  typeHeroTitle()
  animateStats()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  window.clearTimeout(typingTimer)
})
</script>

<template>
  <div class="home-view">
    <section class="hero-section layout-container">
      <div class="hero-section__content reveal-item">
        <p class="eyebrow"><span class="eyebrow__dot"></span>Next-generation finance</p>
        <h1 class="hero-section__title"><span class="hero-section__typed-title">{{ typedHeroTitle }}</span><span class="hero-section__caret" aria-hidden="true"></span><br /><em>Your rules.</em></h1>
        <p class="hero-section__description">Tools for people who want to do more than hold money. Build your future with it.</p>
        <div class="hero-section__actions">
          <RouterLink class="button" to="/products">Explore possibilities <span>↗</span></RouterLink>
        </div>
        <div class="hero-section__trust"><span class="hero-section__avatars"><i>A</i><i>M</i><i>K</i></span><span>More than 12,000 people<br />are already with us</span></div>
      </div>
      <div class="hero-widget reveal-item reveal-item--delay">
        <div class="hero-widget__glow"></div>
        <div class="hero-widget__header"><span class="hero-widget__label">Total balance</span><span class="hero-widget__menu">•••</span></div>
        <p class="hero-widget__balance">$ 248,000<sup>00</sup></p>
        <p class="hero-widget__change"><span>↗ 12.48%</span> this month</p>
        <div class="hero-widget__chart"><span class="hero-widget__chart-fill"></span><svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 83 C30 78 42 88 68 69 S102 77 125 58 S156 60 180 68 S210 35 236 50 S263 57 290 33 S318 44 340 22 S370 32 400 5" /></svg></div>
        <div class="hero-widget__dates"><span>01 Dec</span><span>31 Dec</span></div>
        <div class="hero-widget__footer"><span><i class="hero-widget__indicator"></i> Portfolio growth</span><strong>+ $27,450</strong></div>
      </div>
    </section>

    <section class="stats-strip layout-container reveal-item">
      <div v-for="stat in stats" :key="stat.label">
        <strong>{{ stat.prefix }}{{ stat.value.toFixed(stat.decimals) }}{{ stat.suffix }}</strong>
        <span>{{ stat.label }}</span>
      </div>
    </section>

    <section class="benefits-section layout-container">
      <div class="section-heading reveal-item"><div><p class="eyebrow"><span class="eyebrow__dot"></span>Why Brand</p><h2>More possibilities.<br /><em>Fewer limitations.</em></h2></div><p>We create a financial experience that feels simple, transparent, and truly yours.</p></div>
      <div class="benefits-grid">
        <article v-for="benefit in benefits" :key="benefit.title" class="benefit-card reveal-item"><span class="benefit-card__icon">{{ benefit.icon }}</span><h3>{{ benefit.title }}</h3><p>{{ benefit.text }}</p><span class="benefit-card__arrow">↗</span></article>
      </div>
    </section>
  </div>
</template>
