import { Alert, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import { getOpenCourseByUserId } from "../api/user.api";
import Layout from "../components/Layout";
import useAuthGlobal from "../hooks/useAuthGlobal";
import useFetch from "../hooks/useFetch";

const columns = [
  { field: "id", headerName: "ID" },
  {
    flex: 1,
    field: "course",
    headerName: "Course Name",
    valueGetter: (params) => `${params.row?.course?.name}`,
  },
  {
    flex: 1,
    field: "lession",
    headerName: "lession",
    valueGetter: (params) => `${params.row?.lession}`,
  },
  {
    flex: 1,
    field: "collegeClass",
    headerName: "College Class",
    valueGetter: (params) => `${params.row?.collegeClass?.name}`,
  },
  {
    flex: 1,
    field: "classQuantity",
    headerName: "Quantity in class",
    valueGetter: (params) => `${params.row?.collegeClass?.qty || 0}`,
  },
  {
    flex: 1,
    field: "quantityStudentRegisterd",
    headerName: "Quantity in class",
    valueGetter: (params) => `${params.row?.students?.length || 0}`,
  },

  {
    flex: 1,
    field: "opentTime",
    headerName: "open time",
    valueGetter: (params) => {
      return `${new Date(params.row?.opentTime).toLocaleString()}`;
    },
  },
  {
    flex: 1,
    field: "timeStart",
    headerName: "Time Start",
    valueGetter: (params) => `${new Date(params.row?.timeStart)}`,
  },
];

const RegisteredOpenCourse = () => {
  const { userDetails } = useAuthGlobal();
  const [
    {
      loading: loadingOpenCourse,
      error: errorOpenCourse,
      data: dataOpenCourse,
    },
    fetchDataOpenCourse,
  ] = useFetch();

  useEffect(() => {
    fetchDataOpenCourse(() => getOpenCourseByUserId(userDetails.id));
  }, [fetchDataOpenCourse, userDetails]);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid xs={12}>
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
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default RegisteredOpenCourse;
