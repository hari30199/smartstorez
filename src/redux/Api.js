import axios from 'axios';


const customAxios = (dynamicBaseURL) => {
  const axiosInstance = axios.create({
    baseURL: `http://18.140.57.144/api/v2/`,
    headers: {
    'Content-Type': 'application/json',
     'Authorization': `Bearer ${dynamicBaseURL}`,
  },
  });

  return axiosInstance;
};

export default customAxios;
