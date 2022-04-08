import { getApp, getApps } from "firebase/app";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import DashboardContainer from "./components/Dashboard/Dashboard.container";
import ProfileContainer from "./components/Profile/Profile.container";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DashboardWrapper from "./components/ui/DashboardWrapper/DashboardWrapper";
import NoMatch from "./components/ui/NoMatch/NoMatch";
import { app } from "./config/firebase";
import useAuth from "./hooks/useAuth";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
getApps().length === 0 ? app : getApp();

const App: FC = () => {
  const { user, isLoading } = useAuth();

  return (
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
          <Route path="user/:id/:page" element={<ProfileContainer />} />
          <Route path="user/:id/:page/:id" element={<ProfileContainer />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
