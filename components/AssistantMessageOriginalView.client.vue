<script setup lang="ts">

const props = defineProps<{
  content: string
}>()

const lines = ref<string[]>([])
watch(() => props.content, () => {
    lines.value = props.content.split(/\r?\n/)
})
</script>

<template>
    <div v-if="lines.length > 0">
        <div v-for="line in lines">{{ line }}</div>
    </div>
</template>
