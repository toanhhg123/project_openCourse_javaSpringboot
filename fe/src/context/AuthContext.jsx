import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  userDetails: null,
  setLoginSuccess: () => {},
  logout: () => {},
});

const KEY_AUTH = "VITE_AUTH_JAVA";

export default function AuthContextProvider({ children }) {
  const [userDetails, setUserDetails] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY_AUTH));
    } catch (error) {
      return null;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails) navigate("/login");
  }, [navigate, userDetails]);

  const setLoginSuccess = (token) => {
    const userDetails = jwtDecode(token);
    console.log(userDetails);
    localStorage.setItem(KEY_AUTH, JSON.stringify({ ...userDetails, token }));
    setUserDetails({ ...userDetails, token });
  };

  const logout = () => {
    localStorage.removeItem(KEY_AUTH);
    setUserDetails(null);
  };
  return (
    <AuthContext.Provider value={{ userDetails, setLoginSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
