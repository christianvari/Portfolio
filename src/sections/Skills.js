import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Heading from "../components/Heading";
import { GoTools } from "../components/Icons";
import * as styles from "./Skills.module.css";
import Slider from "infinite-react-carousel";
import { useMediaQuery } from "../utils";

const Skills = () => {
  const data = useStaticQuery(graphql`
    {
      allSkillsJson {
        edges {
          node {
            id
            name
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

  const columns = useMediaQuery("(min-width: 768px)") ? 5 : 2;

  return (
    <section id="skills">
      <Heading icon={GoTools} title="Skills" />
      <Slider
        className={styles.slider}
        slidesToShow={columns}
        autoplay={true}
        arrows={false}
        adaptiveHeight={true}
        pauseOnHover={false}
        autoplaySpeed={2000}
      >
        {data.allSkillsJson.edges
          .slice(0, data.allSkillsJson.edges.length / 2)
          .map(({ node }) => (
            <div key={node.id}>
              <div className={styles.skill}>
                <GatsbyImage
                  className={styles.image}
                  image={node.icon.childImageSharp.gatsbyImageData}
                />
                <div>
                  <h6 className="text-xs font-semibold leading-none">
                    {node.name}
                  </h6>
                </div>
              </div>
            </div>
          ))}
      </Slider>
      <Slider
        className={styles.slider}
        slidesToShow={columns}
        autoplay={true}
        arrows={false}
        autoplayScroll={-1}
        adaptiveHeight={true}
        pauseOnHover={false}
        autoplaySpeed={2000}
      >
        {data.allSkillsJson.edges
          .slice(data.allSkillsJson.edges.length / 2)
          .map(({ node }) => (
            <div key={node.id}>
              <div className={`${styles.skill}`}>
                <GatsbyImage
                  className={styles.image}
                  image={node.icon.childImageSharp.gatsbyImageData}
                />
                <div>
                  <h6 className="text-xs font-semibold leading-none">
                    {node.name}
                  </h6>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </section>
  );
};

export default Skills;
