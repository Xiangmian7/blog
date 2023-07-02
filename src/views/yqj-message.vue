<template>
  <div class="message">
    <el-card shadow="hover">
      <div class="title-box">
        <span class="title">留言</span>
        <template v-if="replyName">
          <span class="replyname">@{{ replyName }}</span>
          <span class="quitreply" @click="quitClickHandler">取消回复</span>
        </template>
      </div>
      <div class="form">
        <messageForm
          :replyMessageId="replyMessageId"
          :replyName="replyName"
          @postSuccessEmit="getListAgian"
        ></messageForm>
      </div>
      <div class="count">{{ messageCount ?? 0 }} 条留言</div>
      <el-divider border-style="double" />
      <div class="list">
        <wordList
          :List="messageList"
          @replyEmitCommit="replyEmitCommitHandler"
        ></wordList>
      </div>
      <div class="btn" v-if="isMoreMessage">
        <el-button round plain @click="loadingMore">加载更多...</el-button>
      </div>
      <div class="btn" v-if="!isMoreMessage">
        <span>到底儿了~</span>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import wordList from '@/components/word-list.vue'
import messageForm from '@/components/message-form.vue'

import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'

import useMessageStore from '@/stores/message'

const messageStore = useMessageStore()
const offset = ref(0)
const replyMessageId = ref(0)
const replyName = ref('')

messageStore.getMessageListAction(offset.value, 10)

const { messageList, messageCount, isMoreMessage } = storeToRefs(messageStore)

function loadingMore() {
  offset.value = offset.value + 10
  messageStore.getMessageListAction(offset.value, 10, 'push')
}

function replyEmitCommitHandler(name: string, messageId: number) {
  replyMessageId.value = messageId
  replyName.value = name
}

function quitClickHandler() {
  replyName.value = ''
  replyMessageId.value = 0
}

function getListAgian() {
  messageStore.getMessageListAction(0, offset.value + 10)
  replyName.value = ''
  replyMessageId.value = 0
}

onMounted(() => {
  document.title = `留言 - 叶千菁`
})
</script>

<style lang="less" scoped>
.message {
  .el-card {
    :deep(.el-card__body) {
      padding: 3.125rem 2.5rem 3.125rem 2.5rem;
    }
    .title-box {
      .title {
        font-size: 1.5rem;
      }
      .replyname {
        color: aqua;
        font-size: 1.25rem;
        margin: 0 0.5rem 0 0.5rem;
      }
      .quitreply {
        color: #b3b3b3;
        cursor: pointer;
        font-size: 0.9375rem;
      }
      margin-bottom: 1.5625rem;
    }
    .count {
      font-size: 1.25rem;
      margin-top: 0.5rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #b3b3b3;
      }
    }
  }
}
</style>
