import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
const FormAddUser = ({ handleAddUser, error, loading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const body = {
      userName: data.get("userName"),
      password: data.get("password"),
      address: data.get("address"),
      phoneNumber: data.get("phoneNumber"),
      role: data.get("role") === 0 ? { id: 0 } : { id: 1 },
    };
    handleAddUser(body);
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
        id="userName"
        label="userName User"
        name="userName"
        autoComplete="userName"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="phoneNumber"
        label="phoneNumber"
        type="phoneNumber"
        id="phoneNumber"
        autoComplete="current-phoneNumber"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="address"
        label="address"
        type="address"
        id="address"
        autoComplete="current-address"
      />
      <Select
        sx={{ mt: 2 }}
        required
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        name="role"
        defaultValue={0}
        fullWidth
      >
        <MenuItem value={0}>admin</MenuItem>
        <MenuItem value={1}>user</MenuItem>
      </Select>
      <LoadingButton
        type="submit"
        fullWidth
        loading={loading}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        endIcon={<AddIcon />}
      >
        create User
      </LoadingButton>
    </Box>
  );
};

FormAddUser.propTypes = {
  handleAddUser: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default FormAddUser;
