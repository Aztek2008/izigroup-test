import React from "react";

import s from "./Layout.module.css";

const Layout = ({ children }) => <div className={s.Layout}>{children}</div>;

export default Layout;
