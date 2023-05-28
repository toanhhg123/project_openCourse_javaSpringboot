import { Alert, Button, Snackbar } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { registerOpenCourse } from "../api/OpenCourse.api";
import useAuthGlobal from "../hooks/useAuthGlobal";

const AcctionRegister = ({ params }) => {
  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setShowSnackbar({ status: false, message: "" });
  };
  const {
    userDetails: { id },
  } = useAuthGlobal();
  const handleRegister = () => {
    registerOpenCourse(params.row.id, id).then(() => {
      setShowSnackbar({
        status: true,
        message: "Course created Course success",
        severity: "success",
      });
    });
  };
  return (
    <>
      <Snackbar
        open={showSnackbar.status}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={showSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {showSnackbar.message}
        </Alert>
      </Snackbar>
      <Button onClick={handleRegister} variant="contained">
        Register
      </Button>
    </>
  );
};
AcctionRegister.propTypes = {
  params: PropTypes.object.isRequired,
};
export default AcctionRegister;
