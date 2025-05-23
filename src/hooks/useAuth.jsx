// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
// adjust path if different

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;