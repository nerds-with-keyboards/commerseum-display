import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Clock from "../components/Clock";

// import Navbar from '../components/Navbar'
import "./all.sass";

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Commerseum" />
    <div>
      <Clock />
    </div>
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
