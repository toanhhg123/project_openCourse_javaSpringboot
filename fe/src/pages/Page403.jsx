import { Alert, AlertTitle } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Layout from "../components/Layout";

const Page403 = () => {
  return (
    <Layout>
      <Grid2 container spacing={2}>
        <Alert severity="warning" sx={{ width: "100%" }}>
          <AlertTitle>Warning</AlertTitle>
          Iam sorry you can not go to page — <strong>check it out!</strong>
        </Alert>
      </Grid2>
    </Layout>
  );
};

export default Page403;
