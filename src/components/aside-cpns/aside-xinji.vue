<template>
  <div class="xinji">
    <el-card shadow="hover">
      <div class="avatar">
        <el-avatar :size="110" shape="circle">
          <img src="../../assets/img/xinji.jpg"
        /></el-avatar>
      </div>
      <div class="name">叶千菁</div>
      <div class="other-name">心似双丝网，中有千千结</div>
      <div class="count">
        <div class="count-item">
          <span class="item-name">文章</span>
          <span class="item-count">{{ articleCount }}</span>
        </div>
        <div class="count-item">
          <span class="item-name">分类</span>
          <span class="item-count">{{ sortCount }}</span>
        </div>
        <div class="count-item">
          <span class="item-name">标签</span>
          <span class="item-count">{{ labelCount }}</span>
        </div>
      </div>
      <div class="button">
        <el-button color="#626aef" round size="large"
          >Welcome To My Blog</el-button
        >
      </div>
      <div class="link">
        <el-tooltip effect="dark" content="QQ：50599484" placement="top-start"
          ><a><img src="@/assets/img/qq.png" /></a
        ></el-tooltip>
        <el-tooltip effect="dark" content="github" placement="top-start">
          <a target="_blank" href="https://github.com/yqj741452">
            <img src="@/assets/img/github.png"
          /></a>
        </el-tooltip>
        <el-tooltip effect="dark" content="哔哩哔哩" placement="top-start">
          <a
            target="_blank"
            href="https://space.bilibili.com/441933048?spm_id_from=333.1007.0.0"
          >
            <img src="@/assets/img/bilibili.png"
          /></a>
        </el-tooltip>
        <el-tooltip
          effect="dark"
          content="outlook：yqj741452@outlook.com"
          placement="top-start"
          ><a> <img src="@/assets/img/outlook.png" /></a
        ></el-tooltip>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineProps(['articleCount', 'sortCount', 'labelCount'])
</script>

<style lang="less" scoped>
.xinji {
  margin-bottom: 1.25rem;
  .el-card {
    padding: 1.5rem;
    :deep(.el-card__body) {
      padding: 0;
      width: 100%;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name {
      text-align: center;
      padding-top: 0.9375rem;
      padding-bottom: 0.3125rem;
      height: 2.5rem;
      line-height: 2.5rem;
      font-size: 1.125rem;
      font-weight: 500;
    }
    .other-name {
      text-align: center;
      color: #333;
      font-size: 0.875rem;
      padding-bottom: 1.5rem;
    }
    .count {
      display: flex;
      justify-content: space-around;
      padding: 0 0.375rem 0.875rem 0.375rem;
      .count-item {
        display: flex;
        white-space: nowrap;
        flex-direction: column;
        align-items: center;
        .item-name {
          padding-bottom: 0.3125rem;
        }
      }
    }
    .button {
      display: flex;
      justify-content: center;
      padding-bottom: 1.125rem;
      .el-button {
        width: 90%;
      }
    }
    .link {
      display: flex;
      justify-content: space-around;
      padding: 0 1.75rem 0 1.75rem;
      a {
        cursor: pointer;
        img {
          width: 1.125rem;
          height: 1.125rem;
        }
      }
    }
  }
}
</style>
