<template>
  <div class="archive">
    <timeLine :List="articleTimeLineList" titleName="时间轴"></timeLine>
  </div>
</template>

<script setup lang="ts">
import timeLine from '@/components/time-line.vue'

import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import useArchiveStore from '@/stores/archive'

const archiveStore = useArchiveStore()
archiveStore.getArticleTimeLineAction()
const { articleTimeLineList } = storeToRefs(archiveStore)

onMounted(async () => {
  document.title = `归档 - 叶千菁`
})
</script>

<style lang="less" scoped></style>
