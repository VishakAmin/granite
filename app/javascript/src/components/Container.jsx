import React from "react";

import PropTypes from "prop-types";
import NavBar from "./NavBar";

const Container = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">{children}</div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
