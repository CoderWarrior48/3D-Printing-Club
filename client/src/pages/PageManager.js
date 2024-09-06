import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PageManager = () => {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get('https://dawson.hamera.com/api/get_pages.php');
      setPages(response.data.pages);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handleEdit = (page) => {
    navigate('/editor', { state: { page } });
  };

  const handleCreateNew = () => {
    navigate('/editor', { state: { page: { id: null, title: 'New Page', route: '', content: '{}' } } });
  };

  return (
    <div>
      <h1>Page Manager</h1>
      <button onClick={handleCreateNew}>Create New Page</button>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <button onClick={() => handleEdit(page)}>{page.title}</button>
            <small>{page.route}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageManager;
