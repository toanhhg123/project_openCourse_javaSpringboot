import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import useFetch from "../hooks/useFetch";
import {
  addCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../api/course.api";
import { Alert, Snackbar } from "@mui/material";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FormAddCourse from "../components/FormAddCourse";
import AcctionCourse from "../components/ActionCourse";

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

const renderColumnAction = (actions) => ({
  field: "Actions",
  headerName: "Acctions",
  sortable: false,
  width: 100,
  renderCell: (params) => <AcctionCourse params={params} actions={actions} />,
});

const Course = () => {
  const [{ loading, error }, fetchData] = useFetch();
  const [
    { loading: loadingCourse, error: errorCourse, data: dataCourse },
    fetchDataCourse,
    setDataCourse,
  ] = useFetch();

  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setShowSnackbar({ status: false, message: "" });
  };

  const handleAddCourse = async (body) => {
    const { data } = await fetchData(() => addCourse(body));
    setDataCourse({ ...dataCourse, data: [data, ...dataCourse.data] });
    setShowSnackbar({
      status: true,
      message: "Course created Course success",
      severity: "success",
    });
  };
  const handleDeleteCourse = async (row) => {
    try {
      await deleteCourse(row.id);
      setDataCourse({
        ...dataCourse,
        data: [...dataCourse.data].filter((x) => x.id !== row.id),
      });
      setShowSnackbar({
        status: true,
        message: "Course delete Course success",
        severity: "success",
      });
    } catch (error) {
      setShowSnackbar({
        status: true,
        message: error.message,
        severity: "error",
      });
    }
  };

  const handleEditCourse = async (body) => {
    try {
      const { data } = await updateCourse(body.id, body);
      setShowSnackbar({
        status: true,
        message: "update Course success",
        severity: "success",
      });
      setDataCourse({
        ...dataCourse,
        data: [data, ...[...dataCourse.data].filter((x) => x.id !== data.id)],
      });
    } catch (error) {
      setShowSnackbar({
        status: true,
        message: error.message,
        severity: "error",
      });
    }
  };
  useEffect(() => {
    fetchDataCourse(getAllCourse);
  }, [fetchDataCourse]);
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
        <Grid xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} component="div">
                New User
              </Typography>
              <FormAddCourse
                handleAddCourse={handleAddCourse}
                error={error}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={8}>
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
                columns={[
                  ...columns,
                  renderColumnAction({ handleEditCourse, handleDeleteCourse }),
                ]}
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
                slotProps={{ toolbar: { csvOptions: { fileName: "data", } } }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Course;
