import Color  from "./components/Color";

export const config = {
  components: {
    Heading: {
      fields: {
        text: {
          name: "Text",
          type: "text",
        },
        textAlign: {
          name: "align",
          type: "select",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        fontSize: {
          name: "Font size",
          type: "number",
        },
        color: {
          type: "custom",
          render: <Color />
        },
        params: {
          type: "object",
          objectFields: {
            title: { type: "text" },
          },
        },
        
      },
      render: ({ text, textAlign, fontSize, color }) => {
        return <h1 style={{ textAlign, color, fontSize }}>{text}</h1>;
      },
    },
  },
};