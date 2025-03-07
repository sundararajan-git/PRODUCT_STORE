import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = (props: any) => {
  const { isValidUser } = props;
  if (!isValidUser) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="flex flex-col h-full dark:bg-dark ">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
