import React, { useContext } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import ThemeContext from "../context/ThemeContext";
import { icon, container, darkTheme } from "./ScrollDown.module.css";
import { scroller } from "react-scroll";

const ScrollDown = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={[container, "animated", "fadeIn", dark ? darkTheme : ""].join(
        " ",
      )}
      style={{ animationDelay: "0.5s" }}
    >
      <BsArrowDownCircle
        className={icon}
        onClick={() =>
          scroller.scrollTo("about-me", {
            delay: 50,
            offset: -50,
            duration: 600,
            smooth: "easeInOutCubic",
          })
        }
      />
    </div>
  );
};

export default ScrollDown;
