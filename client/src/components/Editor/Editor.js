import React from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/dist/index.css';
import { config }from './Config';


const initialData = {};

const save = (data) => {
  console.log('Data saved:', data);
};

const Editor = () => {
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
