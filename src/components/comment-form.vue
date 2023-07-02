<template>
  <el-form :model="formValue" :rules="rules" ref="formEl">
    <el-row :gutter="15">
      <el-col :span="12">
        <el-form-item prop="name">
          <el-input
            clearable
            size="large"
            placeholder="昵称"
            v-model="formValue.name"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item prop="mailbox">
          <el-input
            clearable
            size="large"
            placeholder="QQ邮箱"
            v-model="formValue.mailbox"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item prop="content">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容..."
            v-model="formValue.content"
            resize="none"
          ></el-input>
          <el-button type="primary" @click="messageCommitHandler"
            >提交</el-button
          >
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'

import useCommentStore from '@/stores/comment'
const commentStore = useCommentStore()

const emit = defineEmits(['postSuccessEmit'])
const props = defineProps(['replyCommentId', 'replyName', 'articleId'])

const formValue = reactive({
  name: localCache.getCache('visitorName') ?? '',
  mailbox: localCache.getCache('visitorEmail') ?? '',
  content: ''
})

const formEl = ref()

const rules = reactive({
  name: [
    {
      required: true,
      message: '请输入你的昵称',
      trigger: 'change'
    },
    { min: 1, max: 20, message: '昵称不能超过20个字符', trigger: 'blur' }
  ],
  mailbox: [
    {
      required: true,
      message: '请输入你的邮箱',
      trigger: 'change'
    },
    {
      pattern: /^[1-9][0-9]{4,10}@qq.com$/,
      message: '邮箱格式错误',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'change'
    }
  ]
})

function messageCommitHandler() {
  formEl.value.validate((isValid: boolean) => {
    if (isValid) {
      const QQNumber = formValue.mailbox.split('@')[0]
      const avatarUrl = `http://q2.qlogo.cn/headimg_dl?dst_uin=${QQNumber}&spec=100`
      localCache.setCache('visitorName', formValue.name)
      localCache.setCache('visitorEmail', formValue.mailbox)
      if (!props.replyCommentId && !props.replyName) {
        const commentInfo = {
          name: formValue.name,
          avatar: avatarUrl,
          content: formValue.content
        }
        commentStore.postCommentAction(commentInfo, props.articleId).then(
          () => {
            emit('postSuccessEmit')
            formEl.value.resetFields()
            ElMessage({
              message: '评论成功~',
              type: 'success'
            })
          },
          () => {
            ElMessage.error('评论失败~')
          }
        )
      } else if (props.replyCommentId && props.replyName) {
        const content = formValue.content + `/@${props.replyName}`
        const commentInfo = {
          name: formValue.name,
          avatar: avatarUrl,
          content
        }
        commentStore.replyCommentAction(commentInfo, props.replyCommentId).then(
          () => {
            emit('postSuccessEmit')
            formEl.value.resetFields()
            ElMessage({
              message: '回复成功~',
              type: 'success'
            })
          },
          () => {
            ElMessage.error('回复失败~')
          }
        )
      }
    } else {
      ElMessage.error('信息格式错误~')
    }
  })
}
</script>

<style lang="less" scoped>
.el-form {
  position: relative;
  .el-button {
    position: absolute;
    right: 0.625rem;
    bottom: 0.625rem;
  }
}
</style>
