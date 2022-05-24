/* eslint jsx-a11y/click-events-have-key-events: 0 */
/* eslint jsx-a11y/click-events-have-key-events : 0 */

import Tooltip from "@material-ui/core/Tooltip";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useContext, useEffect, useState } from "react";
import { animateScroll as scroll, scroller } from "react-scroll";
import ThemeContext from "../context/ThemeContext";
import sections from "../data/sections";
import { IoIosMoon, IoIosSunny, MdMenu } from "./Icons";
import { container, menu, sectionLinks } from "./Navigation.module.css";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { dark, toggleDark } = useContext(ThemeContext);
  const data = useStaticQuery(graphql`
    {
      icon: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          gatsbyImageData(width: 48, height: 28, layout: FIXED)
        }
      }
    }
  `);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const { isMobile } = require("../utils");
      setIsMobile(isMobile);
    }
  }, []);

  const scrollToTop = () =>
    scroll.scrollToTop({
      delay: 50,
      duration: 600,
      smooth: "easeInOutCubic",
    });

  const scrollTo = id =>
    scroller.scrollTo(id, {
      delay: 50,
      offset: -50,
      duration: 600,
      smooth: "easeInOutCubic",
    });

  const SectionLink = x => {
    const Icon = x.icon;

    return (
      <Tooltip key={x.id} title={x.title} placement="right" arrow>
        <div onClick={() => scrollTo(x.id)}>
          <Icon />
        </div>
      </Tooltip>
    );
  };

  return (
    <div
      className={`${container} animated ${
        isMobile ? "fadeInDown" : "fadeInLeft"
      }`}
    >
      <Tooltip title="Go to Top" placement="right" arrow>
        <div className="flex-center cursor-pointer" onClick={scrollToTop}>
          <GatsbyImage image={data.icon.childImageSharp.gatsbyImageData} />
        </div>
      </Tooltip>

      <div className="hidden md:flex flex-col justify-center items-center">
        <div className={menu}>
          <MdMenu />
        </div>
        <div className={sectionLinks}>{sections.map(SectionLink)}</div>
      </div>

      <Tooltip title="Toggle Dark Mode" placement="right" arrow>
        <div
          className="flex-center cursor-pointer hover:text-primary-500"
          onClick={toggleDark}
        >
          {dark ? <IoIosMoon /> : <IoIosSunny />}
        </div>
      </Tooltip>
    </div>
  );
};

export default Navigation;
