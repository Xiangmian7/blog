import { postComment, replyComment } from '@/services/main'
import { defineStore } from 'pinia'

const useCommentStore = defineStore('comment', {
  state() {
    return {}
  },
  actions: {
    async postCommentAction(commentInfo: any, articleId: number) {
      await postComment(commentInfo, articleId)
    },
    async replyCommentAction(commentInfo: any, commentId: number) {
      await replyComment(commentInfo, commentId)
    }
  }
})

export default useCommentStore
