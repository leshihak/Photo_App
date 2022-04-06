import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardContainer from "./components/Dashboard/Dashboard.container";
import SavedPostsContainer from "./components/Posts/SavedPosts/SavedPostsContainer";
import VideoPostsContainer from "./components/Posts/VideoPosts/VideoPostsContainer";
import ProfileContainer from "./components/Profile/Profile.container";
import DashboardWrapper from "./components/ui/DashboardWrapper/DashboardWrapper";
import NoMatch from "./components/ui/NoMatch/NoMatch";

const App: FC = () => (
  <Routes>
    <Route element={<DashboardWrapper />}>
      <Route index element={<DashboardContainer />} />
      {/* // NEED TO FIX */}
      <Route path=":userId" element={<ProfileContainer />} />
      {/* // NEED TO FIX */}
      <Route path=":userId/videos" element={<VideoPostsContainer />} />
      {/* // NEED TO FIX */}
      <Route path=":userId/saved" element={<SavedPostsContainer />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  </Routes>
);

export default App;
