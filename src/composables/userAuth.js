// 用于全局管理用户登录状态
import { ref, computed } from 'vue'

const currentUser = ref(localStorage.getItem('user') || '')

const isLoggedIn = computed(() => currentUser.value !== '')

function login(user) {
  currentUser.value = user
  localStorage.setItem('user', user)
}
function logout() {
  currentUser.value = ''
  localStorage.removeItem('user')
}

export function useAuth() {
  return {
    currentUser,
    isLoggedIn,
    login,
    logout,
  }
}

console.log(localStorage)
