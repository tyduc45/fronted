<template>
  <div class="container text-center py-5">
    <!-- About section -->
    <h2>About This Application</h2>
    <p>
      This application is aim to provide information and a place for indie game developer and game
      programmers to record their developing progress and learn game develop techniques @written by
      Yifan Li
    </p>

    <!-- Input Fields -->
    <div class="row my-4 justify-content-center">
      <div class="col-md-4">
        <input type="text" v-model="firstName" placeholder="First Name" class="form-control mb-2" />
        <input type="text" v-model="lastName" placeholder="Last Name" class="form-control mb-3" />

        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            v-model="selectedImage"
            value="Ocean"
            id="oceanRadio"
          />
          <label class="form-check-label" for="oceanRadio">Ocean</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            v-model="selectedImage"
            value="Mountain"
            id="mountainRadio"
          />
          <label class="form-check-label" for="mountainRadio">Mountain</label>
        </div>
      </div>
    </div>

    <!-- Output Section -->
    <div v-if="fullName" class="mt-4">
      <h3>Welcome {{ fullName }}! take some rest!</h3>
      <img
        :src="imageSrc"
        alt="Selected View"
        class="img-fluid rounded shadow"
        style="max-height: 300px"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import mountainImage from '../assets/images.jpg'
import oceanImage from '../assets/images1.jpg'

const firstName = ref('')
const lastName = ref('')
const selectedImage = ref('Ocean')

const fullName = computed(() => {
  if (firstName.value || lastName.value) {
    return `${firstName.value} ${lastName.value}`.trim()
  }
  return ''
})

const imageSrc = computed(() => {
  return selectedImage.value === 'Mountain' ? mountainImage : oceanImage
})
</script>
