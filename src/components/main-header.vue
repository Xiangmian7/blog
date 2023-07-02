<template>
  <div class="main-header" :class="headerClass">
    <div class="left" @click="headerNameClick">叶千菁</div>
    <template v-if="pageSize !== 'small'">
      <div class="right">
        <template v-for="item in headerList" :key="item.path">
          <div
            class="item"
            :class="item.path == activeRef ? 'active-item' : ''"
            @click="tabClickHandler(item.path)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </template>
    <template v-if="pageSize == 'small'">
      <div class="icon-menu" @click="expandClickHandler">
        <img src="@/assets/img/menu.png" />
      </div>
    </template>
    <el-drawer v-model="drawer" size="70%" :with-header="false">
      <el-avatar :size="120">
        <img src="@/assets/img/xinji.jpg" />
      </el-avatar>
      <div class="drawer-name">叶千菁</div>
      <el-divider border-style="dashed" />
      <div class="column-list">
        <template v-for="item in headerListicon" :key="item.path">
          <div
            :class="item.path == activeRef ? 'active-item' : ''"
            @click="menuClickHandler(item.path)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue'

import { sessionCache } from '../utils/cache'
import { throttleHandle } from '@/utils/loadsh'
import usePublicStore from '@/stores/public'

defineProps(['pageSize'])
const publicStore = usePublicStore()

const emit = defineEmits(['searchClick'])

const headerList = [
  { name: '首页', path: '/main/home' },
  { name: '归档', path: '/main/archive' },
  { name: '工具', path: '/main/tool' },
  { name: '留言', path: '/main/message' },
  { name: '友链', path: '/main/friend' },
  { name: '关于', path: '/main/about' },
  { name: '搜索', path: 'search' }
]
const headerListicon = [
  { name: '首页', path: '/main/home' },
  { name: '归档', path: '/main/archive' },
  { name: '工具', path: '/main/tool' },
  { name: '留言', path: '/main/message' },
  { name: '友链', path: '/main/friend' },
  { name: '关于', path: '/main/about' }
]

const router = useRouter()
const drawer = ref(false)
const scrollVal = ref(0)
const headerClass = ref('')
const activeRef = ref(sessionCache.getCache('page') ?? '/main/home')

function tabClickHandler(path: string) {
  if (path !== 'search') {
    publicStore.activeValue = ''
    activeRef.value = path
    sessionCache.setCache('page', path)
    router.push(path)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else {
    emit('searchClick')
  }
}

function menuClickHandler(path: string) {
  publicStore.activeValue = ''
  activeRef.value = path
  sessionCache.setCache('page', path)
  drawer.value = false
  router.push(path)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

watchEffect(() => {
  if (publicStore.activeValue) {
    activeRef.value = ''
  }
})

function scrolling() {
  let scrollTop =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  if (scrollTop > scrollVal.value) {
    headerClass.value = 'hidden'
  } else if (scrollTop < scrollVal.value || scrollTop <= 0) {
    headerClass.value = ''
  }
  scrollVal.value = scrollTop
}

function expandClickHandler() {
  drawer.value = true
}

function headerNameClick() {
  sessionCache.setCache('page', '/main/home')
  publicStore.activeValue = ''
  activeRef.value = '/main/home'
  router.push('/main/home')
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const scrollingThrottle = throttleHandle(scrolling, 200)

onMounted(() => {
  window.addEventListener('scroll', scrollingThrottle)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollingThrottle)
})
</script>

<style lang="less" scoped>
.main-header {
  z-index: 3;
  background-color: hsla(0, 0%, 100%, 0.8);
  padding: 0 3rem 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.75rem;
  box-shadow: 0 0.3125rem 0.375rem -0.3125rem hsla(0, 0%, 52.2%, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: 0.3s;
  .left {
    cursor: pointer;
    font-size: 1.125rem;
  }
  .right {
    display: flex;
    align-items: center;
    .item {
      padding: 0 1.25rem 0 1.25rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: #1890ff;
      }
    }
  }
  .icon-menu {
    cursor: pointer;
    img {
      width: 1.375rem;
      height: 1.375rem;
    }
  }
  :deep(.el-drawer__body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-avatar {
      margin-bottom: 1.25rem;
    }
    .drawer-name {
      font-size: 1.5rem;
      margin-bottom: 0.625rem;
    }
    .column-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      div {
        text-align: center;
        width: 100%;
        cursor: pointer;
        transition: 0.3s;
        padding: 1.25rem 0 1.25rem 0;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
.active-item {
  color: #1890ff;
}
.hidden {
  transform: translateY(-3.75rem);
}
</style>
