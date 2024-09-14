import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { container, icon, dot, text, darkTheme } from "./ScrollDown.module.css";
import { scroller } from "react-scroll";

const ScrollDown = () => {
  const { dark } = useContext(ThemeContext);

  const handleClick = () => {
    scroller.scrollTo("about-me", {
      delay: 50,
      offset: -50,
      duration: 600,
      smooth: "easeInOutCubic",
    });
  };

  return (
    <div
      className={`${container} animated fadeIn ${dark ? darkTheme : ""}`}
      style={{ animationDelay: "0.5s" }}
      onClick={handleClick}
      role="button"
    >
      <div className={icon}>
        <div className={dot}></div>
      </div>
      <div className={text}>Scroll Down</div>
    </div>
  );
};

export default ScrollDown;
