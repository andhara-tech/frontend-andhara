export const formatCurrency = (value: number | null) => {
   return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
   }).format(value ?? 0);
};

export const formatPercent = (value: number) => {
   return `${value.toFixed(2)}%`;
};

