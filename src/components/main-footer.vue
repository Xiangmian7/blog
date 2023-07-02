<template>
  <div class="main-footer">
    <div class="box1">
      <div class="yearinterval">@ {{ diffyear() }} 叶千菁</div>
      <el-divider direction="vertical" />
      <div class="runtime">已在风雨中度过 {{ diffDate() }} 天</div>
    </div>
    <a target="_blank" href="http://beian.miit.gov.cn/">
      <div class="box2">蜀ICP备2023006293号</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { diffDate, diffyear } from '@/utils/format'
</script>

<style lang="less" scoped>
.main-footer {
  padding: 1.875rem 0 1.875rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #333;
  color: #fff;
  font-size: 0.875rem;
  .box1 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .box2 {
    margin-top: 0.75rem;
    color: #fff;
  }
}
</style>
