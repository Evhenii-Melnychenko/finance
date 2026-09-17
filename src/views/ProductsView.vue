<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { products, useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const activeCategory = ref('All')
const productsLimit = ref(6)
const categories = ['All', 'Investments', 'Digital assets', 'Everyday finance', 'Savings', 'Personal service', 'Shared finance']
const filteredProducts = computed(() => activeCategory.value === 'All' ? products : products.filter((product) => product.category === activeCategory.value))
const visibleProducts = computed(() => activeCategory.value === 'All' ? filteredProducts.value.slice(0, productsLimit.value) : filteredProducts.value)
const hasMoreProducts = computed(() => activeCategory.value === 'All' && visibleProducts.value.length < filteredProducts.value.length)
const hasLessProducts = computed(() => activeCategory.value === 'All' && productsLimit.value > 6)

function selectCategory(category: string) {
  activeCategory.value = category
  productsLimit.value = 6
}

function showMoreProducts() {
  productsLimit.value += 3
}

function showLessProducts() {
  productsLimit.value = 6
}
</script>

<template>
  <div class="products-view layout-container page-view">
    <section class="page-intro reveal-item"><div><p class="eyebrow"><span class="eyebrow__dot"></span>Brand ecosystem</p><h1 class="page-intro__title">Tools for<br /><em>your next move.</em></h1></div><p class="page-intro__description">Choose the products that turn your plans into a clear financial strategy.</p></section>
    <div class="products-view__toolbar reveal-item"><div class="filter-tabs" role="tablist"><button v-for="category in categories" :key="category" class="filter-tabs__item" :class="{ 'filter-tabs__item--active': activeCategory === category }" type="button" @click="selectCategory(category)">{{ category }}</button></div><span class="products-view__count">{{ visibleProducts.length }} of {{ filteredProducts.length }} products</span></div>
    <TransitionGroup name="product-list" tag="div" class="products-grid"><ProductCard v-for="product in visibleProducts" :key="product.id" :product="product" :is-favorite="store.favoriteIds.includes(product.id)" :is-selected="store.selectedProductId === product.id" @favorite="store.toggleFavorite" @select="store.selectProduct" /></TransitionGroup>
    <div v-if="hasMoreProducts || hasLessProducts" class="products-view__actions">
      <button v-if="hasMoreProducts" class="products-view__load-more" type="button" @click="showMoreProducts">Show more <span>↓</span></button>
      <button v-if="hasLessProducts" class="products-view__load-more" type="button" @click="showLessProducts">Show less <span>↑</span></button>
    </div>
    <div v-if="store.selectedProduct" class="selection-note reveal-item"><span>Selected</span><strong>{{ store.selectedProduct.name }}</strong><RouterLink to="/contacts" class="text-link">Discuss with an expert →</RouterLink></div>
  </div>
</template>
