<script setup lang="ts">

const props = defineProps<{
  content: string
  disabled: { type: boolean, default: false}
}>()

const lines = ref<string[]>([])
watch(() => props.content, () => {
    lines.value = props.content.split(/\r?\n/)
})
</script>

<template>
    <div v-if="!disabled && lines.length > 0">
        <div v-for="line in lines">{{ line }}</div>
    </div>
</template>
