import { Outlet } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from '../ErrorHandler';

const Layout = ({ title }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <h3>{title}</h3>
      <Outlet />
    </ErrorBoundary>
  )
};

export default Layout;
