import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Heading from "../components/Heading";
import { FaDev } from "../components/Icons";
import * as styles from "./FeaturedProjects.module.css";
import ProjectCard from "../components/ProjectCard";
import Stats from "./Stats";
import { Slider } from "infinite-react-carousel";
import { useMediaQuery } from "../utils";

const FeaturedProjects = () => {
  const data = useStaticQuery(graphql`
    {
      allAuditHistoryJson(filter: { featured: { eq: true } }) {
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

  const is768 = useMediaQuery("(min-width: 768px)");
  const is1024 = useMediaQuery("(min-width: 1440px)");

  const columns = is1024 ? 3 : is768 ? 2 : 1;
  const rows = 2;

  return (
    <section id="projects">
      <Heading icon={FaDev} title="Featured Projects" />

      <Stats />

      <Slider
        className={styles.slider}
        slidesToShow={columns}
        autoplay={true}
        arrows={false}
        pauseOnHover={true}
        autoplaySpeed={3000}
        rows={rows}
        overScan={columns * rows}
      >
        {data.allAuditHistoryJson.edges.map(({ node }) => (
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
      </Slider>
    </section>
  );
};

export default FeaturedProjects;
