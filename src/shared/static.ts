export interface Department {
  id: number;
  departamnet_name: string;
}

// archivo de constantes
export const departmentStatic: Department [] = [
  { id: 0, departamnet_name: "Bogotá D.C." },
  { id: 1, departamnet_name: "Antioquia" },
  { id: 2, departamnet_name: "Valle del Cauca" },
  { id: 3, departamnet_name: "Santander" },
  { id: 4, departamnet_name: "Cundinamarca" }
];

export interface City {
  id: number;
  city_name: string;
  department_id: number;
}

export const cityStatic: City[] = [
  { id: 0, city_name: "Bogotá D.C.", department_id: 0 },
  { id: 1, city_name: "Medellín", department_id: 1 },
  { id: 2, city_name: "Cali", department_id: 2 },
  { id: 3, city_name: "Bucaramanga", department_id: 3 },
  { id: 4, city_name: "Chía", department_id: 4 }
];

export interface Headquarter {
  id: number;
  city_id: number;
  headquarter_name: string;
  charge_name: string;
  headquarter_address: string;
}

export const headquarterStatic: Headquarter[] = [
  { id: 0, city_id: 0, headquarter_name: "Sede Principal Bogotá", charge_name: "Carlos Méndez", headquarter_address: "Carrera 7 # 45-23" },
  { id: 1, city_id: 1, headquarter_name: "Sede Medellín Norte", charge_name: "Laura Giraldo", headquarter_address: "Calle 50 # 30-15" },
  { id: 2, city_id: 2, headquarter_name: "Sede Cali Centro", charge_name: "Andrés Ramírez", headquarter_address: "Avenida 6N # 15-20" },
  { id: 3, city_id: 0, headquarter_name: "Sede Bogotá Sur", charge_name: "Sofía Castro", headquarter_address: "Calle 45 Sur # 24-30" },
  { id: 4, city_id: 3, headquarter_name: "Sede Bucaramanga", charge_name: "Jorge Rojas", headquarter_address: "Carrera 27 # 45-67" }
];

export interface Supplier {
  id: number;
  supplier_name: string;
}

export const supplierStatic: Supplier[] = [
  { id: 0, supplier_name: "Distribuidora Andina" },
  { id: 1, supplier_name: "Importaciones Colombia" },
  { id: 2, supplier_name: "Tecnología Avanzada S.A." },
  { id: 3, supplier_name: "Suministros Industriales Ltda." },
  { id: 4, supplier_name: "Alimentos del Valle" }
];