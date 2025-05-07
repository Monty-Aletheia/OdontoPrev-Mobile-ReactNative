import { Consultation } from "../types/consultation";
import { Dentist } from "../types/dentist";
import { retryRequest } from "../utils/retry";
import api from "./api";

export const getConsultationById = async (id: string | string[]) => {
  const response = await retryRequest(
    () => api.get(`/consultations/${id}`),
    3,
    3000
  );
  return response.data;
};

export const deleteConsultationById = async (id: string | string[]) => {
  await retryRequest(() => api.delete(`/consultations/${id}`), 3, 3000);
};

export const getConsultations = async (dentistId?: string) => {
  const response = await retryRequest(() => api.get("/consultations"), 5, 2000);
  const data = response.data;
  return data.filter((consultation: Consultation) =>
    consultation.dentists.some((d: Dentist) => d.id === dentistId)
  );
};

export const createConsultation = async (
  patientId: string,
  consultationDate: string,
  consultationValue: number,
  description?: string,
  dentistIds?: string[],
  riskStatus?: number
) => {
  try {
    const response = await api.post("/consultations", {
      patientId,
      consultationDate,
      consultationValue,
      description,
      dentistIds,
      riskStatus,
    });

    if (response.status === 201) {
      console.log("Consulta cadastrada");
      return true;
    } else {
      console.log("Falha ao criar consulta:", response.status);
      return false;
    }
  } catch (error) {
    console.log("Erro durante a criação da consulta:", error);
    return false;
  }
};
