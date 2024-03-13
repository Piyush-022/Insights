import axios from "axios";
import { UserContextProvider } from "./UserContext";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Auth } from "./components/Auth";
import { ExperienceAdd } from "./components/ExperienceAdd";
import ExperienceRead from "./components/ExperienceRead";
import Community from "./components/Community";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";
import Reviews from "./components/Reviews";
import { PlacementReviewContextProvider } from "./PlacementReviewContext";
import { PostContextProvider } from "./PostContext";
function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL + "/api";
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <PostContextProvider>
              <Community />
            </PostContextProvider>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/placement-reviews"
          element={
            <PlacementReviewContextProvider>
              <Reviews />
            </PlacementReviewContextProvider>
          }
        />
        <Route
          path="/placement-review/add"
          element={
            <PlacementReviewContextProvider>
              <ExperienceAdd />
            </PlacementReviewContextProvider>
          }
        />
        <Route
          path="/placement-review/read/:id"
          element={
            <PlacementReviewContextProvider>
              <ExperienceRead />
            </PlacementReviewContextProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
