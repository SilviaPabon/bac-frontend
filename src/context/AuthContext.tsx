import { TUser } from "../typescript";
import { ReactNode, createContext, useState } from "react";

export const AuthContext = createContext({
  user: null as TUser | null,
  isLoading: true,
  setUser: (_user: TUser):void => {},
  setIsLoading: (_isLoading: boolean):void => {},
})

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};