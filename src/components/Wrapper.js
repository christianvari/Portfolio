import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import ThemeContext from "../context/ThemeContext";
import Navigation from "./Navigation";
import SEO from "./SEO";
import * as styles from "./Wrapper.module.css";

const Wrapper = ({ children, location }) => {
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const WOW = require("wowjs");
      new WOW.WOW({ live: false, mobile: false }).init();
    }
  }, []);

  return (
    <div className={dark ? styles.dark : styles.light}>
      <SEO />
      <Navigation location={location} />

      <div className="mx-8 lg:mx-16 xl:mx-0">{children}</div>
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
