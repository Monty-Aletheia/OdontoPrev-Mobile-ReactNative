export interface CustomJwtPayload {
  id: string;
  registrationNumber: string;
  specialty: string;
  claimsRate: string;
  riskStatus: string;
  aud: string;
  iss: string;
  exp: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
}
