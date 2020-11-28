import React, { Suspense } from "react";

import Loader from "./Loader/Loader";
import Layout from "./Layout/Layout";
import HomePage from "../pages/HomePage";

const App = () => (
  <Layout>
    <Suspense fallback={<Loader />}>
      <HomePage />
    </Suspense>
  </Layout>
);

export default App;
