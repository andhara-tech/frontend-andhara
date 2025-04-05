import apiClient from "@/app/apiClient";

type LoginResponse = {
   token: string;
   user: {
      email: string;
      role: string;
   };
};

export const loginRequest = async (email: string, password: string) => {
   try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
         email,
         password
      });
      localStorage.setItem("authToken ", response.data.token);
      console.log("Login successful in service:", response.data);
      return response;
   } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
         "Login failed. Please check your credentials and try again."
      );
   }
};
