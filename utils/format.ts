import dayjs from 'dayjs';

export const formatDate = (isoDate: string): string => {
  return dayjs(isoDate).format('DD/MM/YYYY');
};

export const formatName = (fullName: string): string => {
  return fullName.split(' ').slice(0, 3).join(' ');
};

export function formatGender(value: number): string {
  if (value === 1) return 'M';
  if (value === 2) return 'F';
  if (value === 3) return 'OTHER';
  return 'Desconhecido';
}


export const formatPrice = (value: number | string): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(',', '.'));
  }

  if (isNaN(Number(value))) return 'Valor inválido';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value));
};
