import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useState } from "react";

const AcctionClass = ({ actions, params }) => {
  const { handleDeleteClass, handleEditClass } = actions;
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleDelete = () => {
    handleDeleteClass(params.row);
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
      id: data.get("id"),
      name: data.get("name"),
      qty: data.get("qty"),
    };
    handleEditClass(body);
    handleTogleModalEdit();
  };
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
            Are you want delete class — check it out!
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
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            id="id"
            label="id class"
            name="id"
            autoComplete="id"
            autoFocus
            defaultValue={params.row.id}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name class"
            name="name"
            autoComplete="name"
            autoFocus
            defaultValue={params.row.name}
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
            defaultValue={params.row.qty}
          />
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
AcctionClass.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default AcctionClass;
