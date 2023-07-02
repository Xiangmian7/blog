<template>
  <div class="box">
    <template v-for="item in List" :key="item.id">
      <listItem :info="item" @replyEmit="replyEmitHandler"></listItem>
      <template v-if="item.children">
        <div class="box-reply">
          <template v-for="child in item?.children" :key="child.id">
            <listItem :info="child" @replyEmit="replyEmitHandler"></listItem>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import listItem from './list-item.vue'

defineProps(['List'])

const emit = defineEmits(['replyEmitCommit'])

function replyEmitHandler(name: string, id: number) {
  emit('replyEmitCommit', name, id)
}
</script>

<style lang="less" scoped>
.box {
  .box-reply {
    margin-left: 3.125rem;
  }
}
</style>
