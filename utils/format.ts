import dayjs from "dayjs";

export const formatDate = (isoDate: string): string => {
  return dayjs(isoDate).format("DD/MM/YYYY");
};

export const formatName = (fullName: string): string => {
  return fullName.split(" ").slice(0, 3).join(" ");
};

export function formatGender(value: string): string {
  if (value === "Male") return "Masculino";
  if (value === "Female") return "Feminino";
  if (value === "Other") return "Outro";
  return "Desconhecido";
}

export function formatRiskStatus(value: string): string {
  if (value === "Low") return "BAIXO";
  if (value === "Medium") return "MEDIO";
  if (value === "High") return "ALTO";
  return "Desconhecido";
}

export const formatPrice = (value: number | string): string => {
  if (typeof value === "string") {
    value = parseFloat(value.replace(",", "."));
  }

  if (isNaN(Number(value))) return "Valor inválido";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
};
