import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { icon, container, darkTheme } from "./ScrollDown.module.css";

const ScrollDown = () => {
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className={[container, "animated", "fadeIn", dark ? darkTheme : ""].join(
        " ",
      )}
      style={{ animationDelay: "2s" }}
    >
      <div className={icon} />
      <code>Scroll down</code>
    </div>
  );
};

export default ScrollDown;
