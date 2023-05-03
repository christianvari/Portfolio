import { graphql, navigate, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import Heading from "../components/Heading";
import { FaDev } from "../components/Icons";
import * as styles from "./FeaturedProjects.module.css";
import ProjectCard from "../components/ProjectCard";
import { BsArrowRightCircle } from "react-icons/bs";
import ThemeContext from "../context/ThemeContext";

const FeaturedProjects = () => {
  const { dark } = useContext(ThemeContext);

  const data = useStaticQuery(graphql`
    {
      allProjectsJson(filter: { featured: { eq: true } }) {
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
      <Heading icon={FaDev} title="Featured Projects" />

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
        <div
          className={[
            styles.seeMoreContainer,
            dark ? styles.darkTheme : "",
            "wow fadeIn",
          ].join(" ")}
          style={{
            animationDelay: `300ms`,
          }}
          onClick={() => {
            navigate("/projects");
          }}
        >
          <BsArrowRightCircle className={styles.icon} />
          <p>See all projects</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
