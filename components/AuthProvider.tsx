import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../service/api";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./SplashScreen";
import { router } from "expo-router";
import { CustomJwtPayload } from "../types/CustomJwtPayload";
import { Dentist } from "../types/dentist";




type AuthContextType = {
  signIn: (registrationNumber: string, password: string) => Promise<boolean>;
  signUp: (name: string, specialty: string, registrationNumber: string,claimsRate: number, riskStatus: number, password: string) => Promise<boolean>;
  signOut: () => void;
  userName: string;
  isSignedIn: boolean;
  getDentistById: () => Promise<void>;
  dentist: Dentist | null;
  isLoading: boolean;

};


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);


const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [dentist, setDentist] = useState<Dentist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("@userId");
        const signedIn = await AsyncStorage.getItem("@isSignedIn");

        if (storedUserId && signedIn === "true") {
          console.log(storedUserId)
          console.log(signedIn)
          setUserId(storedUserId);
          setIsSignedIn(true);
        } 
      } catch (e) {
        console.error("Erro ao carregar dados do AsyncStorage", e);
      } finally {
        setIsLoading(false);
        
      }
    };

    loadStorageData();
  }, []);

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
      const username = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
      console.log(id)

      await AsyncStorage.setItem("@userId", id);
      await AsyncStorage.setItem("@isSignedIn", "true");
  
      setUserName(username)
      setUserId(id);
      setIsSignedIn(true);
  
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

  const getDentistById = async () => {
    try {
      const response = await api.get(`/dentists/${userId}`);
      const data = response.data;
      setDentist(data);
      console.log("Dentista encontrado:", data);
    } catch (error) {
      console.error("Erro ao buscar dentista por ID:", error);
    }
  };

  const signOut = async () => {
    setUserId("");
    setUserName("");
    setIsSignedIn(false);
    await AsyncStorage.removeItem("@userId");
    await AsyncStorage.removeItem("@isSignedIn");
    router.replace("/")

  };


  const value = { signIn, signUp, signOut, userName, isSignedIn, userId, getDentistById, dentist, isLoading };



  return <AuthContext.Provider value={value}>{isLoading ? <SplashScreen /> : children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Precisa existir o contexto");
  }

  return context;
};

export default AuthProvider;
