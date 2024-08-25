import { DropZone } from "@measured/puck";
import { Color } from "../fields/Color";
import { Range } from "../fields/Range";

const ParagraphBlock = {

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
                    type: "textarea",
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
        fieldType: 'text',
        title: "Start writing here...",
        textAlign: "left",
        fontSize: 16,
        margin: 15,
    },
    render: ({ title, textAlign, fontSize, color, margin}) => {
        return ( 
        <div style={{display: 'flex'}}>
            <p style={{ textAlign: textAlign, fontSize: fontSize, color: color, margin: margin }}>{title}</p>
        </div>
        )    
    },
};

export default ParagraphBlock;