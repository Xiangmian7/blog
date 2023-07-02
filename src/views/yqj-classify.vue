<template>
  <div class="classify">
    <timeLine
      :List="articleTimeLineClassifyList"
      titleName="分类"
      :classifyName="classifyName"
    ></timeLine>
  </div>
</template>

<script setup lang="ts">
import timeLine from '@/components/time-line.vue'

import { storeToRefs } from 'pinia'
import { watchEffect, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import useArchiveStore from '@/stores/archive'

const archiveStore = useArchiveStore()

const route = useRoute()

const classifyName: any = ref('')

watchEffect(() => {
  const name: any = route.query.classifyName
  classifyName.value = route.query.classifyName
  archiveStore.getArticleTimeLineByClassifyAction(name)
  document.title = `分类 - ${classifyName.value} - 叶千菁`
})

const { articleTimeLineClassifyList } = storeToRefs(archiveStore)

onMounted(() => {
  document.title = `分类 - ${classifyName.value} - 叶千菁`
})
</script>

<style lang="less" scoped></style>
