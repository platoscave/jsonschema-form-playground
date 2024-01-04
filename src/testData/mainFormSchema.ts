const mainFormSchema: any =  {
  properties: {
    lightDark: {
      title: "Screen Mode",
      type: "string",
      enum: ["light", "dark"],
    },
    locale: {
      title: "Locale",
      type: "string",
      enum: ["en-us", "nl", "zh-cn"],
    },
    formMode: {
      title: "Form Mode",
      type: "string",
      enum: ["Readonly Full", "Readonly Dense", "Edit Permitted", "Edit Full"],
    },
    formSize : {
      title: "Form Size",
      type: "string",
      enum: ["large", "default", "small"],
    },
    labelPosition : {
      title: "Form Size",
      type: "string",
      enum: ["left", "right", "top"],
    },
    labelWidth : {
      title: "Label Width",
      type: "string"
    },
  }
}
export default mainFormSchema