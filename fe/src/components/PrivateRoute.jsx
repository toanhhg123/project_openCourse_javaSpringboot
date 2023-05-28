import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import useAuthGlobal from "../hooks/useAuthGlobal";

const PrivateRoute = ({ roles }) => {
  const { userDetails } = useAuthGlobal();

  const isAuthen = [...roles].some((r) => r === userDetails?.role);
  return isAuthen ? <Outlet /> : <Navigate to={"/403"} />;
};

PrivateRoute.propTypes = {
  roles: PropTypes.array.isRequired,
};

export default PrivateRoute;
