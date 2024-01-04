<script setup lang="ts">
import { ref, watch, } from "vue";

import mainFormSchema from './testData/mainFormSchema'
import initialFormSchema from './testData/initialFormSchema'
import initialTableSchema from './testData/initialTableSchema'
import initialFormData from './testData/initialFormData'
import initialTableData from './testData/initialTableData'
import initialEditPermitted from './testData/initialEditPermitted'
import formQueryData from './testData/formQueryData'
import columWidths from './testData/initialColumWidths'

import { ElRadioGroup, ElRadio, ElInput, ElTabPane, ElTabs } from 'element-plus'
import { JsonschemaForm, JsonschemaTable, StringCodeEditorCtrl } from 'vue3-jsonschema-form'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useDark, useToggle } from '@vueuse/core'

let isDark = useDark()
const toggleDark = useToggle(isDark)

let formSchemaObjRef = ref(initialFormSchema)
let tableSchemaObjRef = ref(initialTableSchema)
let formDataObjRef = ref(initialFormData)
let tableDataObjRef = ref(initialTableData)
let formEditPermittedRef = ref(initialEditPermitted)
let formQueryDataRef = ref(formQueryData)
let columWidthsRef = ref(columWidths)


let mainFormDataObjRef = ref({
    lightDark: 'dark',
    locale: 'en-us',
    formMode: 'Edit Full',
    formSize: 'default',
    labelPosition: 'left',
    labelWidth: 'auto'
})
let validRef = ref(true)

const validateForm = () => {
};
const resetForm = () => {
};
// Query callback for dropdown listbox. Returns a promise 
// the list is filled when the promise is resolved
const queryCallback = (query: any) => {
    let data = formQueryDataRef.value
    if (query.select === 'small') data = formQueryDataRef.value.slice(0, 3)
    // artitificial delay 2 sec
    return new Promise(function (resolve) {
        setTimeout(() => resolve(data), 2000);
    });
}

// Copy properties, perserve reactivity
const copyToRef = (sourceStr: string, destObj: any) => {
    try {
        const sourceObj = JSON.parse(sourceStr)
        // delete properties one by one
        Object.keys(destObj).forEach(key => delete destObj[key]);
        Object.keys(sourceObj).forEach(key => destObj[key] = sourceObj[key]);
    }
    catch (err: any) {
        console.log('Invalid JSON' + err.message)
    }
}
</script>

<template>
    <JsonschemaForm
        v-model="mainFormDataObjRef"
        :properties="mainFormSchema.properties"
        form-mode="Edit Full"
    ></JsonschemaForm>
    <div>
        <button @click="validateForm()">Validate</button>
        <button @click="resetForm()">Reset</button>
        <span>Is Valid: {{ validRef }}</span>
    </div>

    <el-tabs>
        <el-tab-pane label="Form">
            <splitpanes
                vertical
                class="default-theme"
            >
                <pane size="25">
                    <div class="header">Jsonschema </div>
                    <StringCodeEditorCtrl
                        :model-value="JSON.stringify(formSchemaObjRef, null, 2)"
                        :readonly=false
                        @update:modelValue="($event: any) => copyToRef($event, formSchemaObjRef)"
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
                        :form-mode="mainFormDataObjRef.formMode"
                        :sizeRef="mainFormDataObjRef.formSize"
                        :label-position="mainFormDataObjRef.labelPosition"
                        :label-width="mainFormDataObjRef.labelWidth"
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
                        @update:modelValue="($event: any) => copyToRef($event, formDataObjRef)"
                    ></StringCodeEditorCtrl>
                    <div class="header">Edit Permitted </div>
                    <!-- <div>Only aplicable in "Edit Permitted" Form Mode</div> -->
                    <StringCodeEditorCtrl
                        :model-value="JSON.stringify(formEditPermittedRef, null, 2)"
                        :readonly=false
                        @update:modelValue="($event: any) => copyToRef($event, formEditPermittedRef)"
                    ></StringCodeEditorCtrl>
                </pane>
            </splitpanes>
        </el-tab-pane>
        <el-tab-pane label="Table">
            <h2>Jsonschema Table</h2>
            <!-- The form -->
            <JsonschemaTable
                v-model="tableDataObjRef"
                :properties="tableSchemaObjRef.properties"
                :required-arr="tableSchemaObjRef.required"
                :edit-permitted="formEditPermittedRef"
                :form-mode="mainFormDataObjRef.formMode"
                :sizeRef="mainFormDataObjRef.formSize"
                :label-position="mainFormDataObjRef.labelPosition"
                :label-width="mainFormDataObjRef.labelWidth"
                :query-callback="queryCallback"
                :colum-widths="columWidthsRef"
                @current-change="($event: any) => $emit('current-change', $event)"
                @header-dragend="($event: any) => $emit('header-dragend', $event)"
            >
            </JsonschemaTable>

            <splitpanes
                vertical
                class="default-theme"
            >
                <pane size="30">
                    <div class="header">Jsonschema </div>
                    <StringCodeEditorCtrl
                        :model-value="JSON.stringify(tableSchemaObjRef, null, 2)"
                        :readonly=false
                        @update:modelValue="($event: any) => copyToRef($event, tableSchemaObjRef)"
                    ></StringCodeEditorCtrl>
                </pane>
                <pane>
                    <div class="header">Data </div>
                    <StringCodeEditorCtrl
                        :model-value="JSON.stringify(tableDataObjRef, null, 2)"
                        :readonly=false
                        @update:modelValue="($event: any) => copyToRef($event, tableDataObjRef)"
                    ></StringCodeEditorCtrl>
                </pane>
                <pane size="30">

                    <div class="header">Edit Permitted </div>
                    <!-- <div>Only aplicable in "Edit Permitted" Form Mode</div> -->
                    <StringCodeEditorCtrl
                        :model-value="JSON.stringify(formEditPermittedRef, null, 2)"
                        :readonly=false
                        @update:modelValue="($event: any) => copyToRef($event, formEditPermittedRef)"
                    ></StringCodeEditorCtrl>
                </pane>
            </splitpanes>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped></style>
