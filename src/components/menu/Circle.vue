<template>
    <div :class="`circular-menu text-primary circular-menu-left ${isActive ? 'active' : ''}`">
        <a class="floating-btn bg-primary" @click="isActive = !isActive">
            <i class="bi bi-plus font-bold"></i>
        </a>

        <menu class="items-wrapper">
            <moTooltips v-for="v,i in resumeMenu" :tipText="i" class="menu-item" dirrection="left">
                <a
                    :href="v.href || 'javascript:'"
                    :target="v.href ? '_blank' : '_self'"
                    :class="`bi bi-${v.class}`"
                    @click="v.event?.click && v.event.click()"
                ></a>
            </moTooltips>
        </menu>
        <menu class="items-wrapper">
            <moTooltips v-for="v,i in resumeMenu" :tipText="i" class="menu-item" dirrection="left">
                <a
                    :href="v.href || 'javascript:'"
                    :target="v.target || (v.href ? '_blank' : '_self')"
                    :class="`bi bi-${v.class}`"
                    @click="v.event?.click && v.event.click()"
                ></a>
            </moTooltips>
        </menu>
    </div>
</template>

<script lang="ts">import { defineComponent } from "vue";


interface ResumeMenu {
    [key: string]: {
        class: string,
        href?: string,
        target?: "_self" | "_blank"
        event?: {
            [eventKey: string]: Function
        }
    }
}

interface Data {
    isActive: boolean,
    resumeMenu: ResumeMenu
}

export default defineComponent({
    data(): Data {
        return {
            isActive: false,
            resumeMenu: {
                "主题": {
                    class: "sun-fill",
                    // "app-indicator",
                    event: {
                        click: this.switchTheme
                    }
                },
                "打印": {
                    class: "printer",
                    event: {
                        "click": () => {
                            window.print()
                        }
                    }
                },
                "联系": {
                    class: "pie-chart",
                    href: "#邮箱",
                    target: "_self"
                },
                "github": {
                    class: "github",
                    href: "https://github.com/Mrxyy"
                }
            }
        }
    },
    watch: {
        theme(theme) {
            this.resumeMenu["主题"].class = theme === 'dark' ? "moon-stars" : "sun-fill"
        }
    },
    props: ["theme"],
    emits: ["switchThemeHandler"],
    methods: {
        switchTheme() {
            this.$emit("switchThemeHandler");
        }
    }
})
</script>

<style lang="scss">
@media print {
    .circular-menu {
        display: none;
    }
}

@page {
    margin-top: 0.5cm;
    margin-bottom: 0.7cm;
    margin-left: 1cm;
    margin-right: 1cm;
}

.circular-menu {
    position: fixed;
    bottom: 1em;
    right: 1em;
    .mo-tooltips {
        &::before {
            background-color: hsla(0, 0%, 0%, 0.5) !important;
        }
        &::after {
            border-left-color: hsla(0, 0%, 0%, 0.5) !important;
        }
    }
    &:after {
        display: block;
        content: " ";
        width: 3.5em;
        height: 3.5em;
        border-radius: 50%;
        background: currentColor;
        position: absolute;
        top: 0;
        right: 0;
        z-index: -2;
        transition: all 0.3s ease;
    }
    .floating-btn {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        width: 3.5em;
        height: 3.5em;
        border-radius: 50%;
        box-shadow: 0 2px 5px 0 hsla(0, 0%, 0%, 0.26);
        color: hsl(0, 0%, 100%);
        text-align: center;
        cursor: pointer;
        outline: 0;
        &:active {
            box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.4);
        }
        i {
            margin-top: 0.1rem;
            font-size: 1.3em;
            transition: transform 0.2s;
        }
    }
    &.active {
        .floating-btn {
            box-shadow: inset 0 0 3px hsla(0, 0%, 0%, 0.3);
            i {
                transform: rotate(-45deg);
            }
        }
        &:after {
            transform: scale3d(5.5, 5.5, 1);
            transition-timing-function: cubic-bezier(0.68, 1.55, 0.265, 1);
        }
        .menu-item {
            transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            &:nth-child(1) {
                transform: translate3d(1em, -7em, 0);
            }
            &:nth-child(2) {
                transform: translate3d(-3.5em, -6.3em, 0);
            }

            &:nth-child(3) {
                transform: translate3d(-6.5em, -3.2em, 0);
            }

            &:nth-child(4) {
                transform: translate3d(-7em, 1em, 0);
            }
        }
    }
    .items-wrapper {
        padding: 0;
        margin: 0;
    }
    .menu-item {
        position: absolute !important;
        top: 0.2em;
        right: 0.2em;
        z-index: -1;
        display: block;
        text-decoration: none;
        color: hsl(0, 0%, 100%);
        font-size: 1em;
        width: 3em;
        height: 3em;
        border-radius: 50%;
        text-align: center;
        line-height: 3;
        background-color: hsla(0, 0%, 0%, 0.1);
        transition: transform 0.3s ease, background 0.2s ease;
        &:hover {
            background-color: hsla(0, 0%, 0%, 0.3);
        }
    }
}
</style>