<template>
    <moCard height="100%">
        <div class="json-editor" ref="json-editor"></div>
    </moCard>
</template>

<script lang="ts" >
import { defineComponent } from "vue";

export default defineComponent({
    async mounted() {
        const { default: JSONEditor } = await import("jsoneditor");
        const editor = new JSONEditor(this.$refs["json-editor"], {
            onChangeJSON: this.onChangeJSON,
            onChangeText: this.onChangeText,
            languages: ["en", "zh-CN"],
            mode: "code",
            modes: ["code", "tree", "view", "preview", "form"]
        });
        editor.set(this.modelValue)
    },
    props: {
        modelValue: Object
    },
    emits: ['update:modelValue'],
    methods: {
        onChangeJSON(e) {
            console.log(e);
            this.$emit('update:modelValue', e);
        },
        onChangeText(e) {
            console.log(e);
            this.$emit('update:modelValue', JSON.parse(e));
        },
    }
})
</script>

<style lang="scss">
$jse-icons: "./img/jsoneditor-icons.svg" !default;
$jse-blue: rgba(16, 185, 129) !default;
@import "jsoneditor/src/scss/jsoneditor";

.json-editor {
    height: 100%;
}
</style>