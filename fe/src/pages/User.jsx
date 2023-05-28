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
import { addUser, deleteUser, getAllUser, updateUser } from "../api/user.api";
import AcctionUser from "../components/ActionUser";
import FormAddUser from "../components/FormAddUser";
import Layout from "../components/Layout";
import useFetch from "../hooks/useFetch";
const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "username",
    headerName: "User Name",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 1,
    valueGetter: (params) => `${params.row.role.roleName}`,
  },
];

const renderColumnAction = (actions) => ({
  field: "Actions",
  headerName: "Acctions",
  sortable: false,
  width: 100,
  renderCell: (params) => <AcctionUser params={params} actions={actions} />,
});

const User = () => {
  const [{ loading, error }, fetchData] = useFetch();
  const [
    { loading: loadingUser, error: errorUser, data: dataUser },
    fetchDataUser,
    setDataUser,
  ] = useFetch();
  const [showSnackbar, setShowSnackbar] = useState({
    status: false,
    message: "",
    severity: "success",
  });
  const handleCloseSnackbar = () => {
    setShowSnackbar({ status: false, message: "" });
  };
  const handleAddUser = async (body) => {
    const { data } = await fetchData(() => addUser(body));
    setDataUser({ ...dataUser, data: [data, ...dataUser.data] });
    setShowSnackbar({
      status: true,
      message: "User created User success",
      severity: "success",
    });
  };
  const handleDeleteUser = async (row) => {
    try {
      await deleteUser(row.id);
      setDataUser({
        ...dataUser,
        data: [...dataUser.data].filter((x) => x.id !== row.id),
      });
      setShowSnackbar({
        status: true,
        message: "User delete User success",
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

  const handleEditUser = async (body) => {
    try {
      const { data } = await updateUser(body.id, body);
      setShowSnackbar({
        status: true,
        message: "update User success",
        severity: "success",
      });
      setDataUser({
        ...dataUser,
        data: [data, ...[...dataUser.data].filter((x) => x.id !== data.id)],
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
    fetchDataUser(getAllUser);
  }, [fetchDataUser]);
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
              <FormAddUser
                handleAddUser={handleAddUser}
                error={error}
                loading={loading}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={8}>
          <Box>
            {errorUser && <Alert severity="error">{errorUser}</Alert>}
            {loadingUser && (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                minHeight={500}
              >
                <CircularProgress />
              </Box>
            )}

            {dataUser && (
              <DataGrid
                sx={{ width: "100%" }}
                rows={dataUser.data ?? []}
                columns={[
                  ...columns,
                  renderColumnAction({ handleDeleteUser, handleEditUser }),
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

export default User;
