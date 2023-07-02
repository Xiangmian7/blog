<template>
  <div class="search">
    <div class="list">
      <template v-for="item in resultList" :key="item.id">
        <div class="item" @click="searchValClick(item.id)">
          {{ item.title }}
        </div>
      </template>
    </div>
    <temlpate v-if="resultList?.length">
      <div class="resultCount">{{ resultList.length }} 条结果</div>
    </temlpate>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { sessionCache } from '@/utils/cache'

import usePublicStore from '@/stores/public'

defineProps(['resultList'])

const emit = defineEmits(['clickSearchVal'])

const publicStore = usePublicStore()

const router = useRouter()

function searchValClick(id: number) {
  sessionCache.setCache('page', `/main/detail?id=${id}`)
  publicStore.activeValue = 'none'
  emit('clickSearchVal')
  router.push({
    path: '/main/detail',
    query: { id }
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="less" scoped>
.search {
  margin-top: 0.9375rem;
  display: flex;
  flex-direction: column;
  .list {
    display: flex;
    flex-direction: column;
    max-height: 17.5rem;
    overflow-y: scroll;
    overflow-x: hidden;
    .item {
      height: 2.1875rem;
      line-height: 2.1875rem;
      cursor: pointer;
      color: #212529;
      font-size: 0.875rem;
      transition: 0.3s;
      &:hover {
        color: #0d6efd;
        transform: translateX(0.9375rem);
      }
    }
  }
  .resultCount {
    margin-top: 0.9375rem;
  }
}
</style>
