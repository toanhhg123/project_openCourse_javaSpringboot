import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
const FormAddClass = ({ handleAddClass, error, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const body = {
      name: data.get("name"),
      qty: data.get("qty"),
    };
    handleAddClass(body);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {error && (
        <Alert severity="error" fullwidth="true">
          <AlertTitle>Error</AlertTitle>
          {error} — <strong>check it out!</strong>
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="name class"
        name="name"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="qty"
        label="quantity"
        type="number"
        id="qty"
        autoComplete="current-password"
      />
      <LoadingButton
        type="submit"
        fullWidth
        loading={loading}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        endIcon={<AddIcon />}
      >
        create class
      </LoadingButton>
    </Box>
  );
};

FormAddClass.propTypes = {
  handleAddClass: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default FormAddClass;
