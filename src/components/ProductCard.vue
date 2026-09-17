<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '../stores/financeStore'

const props = defineProps<{ product: Product; isFavorite: boolean; isSelected: boolean }>()
const emit = defineEmits<{ favorite: [id: number]; select: [id: number] }>()
const cardClass = computed(() => [`product-card--${props.product.accent}`, { 'product-card--featured': props.product.featured, 'product-card--selected': props.isSelected }])
</script>

<template>
  <article class="product-card" :class="cardClass">
    <div class="product-card__topline">
      <span class="product-card__category">{{ product.category }}</span>
      <button class="product-card__favorite" :class="{ 'product-card__favorite--active': isFavorite }" type="button" :aria-label="isFavorite ? 'Remove from favorites' : 'Add to favorites'" @click="emit('favorite', product.id)">
        {{ isFavorite ? '★' : '☆' }}
      </button>
    </div>
    <div class="product-card__icon">↗</div>
    <h3 class="product-card__title">{{ product.name }}</h3>
    <p class="product-card__description">{{ product.description }}</p>
    <div class="product-card__metric"><strong>{{ product.metric }}</strong><span>{{ product.metricLabel }}</span></div>
    <button class="product-card__action" type="button" @click="emit('select', product.id)">{{ isSelected ? 'Selected' : 'View details' }} <span>→</span></button>
  </article>
</template>
