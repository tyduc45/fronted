<template>
  <form class="row mb-4">
    <div class="col">
      <input v-model="proxyModel.title" class="form-control" placeholder="Title" />
    </div>
    <div class="col">
      <input v-model="proxyModel.content" class="form-control" placeholder="Content" />
    </div>
    <div class="col">
      <input v-model="proxyModel.category" class="form-control" placeholder="Category" />
    </div>
    <div class="col">
      <input v-model="proxyModel.date" class="form-control" placeholder="YYYY-MM-DD" />
    </div>
  </form>
</template>

<script setup>
import { computed } from 'vue'

// get user
const props = defineProps(['model'])

// user update
const emit = defineEmits(['update:model'])

// 3. 建立响应式代理
const proxyModel = computed({
  get: () => props.model,
  set: (val) => emit('update:model', val),
})
</script>
