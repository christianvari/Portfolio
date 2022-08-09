import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import React from "react";
import Heading from "../components/Heading";
import { FaDev, FaGithub, FaLink } from "../components/Icons";
import * as styles from "./Projects.module.css";

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
          <div
            key={node.id}
            className="wow fadeIn"
            style={{
              animationDelay: `300ms`,
            }}
          >
            <OutboundLink
              href={node.website || node.github}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "w-full h-48 bg-black relative flex-center rounded-lg shadow-lg",
                node.website ? "cursor-pointer" : "",
              ].join(" ")}
            >
              {!!node.website && (
                <FaLink className="absolute" color="#FFF" size="5rem" />
              )}
              <GatsbyImage
                className={[
                  "absolute w-full h-full object-cover rounded-lg duration-200",
                  node.website ? "hover:opacity-50" : "",
                ].join(" ")}
                image={node.image.childImageSharp.gatsbyImageData}
              />
              <span className="sr-only">{node.title}</span>
            </OutboundLink>
            <h5 className="mt-4 font-semibold">{node.title}</h5>
            <p className="mt-2 pb-5 text-sm text-justify">{node.description}</p>

            <p className="pb-2 flex text-xs font-semibold">
              {node.tags.reduce((p, c) => (p ? `${p}\t#${c}` : `#${c}`), "")}
            </p>

            <div className="flex mt-2">
              {node.website && (
                <OutboundLink
                  href={node.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 mr-2 "
                >
                  <FaLink />
                  <span className="sr-only">Go to Website</span>
                </OutboundLink>
              )}

              {node.github && (
                <OutboundLink
                  href={node.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 mr-2"
                >
                  <FaGithub />
                  <span className="sr-only">Go to GitHub Repo</span>
                </OutboundLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
