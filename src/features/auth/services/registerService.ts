import apiClient from "@/app/apiClient";

type RegisterResponse = {
  message: string;
  user: {
    email: string;
    role: string;
  };
};

export const registerRequest = async (
  email: string, 
  password: string,
  role: string
) => {
  try {
    const response = await apiClient.post<RegisterResponse>("/auth/create-user", {
      email,
      password,
      role,
    },);
    return response;
  } catch (error) {
    console.error("Register failed:", error);
    throw new Error(
      "Register failed. Please check your credentials and try again."
    );
  }
}