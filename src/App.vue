<template>
  <div class="resume-container w-10/12 m-auto my-4 p-10">
    <div class="personalInfo grid grid-cols-5 mb-5">
      <ul class="col-span-4">
        <li class="flex my-1 items-center content-center" v-for="infoLineItem in personalInfo">
          <div
            v-for="infoItme,infoItmeKey in infoLineItem"
            class="infoChunk inline-flex mr-5 leading-7"
          >
            <label
              class="mr-2 text-primary font-bold text-xl"
              :for="`#${infoItmeKey}`"
            >{{ infoItmeKey }}</label>
            <p :id="`${infoItmeKey}`">{{ infoItme?.val || infoItme }}</p>
          </div>
        </li>
      </ul>
      <div class="col-span-1 picture">
        <img src="//www.baidu.com/img/flexible/logo/pc/result@2.png" title="jaden.xiong" />
      </div>
    </div>
    <div class="w-full border-b px-10 -ml-10 my-5 box-content"></div>
    <div class="skill-container">
      <h2 class="text-primary font-bold text-2xl">云原生数据平台</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export enum PersonalInfoItemType {
  phone,
  email
}

interface PersonalInfoItem {
  [ksy: string]: string | { val: number | string, type: PersonalInfoItemType }
}

interface Data {
  personalInfo: Array<PersonalInfoItem>
}

export default defineComponent({
  data(): Data {
    return {
      personalInfo: [
        {
          name: "jaden.xiong"
        },
        {
          "phone-number": {
            val: 17362864761,
            type: PersonalInfoItemType.phone
          },
          "email": {
            val: "17362864761@qq.com",
            type: PersonalInfoItemType.email
          },
        }
      ]
    }
  }
})
</script>

<style lang="scss">
:root {
  font-size: 14px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .resume-container {
  }
  .personalInfo {
    ul {
      li {
        .infoChunk {
          label {
            &::after {
              content: ":";
            }
          }
        }
      }
    }
  }
}
</style>
