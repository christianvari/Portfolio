import { graphql, useStaticQuery } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import React from "react";
import Heading from "../components/Heading";
import { FaAngleRight, FaAward } from "../components/Icons";
import { container } from "./Meta.module.css";

const Achievements = () => {
  const data = useStaticQuery(graphql`
    {
      allAchievementsJson {
        edges {
          node {
            id
            title
            subtitle
            url
          }
        }
      }
    }
  `);

  return (
    <section id="achievements">
      <Heading icon={FaAward} title="Achievements" />

      {data.allAchievementsJson.edges.map(({ node }, index) => (
        <OutboundLink
          key={node.id}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className={node.url ? "cursor-pointer" : ""}
        >
          <div
            className={`${container} wow fadeInDown`}
            style={{
              animationDuration: `${index * 200 + 500}ms`,
            }}
          >
            <div className="mt-1 pr-6">
              <FaAngleRight />
            </div>
            <div>
              <h6 className="font-semibold">{node.title}</h6>
              <p className="text-sm">{node.subtitle}</p>
            </div>
          </div>
        </OutboundLink>
      ))}
    </section>
  );
};

export default Achievements;
