<template>
  <div class="container py-4">
    <h2>🚀 DevLog Feed</h2>

    <!-- 发布区 -->
    <div class="card p-3 mb-4">
      <textarea
        v-model="newPostContent"
        placeholder="Share your progress (Markdown supported)..."
        class="form-control mb-2"
      ></textarea>

      <input type="file" accept="image/*" @change="handleImageUpload" class="form-control mb-2" />

      <button class="btn btn-primary" @click="publishPost">Publish</button>
    </div>

    <!-- 帖子列表 -->
    <div v-for="post in posts" :key="post.id" class="card mb-3 p-3 shadow-sm">
      <div>
        <strong>{{ post.author }}</strong> 🕒 {{ formatTime(post.timestamp) }}
      </div>

      <div class="mt-2" v-html="renderMarkdown(post.content)"></div>

      <img
        v-if="post.image"
        :src="post.image"
        alt="Attached"
        class="img-fluid rounded mt-2"
        style="max-height: 300px"
      />

      <button class="btn btn-outline-primary btn-sm me-2 mt-2" @click="likePost(post)">
        ❤️ Like ({{ post.likes.length }})
      </button>

      <div v-if="post.author === currentUser">
        <button class="btn btn-outline-danger btn-sm mt-2" @click="deletePost(post)">
          🗑️ Delete
        </button>
        <div class="mt-2 text-muted small">
          👍 Liked by: {{ post.likes.join(', ') || 'No one yet' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const md = new MarkdownIt({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs rounded p-3 bg-light border"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch (e) {
        console.log(e)
      }
    }
    return `<pre class="hljs rounded p-3 bg-light border"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

// 覆写渲染标题的方式
const defaultRender =
  md.renderer.rules.heading_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const tag = token.tag // h1, h2, h3 ...
  const level = parseInt(tag[1]) // 数字

  if (level <= 2) {
    token.attrJoin('class', 'border-bottom pb-1 mb-3') // 添加横线、内边距、底部间距
  }

  return defaultRender(tokens, idx, options, env, self)
}

const currentUser = localStorage.user || 'Guest'
const STORAGE_KEY = 'devlog_posts'

const newPostContent = ref('')
const posts = ref([])
const uploadedImage = ref(null)

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  posts.value = saved ? JSON.parse(saved) : []
})

watch(
  posts,
  (newVal) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newVal))
  },
  { deep: true },
)

function publishPost() {
  if (newPostContent.value.trim()) {
    posts.value.unshift({
      id: Date.now(),
      author: currentUser,
      content: newPostContent.value.trim(),
      timestamp: new Date(),
      likes: [],
      image: uploadedImage.value,
    })
    newPostContent.value = ''
    uploadedImage.value = null
  }
}

function likePost(post) {
  const index = post.likes.indexOf(currentUser)
  if (index === -1) {
    post.likes.push(currentUser)
  } else {
    post.likes.splice(index, 1)
  }
}

function deletePost(post) {
  if (post.author === currentUser) {
    posts.value = posts.value.filter((p) => p.id !== post.id)
  }
}

function formatTime(time) {
  return new Date(time).toLocaleString()
}

function renderMarkdown(text) {
  return md.render(text)
}

function handleImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    uploadedImage.value = reader.result
  }
  reader.readAsDataURL(file)
}
</script>
