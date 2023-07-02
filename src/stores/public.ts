import { getBaseData } from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  articleCount: number
  sortCount: number
  labelCount: number
  sorts: any[]
  labels: any[]
  recommandList: any[]
  activeValue: string
}

const usePublicStore = defineStore('public', {
  state(): stateInterface {
    return {
      articleCount: 0,
      sortCount: 0,
      labelCount: 0,
      sorts: [],
      labels: [],
      recommandList: [],
      activeValue: ''
    }
  },
  actions: {
    async getBaseDataAction() {
      const result: any = await getBaseData()
      this.articleCount = result.articleCount
      this.sortCount = result.sortCount
      this.labelCount = result.labelCount
      this.sorts = result.sorts
      this.labels = result.labels
      this.recommandList = result.recommandList
    }
  }
})

export default usePublicStore
