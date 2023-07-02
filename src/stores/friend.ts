import { getFriendList } from '@/services/main'
import { defineStore } from 'pinia'

interface stateInterface {
  friendList: any[]
}

const useFriendStore = defineStore('friend', {
  state(): stateInterface {
    return {
      friendList: []
    }
  },
  actions: {
    async getFriendListAction(offset: number, size: number) {
      const result: any = await getFriendList(offset, size)
      this.friendList = result
    }
  }
})

export default useFriendStore
