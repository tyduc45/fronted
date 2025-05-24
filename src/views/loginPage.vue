<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center">Login</h2>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button class="btn btn-primary w-100">Login</button>
        </form>
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/userAuth'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const { login } = useAuth()

function encodeBase64(str) {
  return btoa(str)
}

const handleLogin = () => {
  error.value = ''
  const stored = localStorage.getItem('users') || ''
  const users = stored ? stored.split('\n') : []

  const target = `${username.value}|${encodeBase64(password.value)}`
  const match = users.includes(target)

  if (match) {
    login(username.value)
    router.push('/')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>
