<script setup lang="ts">
const partners = [
  'Northstar',
  'Apex Capital',
  'Lattice',
  'Velora',
  'SummitPay',
  'Nova Ledger',
  'Crestline',
  'Beacon Group',
  'Horizon One',
  'Quantum',
]
</script>

<template>
  <section class="partners-marquee" aria-label="Our partners">
    <div class="layout-container">
        <div class="layout-container partners-marquee__header">
            <p class="eyebrow"><span class="eyebrow__dot"></span>Our partners</p>
            <p class="partners-marquee__text">Trusted by teams building resilient futures.</p>
        </div>

        <div class="partners-marquee__track-wrap">
        <div class="partners-marquee__track">
            <div v-for="(partner, index) in partners" :key="`partner-${partner}-${index}`" class="partners-marquee__item">
            {{ partner }}
            </div>
            <div v-for="(partner, index) in partners" :key="`partner-duplicate-${partner}-${index}`" class="partners-marquee__item" aria-hidden="true">
            {{ partner }}
            </div>
        </div>
        </div>
    </div>
  </section>
</template>
