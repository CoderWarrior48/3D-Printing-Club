import Embed from "./components/Embed";
import HeadingBlock from "./components/HeadingBlock";
import ParagraphBlock from "./components/ParagraphBlock";
import LayoutSplit from "./layouts/LayoutSplit";

export const config = {
  components: {
    HeadingBlock,
    ParagraphBlock,
    Embed,
    LayoutSplit
  },
  root: {
    render: ({ children }) => {
      return <div>{children}</div>;
    },
  },
};