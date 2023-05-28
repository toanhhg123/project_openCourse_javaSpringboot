import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  addClass,
  deleteClass,
  getAllClass,
  updateClass,
} from "../api/class.api";
import FormAddClass from "../components/FormAddClass";
import Layout from "../components/Layout";
import useFetch from "../hooks/useFetch";

import AcctionClass from "../components/AcctionClass";

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Class Name",
    flex: 1,
  },
  {
    field: "qty",
    headerName: "Quantity",
    flex: 1,
  },
];

const renderColumnAction = (actions) => ({
  field: "Actions",
  headerName: "Acctions",
  sortable: false,
  width: 100,
  renderCell: (params) => <AcctionClass params={params} actions={actions} />,
});

const Class = () => {
  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    message: "",
    severity: "success",
  });
  const [{ loading, error }, fetchData] = useFetch();
  const [
    { loading: loadingClass, error: errorClass, data: dataClass },
    fetchDataUser,
    setDataClass,
  ] = useFetch();
  const handleCloseSnackbar = () => {
    setShowSnackbar({ status: false, message: "" });
  };

  useEffect(() => {
    fetchDataUser(getAllClass);
  }, [fetchDataUser]);

  const handleAddClass = async (body) => {
    const { data } = await fetchData(() => addClass(body));
    setDataClass({ ...dataClass, data: [data, ...dataClass.data] });
    setShowSnackbar({
      status: true,
      message: "class created class success",
      severity: "success",
    });
  };

  const handleDeleteClass = async (row) => {
    try {
      await deleteClass(row.id);
      setDataClass({
        ...dataClass,
        data: [...dataClass.data].filter((x) => x.id !== row.id),
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

  const handleEditClass = async (body) => {
    try {
      const { data } = await updateClass(body.id, body);
      setShowSnackbar({
        status: true,
        message: "update class success",
        severity: "success",
      });
      setDataClass({
        ...dataClass,
        data: [data, ...[...dataClass.data].filter((x) => x.id !== data.id)],
      });
    } catch (error) {
      setShowSnackbar({
        status: true,
        message: error.message,
        severity: "error",
      });
    }
  };

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
                New Claas
              </Typography>
              <FormAddClass
                handleAddClass={handleAddClass}
                error={error}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={8}>
          <Box>
            {errorClass && <Alert severity="error">{errorClass}</Alert>}
            {loadingClass && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                minHeight={500}
              >
                <CircularProgress />
              </Box>
            )}

            {dataClass && (
              <DataGrid
                sx={{ width: "100%" }}
                rows={dataClass.data ?? []}
                columns={[
                  ...columns,
                  renderColumnAction({ handleDeleteClass, handleEditClass }),
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

export default Class;
