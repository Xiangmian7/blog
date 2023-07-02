import server from '.'

export function getBaseData() {
  return server.request({
    method: 'GET',
    url: '/basedata'
  })
}
export function getArticleList(offset: number, size: number) {
  return server.request({
    method: 'GET',
    url: `/article?offset=${offset}&size=${size}`
  })
}
export function getArticleTimeLine() {
  return server.request({
    method: 'GET',
    url: '/timer'
  })
}
export function getArticleTimeLineByLabel(labelId: number) {
  return server.request({
    method: 'GET',
    url: `/timer?labelId=${labelId}`
  })
}
export function getArticleTimeLineByClassify(classifyName: string) {
  return server.request({
    method: 'GET',
    url: `/timer?classifyName=${classifyName}`
  })
}
export function getToolList(offset: number, size: number) {
  return server.request({
    method: 'GET',
    url: `/tool?offset=${offset}&size=${size}`
  })
}
export function postMessage(messageInfo: any) {
  return server.request({
    method: 'POST',
    data: messageInfo,
    url: `/message`
  })
}
export function replyMessage(replyInfo: any, messageId: number) {
  return server.request({
    method: 'POST',
    data: replyInfo,
    url: `/message/reply/${messageId}`
  })
}

export function getMessageList(offset: number, size: number) {
  return server.request({
    method: 'GET',
    url: `/message?offset=${offset}&size=${size}`
  })
}

export function getArticleDetailById(id: number) {
  return server.request({
    method: 'GET',
    url: `/article/${id}`
  })
}

export function getArticleListByWord(word: string) {
  return server.request({
    method: 'GET',
    url: `/like?word=${word}`
  })
}

export function postComment(commentInfo: any, articleId: number) {
  return server.request({
    method: 'POST',
    url: `/comment/${articleId}`,
    data: commentInfo
  })
}

export function replyComment(commentInfo: any, commentId: number) {
  return server.request({
    method: 'POST',
    url: `/comment/reply/${commentId}`,
    data: commentInfo
  })
}

export function getCommentByArticleId(
  articleId: number,
  offset: number,
  size: number
) {
  return server.request({
    method: 'GET',
    url: `/comment/${articleId}?offset=${offset}&size=${size}`
  })
}
export function getFriendList(offset: number, size: number) {
  return server.request({
    method: 'GET',
    url: `/friend?offset=${offset}&size=${size}}`
  })
}
