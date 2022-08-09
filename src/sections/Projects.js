import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import React, { useContext } from "react";
import Heading from "../components/Heading";
import { FaDev, FaGithub, FaLink } from "../components/Icons";
import * as styles from "./Projects.module.css";
import ThemeContext from "../context/ThemeContext";

const Projects = () => {
  const { dark } = useContext(ThemeContext);
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
          <div
            key={node.id}
            className="wow fadeIn grid"
            style={{
              animationDelay: `300ms`,
            }}
          >
            <OutboundLink
              href={node.github || node.website}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                "w-full h-48 bg-black relative flex-center rounded-lg shadow-lg",
                node.website ? "cursor-pointer" : "",
              ].join(" ")}
            >
              {!!node.github ? (
                <FaGithub className="absolute" color="#FFF" size="5rem" />
              ) : !!node.website ? (
                <FaLink className="absolute" color="#FFF" size="5rem" />
              ) : null}

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

            <div className="flex gap-2 mt-2" style={{ alignSelf: "center" }}>
              {node.website && (
                <OutboundLink
                  href={node.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button
                    className={`${
                      dark
                        ? "bg-white text-black hover:bg-gray-300"
                        : "bg-black text-white hover:bg-gray-700"
                    } font-bold py-2 px-2 rounded-full inline-flex items-center w-full`}
                    style={{ justifyContent: "center" }}
                  >
                    <FaLink className="fill-current w-4 h-4 mr-2" />
                    <span>Go to Website</span>
                  </button>
                </OutboundLink>
              )}

              {node.github && (
                <OutboundLink
                  href={node.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button
                    className={`${
                      dark
                        ? "bg-white text-black hover:bg-gray-300"
                        : "bg-black text-white hover:bg-gray-700"
                    } font-bold py-2 px-2 rounded-full inline-flex items-center w-full`}
                    style={{ justifyContent: "center" }}
                  >
                    <FaGithub className="fill-current w-4 h-4 mr-2" />
                    <span>Go to Github</span>
                  </button>
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
