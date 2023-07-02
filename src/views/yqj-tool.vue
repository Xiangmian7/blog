<template>
  <div class="tool">
    <el-card shadow="hover">
      <div class="title">工具</div>
      <div class="list">
        <template v-for="item in toolList" :key="item.id">
          <el-link :href="item.url" target="_blank" :underline="false"
            >- {{ item.name }}</el-link
          >
        </template>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import useToolStore from '@/stores/tool'

const toolStore = useToolStore()

toolStore.getToolListAction(0, 1000)

const { toolList } = storeToRefs(toolStore)

onMounted(() => {
  document.title = `工具 - 叶千菁`
})
</script>

<style lang="less" scoped>
.tool {
  .el-card {
    :deep(.el-card__body) {
      padding: 3.125rem 2.5rem 2.5rem 2.5rem;
    }
    .title {
      font-size: 1.5rem;
      margin-bottom: 1.6875rem;
    }
    .list {
      display: flex;
      flex-direction: column;
      .el-link {
        line-height: 1.5;
        display: inline-block;
        margin-bottom: 1.0625rem;
        font-size: 1rem;
      }
    }
  }
}
</style>
