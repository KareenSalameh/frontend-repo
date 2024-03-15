import { CredentialResponse } from "@react-oauth/google";
import apiClient from "./api-client";

export interface IUser{
    name: string,
    email: string,
    password: string,
    imgUrl: string,
    _id?:string,
    accessToken?: string,
    refreshToken?: string
  }
export const registerUser = (user:IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log('Register');
        console.log(user);
        apiClient.post("/auth/register", user).then(res => {
            console.log(res);
            resolve(res.data)
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    });
}

export const GoogleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log('Google sign in');
        apiClient.post("/auth/google", credentialResponse).then(res => {
            console.log(res);
            resolve(res.data)
        }).catch((err)=>{
            console.log(err);
            reject(err);
        })
    });

}
export const getUserData = () => {
    return new Promise<IUser>((resolve, reject) => {
      apiClient
        .get("/user")
        .then((response) => {
          resolve(response.data as IUser);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }; 

export const updateUser = (user: IUser) => {
    return new Promise<void>((resolve, reject) => {
      apiClient
        .put(`/user`, user)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  // Update the loginUser function to return user data
export const loginUser = (email: string, password: string) => {
  return new Promise<IUser>((resolve, reject) => {
      console.log('Login');
      const userData = { email, password };
      apiClient.post("/auth/login", userData)
          .then(res => {
              console.log(res);
              resolve(res.data.user); // Return the user object from the response
          })
          .catch(err => {
              console.log(err);
              const errorResponse = err.response;
              if (errorResponse && errorResponse.status === 401) {
                  // Handle unauthorized (401) error here
                  reject("Invalid credentials");
              } else {
                  reject("An error occurred during login");
              }
          });
  });
};

  // export const loginUser = (email: string, password: string) => {
  //   return new Promise<IUser>((resolve, reject) => {
  //     console.log('Login');
  //     const userData = { email, password };
  //     apiClient.post("/auth/login", userData)
  //       .then(res => {
  //         console.log(res);
  //         resolve(res.data.user); // Return the user object from the response
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         const errorResponse = err.response;
  //         if (errorResponse && errorResponse.status === 401) {
  //           // Handle unauthorized (401) error here
  //           reject("Invalid credentials");
  //         } else {
  //           reject("An error occurred during login");
  //         }
  //       });
  //   });
  // };
  

export const logoutUser = () => {
    return new Promise<void>((resolve, reject) => {
        apiClient.post("/auth/logout")
            .then(() => {
                resolve();
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};