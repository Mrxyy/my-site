<template>
    <div
        :class="`resume-container bg-primary bg-opacity-10 ${currentTheme}`"
        ref="resumeContainer"
        :contenteditable="enableEdit"
    >
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
                                >{{ infoItmeKey }}</label>
                                <p
                                    :id="`${infoItmeKey}`"
                                    :class="`${infoItme?.bold ? 'font-bold' : ''}`"
                                >
                                    <a
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
                        src="../../assets/icon.png"
                        class="m-auto"
                        :style="{ width: '90px', height: '110px' }"
                        title="jaden.xiong"
                    />
                </div>
            </div>
            <div class="w-full border-b px-10 -ml-10 my-5 box-content"></div>
            <resumeList :page-main-content="pageMainContent" />
        </div>
    </div>
    <resumeMenu :theme="currentTheme" @switchThemeHandler="switchThemeHandler" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import resumeList, { pageMainContent, setMoreOptonChildContent } from "./List/index.vue"
import resumeMenu from "../../components/menu/Circle.vue"

export enum PersonalInfoItemType {
    phone = "tel:",
    email = "mailto:",
    link = ""
}

interface PersonalInfoItem {
    [ksy: string]: string | { val: number | string, type?: PersonalInfoItemType, bold?: boolean, target?: "_blank" | "_self" }
}

interface Data {
    currentTheme: "light" | "dark"
    personalInfo: Array<PersonalInfoItem>,
    pageMainContent: pageMainContent
    enableEdit: boolean
}

export default defineComponent({
    data(): Data {
        return {
            currentTheme: 'light',
            enableEdit: false,
            personalInfo: [
                {
                    "熊洋洋 / 男 / 23": '',
                    "求职意向": {
                        val: "WEB 开发",
                        bold: true
                    }
                },
                {
                    "联系方式": {
                        val: 17362864761,
                        type: PersonalInfoItemType.phone
                    },
                    "邮箱": {
                        val: "17362864761@173.com",
                        type: PersonalInfoItemType.email
                    },
                },
                {
                    "学校": {
                        val: '湖北三峡职业技术学院',
                    },
                    "工作经验": {
                        val: "3 年",
                    },
                },
                {
                    "github": {
                        val: "https://github.com/Mrxyy",
                        type: PersonalInfoItemType.link,
                        bold: true,
                        target: "_blank"
                    }
                },
                {
                    "kubesphere": {
                        val: "https://github.com/kubesphere",
                        type: PersonalInfoItemType.link,
                        bold: true,
                        target: "_blank"
                    }
                }
            ],
            pageMainContent: {
                "掌握技能": [
                    '按照需求选用合适的技术高效开发出符合web标准的页面，有良好的编码习惯和规范，熟悉语言语法特性以及编程思想。',
                    '在程序中使用合理的设计模式降低耦合提高性能以及可维护性，对常用的数据结构以及算法具有良好代码实现能力。',
                    '使用开发者工具对项目进行性能测试，快速定位存在的问题并针对其进行优化提高用户体验。',
                    '主导过前端项目工程化的基建，对项目模块化、组件化、规范化、自动化具有成熟的知识体系，具有一定的前端运维能力。',
                    'node中间层开发，对koa2以及常用node模块熟练掌握。对mysql、MongoDB、redis数据库熟练。熟悉linux系统、多种通信协议。',
                    '有 java 开发经验，熟练使用spring相关技术栈独立开发web项目。',
                    {
                        '技术栈': [
                            '具有扎实的html、css、js、layout基础，熟练掌握React、vue、backbone相关技术栈并知晓其实现原理和应用场景。',
                            '前端工程化相关技术:webpack、vite/snowpack、rollup、esbuild、babel、glup、jenkins、git。',
                            '有微信小程序、web app、Hybrid app、pwa开发经验，对uniapp、web workers具有熟练的使用经验。',
                            'Web 可视化技术和视觉相关开发经验。熟悉c3、canvas、svg、flash 等，对zrender、snap、velocity、d3 等框架库都在开发中有过使用经验。',
                            '大屏大开发经验，对大屏的适配方案、性能优化都有一定的心得，并在项目中对离线地图有过多次的使用，如：leaflet、cesium、openLayer。'
                        ]
                    }
                ],
                "工作经验": [
                    setMoreOptonChildContent(
                        {
                            "青云科技": setMoreOptonChildContent(["云防火墙以及数据库产品相关开发维护。", "云平台MicroFrontend的重构工作以及组件库的维护。"], { icon: "&#10148" }),

                        }
                        , {
                            time: "2021/2 – 至今",
                            leftText: "软件开发",
                            titleSize: 'xl',
                            leftTextSize: 'xl',
                        }),
                    setMoreOptonChildContent(
                        {
                            "武汉珈信科技有限公司": setMoreOptonChildContent(["负责基于leaflet定制化gis产品开发，前端工程化基建。", "负责各类项目的开发、主要做政府项目(大屏、数据分析)：遥感测绘方向、离线gis。"], { icon: "&#10148" }),

                        }
                        , {
                            time: "2020/7 – 2020/12",
                            leftText: "web 开发  ",
                            titleSize: 'xl',
                            leftTextSize: 'xl',
                        }),

                    setMoreOptonChildContent(
                        {
                            "前程无忧": setMoreOptonChildContent(["主要负责移动端开发(微信小程序、web app、Hybrid app、pwa)视觉开发以及交互动画设计。", "在此期间累计拉大量的工作项目经验，期间参入多个项目开发。并且获得优秀员工二等奖。"], { icon: "&#10148" }),

                        }
                        , {
                            time: "2019/7 – 2020/7",
                            leftText: "web前端",
                            titleSize: 'xl',
                            leftTextSize: 'xl',
                        }),

                ],
                "近期项目": [
                    {
                        "1. kubesphere（dmp）": [
                            setMoreOptonChildContent(
                                {
                                    "项目介绍": setMoreOptonChildContent(['KubeSphere 愿景是打造一个以 Kubernetes 为内核的云原生分布式操作系统，它的架构可以非常方便地使第三方应用与云原生生态组件进行即插即用（plug-and-play）的集成，支持云原生应用在多云与多集群的统一分发和运维管理。 KubeSphere 也是一个多租户容器平台，提供全栈的 IT 自动化运维的能力，简化企业的 DevOps 工作流。'], { icon: "&#9635" }),
                                    "任务职责": setMoreOptonChildContent(['对接Prometheus数据，为应用实现可视化系统。', '负责qdmp模块，负责数据库相关应用开发。'], { icon: "&#9635" }),
                                    "解决难点": setMoreOptonChildContent(['使用d3、recharts等对图表控件进行原子化。', '解决图表交互体验和性能冲突问题（Houdini）。', '图表可被自定义配置以及数据拖拽方案。', '动态数据并发场景以及数据频繁推送场景下页面高性能渲染。'], { icon: "&#9635" })
                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672"
                                }),
                        ],
                        "2. qingcloud appCenter console": [
                            setMoreOptonChildContent(
                                {
                                    "项目介绍": setMoreOptonChildContent(["appcenter提供从应用、运行环境、带宽以及云资源的一站式应用产品，帮助您高效便捷的部署云上业务。"], { icon: "&#9635" }),
                                    "任务职责": setMoreOptonChildContent(["维护以及新功能的开发，相关工单处理。", "部署应用配置包可视化表单开发。"], { icon: "&#9635" }),
                                    "解决难点": setMoreOptonChildContent(['使用web storage对应用配置包进行缓存处理。', '使用不同类型web worker进行相应操作提高性能。', '使用状态模式读取配置包动态渲染相应的表单控件。'], { icon: "&#9635" })
                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672"
                                }),
                        ],
                        "3. 地理测绘信息平台": [
                            setMoreOptonChildContent(
                                {
                                    "项目介绍": setMoreOptonChildContent(["它是用于采集、存储、处理、分析、检索和显示空间数据的计算机系统，可以根据地理数据自定义地图配置和数据图形化形态。"], { icon: "&#9635" }),
                                    "任务职责": setMoreOptonChildContent(["项目前期调研，以及工程化建设。", "工单模块、帧照模块、gis模块开发工作。"], { icon: "&#9635" }),
                                    "解决难点": setMoreOptonChildContent(['在cesiumm大数据量场景下渲染导致死机和卡顿问题下制定合适的聚合算法以及scheduler。', '图片大小与质量压缩，大文件分段上传。', '条件型CORS响应下导致的缓存错乱问题。', ' 大数据下dom页面渲染方案以及性能监测。'], { icon: "&#9635" })
                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672"
                                }),
                        ],
                        "个人项目": [
                            setMoreOptonChildContent(
                                {
                                    "local-mk-editor-in-browser": setMoreOptonChildContent(["一款基于web stream可以在浏览器中对本地文件系统进行增删改的markdown编辑器。"], {
                                        icon: "&#9635"
                                    }),
                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672",
                                    linkText: "(https://github.com/Mrxyy/local-mk-editor-in-browser)",
                                    link: "https://github.com/Mrxyy/local-mk-editor-in-browser"
                                }),
                            setMoreOptonChildContent(
                                {
                                    "memo-ui": setMoreOptonChildContent(["memo-ui是在vue3基础上构建的一个ui库。技术栈：vue3、vite、ts、scss、tailwindcss,提供丰富的组件以便于更快更高效构建网站。"], { icon: "&#9635" }),
                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672",
                                    linkText: "(https://github.com/Mrxyy/memo-ui)",
                                    link: "https://github.com/Mrxyy/memo-ui"
                                }),
                        ],
                    }
                ],
            }
        }
    },
    components: {
        resumeList,
        resumeMenu
    },
    methods: {
        switchThemeHandler() {
            this.currentTheme = this.currentTheme === 'dark' ? "light" : 'dark'
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
            document.title = "web开发-熊阳阳（3年）"
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

