<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface TradeInfo {
  p: string
  q: string
}

const tradeInfo = ref<TradeInfo | null>(null)
let socket: WebSocket | null = null

onMounted(() => {
  socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

  socket.onmessage = (event) => {
    tradeInfo.value = JSON.parse(event.data)
  }
})

onUnmounted(() => {
  if (socket && 'close' in socket) {
    socket.close()
  }
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
