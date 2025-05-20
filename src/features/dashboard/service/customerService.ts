import apiClient from "@/app/apiClient";
import { CustomerService } from "../types/purchaseTypes";
import { AxiosResponse } from "axios";

export const customerManagementService = {
	customerManagementList: async (): Promise<AxiosResponse<CustomerService[]>> => {
		try {
			const response: AxiosResponse<CustomerService[]> = await apiClient.get("/customer-service/list-all");
			return response;
		} catch (error: any) {
			const errorMessage = error.response?.data?.message || "Error al obtener la lista de clientes"
			throw new Error(errorMessage)
		}
	}
}