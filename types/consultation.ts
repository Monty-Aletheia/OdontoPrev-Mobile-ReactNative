import { Dentist } from "./dentist";
import { Patient } from "./patient";

export interface Consultation {
  id: string;
  consultationDate: string;
  consultationValue: number;
  riskStatus: string;
  description: string | null;
  patient: Patient;
  dentists: Dentist[];
}
