<template>
  <div class="timeline">
    <el-card shadow="hover">
      <el-timeline>
        <template v-if="titleName == '时间轴'">
          <el-timeline-item class="title" size="large" hollow type="primary"
            >时间轴 - 共 {{ List.length }} 篇</el-timeline-item
          >
        </template>
        <template v-if="titleName == '分类'">
          <el-timeline-item class="title" size="large" hollow type="primary"
            >分类 - {{ classifyName }}</el-timeline-item
          >
        </template>
        <template v-if="titleName == '标签'">
          <el-timeline-item class="title" size="large" hollow type="primary"
            >标签 - {{ labelName }}</el-timeline-item
          >
        </template>
        <template v-for="item in List" :key="item.id">
          <el-timeline-item
            :timestamp="formatUTCOne(item.createAt)"
            type="primary"
            size="large"
            hollow
            placement="bottom"
            class="time-item"
            @click="timeLineClick(item.id)"
            >{{ item.title }}</el-timeline-item
          >
          <template v-if="item.timeover">
            <el-timeline-item
              class="timeover"
              type="danger"
              hollow
              size="large"
              >{{ item.timeover }}</el-timeline-item
            >
          </template>
        </template>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { formatUTCOne } from '@/utils/format'
import { sessionCache } from '@/utils/cache'

import usePublicStore from '@/stores/public'

defineProps(['List', 'titleName', 'labelName', 'classifyName'])

const router = useRouter()
const publicStore = usePublicStore()

function timeLineClick(id: number) {
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
</script>

<style lang="less" scoped>
.timeline {
  :deep(.el-card__body) {
    padding: 3.125rem 2.5rem 1.875rem 2.5rem;
  }
  .time-item {
    :deep(.el-timeline-item__wrapper) {
      .el-timeline-item__content {
        transition: 0.3s;
        color: #212529;
        font-size: 1rem;
        cursor: pointer;
        &:hover {
          transform: translateX(0.75rem);
          color: #1890ff;
        }
      }
    }
    :deep(.el-timeline-item__node.is-hollow) {
      border-width: 0.15rem;
    }
  }

  .el-timeline {
    --el-timeline-node-color: #aadafa;
  }
  .title {
    font-size: 1.5rem;
    font-weight: 520;
    :deep(.el-timeline-item__node--large) {
      width: 1.25rem;
      height: 1.25rem;
      left: -0.3125rem;
    }
    :deep(.el-timeline-item__node.is-hollow) {
      border-width: 0.3rem;
    }
  }
  .timeover {
    font-size: 1.25rem;
    :deep(.el-timeline-item__node.is-hollow) {
      border-width: 0.15rem;
    }
  }
}
</style>
