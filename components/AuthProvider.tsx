import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../service/api";
import { jwtDecode } from "jwt-decode";



type AuthContextType = {
  signIn: (registrationNumber: string, password: string) => Promise<boolean>;
  signUp: (name: string, specialty: string, registrationNumber: string,claimsRate: number, riskStatus: number, password: string) => Promise<boolean>;
  signOut: () => void;
  userName: string;
  isSignedIn: boolean;
};

interface CustomJwtPayload {
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

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type User = {
  name: string;
  specialty: string;
  registrationNumber: string;
  claimsRate: number;
  riskStatus: number;
  password: string;
};

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = async (registrationNumber: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        registrationNumber,
        password,
      });
  
      const { token } = response.data;
      console.log(token)

      const decoded = jwtDecode<CustomJwtPayload>(token);
      console.log(decoded)
      const id = decoded.id
      console.log(id)

  
      // setUserId(token);
      // setIsSignedIn(true);
  
  
      return true;
    } catch (error) {
      console.error("Erro no login:", error);
      return false;
    }
  };

  const signUp = async (name: string, specialty: string, registrationNumber: string, claimsRate: number, riskStatus: number, password: string) => {
   try{
    const reponse = await api.post("auth/register", {
        name,
        specialty,
        registrationNumber,
        claimsRate,
        password,
        riskStatus
    });

    if (reponse.status == 200){
        console.log("Usuario cadastrado")
        return true
    } else {
        console.log("Falha ao cadastrar:", reponse.status)
        return false
    }


   } catch(error){
    console.log("Erro durante cadastro:", error)
    return false
   }
  };

  const signOut = () => {
    setUserId("");
    setUserName("");
    setIsSignedIn(false);
  };

  const value = { signIn, signUp, signOut, userName, isSignedIn, userId };



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Precisa existir o contexto");
  }

  return context;
};

export default AuthProvider;
