<template>
    <div
        class="resume-container bg-primary bg-opacity-10"
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
                                        :class="`${infoItme?.type ? 'text-link' : ''}`"
                                        :href="infoItme?.type ? (infoItme.type + ':' + infoItme.val) : 'javascript:'"
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
    phone = "tel",
    email = "mailto"
}

interface PersonalInfoItem {
    [ksy: string]: string | { val: number | string, type?: PersonalInfoItemType, bold?: boolean }
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
                    "熊洋洋 / 男 / 23": ''
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
                    "求职意向": {
                        val: "WEB 开发",
                        bold: true
                    }
                }
            ],
            pageMainContent: {
                "掌握技能": [
                    '按照需求选用合适的技术高效开发出符合web标准的页面，有良好的编码习惯和规范，熟悉语言语法特  性以及编程思想。',
                    '使用开发者工具对项目进行性能测试，快速定位存在的问题并针对其进行优化提高用户体验。',
                    '主导前端项目工程化的基建，对项目模块化、组件化、规范化、自动化具有成熟的知识体系。',
                    'node中间层开发，对koa2以及常用node模块熟练掌握。对mysql、MongoDB、redis数据库熟练使用并  对市面上大多数据库都有相关了解。熟悉linux系统、多种通信协议。',
                    '在程序中使用合理的设计模式降低耦合提高性能以及可维护性，对常用的数据结构以及算法具有良好  代码实现能力。',
                    '有 java 开发经验，熟练使用spring相关技术栈独立开发web 项目。',
                    {
                        '技术栈': [
                            '具有扎实的html、css、js、layout基础，熟练掌握React、vue相关技术栈并知晓其实现原理和应用场景。',
                            '前端工程化相关技术:webpack、snowpack、rollup、esbuild、babel、glup、jenkins、git。',
                            '有微信小程序、web app、Hybrid app、pwa开发经验，对uniapp、web worker具有熟练的使用经验。',
                            'Web 可视化技术和视觉相关开发经验。熟悉c3、canvas、svg、flash 等，对zrender、snap、velocity、  echarts 等框架库都在开发中有过使用经验。',
                            '大屏大开发经验，对大屏的适配方案、性能优化都有一定的心得，并在项目中对离线地图有过多次的使用，  如：leaflet、cesium、openLayer。'
                        ]
                    }
                ],
                "工作经验": [
                    setMoreOptonChildContent(
                        {
                            "青云科技": setMoreOptonChildContent(["云防火墙开发以及组件库的维护。", "参与MicroFrontend的重构工作。"], { icon: "&#10148" }),

                        }
                        , {
                            time: "2021/2 – 至今",
                            rightText: "软件开发",
                            titleSize: 'xl',
                            rightTextSize: 'xl',
                        }),
                    setMoreOptonChildContent(
                        {
                            "武汉珈信科技有限公司": setMoreOptonChildContent(["负责基于leaflet定制化gis产品开发，前端工程化基建。", "负责各类项目的开发、主要做政府项目(大屏、数据分析)：遥感测绘方向、离线gis。"], { icon: "&#10148" }),

                        }
                        , {
                            time: "2020/7 – 2020/12",
                            rightText: "web 开发  ",
                            titleSize: 'xl',
                            rightTextSize: 'xl',
                        }),

                    setMoreOptonChildContent(
                        {
                            "前程无忧": setMoreOptonChildContent(["主要负责移动端开发(微信小程序、web app、Hybrid app、pwa)视觉开发以及交互动画设计。", "在此期间累计拉大量的工作项目经验，期间参入多个项目开发。并且获得优秀员工二等奖。"], { icon: "&#10148" }),

                        }
                        , {
                            time: "2019/7 – 2020/7",
                            rightText: "web前端",
                            titleSize: 'xl',
                            rightTextSize: 'xl',
                        }),

                ],
                "项目经验": [
                    {
                        "1. 青云云防火墙": [
                            setMoreOptonChildContent(
                                {
                                    "项目介绍": setMoreOptonChildContent(['青云云防火墙可针对云上公网IP和互联网之间制定内访外和外访内的控制策略，满足云用户  对于互联网流量访问控制的管理与安全防护需求。'], { icon: "&#9635" }),
                                    "任务职责": setMoreOptonChildContent(['计费模块：包括购买开通（权限认证）、正常续费、过期续费、自动续费、升级。', '防护策略：配置策略、开启策略、策略查重、复制策略、策略绑定、策略校检。', '前端维护以及测试，协助组件库的开发。'], { icon: "&#9635" })
                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672"
                                }),
                        ],
                        "2. 军事信息系统": [
                            setMoreOptonChildContent(
                                {
                                    "项目介绍": setMoreOptonChildContent(["本系统应用于某情报军队信息的分析，主要功能包括互联网信息分析、视频影像分析、卫星  帧照、海上船舶与军事基地信息分析。是一个高度可视化且高效的信息分析系统。"], { icon: "&#9635" }),
                                    "任务职责": setMoreOptonChildContent(["参与项目的搭建和相关接口开发以及大数据性能优化，负责互联网信息分析和帧照分析相关  页面和业务逻辑。", "帧照分析相关页面：时间控制器、地图展示优化、帧照区域可视化、cesium地图交互。 ", "互联网信息分析：对互联网社交平台上的言论进行分析并使用可视化的方式展现包括echarts  图表组件封装、复用支持自定义的列表组件、词云"], { icon: "&#9635" })

                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672"
                                }),
                        ],
                        "3. 智能交通大数据研判平台": [
                            setMoreOptonChildContent(
                                {
                                    "项目介绍": setMoreOptonChildContent(["该项目是应用于交管局中交通路口的路况信息数据管理、可视化、数据对比。包括不同地区、  不同时间、不同类型路口的交通数据，这些数据显示在页面展示出真实交通路况且一目了然。"], { icon: "&#9635" }),
                                    "任务职责": setMoreOptonChildContent(["负责搭建项目以及技术选型，项目组件库以及layout。", "编写交通路口数据模块和智能优化效果分析模块。 ", "交通路口数据模块：编写时间轴控制器、地区选择控制器、路灯方案控制器等多个控制器之  间的交互；使用canvas、svg、css3 实现路线、路灯、路口地图、多个控制器可视化；编写  颜色状态判断函数使用 mixin 混入全局中，应用于全局的颜色状态判断和首页中国地图和其  交互的编写。", "智能优化效果分析模块：对单位时间内的数据图表化分析。使用echarts、d3等图表库进行组件封装。"], { icon: "&#9635" })

                                }
                                , {
                                    titleSize: 'xl',
                                    icon: "&#9672"
                                }),
                        ],
                    }
                ]



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
