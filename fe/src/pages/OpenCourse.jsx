import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  addOpenCourse,
  deleteOpenCourse,
  getAllOpenCourse,
  updateOpenCourse,
} from "../api/OpenCourse.api";
import AcctionOpenCourse from "../components/ActionOpenCourse";
import FormAddOpenCourse from "../components/FormAddOpenCourse";
import Layout from "../components/Layout";
import useFetch from "../hooks/useFetch";

const columns = [
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
];

const renderColumnAction = (actions) => ({
  field: "Actions",
  headerName: "Acctions",
  sortable: false,
  width: 100,
  renderCell: (params) => (
    <AcctionOpenCourse params={params} actions={actions} />
  ),
});

const OpenCourse = () => {
  const [{ loading, error }, fetchData] = useFetch();
  const [
    {
      loading: loadingOpenCourse,
      error: errorOpenCourse,
      data: dataOpenCourse,
    },
    fetchDataOpenCourse,
    setDataOpenCourse,
  ] = useFetch();

  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setShowSnackbar({ status: false, message: "" });
  };

  const handleAddOpenCourse = async (body) => {
    const { data } = await fetchData(() => addOpenCourse(body));
    setDataOpenCourse({
      ...dataOpenCourse,
      data: [data, ...dataOpenCourse.data],
    });
    setShowSnackbar({
      status: true,
      message: "OpenCourse created OpenCourse success",
      severity: "success",
    });
  };

  const handleDeleteOpenCourse = async (row) => {
    try {
      await deleteOpenCourse(row.id);
      setDataOpenCourse({
        ...dataOpenCourse,
        data: [...dataOpenCourse.data].filter((x) => x.id !== row.id),
      });
      setShowSnackbar({
        status: true,
        message: "class delete class success",
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
  const handleEditOpenCourse = async (body) => {
    try {
      const { data } = await updateOpenCourse(body.id, body);
      setShowSnackbar({
        status: true,
        message: "update class success",
        severity: "success",
      });
      setDataOpenCourse({
        ...dataOpenCourse,
        data: [
          data,
          ...[...dataOpenCourse.data].filter((x) => x.id !== data.id),
        ],
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
    fetchDataOpenCourse(getAllOpenCourse);
  }, [fetchDataOpenCourse]);
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
                New open Course
              </Typography>
              <FormAddOpenCourse
                handleAddOpenCourse={handleAddOpenCourse}
                error={error}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={8}>
          <Box>
            {errorOpenCourse && (
              <Alert severity="error">{errorOpenCourse}</Alert>
            )}
            {loadingOpenCourse && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                minHeight={500}
              >
                <CircularProgress />
              </Box>
            )}

            {dataOpenCourse && (
              <DataGrid
                sx={{ width: "100%" }}
                rows={dataOpenCourse.data ?? []}
                columns={[
                  ...columns,
                  renderColumnAction({
                    handleDeleteOpenCourse,
                    handleEditOpenCourse,
                  }),
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
                slotProps={{ toolbar: { csvOptions: { fileName: "data" } } }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OpenCourse;
