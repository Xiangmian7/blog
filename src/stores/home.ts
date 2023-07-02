import { getArticleList } from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  articleList: any[]
  totalCount: number
}

const useHomeStore = defineStore('home', {
  state(): stateInterface {
    return {
      articleList: [],
      totalCount: 0
    }
  },
  actions: {
    async getArticleListAction(offset: number, size: number) {
      const result: any = await getArticleList(offset, size)
      this.articleList = result
      this.totalCount = result[0].total
    }
  }
})

export default useHomeStore
