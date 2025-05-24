<template>
  <div class="card h-100 shadow-sm">
    <img :src="news.image_url" class="card-img-top" alt="news image" />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ news.title }}</h5>
      <p class="card-text mb-1"><strong>Author:</strong> {{ news.author_name }}</p>
      <p class="card-text mb-2"><strong>Date:</strong> {{ formatDate(news.timestamp) }}</p>
      <a :href="news.blog_url" class="btn btn-primary mt-auto" target="_blank">Read More</a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  news: Object,
})

function formatDate(ts) {
  return new Date(ts).toLocaleDateString()
}
</script>
