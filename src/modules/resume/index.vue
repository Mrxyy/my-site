<template>
    <div :class="`resume-container bg-primary bg-opacity-10 ${currentTheme}`" ref="resumeContainer">
        <div class="w-10/12 m-auto p-10">
            <div class="personalInfo grid grid-cols-5 mb-5">
                <ul class="col-span-4">
                    <template v-for="infoLineItem in personalInfo">
                        <li class="flex my-2 items-center content-center">
                            <span class="icon text-primary">&#10152</span>
                            <div
                                v-for="infoItme,infoItmeKey in infoLineItem"
                                :class="`${infoItme ? 'infoChunk' : ''} inline-flex w-6/12 leading-7`"
                            >
                                <label
                                    class="mr-2 text-primary font-bold text-xl"
                                    :for="`#${infoItmeKey}`"
                                    :contenteditable="enableEdit"
                                >{{ infoItmeKey }}</label>
                                <p
                                    :id="`${infoItmeKey}`"
                                    :class="`${infoItme?.bold ? 'font-bold' : ''}`"
                                >
                                    <a
                                        :contenteditable="enableEdit"
                                        @blur="inputEdit($event, infoLineItem, infoItmeKey)"
                                        :class="`${infoItme?.type !== undefined ? 'text-link' : ''}`"
                                        :target="infoItme.target || '_self'"
                                        :href="infoItme?.type !== undefined ? (infoItme.type + infoItme.val) : 'javascript:'"
                                    >{{ infoItme?.val || infoItme }}</a>
                                </p>
                            </div>
                        </li>
                    </template>
                </ul>
                <div class="col-span-1 picture">
                    <img
                        v-if="logo"
                        :src="logo.href"
                        class="m-auto"
                        :style="{ width: logo.width || '90px', height: logo.height || '110px' }"
                        title="jaden.xiong"
                    />
                </div>
            </div>
            <div class="w-full border-b px-10 -ml-10 my-5 box-content"></div>
            <resumeList :page-main-content="pageMainContent" :enable-edit="enableEdit" />
            <moModal width="80vw" height="80vh" ref="JsonEditor" title="修改内容">
                <JsonEditor v-model="JsonData" />
                <template #footer>{{ null }}</template>
            </moModal>
        </div>
    </div>
    <resumeMenu :theme="currentTheme" @switchThemeHandler="switchThemeHandler" @edit="edit" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, reactive, toRaw } from 'vue';
import resumeList, { pageMainContent, setMoreOptonChildContent } from "./List/index.vue"
import resumeMenu from "../../components/menu/Circle.vue"
import JsonEditor from "../../components/json/editor.vue"
import JsonData, { PersonalInfoItem, rawToData } from "./content"

interface Data {
    currentTheme: "light" | "dark"
    enableEdit: boolean,
    JsonData: {
        personalInfo: Array<PersonalInfoItem>,
        pageMainContent: pageMainContent,
        name?: string
        logo?: {
            href?: string,
            width?: string,
            height?: string
        }
    }
}


export default defineComponent({
    data(): Data {
        const storageJsonData = localStorage && localStorage.getItem("JsonData");
        return {
            currentTheme: 'light',
            enableEdit: false,
            JsonData: (storageJsonData && JSON.parse(storageJsonData)) || JsonData,
        }
    },
    watch: {
        JsonData(newData) {
            console.log(newData);
            if (localStorage) {
                localStorage.setItem("JsonData", JSON.stringify(newData));
            }
        }
    },
    computed: {
        rawJsonData() {
            console.log(reactive(toRaw(this.JsonData)));
            // JSON.parse(JSON.stringify(this.JsonData));
            return JSON.parse(JSON.stringify(this.JsonData));
        },
        personalInfo() {
            return rawToData(this.rawJsonData).personalInfo
        },
        pageMainContent() {
            return rawToData(this.rawJsonData).pageMainContent
        },
        name() {
            return rawToData(this.rawJsonData).name
        },
        logo() {
            console.log(rawToData(this.rawJsonData).logo);
            return rawToData(this.rawJsonData).logo
        }
    } as any,
    components: {
        resumeList,
        resumeMenu,
        JsonEditor
    },
    methods: {
        switchThemeHandler() {
            this.currentTheme = this.currentTheme === 'dark' ? "light" : 'dark'
        },
        edit() {
            this.$refs.JsonEditor.switchShow();
        },
        onJsonChange() {
        },
        inputEdit(e, infoLineItem, infoItmeKey) {
            if (typeof infoLineItem[infoItmeKey] === "object") {
                infoLineItem[infoItmeKey].val = e.target.innerText;
            } else {
                infoLineItem[infoItmeKey] = e.target.innerText;
            }
            console.log(infoLineItem, infoItmeKey, this.JsonData, this.test);
        }
    },
    mounted() {
        let tempTheme = ""
        let documentTitle = ''
        const resumeContainer = this.$refs.resumeContainer as HTMLElement
        window.addEventListener('beforeprint', (event) => {
            console.log(resumeContainer.classList);
            tempTheme = resumeContainer.classList.contains("dark") ? 'dark' : '';
            resumeContainer.classList.remove("dark");
            documentTitle = document.title;
            document.title = this.name as string
        });
        window.addEventListener('afterprint', (event) => {
            console.log(tempTheme);
            tempTheme && resumeContainer.classList.add(tempTheme);
            document.title = documentTitle;
        });
    }
})
</script>

<style lang="scss">
.resume-container {
    width: 100%;
    max-height: 100vh;
    scroll-behavior: smooth;
    overflow-y: overlay;
    .w-6\/12 {
        width: 50%;
    }
    > div {
        width: 800px;
    }
    &.dark {
        background: rgba(0, 0, 0, 0.7);
        color: rgba(255, 255, 255, 0.7);
    }
    .personalInfo {
        ul {
            li {
                .icon {
                    margin-right: 1rem;
                }
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

@media print {
    .resume-container {
        > div {
            width: 100%;
        }
        max-height: unset !important;
    }
}
</style>

