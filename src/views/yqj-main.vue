<template>
  <div class="main">
    <div class="header">
      <mainHeader
        @searchClick="searchClickHandler"
        :pageSize="pageSize"
      ></mainHeader>
    </div>
    <div class="content">
      <div class="content-box" :class="pageSize">
        <template v-if="!isHiddenAsside">
          <div class="aside" :class="isDetail ? 'isdtail' : ''">
            <template v-if="!isDetail">
              <mainAside
                :isHiddenAsside="isHiddenAsside"
                :pageSize="pageSize"
              ></mainAside>
            </template>
          </div>
        </template>
        <div class="router">
          <router-view :pageSize="pageSize"></router-view>
        </div>
      </div>
    </div>
    <template v-if="pageSize !== 'small'">
      <div class="footer">
        <mainFooter></mainFooter>
      </div>
    </template>
    <el-dialog
      v-model="dialogVisible"
      title="文章搜索"
      width="42%"
      center
      top="20vh"
    >
      <el-input
        v-model="inputVal"
        clearable
        placeholder="请输入关键字..."
        @input="valueChangeHandlerDebounce"
      ></el-input>
      <searchVal
        :resultList="resultList"
        @clickSearchVal="clickSearchHandler"
      ></searchVal>
    </el-dialog>
    <el-backtop :right="50" :bottom="50" :visibility-height="400" />
  </div>
</template>

<script setup lang="ts">
import searchVal from '@/components/search-val.vue'
import mainHeader from '@/components/main-header.vue'
import mainFooter from '@/components/main-footer.vue'
import mainAside from '@/components/main-aside.vue'

import { watchEffect, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { debounceHandle } from '@/utils/loadsh'
import useSearchStore from '@/stores/search'

const searchStore = useSearchStore()
const inputVal = ref()
function valueChangeHandler(word: string) {
  searchStore.getArticleListByWordAction(word)
}

const valueChangeHandlerDebounce = debounceHandle(valueChangeHandler, 400)

const route = useRoute()

const isDetail = ref(false)

const dialogVisible = ref(false)

const pageSize = ref('')

const isHiddenAsside = ref(false)

function searchClickHandler() {
  dialogVisible.value = true
}
function clickSearchHandler() {
  dialogVisible.value = false
}

if (document.body.clientWidth < 1230 && document.body.clientWidth > 990) {
  pageSize.value = 'middle'
} else if (document.body.clientWidth > 1230) {
  pageSize.value = 'big'
} else if (document.body.clientWidth < 990) {
  pageSize.value = 'small'
}

watchEffect(() => {
  if (route.query.id) {
    isDetail.value = true
  } else {
    isDetail.value = false
  }

  if (route.path !== '/main/home' && pageSize.value == 'small') {
    isHiddenAsside.value = true
  } else if (route.path == '/main/home' && pageSize.value == 'small') {
    isHiddenAsside.value = false
  } else {
    isHiddenAsside.value = false
  }
})
function resizeFun() {
  if (document.body.clientWidth < 1230 && document.body.clientWidth > 990) {
    pageSize.value = 'middle'
  } else if (document.body.clientWidth > 1230) {
    pageSize.value = 'big'
  } else if (document.body.clientWidth < 990) {
    pageSize.value = 'small'
  }
}
const resizeFunDebounce = debounceHandle(resizeFun, 100)
onMounted(() => {
  window.addEventListener('resize', resizeFunDebounce)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeFunDebounce)
})
const { resultList } = storeToRefs(searchStore)
</script>

<style lang="less" scoped>
.main {
  .content {
    margin-top: 3.75rem;
    .content-box {
      padding: 2.5rem 0 2.5rem 0;
      .aside {
        flex: 1;
        padding: 0 0.75rem 0 0.75rem;
      }
      .router {
        flex: 3;
        padding: 0 0.75rem 0 0.75rem;
      }
    }
  }
  :deep(.el-dialog__body) {
    padding: 0.625rem 1.5625rem 1.875rem 1.5625rem;
  }
}
.big {
  margin: 0 8.4375rem 0 8.4375rem;
  display: flex;
}
.middle {
  margin: 0 0.625rem 0 0.625rem;
  display: flex;
}
.small {
  display: flex;
  flex-direction: column;
  margin: 0 0.625rem 0 0.625rem;
}
.isdtail {
  flex: 0 !important;
  padding: 0 !important;
}
</style>
