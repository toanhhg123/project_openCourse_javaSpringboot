import { Alert, AlertTitle, CircularProgress, Snackbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getAllCourse } from "../api/course.api";
import { getAllOpenCourseByCourseId } from "../api/OpenCourse.api";
import AcctionRegister from "../components/AcctionRegister";
import Layout from "../components/Layout";
import useFetch from "../hooks/useFetch";

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Course Name",
    flex: 1,
  },
  {
    field: "credits",
    headerName: "credits",
    flex: 1,
  },
];

const columnsOpenCourse = [
  { field: "id", headerName: "ID" },
  {
    field: "course",
    headerName: "Course Name",
    valueGetter: (params) => `${params.row?.course?.name}`,
  },
  {
    field: "lession",
    headerName: "lession",
    valueGetter: (params) => `${params.row?.lession}`,
  },
  {
    field: "collegeClass",
    headerName: "College Class",
    valueGetter: (params) => `${params.row?.collegeClass?.name}`,
  },
  {
    field: "classQuantity",
    headerName: "Quantity in class",
    valueGetter: (params) => `${params.row?.collegeClass?.qty || 0}`,
  },
  {
    field: "quantityStudentRegisterd",
    headerName: "Quantity in class",
    valueGetter: (params) => `${params.row?.students?.length || 0}`,
  },

  {
    field: "opentTime",
    headerName: "open time",
    valueGetter: (params) => {
      return `${new Date(params.row?.opentTime).toLocaleString()}`;
    },
  },
  {
    field: "timeStart",
    headerName: "Time Start",
    valueGetter: (params) => `${new Date(params.row?.timeStart)}`,
  },
  {
    field: "Register",
    headerName: "register",
    renderCell: (params) => <AcctionRegister params={params} />,
  },
];

const RegisterCourse = () => {
  const [courseSelected, setCourseSelected] = useState(null);
  const [
    { loading: loadingCourse, error: errorCourse, data: dataCourse },
    fetchDataCourse,
  ] = useFetch();

  const [openCourses, setOpenCourses] = useState([]);

  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setShowSnackbar({ status: false, message: "" });
  };

  useEffect(() => {
    fetchDataCourse(getAllCourse);
  }, [fetchDataCourse]);

  useEffect(() => {
    if (courseSelected !== null)
      getAllOpenCourseByCourseId(courseSelected).then((data) =>
        setOpenCourses(data.data)
      );
  }, [courseSelected]);

  return (
    <Layout>
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
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Box>
            {errorCourse && <Alert severity="error">{errorCourse}</Alert>}
            {loadingCourse && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                minHeight={500}
              >
                <CircularProgress />
              </Box>
            )}

            {dataCourse && (
              <DataGrid
                sx={{ width: "100%" }}
                rows={dataCourse.data ?? []}
                columns={[...columns]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                {...{
                  autoHeight: true,
                  showCellVerticalBorder: true,
                  showColumnVerticalBorder: true,
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { csvOptions: { fileName: "data" } } }}
                checkboxSelection
                onRowSelectionModelChange={(e) => {
                  setCourseSelected(e.slice(-1)?.at(0) || null);
                }}
              />
            )}
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box>
            {errorCourse && <Alert severity="error">{errorCourse}</Alert>}
            {loadingCourse && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                minHeight={500}
              >
                <CircularProgress />
              </Box>
            )}

            {openCourses.length ? (
              <DataGrid
                sx={{ width: "100%" }}
                rows={openCourses}
                columns={[...columnsOpenCourse]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[5, 10, 20]}
                disableRowSelectionOnClick
                {...{
                  autoHeight: true,
                  showCellVerticalBorder: true,
                  showColumnVerticalBorder: true,
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { csvOptions: { fileName: "data" } } }}
                checkboxSelection
                onRowSelectionModelChange={(e) => {
                  setCourseSelected(e.slice(-1)?.at(0) || null);
                }}
              />
            ) : (
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                Please choice course other — <strong>check it out!</strong>
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default RegisterCourse;
