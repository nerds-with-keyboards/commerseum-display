import React from "react";
import Layout from "./src/layouts";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
