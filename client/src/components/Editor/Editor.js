import React, { useEffect, useState } from 'react';
import { Puck } from '@measured/puck';
import '@measured/puck/dist/index.css';
import { config } from './Config';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Editor = () => {
  // `useLocation` provides access to the location object, which contains the state passed from the previous page.
  const location = useLocation();
  
  // `useNavigate` is a hook used to programmatically navigate to other routes.
  const navigate = useNavigate();
  
  // Initialize state variables for the editor's data, page title, and page route.
  // Set default values if `location.state` or its properties are undefined.
  const [editorData, setEditorData] = useState(JSON.parse(location.state.page.content));
  const [pageTitle, setPageTitle] = useState(location.state?.page?.title || '');
  const [pageRoute, setPageRoute] = useState(location.state?.page?.route || '');

  // `useEffect` hook to update component state when `location.state` changes.
  useEffect(() => {
    // Check if `location.state` and `location.state.page` exist before accessing their properties.
    if (location.state && location.state.page) {
      setEditorData(location.state.page.content || {});
      setPageTitle(location.state.page.title || '');
      setPageRoute(location.state.page.route || '');
    }
  }, [location.state]); // Dependency array includes `location.state` to trigger the effect when it changes.

  // `save` function to handle saving the editor data to the server.
  const save = async (data) => {
    const postData = {
      title: pageTitle,
      content: JSON.stringify(data),
      route: pageRoute,
    };

    try {
      const response = await fetch('https://dawson.hamera.com/api/save_page.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // Include other headers if needed
        },
        body: new URLSearchParams(postData)
      });
  
      if (!response.ok) {
        // Throw an error if the response status is not OK
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Response from server:', responseData);
      navigate('/page-manager'); // Navigate after saving
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };
  

  return (
    <div>
      <Puck
        config={config}            // Configuration for the Puck editor.
        data={editorData}          // The initial data to load into the editor.
        onChange={setEditorData}   // Update editorData when the editor content changes.
        onPublish={save}           // Function to call when the user publishes the content.
      />
    </div>
  );
};

export default Editor;
