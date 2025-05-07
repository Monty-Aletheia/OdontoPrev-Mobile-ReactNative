export interface Patient {
  id: string;
  name: string;
  birthday: string;
  gender: number;
  riskStatus: number;
  consultationFrequency: number;
  associatedClaims: string;
}
