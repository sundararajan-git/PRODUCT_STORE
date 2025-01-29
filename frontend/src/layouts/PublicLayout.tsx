import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = (props: any) => {
  // props
  const { isValidUser } = props;

  // redirect the the home page
  if (isValidUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col h-full dark:bg-dark">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
