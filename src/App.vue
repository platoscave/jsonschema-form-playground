<script setup lang="ts">
import { ref, watch, } from "vue";

import mainFormSchema from './testData/mainFormSchema'
import initialFormDataObj from './testData/initialFormDataObj'

import JsonschemaForm from 'vue3-jsonschema-form'

let formDataObjRef = ref(() => { lightDark: 'dark' })

</script>

<template>
    <JsonschemaForm
        v-model="mainFormDataObjRef"
        :properties="mainFormSchema.properties"
        :form-mode="Edit Full"
    ></JsonschemaForm>
</template>

<style scoped></style>
