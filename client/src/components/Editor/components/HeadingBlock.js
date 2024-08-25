import { Color } from "../fields/Color";
import { Range } from "../fields/Range";

const HeadingBlock = {

    resolveFields: (data) => ({
        fieldType: {
            label: "Field Type",
            type: "radio",
            options: [
                { label: "Text", value: "text" },
                { label: "Style", value: "style" },
            ],
        },
        ...(data.props.fieldType === "text" && {
            title: {
                label: "Text",
                type: "text",
            },
            textAlign: {
                label: "Align",
                type: "radio",
                options: [
                    { label: "Left", value: "left" },
                    { label: "Center", value: "center" },
                    { label: "Right", value: "right" },
                ],
            },
        }),
        ...(data.props.fieldType === "style" && {
            fontSize: Range("Font size", 10, 100),
            color: Color("Text Color"),
        }),
    }),

    defaultProps: {
        title: "Heading",
        textAlign: "center",
        fontSize: 50,
    },
    render: ({ title, textAlign, fontSize, color}) => {
        return <h1 style={{ textAlign: textAlign, fontSize: fontSize, color: color }}>{title}</h1>;
    },
};

export default HeadingBlock;