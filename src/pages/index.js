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
import Achievements from "../sections/Achievements";
import "./global.css";
import Certifications from "../sections/Certifications";
import FeaturedProjects from "../sections/FeaturedProjects";

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
        <Skills />
        <FeaturedProjects />
        <div className={styles.workEducation}>
          <Achievements />
          <Certifications />
        </div>
        <Contact />
        <Footer />
      </div>
    </Wrapper>
  );
};

export default IndexPage;
