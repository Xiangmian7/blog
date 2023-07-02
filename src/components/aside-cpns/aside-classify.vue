<template>
  <div class="classify">
    <el-card shadow="hover">
      <div class="title">
        <img src="@/assets/img/classify.png" />
        <span>分类</span>
      </div>
      <div class="content">
        <template v-for="(item, index) in sorts" :key="index">
          <div
            class="content-item"
            @click="classifyClickHandler(item.classify)"
          >
            <span class="item-name">{{ item.classify }}</span>
            <span class="item-count">{{ item.count }}</span>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { sessionCache } from '@/utils/cache'

import usePublicStore from '@/stores/public'

defineProps(['sorts'])

const publicStore = usePublicStore()
const router = useRouter()

function classifyClickHandler(classifyName: string) {
  sessionCache.setCache('page', `/main/classify?classifyName=${classifyName}`)
  publicStore.activeValue = 'none'
  router.push({
    path: '/main/classify',
    query: { classifyName }
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="less" scoped>
.classify {
  margin-bottom: 1.25rem;
  .title {
    display: flex;
    align-items: center;
    padding-bottom: 0.75rem;
    img {
      width: 1.375rem;
      height: 1.375rem;
      margin-right: 0.25rem;
    }
    span {
      font-size: 1.125rem;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    .content-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0 0.75rem 0;
      font-size: 0.875rem;
      transition: 0.2s;
      cursor: pointer;
      .item-name {
        transition: 0.2s;
      }
      .item-count {
        transition: 0.2s;
      }
      &:hover {
        background-color: #0dcaf0;
        .item-name {
          transform: translateX(0.625rem);
        }
        .item-count {
          transform: translateX(-0.625rem);
        }
      }
    }
  }
}
</style>
