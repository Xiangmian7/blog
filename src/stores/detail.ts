import { getArticleDetailById, getCommentByArticleId } from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  articleDetail: any
  commentList: any[]
  commentCount: number
}

const useDetailStore = defineStore('detail', {
  state(): stateInterface {
    return {
      articleDetail: {},
      commentList: [],
      commentCount: 0
    }
  },
  actions: {
    async getArticleDetailByIdAction(id: number) {
      const result = await getArticleDetailById(id)
      this.articleDetail = result
    },
    async getCommentByArticleIdAction(
      id: number,
      offset: number,
      size: number
    ) {
      const result: any = await getCommentByArticleId(id, offset, size)
      this.commentList = result
      this.commentCount = result[0]?.totalCount + result[0]?.total
    }
  }
})

export default useDetailStore
