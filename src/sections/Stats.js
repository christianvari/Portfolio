import { graphql, navigate, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import * as styles from "./Stats.module.css";
import ThemeContext from "../context/ThemeContext";
import { BsArrowRightCircle } from "react-icons/bs";

const Stats = () => {
  const data = useStaticQuery(graphql`
    {
      allAuditHistoryJson {
        edges {
          node {
            id
            issues {
              critical
              major
              minor
              informational
            }
          }
        }
      }
    }
  `);

  const { dark } = useContext(ThemeContext);

  const auditedProjects = data.allAuditHistoryJson.edges.length;
  const discoveredIssues = data.allAuditHistoryJson.edges.reduce((p, n) => {
    if (!n.node.issues) return p;
    return (
      p +
      n.node.issues.critical +
      n.node.issues.major +
      n.node.issues.minor +
      n.node.issues.informational
    );
  }, 0);

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
          <h1 className="font-semibold text-center">{`${discoveredIssues}`}</h1>
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
            "w-full rounded-lg duration-200 h-64 relative flex-center shadow-lg flex-col cursor-pointer",
            dark ? "bg-white text-black" : "bg-black text-white",
            styles.seeMoreContainer,
          ].join(" ")}
          onClick={() => {
            navigate("/projects");
          }}
        >
          <BsArrowRightCircle className={styles.icon} />
          <p className="font-semibold text-center">See all projects</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
