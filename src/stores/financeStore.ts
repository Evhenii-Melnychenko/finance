import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Product } from '../interfaces'

export const products: Product[] = [
  { id: 1, name: 'Investment portfolio', category: 'Investments', description: 'A ready-made strategy balancing growth and stability.', accent: 'violet', metric: '+18.4%', metricLabel: 'annual return', featured: true },
  { id: 2, name: 'Crypto wallet', category: 'Digital assets', description: 'Hold and exchange assets with control at every step.', accent: 'cyan', metric: '24/7', metricLabel: 'market access' },
  { id: 3, name: 'Premium card', category: 'Everyday finance', description: 'Instant transfers and smart rewards for everyday spending.', accent: 'pink', metric: '2.5%', metricLabel: 'cashback' },
  { id: 4, name: 'Savings account', category: 'Savings', description: 'Build your financial safety net automatically every month.', accent: 'violet', metric: '12.8%', metricLabel: 'annual rate' },
  { id: 5, name: 'Private banking', category: 'Personal service', description: 'A dedicated manager and solutions for substantial capital.', accent: 'cyan', metric: '1:1', metricLabel: 'expert support' },
  { id: 6, name: 'Family account', category: 'Shared finance', description: 'Shared goals, transparent spending, and flexible limits.', accent: 'pink', metric: '4', metricLabel: 'members included' },
  { id: 7, name: 'Market insights', category: 'Investments', description: 'Live research and signals to help you navigate the market.', accent: 'violet', metric: '120+', metricLabel: 'weekly insights' },
  { id: 8, name: 'Global transfers', category: 'Everyday finance', description: 'Send money across borders with clear rates and no surprises.', accent: 'cyan', metric: '150+', metricLabel: 'countries supported' },
  { id: 9, name: 'Goal planner', category: 'Savings', description: 'Turn a long-term goal into a simple, visible savings plan.', accent: 'pink', metric: '3x', metricLabel: 'faster progress' },
]

export const useFinanceStore = defineStore('finance', () => {
  const favoriteIds = ref<number[]>([1])
  const selectedProductId = ref<number | null>(null)
  const isContactSent = ref(false)

  const favorites = computed(() => products.filter((product) => favoriteIds.value.includes(product.id)))
  const selectedProduct = computed(() => products.find((product) => product.id === selectedProductId.value) ?? null)

  function toggleFavorite(id: number) {
    favoriteIds.value = favoriteIds.value.includes(id)
      ? favoriteIds.value.filter((favoriteId) => favoriteId !== id)
      : [...favoriteIds.value, id]
  }

  function selectProduct(id: number) {
    selectedProductId.value = selectedProductId.value === id ? null : id
  }

  function markContactSent() {
    isContactSent.value = true
  }

  return { favoriteIds, favorites, selectedProduct, selectedProductId, isContactSent, toggleFavorite, selectProduct, markContactSent }
})
