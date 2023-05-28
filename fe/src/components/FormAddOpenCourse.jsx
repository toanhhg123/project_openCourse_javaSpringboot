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
import { useEffect, useState } from "react";
import { getAllClass } from "../api/class.api";
import { getAllCourse } from "../api/course.api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
const FormAddOpenCourse = ({ handleAddOpenCourse, error, loading }) => {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selects, setSelects] = useState({
    course_id: "",
    collegeClass_id: "",
  });

  const [datePicker, setDatePicker] = useState({
    timeStart: "",
    opentTime: "",
    closeDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const body = {
      lession: data.get("lession"),
      ...selects,
      ...datePicker,
    };
    handleAddOpenCourse(body);
  };

  const getClassesAndCourses = async () => {
    try {
      const [classes, courses] = await Promise.all([
        getAllClass(),
        getAllCourse(),
      ]);
      setSelects({
        collegeClass_id: classes.data.length > 0 ? classes.data[0].id : "",
        course_id: courses.data.length > 0 ? courses.data[0].id : "",
      });
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
        id="lesstion"
        label="lession"
        name="lession"
        autoComplete="lession"
        autoFocus
        type={"number"}
      />
      <Select
        sx={{ mt: 2 }}
        required
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        name="course_id"
        fullWidth
        value={selects.course_id}
        onChange={(e) => setSelects({ ...selects, course_id: e.target.value })}
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
      />

      <LoadingButton
        type="submit"
        fullWidth
        loading={loading}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        endIcon={<AddIcon />}
      >
        create OpenCourse
      </LoadingButton>
    </Box>
  );
};

FormAddOpenCourse.propTypes = {
  handleAddOpenCourse: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default FormAddOpenCourse;
