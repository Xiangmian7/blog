<template>
  <div class="friend">
    <div class="header">
      <el-card shadow="hover">
        <div class="title">友链</div>
        <div class="geshi">
          如有意添加友链，请留言你的昵称、头像地址、网站地址、描述以及你的邮箱地址，添加后我会以邮件形式告知，谢谢!
        </div>
      </el-card>
    </div>
    <div class="content">
      <template v-if="friendList.length">
        <el-row :gutter="20">
          <template v-for="item in friendList" :key="item.id">
            <el-col :span="pageSize !== 'small' ? 12 : 24">
              <a :href="item.websiteUrl" target="_blank">
                <el-card shadow="hover">
                  <div class="avatar">
                    <el-avatar :size="80" :src="item.avatarUrl" fit="fill" />
                  </div>
                  <div class="name-description">
                    <div class="nickName">{{ item.nickName }}</div>
                    <div class="description">{{ item.websiteDescription }}</div>
                  </div>
                  <div class="jiantou">
                    <img src="@/assets/img/jiantou.png" />
                  </div>
                </el-card>
              </a>
            </el-col>
          </template>
        </el-row>
      </template>
      <template v-if="!friendList.length">
        <el-empty description="暂无友链"></el-empty>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import useFriendStore from '@/stores/friend'

defineProps(['pageSize'])

const friendStore = useFriendStore()
friendStore.getFriendListAction(0, 1000)

const { friendList } = storeToRefs(friendStore)

onMounted(() => {
  document.title = `友链 - 叶千菁`
})
</script>

<style lang="less" scoped>
.friend {
  .header {
    .title {
      font-size: 1.5rem;
    }
    .geshi {
      margin-top: 0.9375rem;
      font-size: 0.75rem;
      line-height: 1.8;
      color: #909399;
    }
    .el-card {
      :deep(.el-card__body) {
        padding: 3.125rem 2.5rem 3.125rem 2.5rem;
      }
    }
    margin-bottom: 1.5625rem;
  }
  .content {
    .el-row {
      .el-card {
        cursor: pointer;
        margin-bottom: 1.5625rem;

        &:hover {
          .jiantou {
            transform: translateX(0rem);
          }
        }
        :deep(.el-card__body) {
          display: flex;
          position: relative;
        }
        .name-description {
          margin-left: 1.25rem;
          .nickName {
            font-size: 1.25rem;
            height: 2.25rem;
            line-height: 2.25rem;
            color: #ff2ba0;
          }
          .description {
            font-size: 0.875rem;
            line-height: 1.5;
            color: #364863;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }
        .jiantou {
          transition: 0.3s ease;
          transform: translateX(1.875rem);
          position: absolute;
          right: 0.625rem;
          bottom: 0.625rem;

          img {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
      }
    }
  }
}
</style>
