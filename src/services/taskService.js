import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('Fetched tasks:', response.data);
    return response.data.tasks || [];
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data || error.message);
    return [];
  }
};


export const importTasks = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Import response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error importing tasks:', error.response?.data || error.message);
    throw error;
  }
};


// Export tasks to CSV
export const exportTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/export`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error exporting tasks:', error.response?.data || error.message);
  }
};

