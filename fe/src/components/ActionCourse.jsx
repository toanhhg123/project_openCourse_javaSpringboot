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
  Tooltip
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useState } from "react";

const AcctionCourse = ({ actions, params }) => {
  const { handleDeleteCourse, handleEditCourse } = actions;
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const handleDelete = () => {
    handleDeleteCourse(params.row);
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
      name: data.get("name"),
      credits: data.get("credits"),
     
    };
    handleEditCourse(body);
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
            Are you want delete Course — check it out!
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
            id="name"
            label="name Course"
            name="name"
            autoComplete="name"
            defaultValue={params.row.name}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="credits"
            label="credits"
            type="number"
            id="credits"
            autoComplete="current-credits"
            defaultValue={params.row.credits}
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
AcctionCourse.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default AcctionCourse;
