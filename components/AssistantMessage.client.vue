<!-- https://github.com/RihanArfan/chat-with-pdf/blob/d885af948781d5900c8069ac782867317ebc3020/app/components/AssistantMessage.vue#L1 -->
<script setup lang="ts">
import { parseMarkdown } from '#imports'

const props = defineProps<{
  content: string
}>()

const { data: ast, refresh } = await useAsyncData(useId(), () =>
  parseMarkdown(props.content),
)

watch(() => props.content, () => refresh())
</script>

<template>
  <MDCRenderer v-if="ast?.body" class="prose dark:prose-invert" :body="ast?.body" />
</template>
