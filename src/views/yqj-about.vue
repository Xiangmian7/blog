<template>
  <div class="about">
    <el-card shadow="hover">
      <div class="title">关于</div>
      <div class="about-me">
        <p>关于我</p>
        <p>昵称</p>
        <p>叶千菁、心悸、木圭木桓霂、相眠</p>
        <p>01年</p>
        <p>坐标成都</p>
        <p>全栈?工程师</p>
        <p></p>
      </div>
      <el-divider border-style="dashed" />
      <div class="about-blog">
        <p>关于本站</p>
        <p>站名</p>
        <p>叶千菁</p>
        <p>这是本站的第一个版本</p>
        <p>以简洁为主</p>
        <p>主要搭建技术</p>
        <p>前端：Vue3 + Ts + Vite + ElementPlus + Pnia + Axios</p>
        <p>后端：Node + Koa + MySQL</p>
        <p>服务器：CentOS + pm2 + Nginx</p>
      </div>
      <el-divider border-style="dashed" />
      <div class="inspiration">
        <p>感言</p>
        <p>人生如逆旅，我亦是行人</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = `关于 - 叶千菁`
})
</script>

<style lang="less" scoped>
.about {
  .el-card {
    :deep(.el-card__body) {
      padding: 3.125rem 2.5rem 3.125rem 2.5rem;
    }
    .title {
      font-size: 1.5rem;
      margin-bottom: 1.375rem;
    }
    .about-me {
      p {
        line-height: 1.8;
      }
    }
    .about-blog {
      p {
        line-height: 1.8;
      }
    }
    .inspiration {
      p {
        line-height: 1.8;
      }
    }
  }
}
</style>
