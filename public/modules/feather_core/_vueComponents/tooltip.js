export default {
    name: "Tooltip",
    props: {
      tooltipText: {
        type: String,
        default: "Tooltip text",
      },
      position: {
        default: "top",
        type: String,
      },
    },
    template:"#Tooltip"
  };