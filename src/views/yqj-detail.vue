<template>
  <div class="detail">
    <template v-if="pageSize !== 'small'">
      <div class="index">
        <el-affix :offset="22" :z-index="2">
          <el-card shadow="hover">
            <div class="catalogue">目录</div>
            <div class="anchor">
              <template v-if="state.indexs.length">
                <div
                  class="anchor-tag"
                  v-for="(anchor, index) in state.indexs"
                  :key="index"
                  @click="handleAnchorClick(anchor)"
                  :style="{ padding: `0 0 0 ${anchor.indent * 20}px` }"
                  :class="index == heightindex ? 'title-active' : ''"
                >
                  {{ anchor.title }}
                </div>
              </template>
              <template v-if="!state.indexs.length">
                <el-empty description="暂无目录" />
              </template>
            </div>
          </el-card>
        </el-affix>
      </div>
    </template>
    <el-card shadow="hover" class="content">
      <div class="header">
        <div class="title">{{ articleDetail.title }}</div>
        <el-divider />
        <div class="info">
          <img src="@/assets/img/time.png" />
          <span>发表于 {{ formatUTCOne(articleDetail.createAt) }}</span>
          <el-divider direction="vertical" />
          <img src="@/assets/img/update.png" />
          <span>最后更新于 {{ formatUTCOne(articleDetail.updateAt) }}</span>
          <el-divider direction="vertical" />
          <img src="@/assets/img/classify-1.png" />
          <span>{{ articleDetail.classify }}</span>
          <el-divider direction="vertical" />
          <img src="@/assets/img/label-1.png" />
          <template v-for="label in articleDetail.labels" :key="label.id">
            <span :style="{ color: getColor() }">{{ label.name }}</span>
          </template>
        </div>
      </div>
      <v-md-editor
        :model-value="articleDetail.content ?? ''"
        mode="preview"
        ref="preview"
      ></v-md-editor>
      <el-divider border-style="dashed" />
      <div class="footer" :class="pageSize == 'small' ? 'vertical' : ''">
        <template v-if="articleDetail.lastArticle">
          <el-button
            plain
            size="large"
            @click="changeArticle(articleDetail.lastArticle?.id)"
            >上一篇 {{ articleDetail.lastArticle.title }}</el-button
          >
        </template>
        <template v-else><div></div></template>
        <template v-if="articleDetail.nextArticle">
          <el-button
            plain
            size="large"
            @click="changeArticle(articleDetail.nextArticle?.id)"
            >下一篇 {{ articleDetail.nextArticle.title }}</el-button
          >
        </template>
      </div>
      <el-divider border-style="dashed" />
      <div class="comment">
        <div class="comment-title">
          <span class="title">评论</span>
          <template v-if="replyName">
            <span class="replyname">@{{ replyName }}</span>
            <span class="quitreply" @click="quitClickHandler">取消回复</span>
          </template>
        </div>
        <commentForm
          :commentList="commentList"
          :replyCommentId="replyCommentId"
          :replyName="replyName"
          :articleId="articleDetail.id"
          @postSuccessEmit="getListAgian"
          ref="formRefEl"
        ></commentForm>
        <template v-if="commentList.length">
          <div class="comment-count">{{ commentCount }} 条评论</div>
          <el-divider />
        </template>
        <template v-else>
          <el-empty description="暂无评论" />
        </template>
        <wordList
          :List="commentList"
          @replyEmitCommit="replyEmitHandler"
        ></wordList>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import commentForm from '@/components/comment-form.vue'
import wordList from '@/components/word-list.vue'

import {
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  getCurrentInstance,
  watchEffect,
  nextTick
} from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

import getColor from '@/utils/color'
import { formatUTCOne } from '@/utils/format'
import { throttleHandle } from '@/utils/loadsh'
import { sessionCache } from '@/utils/cache'

import useDetailStore from '@/stores/detail'

defineProps(['pageSize'])
const router = useRouter()
const route = useRoute()
const detailStore = useDetailStore()
const formRefEl = ref()
const state: any = reactive<any>({
  id: route.query.id,
  indexs: []
})
const replyName = ref('')
const replyCommentId = ref(0)
const heightindex: any = ref(0)
const preview: any = ref()
const { proxy }: any = getCurrentInstance()
const scroll = () => {
  return () => {
    let scrollTop =
      window.pageYOffset | window.scrollY | document.body.scrollTop
    const absList: any = []
    state.indexs.forEach((item: any) => {
      absList.push(Math.abs(item.height - scrollTop))
    })
    heightindex.value = absList.indexOf(Math.min.apply(null, absList))
  }
}
const scrolldebounceHandle = throttleHandle(scroll(), 100)
watchEffect(() => {
  state.id = route.query.id
  if (route.query.id) {
    nextTick(async () => {
      await detailStore.getArticleDetailByIdAction(state.id)
      await detailStore.getCommentByArticleIdAction(state.id, 0, 1000)
      if (articleDetail.value.title) {
        document.title = `文章 - ${articleDetail.value.title}`
      }

      const anchors =
        proxy.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
      const title = Array.from(anchors).filter((title: any) => {
        return !!title.innerText.trim()
      })
      if (!title.length) {
        state.indexs = []
        return
      }
      const hTags = Array.from(
        new Set(
          title.map((title: any) => {
            return title.tagName
          })
        )
      ).sort()
      state.indexs = title.map((el: any) => {
        return {
          title: el.innerText,
          lineIndex: el.getAttribute('data-v-md-line'),
          indent: hTags.indexOf(el.tagName),
          height: el.offsetTop
        }
      })
    })
  }
})
onMounted(() => {
  window.addEventListener('scroll', scrolldebounceHandle)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrolldebounceHandle)
})

function handleAnchorClick(anchor: any) {
  const { lineIndex } = anchor
  const heading = preview.value.$el.querySelector(
    `[data-v-md-line="${lineIndex}"]`
  )
  if (heading) {
    heading.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

function replyEmitHandler(name: string, id: number) {
  replyCommentId.value = id
  replyName.value = name
  formRefEl.value.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
function getListAgian() {
  replyName.value = ''
  replyCommentId.value = 0
  detailStore.getCommentByArticleIdAction(state.id, 0, 100)
}
function changeArticle(id: number) {
  replyName.value = ''
  replyCommentId.value = 0
  sessionCache.setCache('page', `/main/detail?id=${id}`)
  router.push({
    path: '/main',
    query: { id }
  })
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
function quitClickHandler() {
  replyCommentId.value = 0
  replyName.value = ''
}
const { articleDetail, commentList, commentCount } = storeToRefs(detailStore)
</script>

<style lang="less" scoped>
.detail {
  display: flex;
  .index {
    flex: 1;
    padding-right: 0.75rem;
    .el-card {
      display: flex;
      flex-direction: column;

      .catalogue {
        font-size: 1.125rem;
        color: #212529;
        margin-bottom: 0.625rem;
      }
      .anchor {
        display: flex;
        flex-direction: column;
        .anchor-tag {
          margin: 0.4375rem 0 0.4375rem 0 !important;
          cursor: pointer;
          line-height: 1.5;
          font-size: 0.75rem;
          color: #666261;
          transition: 0.2s;
          &:hover {
            color: #0d6efd;
          }
        }
        .el-empty {
          --el-empty-padding: 0.625rem 0;
        }
      }
    }
  }
  .content {
    margin-left: 0.75rem;
    flex: 3;
    :deep(.vuepress-markdown-body:not(.custom)) {
      padding: 0 !important;
    }
    :deep(.el-card__body) {
      padding: 3.125rem 2.5rem 3.125rem 2.5rem;
    }
    .header {
      margin-bottom: 2.5rem;
      .el-divider--horizontal {
        margin: 0.625rem 0 0.625rem 0;
      }
      .title {
        font-size: 1.75rem;
      }
      .info {
        vertical-align: middle;
        span {
          margin-left: 0.3125rem;
          font-size: 0.875rem;
          color: #6c757d;
          vertical-align: middle;
        }
        img {
          vertical-align: middle;
          width: 1.125rem;
          height: 1.125rem;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      .el-button {
        margin: 0;
        white-space: normal;
      }
    }
    .comment {
      .comment-title {
        .title {
          font-size: 1.5rem;
        }
        margin-bottom: 1.5625rem;
        .replyname {
          color: aqua;
          font-size: 1.25rem;
          margin: 0 0.5rem 0 0.5rem;
        }
        .quitreply {
          color: #b3b3b3;
          cursor: pointer;
          font-size: 1rem;
        }
      }
      .comment-count {
        margin-top: 0.5rem;
        font-size: 1.125rem;
      }
    }
  }
}
.title-active {
  color: #0d6efd !important;
}
.vertical {
  flex-direction: column;
}
</style>
