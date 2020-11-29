import React from "react";
import PropTypes from "prop-types";

import s from "./Layout.module.css";

const Layout = ({ children }) => <div className={s.Layout}>{children}</div>;

export default Layout;

Layout.propTypes = {
  children: PropTypes.any,
};
