<template>
  <button @click="changeLangue('en')">English</button>
  <button @click="changeLangue('ru')">Русский</button>
  <div class="container">
    <Calendar/>
  </div>
  <div class="container">
    <Calendar initial-date="2022-11-10"/>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Calendar from './components/Calendar.vue'

const { locale } = useI18n()

const changeLangue = (lang: string) => {
  locale.value = lang
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
}

button {
  margin: 20px;
}
</style>
