import dayjs from 'dayjs';

export const formatDate = (isoDate: string): string => {
  return dayjs(isoDate).format('DD/MM/YYYY');
};

export const formatName = (fullName: string): string => {
  return fullName.split(' ').slice(0, 3).join(' ');
};