<template>
  <div class="label">
    <el-card shadow="hover">
      <div class="title">
        <img src="@/assets/img/label.png" />
        <span>标签</span>
      </div>
      <div class="content">
        <template v-for="item in labels" :key="item.id">
          <div
            class="item"
            :style="{ color: getColor() }"
            @click="labelClickHandler(item.id, item.name)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { sessionCache } from '@/utils/cache'
import getColor from '@/utils/color'

import usePublicStore from '@/stores/public'

defineProps(['labels'])

const publicStore = usePublicStore()
const router = useRouter()

function labelClickHandler(labelId: number, labelName: string) {
  sessionCache.setCache(
    'page',
    `/main/label?labelId=${labelId}&labelName=${labelName}`
  )
  publicStore.activeValue = 'none'
  router.push({
    path: '/main/label',
    query: { labelId, labelName }
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="less" scoped>
.label {
  margin-bottom: 1.25rem;
  .title {
    display: flex;
    align-items: center;
    padding-bottom: 0.9375rem;
    img {
      width: 1.375rem;
      height: 1.375rem;
      margin-right: 0.3125rem;
    }
    span {
      font-size: 1.125rem;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    .item {
      font-size: 0.875rem;
      margin: 0 0.9375rem 0.75rem 0;
      cursor: pointer;
    }
  }
}
</style>
