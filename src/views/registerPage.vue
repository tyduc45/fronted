<template>
  <div class="container py-5">
    <h2 class="mb-4 text-center">Register</h2>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label">Username</label>
            <input v-model="username" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" required />
          </div>
          <button class="btn btn-success w-100">Register</button>
        </form>
        <div v-if="error" class="alert alert-danger mt-2">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

function encodeBase64(str) {
  return btoa(str) // 浏览器内建 base64 编码
}

const register = () => {
  error.value = ''
  const stored = localStorage.getItem('users') || ''
  const users = stored ? stored.split('\n') : []

  if (users.some((u) => u.startsWith(username.value + '|'))) {
    error.value = 'Username already exists'
    return
  }

  const entry = `${username.value}|${encodeBase64(password.value)}`
  users.push(entry)
  localStorage.setItem('users', users.join('\n'))

  alert('Register success, please login')
  router.push('/login')
}
</script>
