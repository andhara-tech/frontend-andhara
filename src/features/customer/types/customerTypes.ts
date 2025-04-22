export type Customer = {
  customer_document: string;
  document_type: 'CC' | 'TI' | 'CE' | string; // puedes especificar más tipos si los conoces
  customer_first_name: string;
  customer_last_name: string;
  phone_number: string;
  email: string;
  home_address: string;
  customer_state: boolean;
  branch: {
    id_branch: string;
    branch_name: string;
    manager_name: string;
    branch_address: string;
    city_name: string;
    department_name: string;
  };
  last_purchase: {
    id_purchase: string;
    purchase_date: string; // Podrías usar Date si haces la conversión
    purchase_duration: number;
    next_purchase_date: string; // Igual que arriba
    total_purchase: number;
    products: any[]; // Puedes cambiar `any` por un tipo `Product` si sabes la estructura
  };
};

export const typesDocument = [
  { id: 'CC', name: 'Cédula de Ciudadanía' },
  { id: 'TI', name: 'Tarjeta de Identidad' },
  { id: 'CE', name: 'Cédula de Extranjería' },
  { id: 'PA', name: 'Pasaporte' },
  { id: 'RC', name: 'Registro Civil' },
  { id: 'NIT', name: 'Número de Identificación Tributaria' },
  { id: 'OTRO', name: 'Otro' },
  { id: 'N/A', name: 'No Aplica' },
]

export const types = ['CC', 'TI', 'CE', 'NIT', 'PASS'] as const;