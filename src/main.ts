import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ru from './locales/ru.json'

const i18n = createI18n({
    legacy: false,
    locale: navigator.language,
    messages: {
        'en': {...en},
        'ru': {...ru},
        'en-EN': {...en},
        'ru-RU': {...ru},
    }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')