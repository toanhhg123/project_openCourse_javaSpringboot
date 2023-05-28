import { Container } from "@mui/system";
import PropTypes from "prop-types";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth={"lg"} sx={{ mt: 2 }}>
        {children}
      </Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
