<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const tradeInfo = ref(null)
let socket

onMounted(() => {
  socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

  socket.onmessage = (event) => {
    const tradeData = JSON.parse(event.data)
    tradeInfo.value = tradeData
  }
})

onUnmounted(() => {
  socket.close()
})
</script>

<template>
  <div>
    <h1>Trade Updates</h1>
    <div v-if="tradeInfo">
      <p>Price: {{ tradeInfo.p }}</p>
      <p>Quantity: {{ tradeInfo.q }}</p>
    </div>
    <div v-else>
      <p>Waiting for trade updates...</p>
    </div>
  </div>
</template>

<style scoped></style>
