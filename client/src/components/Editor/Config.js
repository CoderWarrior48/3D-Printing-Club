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
    fields: {
      title: { type: "text" }, // We need to redefine the `title` field if we want to retain it
      route: { type: "text" },
    },
    render: ({ children }) => {
      return <div>{children}</div>;
    },
  },
};