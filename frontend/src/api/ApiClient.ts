import axios from 'axios'

export const apiClient = axios.create(
    {
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true
    }
);
// apiClient.interceptors.request.use((config) => {
//     const jsessionIdRow = document.cookie.split('; ').find(row => row.startsWith('JSESSIONID'));
//     const jsessionId = jsessionIdRow ? jsessionIdRow.split('=')[1] : undefined;
//     console.log(jsessionId)

//     if(jsessionId) {
//         if (!config.headers) {
//             config.headers = {};
//         }
//         config.headers['Cookie'] = `JSESSIONID=${jsessionId}`;
//     }

//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

export default apiClient;