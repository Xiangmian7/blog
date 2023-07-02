import { getToolList } from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  toolList: any[]
}

const useToolStore = defineStore('tool', {
  state(): stateInterface {
    return {
      toolList: []
    }
  },
  actions: {
    async getToolListAction(offset: number, size: number) {
      const result: any = await getToolList(offset, size)
      this.toolList = result
    }
  }
})

export default useToolStore
