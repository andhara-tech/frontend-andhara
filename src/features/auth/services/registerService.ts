import apiClient from "@/app/apiClient";

export const registerRequest = async (
  email: string, 
  password: string,
  role: string
) => {
  try {
    const response = await apiClient.post("/auth/create-user", {
      email,
      password,
      role,
    },);
    console.log("Register successful in service:", response.data);
    return response;
  } catch (error) {
    console.error("Register failed:", error);
    throw new Error(
      "Register failed. Please check your credentials and try again."
    );
  }
}