import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Heading from "../components/Heading";
import { BiStats } from "../components/Icons";
import * as styles from "./Stats.module.css";

const Stats = () => {
  const data = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            id
          }
        }
      }
    }
  `);

  const auditedProjects = data.allProjectsJson.edges.lenght;

  return (
    <section id="stats">
      <Heading icon={BiStats} title="Statistics" />

      <div className={styles.columns}>
        <div>placeholder</div>
        <div>placeholder</div>
      </div>
    </section>
  );
};

export default Stats;
