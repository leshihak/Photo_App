import { getApp, getApps } from "firebase/app";
import { FC, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { app } from "./config/firebase";
import useAuth from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "components/Auth/Auth";
import DashboardContainer from "components/Dashboard/Dashboard.container";
import ProfileContainer from "components/Profile/Profile.container";
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute";
import DashboardWrapper from "components/ui/DashboardWrapper/DashboardWrapper";
import NoMatch from "components/ui/NoMatch/NoMatch";
import Settings from "components/Settings/Settings";
import ModalRoot from "components/ModalRoot/ModalRoot";
import { ModalRootContext } from "components/ModalRoot/ModalRootContext";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
getApps().length === 0 ? app : getApp();

const App: FC = () => {
  const { user, isLoading } = useAuth();

  const [modalType, setModalType] = useState<number | null>(null);

  const contextValue = {
    modalType,
    setModalType,
  };

  return (
    <ModalRootContext.Provider value={contextValue}>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route element={<DashboardWrapper />}>
          <Route
            index
            element={
              <ProtectedRoute user={user} isLoading={isLoading}>
                <DashboardContainer />
              </ProtectedRoute>
            }
          />
          <Route>
            <Route path="user/:id" element={<ProfileContainer />} />
            <Route path="accounts/:setting" element={<Settings />} />
            <Route path="user/:id/:page" element={<ProfileContainer />} />
            <Route path="user/:id/:page/:id" element={<ProfileContainer />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <ModalRoot />
      <ToastContainer />
    </ModalRootContext.Provider>
  );
};

export default App;
