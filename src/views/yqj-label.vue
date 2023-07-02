<template>
  <div class="label">
    <timeLine
      :List="articleTimeLineLabelList"
      titleName="标签"
      :labelName="labelName"
    ></timeLine>
  </div>
</template>

<script setup lang="ts">
import timeLine from '@/components/time-line.vue'

import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { watchEffect, ref, onMounted } from 'vue'

import useArchiveStore from '@/stores/archive'

const archiveStore = useArchiveStore()

const route = useRoute()

const labelName: any = ref('')

watchEffect(() => {
  const labelId: any = route.query.labelId
  labelName.value = route.query.labelName
  archiveStore.getArticleTimeLineByLabelAction(labelId)
  document.title = `标签 - ${labelName.value} - 叶千菁`
})

onMounted(() => {
  document.title = `标签 - ${labelName.value} - 叶千菁`
})

const { articleTimeLineLabelList } = storeToRefs(archiveStore)
</script>

<style lang="less" scoped></style>
