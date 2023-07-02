<template>
  <div class="recommand">
    <el-card shadow="hover">
      <div class="title">
        <img src="@/assets/img/recommand.png" />
        <span>推荐文章</span>
      </div>
      <div class="list">
        <template v-for="(item, index) in recommandList" :key="item.id">
          <div class="item">
            <span class="item-name" @click="articleNameClick(item.id)">{{
              item.title
            }}</span>
            <span class="time">{{ formatUTCOne(item.createAt) }}</span>
            <template v-if="index + 1 !== recommandList.length"
              ><el-divider border-style="dotted"
            /></template>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { sessionCache } from '@/utils/cache'
import { formatUTCOne } from '@/utils/format'

import usePublicStore from '@/stores/public'

defineProps(['recommandList'])

const publicStore = usePublicStore()
const router = useRouter()

function articleNameClick(id: number) {
  sessionCache.setCache('page', `/main/detail?id=${id}`)
  publicStore.activeValue = 'none'
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
.recommand {
  margin-bottom: 1.25rem;
  .title {
    display: flex;
    align-items: center;
    padding-bottom: 1.375rem;
    img {
      width: 1.375rem;
      height: 1.375rem;
      margin-right: 0.3125rem;
    }
    span {
      font-size: 1.125rem;
    }
  }
  .list {
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .item-name {
        color: #4c4948;
        line-height: 1.5;
        font-size: 0.875rem;
        padding-bottom: 0.5rem;
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          color: #0d6efd;
        }
      }
      .time {
        font-size: 0.75rem;
        color: #6c757d;
      }
      .el-divider--horizontal {
        margin: 0.8125rem 0 0.8125rem 0;
      }
    }
  }
}
</style>
