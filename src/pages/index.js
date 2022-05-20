import React from "react";
import * as styles from "./index.module.css";
import Footer from "../sections/Footer";
import Wrapper from "../components/Wrapper";
import AboutMe from "../sections/AboutMe";
import Contact from "../sections/Contact";
import Education from "../sections/Education";
import Hero from "../sections/Hero";
import Skills from "../sections/Skills";
import Work from "../sections/Work";
import Projects from "../sections/Projects";
import Achievements from "../sections/Achievements";

const IndexPage = () => {
  return (
    <Wrapper>
      <div className={`container ${styles.layout}`}>
        <Hero />
        <AboutMe />
        <div className={styles.workEducation}>
          <Work />
          <Education />
        </div>
        <Achievements />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </Wrapper>
  );
};

export default IndexPage;
