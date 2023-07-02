import { getArticleListByWord } from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  resultList: any[]
}

const useSearchStore = defineStore('search', {
  state(): stateInterface {
    return {
      resultList: []
    }
  },
  actions: {
    async getArticleListByWordAction(word: string) {
      const result: any = await getArticleListByWord(word)
      this.resultList = result
    }
  }
})

export default useSearchStore
