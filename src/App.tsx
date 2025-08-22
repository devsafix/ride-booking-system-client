import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import CommonLayout from "./components/layout/CommonLayout";
import useAuthCheck from "./hooks/useAuthCheck";
import Loader from "./assets/icons/loader/Loader";

function App() {
  const authChecked = useAuthCheck();

  if (!authChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <CommonLayout>
      <Toaster position="top-center" />
      <Outlet />
    </CommonLayout>
  );
}

export default App;
