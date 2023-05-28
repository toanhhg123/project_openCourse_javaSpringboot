import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import ToggleColorMode from "./context/ColorMode.jsx";
import { BrowserRouter } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToggleColorMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </LocalizationProvider>
      </ToggleColorMode>
    </BrowserRouter>
  </React.StrictMode>
);
