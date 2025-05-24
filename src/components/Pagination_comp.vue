<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <button @click="$emit('update:page', page - 1)" class="page-link">Prev</button>
      </li>
      <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: p === page }">
        <button @click="$emit('update:page', p)" class="page-link">{{ p }}</button>
      </li>
      <li class="page-item" :class="{ disabled: page === totalPages }">
        <button @click="$emit('update:page', page + 1)" class="page-link">Next</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const { page, total } = defineProps(['page', 'total'])
const itemsPerPage = 5
const totalPages = Math.ceil(total / itemsPerPage)
</script>
