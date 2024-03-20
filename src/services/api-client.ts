import axios, { CanceledError } from "axios";

export { CanceledError };

// const refreshCacheApiClient = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (
      //  error.response.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url.includes("/auth/login")
      ) {
        originalRequest._retry = true;
  
        // try {
        //   await refreshCacheApiClient.get("/auth/refresh");
        //   return await axios(originalRequest);
        // } catch (error) {
        //   //window.location.href = "/login";
        //   console.log("Error: ", error);
        // }
      }
  
      return Promise.reject(error);
    }
  );
  

export default apiClient;