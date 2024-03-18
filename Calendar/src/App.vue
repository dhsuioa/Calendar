<template>
  <button @click="changeLangue('en')">English</button>
  <button @click="changeLangue('ru')">Русский</button>
<Calendar/>
<Calendar initial-date="2022-11-10"/>
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
</style>
