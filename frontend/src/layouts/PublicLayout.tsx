import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";

const PublicLayout = (props: any) => {
  const { isValidUser } = props;
  if (isValidUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="flex flex-col h-full dark:bg-dark">
      <Header isValidUser={isValidUser} />
      <Outlet />
    </div>
  );
};

export default PublicLayout;
