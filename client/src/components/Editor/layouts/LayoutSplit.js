import { DropZone } from "@measured/puck";
import { Color } from "../fields/Color";
import { Range } from "../fields/Range";

const ParagraphBlock = {
    label: "Split Layout",
    render: () => {
        return ( 
        <div style={{display: 'flex'}}>
            <DropZone zone="zone1" />
            <DropZone zone="zone2" />
        </div>
        )    
    },
};

export default ParagraphBlock;