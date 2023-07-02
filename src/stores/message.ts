import { getMessageList, postMessage, replyMessage } from '@/services/main'
import { defineStore } from 'pinia'
postMessage
interface stateInterface {
  messageList: any[]
  messageCount: number
  isMoreMessage: boolean
}

const useMessageStore = defineStore('messgae', {
  state(): stateInterface {
    return {
      messageList: [],
      messageCount: 0,
      isMoreMessage: true
    }
  },
  actions: {
    async postMessageAction(messageInfo: any) {
      await postMessage(messageInfo)
    },
    async replyMessageAction(replyInfo: any, messageId: number) {
      await replyMessage(replyInfo, messageId)
    },
    async getMessageListAction(offset: number, size: number, type?: string) {
      const result: any = await getMessageList(offset, size)
      if (type !== 'push') {
        this.messageList = result
      } else {
        this.messageList.push(...result)
      }
      if (result.length % 10 !== 0 || result.length == 0) {
        this.isMoreMessage = false
      } else {
        this.isMoreMessage = true
      }
      this.messageCount = result[0]?.totalCount
    }
  }
})

export default useMessageStore
