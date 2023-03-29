import { graphql, useStaticQuery } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Heading from "../components/Heading";
import { FaAngleRight, FaAward } from "../components/Icons";
import { container } from "./Meta.module.css";

const Certifications = () => {
  const data = useStaticQuery(graphql`
    {
      allCertificationsJson {
        edges {
          node {
            id
            title
            subtitle
            url
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
    <section id="certifications">
      <Heading icon={FaAward} title="Certifications" />

      {data.allCertificationsJson.edges.map(({ node }, index) => (
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
            <div className="mt-1 pr-4">
              <FaAngleRight />
            </div>
            <GatsbyImage
              className="w-8 h-8 mr-4"
              image={node.icon.childImageSharp.gatsbyImageData}
            />
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

export default Certifications;
