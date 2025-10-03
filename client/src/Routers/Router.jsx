import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import CitizenScientist from "../Pages/Dashboard/CitizenScientist/CitizenScientist";
import DashBoardContent from "../Pages/Dashboard/DashBoardContent/DashBoardContent";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

    ],
  },
  {
    path: "/dashboard",
    element:<PrivateRouter><DashboardLayout /></PrivateRouter>,
    children: [
      {
        path: "/dashboard",
        element: <DashBoardContent />,
      },
      {
        path: "/dashboard/citizen-scientist",
        element: <CitizenScientist />,
        // element: <PrivateRouter><CitizenScientist /></PrivateRouter>,
      }
    ]
  }
]);
export default router;
