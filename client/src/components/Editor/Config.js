import { Color } from "./fields/Color";
import { Range } from "./fields/Range";

export const config = {
  components: {
    Heading: {
      fields: {
        text: {
          name: "Text",
          type: "text",
        },
        textAlign: {
          name: "Align",
          type: "radio",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
        fontSize: Range,
        color: Color('Text color'),
        
      },
      render: ({ text, textAlign, fontSize, color}) => {
        return <h1 style={{ textAlign: textAlign, fontSize: fontSize, color: color }}>{text}</h1>;
      },
    },
  },
  Paragraph: {
    fields:
  }
};