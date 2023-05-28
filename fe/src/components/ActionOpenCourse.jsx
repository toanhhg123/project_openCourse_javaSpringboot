import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllClass } from "../api/class.api";
import { getAllCourse } from "../api/course.api";

const AcctionOpenCourse = ({ actions, params }) => {
  const { handleDeleteOpenCourse, handleEditOpenCourse } = actions;
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selects, setSelects] = useState({
    course_id: params.row.course.id,
    collegeClass_id: params.row.collegeClass.id,
  });
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);

  const [datePicker, setDatePicker] = useState({
    timeStart: dayjs(params.row.timeStart).format("YYYY-MM-DD"),
    opentTime: dayjs(params.row.opentTime).format("YYYY-MM-DD"),
    closeDate: dayjs(params.row.closeDate).format("YYYY-MM-DD"),
  });
  const handleDelete = () => {
    handleDeleteOpenCourse(params.row);
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
      lession: data.get("lession"),
      ...selects,
      ...datePicker,
    };
    handleEditOpenCourse(body);
    handleTogleModalEdit();
  };
  const getClassesAndCourses = async () => {
    try {
      const [classes, courses] = await Promise.all([
        getAllClass(),
        getAllCourse(),
      ]);
      setClasses(classes.data);
      setCourses(courses.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClassesAndCourses();
  }, []);
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
            id="lesstion"
            label="lession"
            name="lession"
            autoComplete="lession"
            autoFocus
            type={"number"}
            defaultValue={params.row.lession}
          />
          <Select
            sx={{ mt: 2 }}
            required
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="course_id"
            fullWidth
            value={selects.course_id}
            onChange={(e) =>
              setSelects({ ...selects, course_id: e.target.value })
            }
          >
            {courses.map(({ id, name }) => (
              <MenuItem defaultValue value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <Select
            sx={{ mt: 2 }}
            required
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="collegeClass_id"
            fullWidth
            value={selects.collegeClass_id}
            onChange={(e) =>
              setSelects({ ...selects, collegeClass_id: e.target.value })
            }
          >
            {classes.map(({ id, name }) => (
              <MenuItem defaultValue value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>

          <DatePicker
            sx={{ mt: 2, width: "100%" }}
            onChange={(value) =>
              setDatePicker({
                ...datePicker,
                opentTime: dayjs(value.$d).format("YYYY-MM-DD"),
              })
            }
            inputFormat="YYYY/MM/DD"
            slotProps={{
              textField: {
                helperText: "Open Time",
              },
            }}
            label={'"year", "month" and "day"'}
            views={["year", "month", "day"]}
            value={dayjs(datePicker.opentTime)}
          />
          <DatePicker
            sx={{ mt: 2, width: "100%" }}
            onChange={(value) =>
              setDatePicker({
                ...datePicker,
                timeStart: dayjs(value.$d).format("YYYY-MM-DD"),
              })
            }
            inputFormat="YYYY/MM/DD"
            slotProps={{
              textField: {
                helperText: "Time Start",
              },
            }}
            label={'"year", "month" and "day"'}
            views={["year", "month", "day"]}
            value={dayjs(datePicker.timeStart)}
          />

          <DatePicker
            sx={{ mt: 2, width: "100%" }}
            onChange={(value) =>
              setDatePicker({
                ...datePicker,
                closeDate: dayjs(value.$d).format("YYYY-MM-DD"),
              })
            }
            inputFormat="YYYY/MM/DD"
            slotProps={{
              textField: {
                helperText: "Open Time",
              },
            }}
            label={'"year", "month" and "day"'}
            views={["year", "month", "day"]}
            value={dayjs(datePicker.opentTime)}
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
AcctionOpenCourse.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default AcctionOpenCourse;
