const mainFormSchema: any =  {
  properties: {
    lightDark: {
      title: "Light Dark",
      type: "string",
      enum: ["light", "dark"],
    },
  }
}
export default mainFormSchema