import { Color } from "../fields/Color";
import { Range } from "../fields/Range";

const HeadingBlock = {

    resolveFields: (data, {changed, lastFields}) => {
        if (!changed.fieldType) return lastFields;

        return ({
            fieldType: {
                label: " ",
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
                margin: Range("Margin", 0, 100),
                color: Color("Text Color"),
            }),
        })
    },

    defaultProps: {
        fieldType: "text",
        title: "Heading",
        textAlign: "center",
        fontSize: 50,
        margin: 20,
    },
    render: ({ title, textAlign, fontSize, color, margin}) => {
        return <h1 style={{ textAlign: textAlign, fontSize: fontSize, color: color, margin: margin }}>{title}</h1>;
    },
};

export default HeadingBlock;