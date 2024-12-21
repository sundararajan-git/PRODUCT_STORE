import { Navigate, Outlet } from "react-router-dom";

const PublicLayout = (props: any) => {
  // PROPS
  const { isValidUser } = props;

  // REDIRECT THE THE HOME PAGE
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
