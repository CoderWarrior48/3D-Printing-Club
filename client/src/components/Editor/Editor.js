import React from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/dist/index.css';

const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: { type: 'text' },
      },
      render: ({ children }) => <h1>{children}</h1>,
    },
  },
};

const initialData = {};

const save = (data) => {
  console.log('Data saved:', data);
};

const Editor = () => {
  return (
  <div>
    <Puck config={config} data={initialData} onPublish={save} />;
  </div>
  )
};

export default Editor;
