import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../service/api";
import { boolean } from "yup";

type AuthContextType = {
  signIn: (registrationNumber: string, password: string) => Promise<boolean>;
  signUp: (name: string, specialty: string, registrationNumber: string,claimsRate: number, riskStatus: number, password: string) => Promise<boolean>;
  signOut: () => void;
  userName: string;
  isSignedIn: boolean;
};

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
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = async (registrationNumber: string, password: string) => {
    try {
      const response = await api.post("/auth/login", {
        registrationNumber,
        password,
      });
  
      const { name, id } = response.data; // depende do que sua API retorna
  
      setUserId(id);
      setUserName(name);
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

    if (reponse.status == 201){
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

  const value = { signIn, signUp, signOut, userName, isSignedIn };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const jsonUsers = await AsyncStorage.getItem("users");
        if (jsonUsers) {
          const parsedUsers = JSON.parse(jsonUsers);
          setUsers(parsedUsers);
          console.log("Usuários carregados com sucesso:", parsedUsers);
        }
      } catch (error) {
        console.error("Erro ao carregar os usuários:", error);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const saveUsers = async () => {
      try {
        const jsonUsers = JSON.stringify(users);
        await AsyncStorage.setItem("users", jsonUsers);
        console.log("Usuários salvos com sucesso:", jsonUsers);
      } catch (error) {
        console.error("Erro ao salvar os usuários:", error);
      }
    };

    saveUsers();
  }, [users]);

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
