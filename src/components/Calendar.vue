<template>
    <div class="calendar">
    <div class="header">
        <button @click="previousMonth">&#8592;</button>
        <span>{{ $t('months.' + currentMonth) + " " + currentYear }}</span>
        <button @click="nextMonth">&#8594;</button>
    </div>
    <div class="days">
        <div
            v-for="weekday in weekdays"
            :key="weekday"
            class="weekdays"
        >
            {{ $t('weekdays.' + weekday) }}
        </div>
        <div
            v-for="emptyCell in firstDayOffset"
            :key="'empty' + emptyCell"
            class="day"/>
        <div
            v-for="day in days"
            :key="day"
            @click="selectDate(day)"
            :class="{ 'day': true, 'selected' : selectedDate === day}"
        >
            {{ day }}
        </div>
    </div>
</div>
<div v-if="selectedDate">
    {{ $t('selectedDate') }}: {{ `${selectedDate} ${$t('months.' + currentMonth)} ${currentYear} ` }}
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onMounted, ref } from 'vue'

const props = defineProps ({
    initialDate: {
        type: String,
        default: ''
    }
})

const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const currentMonth = ref(currentDate.getMonth() + 1)
const days = ref<number[]>([])

const selectedDate = ref<number | null>(null)

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const getCurrentMonthDays = (year: number, month: number): number[] => {
    const dayInMonth = new Date(year, month, 0).getDate()
    return Array.from({length: dayInMonth}, (_, index) => index + 1)
}

const firstDayOffset = computed(() => {
    return (new Date(currentYear.value, currentMonth.value - 1, 1).getDay() + 6) % 7
})

const updateCalendar = () => {
    if (props.initialDate) {
        const [year, month, day] = props.initialDate.split('-').map(Number)
        currentYear.value = year
        currentMonth.value = month
        selectedDate.value = day
    }
    else {
        selectedDate.value = currentDate.getDate()
    }
    days.value = getCurrentMonthDays(currentYear.value, currentMonth.value)
}

const previousMonth = () => {
    currentMonth.value === 1 ? (currentYear.value--, currentMonth.value = 12) : currentMonth.value--
    updateCalendar()
    selectedDate.value = null
}

const nextMonth = () => {
    currentMonth.value === 12 ? (currentYear.value++, currentMonth.value = 1) : currentMonth.value++
    updateCalendar()
    selectedDate.value = null
}

const selectDate = (day: number) => {
    selectedDate.value = day
}

onMounted(() => {
    updateCalendar()
})
</script>

<style scoped>
.calendar {
    max-width: 400px;
    border: 1px solid rgb(218 218 218);
}

.header {
    display: flex;
    background-color: #f3f3f3;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
}

.header button {
    background-color: transparent;
    border: none;
    font-size: 18px;
    margin: 0 10px;
}

.days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    padding: 10px;
}

.day {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    cursor: pointer;
}

.day.selected {
    background-color: lightblue;
}

.weekdays {
    font-weight: bold;
}
</style>
