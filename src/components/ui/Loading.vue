<template>
    <div class="loading">
        <svg class="filter" version="1.1">
            <defs>
            <filter id="gooeyness">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 13 -10" result="gooeyness" />
                <feComposite in="SourceGraphic" in2="gooeyness" operator="atop" />
            </filter>
            </defs>
        </svg>
        <div class="dots">
        <div class="dot mainDot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.loading {
    position: absolute;
    top: -4px;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #F5F6FA;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.filter {
  position: absolute;
  visibility: hidden;
}

.dots {
    filter: url(#gooeyness);
    padding: 30px;
    transform: scale(0.5);
}

.dot {
  background: #AEDEF7;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20px;
  width: 32px;
  height: 32px;
}

.dot:first-child {
  animation: FirstDot 3s infinite;
}

.dot:nth-child(2) {
  animation: SecondDot 3s infinite;
}

.dot:nth-child(3) {
  animation: ThirdDot 3s infinite;
}

.dot:nth-child(4) {
  animation: FourthDot 3s infinite;
}

.dot:nth-child(5) {
  animation: FifthDot 3s infinite;
}

@keyframes FirstDot {
  0% {
    transform: scale(1) translateX(0);
  }
  25% {
    transform: scale(2) translateX(0);
  }
  50% {
    transform: scale(1) translateX(0);
  }
  83% {
    transform: scale(1) translateX(240px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}

@keyframes SecondDot {
  0% {
    transform: translateX(0px);
  }
  27% {
    transform: translateX(-40px);
  }
  50% {
    transform: translateX(0px);
  }
  81% {
    transform: translateX(180px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes ThirdDot {
  0% {
    transform: translateX(0px);
  }
  29% {
    transform: translateX(-100px);
  }
  50% {
    transform: translateX(0px);
  }
  79% {
    transform: translateX(120px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes FourthDot {
  0% {
    transform: translateX(0px);
  }
  31% {
    transform: translateX(-160px);
  }
  50% {
    transform: translateX(0px);
  }
  77% {
    transform: translateX(60px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes FifthDot {
  0% {
    transform: scale(1) translateX(0);
  }
  33% {
    transform: scale(1) translateX(-220px);
  }
  50% {
    transform: scale(1) translateX(0);
  }
  75% {
    transform: scale(2) translateX(0);
  }
  100% {
    transform: scale(1) translateX(0);
  }
} 
</style>