import React from "react";
import * as styles from "./projects.module.css";
import Wrapper from "../components/Wrapper";
import Projects from "../sections/Projects";
import "./global.css";

const ProjectPage = ({ location }) => {
  return (
    <Wrapper location={location}>
      <div className={`container ${styles.layout}`}>
        <Projects />
      </div>
    </Wrapper>
  );
};

export default ProjectPage;
