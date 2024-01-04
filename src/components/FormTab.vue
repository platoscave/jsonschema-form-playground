<script setup lang="ts">
import { ElInput } from 'element-plus'

export interface IProps {
    modelValue?: string
}
withDefaults(defineProps<IProps>(), {
    modelValue: ''
})
const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void
}>()

</script>

<template>
    <div>
        <splitpanes
            vertical
            class="default-theme"
        >
            <pane size="25">
                <div class="header">Jsonschema </div>
                <StringCodeEditorCtrl
                    :model-value="JSON.stringify(formSchemaObjRef, null, 2)"
                    :readonly=false
                    @update:modelValue="($event) => copyToRef($event, formSchemaObjRef)"
                ></StringCodeEditorCtrl>
            </pane>
            <pane>
                <h2>Jsonschema Form</h2>
                <!-- The form -->
                <JsonschemaForm
                    v-model="formDataObjRef"
                    :properties="formSchemaObjRef.properties"
                    :required-arr="formSchemaObjRef.required"
                    :edit-permitted="formEditPermittedRef"
                    :form-mode="formModeRef"
                    :sizeRef="sizeRef"
                    :label-position="labelPositionRef"
                    :label-width="labelWidtthRef"
                    :query-callback="queryCallback"
                    :colum-widths="columWidthsRef"
                    @current-change="($event: any) => $emit('current-change', $event)"
                    @header-dragend="($event: any) => $emit('header-dragend', $event)"
                >
                </JsonschemaForm>
            </pane>
            <pane size="25">
                <div class="header">Data </div>
                <StringCodeEditorCtrl
                    :model-value="JSON.stringify(formDataObjRef, null, 2)"
                    :readonly=false
                    @update:modelValue="($event) => copyToRef($event, formDataObjRef)"
                ></StringCodeEditorCtrl>
                <div class="header">Edit Permitted </div>
                <!-- <div>Only aplicable in "Edit Permitted" Form Mode</div> -->
                <StringCodeEditorCtrl
                    :model-value="JSON.stringify(formEditPermittedRef, null, 2)"
                    :readonly=false
                    @update:modelValue="($event) => copyToRef($event, formEditPermittedRef)"
                ></StringCodeEditorCtrl>
            </pane>
        </splitpanes>
    </div>
</template>