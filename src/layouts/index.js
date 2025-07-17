import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

// import Navbar from '../components/Navbar'
import Clock from "../components/Clock";
import "./all.sass";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title='Commerseum' />
    <Clock />
    <div>{children}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.node,
};

export default TemplateWrapper;
