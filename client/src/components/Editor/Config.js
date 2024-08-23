// Puck configuration, describing components to drag-and-drop
export const config = {
    components: {
      HeadingBlock: {
        // Field types to render for each prop of your component
        fields: {
          children: {
            type: "text",
          },
        },
        // Your render function
        render: ({ children }) => {
          return <h1>{children}</h1>;
        },
      },
    },
  };