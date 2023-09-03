import React, { Suspense } from "react";
import { createHashRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "../App";
import CenterLoader from "@/components/loaders/CenterLoader";
import { wait } from "@/lib/util";

// Lazy routes \\
const Home = React.lazy(wait(() => import("./Home")));
const Map = React.lazy(wait(() => import("./Map")));
const Inventory = React.lazy(wait(() => import("./Inventory")));
const Menu = React.lazy(wait(() => import("./Menu")));
const NotFound = React.lazy(wait(() => import("./NotFound")));
// Lazy routes \\

function Page(Component: React.LazyExoticComponent<React.ComponentType<any>>) {
  return (
    <Suspense fallback={<CenterLoader />}>
      <Component />
    </Suspense>
  )
}

export const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Navigate to "/home" on path "/" */}
      <Route index element={<Navigate to="/home" />} />

      <Route path="/home" element={Page(Home)} />
      <Route path="/map" element={Page(Map)} />
      <Route path="/inventory" element={Page(Inventory)} />
      <Route path="/menu" element={Page(Menu)} />

      {/* Error routes & catch all */}
      <Route path="/404" element={Page(NotFound)} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Route>
  )
)
