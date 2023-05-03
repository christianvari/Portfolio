import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Heading from "../components/Heading";
import { FaDev } from "../components/Icons";
import * as styles from "./Projects.module.css";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const data = useStaticQuery(graphql`
    {
      allProjectsJson {
        edges {
          node {
            id
            title
            description
            tags
            website
            github
            image {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  `);

  return (
    <section id="projects">
      <Heading icon={FaDev} title="Projects" />

      <div className={styles.container}>
        {data.allProjectsJson.edges.map(({ node }) => (
          <ProjectCard
            key={node.id}
            title={node.title}
            description={node.description}
            website={node.website}
            github={node.github}
            image={node.image}
            tags={node.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
