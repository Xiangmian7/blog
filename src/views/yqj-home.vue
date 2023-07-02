<template>
  <div class="home">
    <div class="list">
      <template v-for="item in articleList" :key="item.id">
        <el-card shadow="hover">
          <div class="title">
            <span @click="titleClickHandler(item.id)">{{ item.title }}</span>
          </div>
          <div class="time-classify-labels">
            <img src="@/assets/img/time.png" />
            <span class="time">{{ formatUTCOne(item.createAt) }}</span>
            <el-divider direction="vertical" />
            <img src="@/assets/img/classify-1.png" />
            <span class="classify">{{ item.classify }}</span>
            <el-divider direction="vertical" />
            <img src="@/assets/img/label-1.png" />
            <template v-for="label in item.labels" :key="label.id">
              <span class="label">{{ label.name }}</span>
            </template>
          </div>
          <div class="description">{{ item.description }}</div>
        </el-card>
      </template>
    </div>
    <template v-if="totalCount == 0 ? false : true">
      <div class="pagination">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="10"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import { sessionCache } from '@/utils/cache'
import { formatUTCOne } from '@/utils/format'

import useHomeStore from '@/stores/home'
import usePublicStore from '@/stores/public'

const publicStore = usePublicStore()
const homeStore = useHomeStore()
const router = useRouter()
const offset = ref(0)

homeStore.getArticleListAction(offset.value, 10)
const { articleList, totalCount } = storeToRefs(homeStore)

function handleCurrentChange(val: number) {
  offset.value = (val - 1) * 10
  homeStore.getArticleListAction(offset.value, 10)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function titleClickHandler(id: number) {
  publicStore.activeValue = 'none'
  sessionCache.setCache('page', `/main/detail?id=${id}`)
  router.push({
    path: '/main/detail',
    query: { id }
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
onMounted(() => {
  document.title = `首页 - 叶千菁`
})
</script>

<style lang="less" scoped>
.home {
  .list {
    .el-card {
      margin-bottom: 1.5rem;
      :deep(.el-card__body) {
        padding: 3.125rem 2.5rem 3.125rem 2.5rem;
      }
      .title {
        span {
          line-height: 1.5;
          color: #1f2d3d;
          font-size: 1.5rem;
          transition: 0.3s;
          cursor: pointer;
          &:hover {
            color: #0d6efd;
          }
        }
      }
      .time-classify-labels {
        vertical-align: middle;
        margin: 0.625rem 0 0.625rem 0;
        color: #858585;
        font-size: 0.75rem;
        img {
          width: 0.9375rem;
          height: 0.9375rem;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          margin-left: 0.25rem;
        }
      }
      .description {
        line-height: 1.5;
        color: #4c4948;
        font-size: 0.875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-pagination {
      :deep(.el-pager li.is-active) {
        background-color: black !important;
        color: #fff;
      }
    }
  }
}
</style>
