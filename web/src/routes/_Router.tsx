import React, { Suspense } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import CenterLoader from "@/components/loaders/CenterLoader";
import { wait } from "@/lib/util";

// Lazy routes \\
const Home = React.lazy(wait(() => import("./Home")));
const Map = React.lazy(wait(() => import("./Map")));
const Inventory = React.lazy(wait(() => import("./Inventory")));
const Menu = React.lazy(wait(() => import("./Menu")));

const Campaign = React.lazy(wait(() => import("./map/Campaign")));
const Tower = React.lazy(wait(() => import("./map/Tower")));
const Altar = React.lazy(wait(() => import("./map/Altar")));
const Blacksmith = React.lazy(wait(() => import("./map/Blacksmith")));
const Store = React.lazy(wait(() => import("./map/Store")));
const DailyMissions = React.lazy(wait(() => import("./map/DailyMissions")));
const Rebirth = React.lazy(wait(() => import("./map/Rebirth")));

const NotFound = React.lazy(wait(() => import("./NotFound")));
// Lazy routes \\

function Page(Component: React.LazyExoticComponent<React.ComponentType<any>>) {
  return (
    <Suspense fallback={<CenterLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Navigate to "/home" on path "/" */}
      <Route index element={<Navigate to="/home" />} />

      <Route path="/home" element={Page(Home)} />

      <Route path="/map" element={Page(Map)} />
      <Route path="/map/campaign" element={Page(Campaign)} />
      <Route path="/map/tower" element={Page(Tower)} />
      <Route path="/map/altar" element={Page(Altar)} />
      <Route path="/map/blacksmith" element={Page(Blacksmith)} />
      <Route path="/map/store" element={Page(Store)} />
      <Route path="/map/daily-missions" element={Page(DailyMissions)} />
      <Route path="/map/rebirth" element={Page(Rebirth)} />

      <Route path="/inventory" element={Page(Inventory)} />

      <Route path="/menu" element={Page(Menu)} />

      {/* Error routes & catch all */}
      <Route path="/404" element={Page(NotFound)} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
)
