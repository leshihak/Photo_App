import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardContainer from "./components/Dashboard/Dashboard.container";
import ProfileContainer from "./components/Profile/Profile.container";
import DashboardWrapper from "./components/ui/DashboardWrapper/DashboardWrapper";

const App: FC = () => (
  <Routes>
    <Route path="/" element={<DashboardWrapper />}>
      <Route index element={<DashboardContainer />} />
      <Route path=":userId" element={<ProfileContainer />} />
    </Route>
  </Routes>
);

export default App;
