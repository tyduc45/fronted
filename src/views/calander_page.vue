<template>
  <div class="container py-5">
    <div class="text-center mb-5">
      <h1 class="fw-bold text-primary">🎯 Game Dev Milestones</h1>
      <p class="lead text-secondary">
        Set goals, monitor deadlines, and push yourself to finish your game!
      </p>
    </div>

    <!-- Add Milestone -->
    <div class="card shadow-sm p-4 mb-4">
      <h4 class="mb-3">📌 Add a New Milestone</h4>
      <input v-model="newMilestone.title" placeholder="Title" class="form-control mb-2" />
      <input
        v-model="newMilestone.description"
        placeholder="Description"
        class="form-control mb-2"
      />
      <input v-model="newMilestone.deadline" type="date" class="form-control mb-2" />
      <button class="btn btn-success" @click="addMilestone">Add</button>
    </div>

    <!-- Milestone List -->
    <div v-if="milestones.length > 0">
      <div v-for="(milestone, index) in milestones" :key="milestone.id" class="card mb-3 shadow-sm">
        <div
          class="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center"
        >
          <div>
            <h5 :class="{ 'text-decoration-line-through': milestone.done }">
              {{ milestone.title }}
            </h5>
            <p class="mb-1 text-muted">{{ milestone.description }}</p>
            <small class="text-secondary">Deadline: {{ milestone.deadline }}</small>
          </div>
          <div class="mt-3 mt-md-0">
            <button class="btn btn-outline-primary me-2" @click="toggleDone(index)">
              {{ milestone.done ? 'Undo' : 'Complete' }}
            </button>
            <button class="btn btn-outline-danger" @click="deleteMilestone(index)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info text-center mt-5">
      No milestones yet. Start building your dream game today!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const STORAGE_KEY = 'milestones'

const newMilestone = ref({ title: '', description: '', deadline: '' })
const milestones = ref([])

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  milestones.value = saved ? JSON.parse(saved) : []
})

watch(
  milestones,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  },
  { deep: true },
)

function addMilestone() {
  if (!newMilestone.value.title.trim()) return
  milestones.value.unshift({
    id: Date.now(),
    title: newMilestone.value.title.trim(),
    description: newMilestone.value.description.trim(),
    deadline: newMilestone.value.deadline,
    done: false,
  })
  newMilestone.value = { title: '', description: '', deadline: '' }
}

function toggleDone(index) {
  milestones.value[index].done = !milestones.value[index].done
}

function deleteMilestone(index) {
  milestones.value.splice(index, 1)
}
</script>
