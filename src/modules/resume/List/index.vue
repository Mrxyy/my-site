<template>
  <div v-for="contentItem,contentKey  in pageMainContent" class="skill-container my-4">
    <div class="paragraph-headings flex">
      <span
        v-if="pageMainContent.rightText"
        :class="`font-bold text-xl text-${pageMainContent.rightTextSize || '2xl'}`"
      >{{ pageMainContent.rightText }}</span>
      <span v-if="pageMainContent.time" class="mx-10 font-bold">{{ pageMainContent.time }}</span>
      <h2 :class="`text-primary font-bold text-${pageMainContent.titleSize || '2xl'}`">
        <span class="icon mr-2" v-if="pageMainContent.icon" v-html="pageMainContent.icon"></span>
        {{ contentKey }}
      </h2>
    </div>
    <ul class="pl-6">
      <li v-for="skillItem,index in contentItem" class="leading-8 my-2 whitespace-nowrap">
        <template v-if="typeof skillItem === 'string'">
          <label
            class="mr-2 text-primary font-bold self-stretch whitespace-normal inline-block"
            for="`#skillItem${index}`"
          >
            <span
              class="icon"
              v-if="(skillItem.icon || contentItem.icon)"
              v-html="skillItem.icon || contentItem.icon || pageMainContent.icon"
            ></span>
            <template v-else>{{ index + 1 }}.</template>
          </label>
          <span
            :id="'skillItem' + index"
            class="text-justify skillItem inline-flex align-top whitespace-normal"
          >{{ skillItem }}</span>
        </template>
        <template v-if="typeof skillItem === 'object'">
          <List :page-main-content="skillItem" />
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, readonly } from 'vue'
export enum PersonalInfoItemType {
  phone,
  email
}

interface childContent {
  [key: string]: Array<string | childContent>
}

interface moreOptonChildContent {
  time?: string,
  rightText?: string,
  titleSize?: string,
  rightTextSize?: string
  // <!-- http://www.fhdq.net/ts/177.html -->
  // <!-- https://www.webhek.com/post/html-enerty-code.html -->
  icon?: string,

}


export interface pageMainContent {
  [key: Exclude<string, 'prototype'>]: Array<string | pageMainContent> | pageMainContent | moreOptonChildContent
}

export function setMoreOptonChildContent<T>(obj: T, moreOptonChildContent: moreOptonChildContent): T {
  /**
    1. case object for key common config
    2. case array for list config
    3. case string for li config
   */
  obj = typeof obj === 'string' ? [obj] : obj;
  Object.keys(moreOptonChildContent).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(moreOptonChildContent, key);
    if (descriptor) {
      descriptor.enumerable = false
    }
  });
  Object.setPrototypeOf(obj, moreOptonChildContent);
  return obj
}

export default defineComponent({
  name: "List",
  props: {
    pageMainContent: {
      required: true,
      type: Object as PropType<pageMainContent>
    }
  }
})
</script>

<style lang="scss" scoped>
.skill-container {
  .icon {
    font-size: 0.8em;
  }
  ul {
    .skillItem {
      &:before {
        content: "";
      }
    }
  }
}
</style>