import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//pages
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NutraLog from "./pages/NutraLog";
import Calculate from "./pages/goals/Calculate";
import Track from "./pages/goals/Track";
//layouts
import RootLayout from "./layouts/RootLayout";
import GoalsLayout from "./layouts/GoalsLayout";
import StrideLog from "./pages/StrideLog";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="nutralog" element={<NutraLog />} />
      <Route path="stridelog" element={<StrideLog />} />
      <Route path="goals" element={<GoalsLayout />}>
        <Route path="calculate" element={<Calculate />} />
        <Route path="track" element={<Track />} />
      </Route>

      <Route path="*" element={<NotFound />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
