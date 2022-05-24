import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import Heading from "../components/Heading";
import { MdLocationOn, MdWork } from "../components/Icons";
import ThemeContext from "../context/ThemeContext";
import Tooltip from "@material-ui/core/Tooltip";

const Work = () => {
  const { dark } = useContext(ThemeContext);
  const data = useStaticQuery(graphql`
    {
      allWorkJson {
        edges {
          node {
            id
            title
            subtitle
            period
            location
            specialization
            icon {
              childImageSharp {
                gatsbyImageData(
                  width: 64
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
    <section id="work">
      <Heading icon={MdWork} title="Work" />

      <div className="flex">
        <div className="w-1 bg-gray-500 rounded-full md:ml-6 opacity-25" />
        <div className="-ml-2">
          {data.allWorkJson.edges.map(({ node }, index) => {
            return (
              <div
                key={node.id}
                className="py-4 flex wow fadeInDown"
                style={{
                  animationDuration: `${index * 200 + 500}ms`,
                }}
              >
                <Tooltip title={`(${node.period})`} placement="left">
                  <div
                    className={`relative mt-3 w-3 h-3 rounded-full shadow-lg opacity-75 z-2 ${
                      dark ? "bg-white" : "bg-primary-500"
                    } duration-200`}
                  />
                </Tooltip>
                <div className="ml-8">
                  <GatsbyImage
                    className="w-8 h-8"
                    image={node.icon.childImageSharp.gatsbyImageData}
                  />
                  <div className="mt-3 flex items-baseline">
                    <h6 className="font-semibold">{node.title}</h6>
                    <h6 className="text-xs ml-2">({node.period})</h6>
                  </div>
                  <h6 className="text-sm">{node.subtitle}</h6>
                  <div className="mt-2 flex items-center">
                    <MdLocationOn size="0.75rem" />
                    <h6 className="font-semibold text-xs ml-2">
                      {node.location}
                    </h6>
                  </div>
                  <h6 className="text-xs mt-2">
                    <strong>Specialized in:</strong> {node.specialization}
                  </h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;
