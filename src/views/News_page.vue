<template>
  <div class="container py-4">
    <h1 class="text-center mb-4">🎮 geme dev news Archive</h1>

    <div class="row">
      <div v-for="item in paginated" :key="item.blog_url" class="col-12 col-md-6 col-xl-4 mb-4">
        <NewsCard :news="item" />
      </div>
    </div>

    <nav class="d-flex justify-content-center mt-4">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
        </li>
        <li class="page-item disabled">
          <span class="page-link">Page {{ currentPage }} / {{ totalPages }}</span>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NewsCard from '../components/NewsCard.vue'

const news = ref([])
const currentPage = ref(1)
const pageSize = 4

onMounted(async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}news.json`)
  const raw = await res.json()
  news.value = raw
    .map((item) => {
      const yearMatch = item.title.match(/(20\d{2})/)
      const year = yearMatch ? parseInt(yearMatch[1]) : 2010
      return {
        ...item,
        timestamp: new Date(`${year}-01-01`).getTime(),
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp)
})

const paginated = computed(() =>
  news.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize),
)
const totalPages = computed(() => Math.ceil(news.value.length / pageSize))

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>
