import {
  getArticleTimeLine,
  getArticleTimeLineByLabel,
  getArticleTimeLineByClassify
} from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  articleTimeLineList: any[]
  articleTimeLineLabelList: any[]
  articleTimeLineClassifyList: any[]
}

const useArchiveStore = defineStore('archive', {
  state(): stateInterface {
    return {
      articleTimeLineList: [],
      articleTimeLineLabelList: [],
      articleTimeLineClassifyList: []
    }
  },
  actions: {
    async getArticleTimeLineAction() {
      const result: any = await getArticleTimeLine()
      for (let i = 0; i < result.length - 1; i++) {
        const startVal = result[i]?.createAt.split('-')[0]
        const nextVal = result[i + 1]?.createAt.split('-')[0]
        if (startVal !== nextVal) {
          result[i].timeover = startVal
        }
        if (i == result.length - 2) {
          result[i + 1].timeover = nextVal
        }
      }
      this.articleTimeLineList = result
    },
    async getArticleTimeLineByLabelAction(labelId: number) {
      const result: any = await getArticleTimeLineByLabel(labelId)
      this.articleTimeLineLabelList = result
    },
    async getArticleTimeLineByClassifyAction(classifyName: string) {
      const result: any = await getArticleTimeLineByClassify(classifyName)
      this.articleTimeLineClassifyList = result
    }
  }
})

export default useArchiveStore
