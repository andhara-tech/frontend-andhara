export const formatCurrency = (value: number) => {
   return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
   }).format(value);
};

// Función para formatear porcentajes
export const formatPercent = (value: number) => {
   return `${value.toFixed(2)}%`;
};
