import apiClient from "@/app/apiClient";

type LoginResponse = {
   token: string;
   user: {
      id: string;
      name: string;
      email: string;
      role: string;
   };
};

export const login = async (email: string, password: string) => {
   try {
      const response = await apiClient.post<LoginResponse>("/auth/login", {
         email,
         password
      });

      localStorage.setItem("authToken ", response.data.token);

      return response.data.user;
   } catch (error) {
      console.error("Login failed:", error);
      throw new Error(
         "Login failed. Please check your credentials and try again."
      );
   }
};
