import React from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/dist/index.css';
import { config }from './Config';

const initialData = {};

const save = (data) => {
  alert(data)
};

const Editor = (pageName) => {
  return (
  <div>
    <Puck 
      config={config} 
      data={initialData} 
      onPublish={save} 
      // overrides={{
      //   componentItem: ({ name }) => (
      //     <div style={{ backgroundColor: "hotpink" }}>{name}</div>
      //   ),
      // }}
      />;
  </div>
  )
};

export default Editor;
