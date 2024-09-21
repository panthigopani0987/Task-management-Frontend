import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/tasks'; // Adjust based on your backend URL

// Fetch all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.tasks; // Adjust based on your API response structure
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

// Import tasks from CSV
export const importTasks = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_URL}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Contains success message and error log
  } catch (error) {
    console.error('Error importing tasks:', error);
    throw error; // Re-throw error for handling in component
  }
};

// Export tasks to CSV
export const exportTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/export`, {
      responseType: 'blob', // Important for handling binary data
    });
    
    // Create a link to download the CSV
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks.csv'); // Set default file name
    document.body.appendChild(link);
    link.click();
    link.remove(); // Clean up the link
  } catch (error) {
    console.error('Error exporting tasks:', error);
  }
};
