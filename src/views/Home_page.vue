<template>
  <div class="background-carousel">
    <div class="overlay">
      <div class="w-100 py-5 px-3 px-md-5">
        <div class="text-center mb-5">
          <h1 class="display-4 fw-bold text-primary">Welcome to GameDev Insight</h1>
          <p class="lead text-white">
            A self-discipline companion for indie game developers and enthusiasts.
          </p>
        </div>

        <div class="row text-center">
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm glass-card">
              <div class="card-body">
                <h5 class="card-title">📘 Daily Learning</h5>
                <p class="card-text">
                  Track your progress on game design, engines, and programming.
                </p>
                <router-link to="/news" class="btn btn-outline-light">Explore</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm glass-card">
              <div class="card-body">
                <h5 class="card-title">🛠️ Dev Log</h5>
                <p class="card-text">Document your daily development and stay accountable.</p>
                <router-link to="/devlog" class="btn btn-outline-light">Start Writing</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="card h-100 shadow-sm glass-card">
              <div class="card-body">
                <h5 class="card-title">🎯 Milestones</h5>
                <p class="card-text">
                  Set goals, monitor deadlines, and push yourself to finish your game.
                </p>
                <router-link to="/canlander" class="btn btn-outline-light">Set Goals</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 text-center text-light small">
          Built by developers, for developers. Let's make great games—one day at a time.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-carousel {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.background-carousel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: slideshow 20s infinite ease-in-out;
  z-index: 0;
  opacity: 1;
}

/* 背景轮播动画 */
@keyframes slideshow {
  0% {
    background-image: url('../assets/games-banner.jpg');
  }
  33% {
    background-image: url('../assets/Doom.jpg');
  }
  66% {
    background-image: url('../assets/word-image-244229-1.jpg');
  }
  100% {
    background-image: url('../assets/Zelda.jpg');
  }
}

/* overlay 只是为了放文字，不加模糊 */
.overlay {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  padding-top: 50px;
}

/* 卡片单独毛玻璃 */
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

/* 字体和按钮优化 */
.card-title {
  font-size: 1.3rem;
  font-weight: bold;
}

.card-text {
  color: #f8f9fa;
}

.btn-outline-light {
  border-color: #fff;
  color: #fff;
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #000;
}
</style>
