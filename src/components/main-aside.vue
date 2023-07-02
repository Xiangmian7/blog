<template>
  <div class="main-aside">
    <asideXinji
      :articleCount="articleCount"
      :sortCount="sortCount"
      :labelCount="labelCount"
    ></asideXinji>
    <asideRecommand :recommandList="recommandList"></asideRecommand>
    <asideClassify :sorts="sorts"></asideClassify>
    <template v-if="!isHiddenAsside && pageSize !== 'small'">
      <el-affix :offset="20" :z-index="1"
        ><asideLabels :labels="labels"></asideLabels
      ></el-affix>
    </template>
    <template v-if="!isHiddenAsside && pageSize == 'small'">
      <asideLabels :labels="labels"></asideLabels>
    </template>
  </div>
</template>

<script setup lang="ts">
import asideXinji from './aside-cpns/aside-xinji.vue'
import asideRecommand from './aside-cpns/aside-recommand.vue'
import asideClassify from './aside-cpns/aside-classify.vue'
import asideLabels from './aside-cpns/aside-labels.vue'

import { storeToRefs } from 'pinia'

import usePublicStore from '@/stores/public'

defineProps(['isHiddenAsside', 'pageSize'])

const publicStore = usePublicStore()
publicStore.getBaseDataAction()

const { articleCount, sortCount, labelCount, sorts, labels, recommandList } =
  storeToRefs(publicStore)
</script>

<style lang="less" scoped>
.main-side {
  display: flex;
  flex-direction: column;
}
</style>
