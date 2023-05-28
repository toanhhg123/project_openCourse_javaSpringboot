import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useState } from "react";

const AcctionUser = ({ actions, params }) => {
  const { handleDeleteUser, handleEditUser } = actions;
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleDelete = () => {
    handleDeleteUser(params.row);
    handleTogleModal();
  };
  const handleTogleModal = () => {
    setShowModalDelete(!showModalDelete);
  };
  const handleTogleModalEdit = () => {
    setShowModalEdit(!showModalEdit);
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = {
      id: params.row.id,
      userName: data.get("userName"),
      address: data.get("address"),
      phoneNumber: data.get("phoneNumber"),
      role: Number(data.get("role")) === 0 ? { id: 0 } : { id: 1 },
    };
    handleEditUser(body);
    handleTogleModalEdit();
  };
  if (params.id === 3) console.log(params.row.role.id.toString());
  return (
    <Box>
      <Dialog
        open={showModalDelete}
        onClose={handleTogleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Alert severity="error">
            Are you want delete User — check it out!
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleTogleModal}>
            Disagree
          </Button>
          <Button variant={"contained"} onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showModalEdit}
        onClose={handleTogleModalEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box p={2} component={"form"} onSubmit={handleSubmitEdit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="userName User"
            name="userName"
            autoComplete="userName"
            autoFocus
            defaultValue={params.row.username}
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
            defaultValue={params.row.phoneNumber}
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
            defaultValue={params.row.address}
          />
          <Select
            sx={{ mt: 2 }}
            required
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            inputProps={{
              name: "role",
            }}
            fullWidth
            defaultValue={params.row.role.id}
          >
            <MenuItem value={0}>admin</MenuItem>
            <MenuItem value={1}>user</MenuItem>
          </Select>
          <DialogActions>
            <Button variant={"outlined"} onClick={handleTogleModalEdit}>
              Disagree
            </Button>
            <Button type="submit" variant={"contained"} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Tooltip title="Details">
        <IconButton color="info" onClick={handleTogleModalEdit}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete" onClick={handleTogleModal}>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
AcctionUser.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default AcctionUser;
