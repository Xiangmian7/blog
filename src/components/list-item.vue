<template>
  <div class="item">
    <div class="header">
      <div class="avatar">
        <el-avatar :size="40" :src="info.avatar" />
      </div>
      <div class="item-info">
        <div class="name-reply">
          <span class="name">{{ info.name }}</span>
          <span
            class="reply"
            @click="
              replyClickHandler(
                info.name,
                info.id,
                info.message_id,
                info.comment_id,
                info.article_id
              )
            "
            >回复</span
          >
        </div>
        <div class="time">{{ formatUTCTwo(info.createAt) }}</div>
      </div>
    </div>
    <div class="content">
      <template v-if="info?.content?.split('/')[1]">
        <span class="replyname">{{ info?.content?.split('/')[1] }}</span>
      </template>
      <span class="neirong">{{ info?.content?.split('/')[0] }}</span>
    </div>
  </div>
  <el-divider border-style="dotted" />
</template>

<script setup lang="ts">
import { formatUTCTwo } from '@/utils/format'

defineProps(['info'])

const emit = defineEmits(['replyEmit'])

function replyClickHandler(
  name: string,
  id: number,
  messageId: number,
  commentId: number,
  articleId: number
) {
  if (!messageId && !commentId && !articleId) {
    emit('replyEmit', name, id)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else if (articleId) {
    emit('replyEmit', name, id)
  } else if (messageId) {
    emit('replyEmit', name, messageId)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else if (commentId) {
    emit('replyEmit', name, commentId)
  }
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    margin-bottom: 0.625rem;
    .avatar {
      margin-right: 0.625rem;
    }
    .item-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      .time {
        color: #b3b3b3;
        font-size: 0.75rem;
      }
      .name-reply {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 0.875rem;
          font-weight: 520;
          color: rgba(15, 166, 212, 1);
        }
        .reply {
          color: #1890ff;
          font-size: 0.8125rem;
          cursor: pointer;
        }
      }
    }
  }
  .content {
    margin-left: 3.125rem;
    .neirong {
      word-break: break-all;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .replyname {
      font-size: 0.875rem;
      color: rgba(15, 166, 212, 1);
      margin-right: 0.375rem;
    }
  }
}
</style>
