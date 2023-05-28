import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthGlobal = () => {
  const { userDetails, setLoginSuccess, logout } = useContext(AuthContext);
  return { userDetails, setLoginSuccess, logout };
};

export default useAuthGlobal;
