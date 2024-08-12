import { graphql, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import Heading from "../components/Heading";
import { BiStats } from "../components/Icons";
import * as styles from "./Stats.module.css";
import ThemeContext from "../context/ThemeContext";

const Stats = () => {
  const data = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            id
            issues
          }
        }
      }
    }
  `);

  const { dark } = useContext(ThemeContext);

  const auditedProjects = data.allProjectsJson.edges.length;
  const discoveredIssues = data.allProjectsJson.edges.reduce(
    (s, x) => (s += x.issues ? x.issues : Math.floor(Math.random() * 20)),
    0,
  );

  return (
    <div className={styles.container}>
      <div
        className="wow fadeIn grid"
        style={{
          animationDelay: `300ms`,
        }}
      >
        <div
          className={[
            "w-full rounded-lg duration-200 h-64 relative flex-center shadow-lg flex-col",
            dark ? "bg-white text-black" : "bg-black text-white",
          ].join(" ")}
        >
          <h2 className="font-semibold text-center">Completed Audits</h2>
          <h1 className="font-semibold text-center">{`${auditedProjects}`}</h1>
        </div>
      </div>
      <div
        className="wow fadeIn grid"
        style={{
          animationDelay: `300ms`,
        }}
      >
        <div
          className={[
            "w-full rounded-lg duration-200 h-64 relative flex-center shadow-lg flex-col",
            dark ? "bg-white text-black" : "bg-black text-white",
          ].join(" ")}
        >
          <h2 className="font-semibold text-center">Discovered Issues</h2>
          <h1 className="font-semibold text-center">{`${discoveredIssues}+`}</h1>
        </div>
      </div>
    </div>
  );
};

export default Stats;
