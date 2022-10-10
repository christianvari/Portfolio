import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Heading from "../components/Heading";
import { GoTools } from "../components/Icons";
import * as styles from "./Skills.module.css";

const Skills = () => {
  const data = useStaticQuery(graphql`
    {
      allSkillsJson {
        edges {
          node {
            id
            name
            tech
            icon {
              childImageSharp {
                gatsbyImageData(
                  width: 30
                  placeholder: BLURRED
                  layout: CONSTRAINED
                )
              }
            }
          }
        }
      }
    }
  `);
  return (
    <section id="skills">
      <Heading icon={GoTools} title="Skills" />

      <div className={styles.container}>
        {data.allSkillsJson.edges.map(({ node }) => (
          <div
            key={node.id}
            className={`${styles.skill} wow fadeIn`}
            style={{
              animationDelay: `300ms`,
            }}
          >
            <GatsbyImage
              className={styles.image}
              image={node.icon.childImageSharp.gatsbyImageData}
            />
            <div>
              <h6 className="text-xs font-semibold leading-none">
                {node.name}
              </h6>
              {node.tech && (
                <h6
                  className="mt-2 leading-none"
                  style={{ fontSize: "0.65rem" }}
                >
                  {node.tech}
                </h6>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
