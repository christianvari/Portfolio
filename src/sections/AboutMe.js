import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import Heading from "../components/Heading";
import { MdPerson } from "../components/Icons";

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    {
      photo: file(relativePath: { eq: "logo_2.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
      markdownRemark(frontmatter: { id: { eq: "about-me" } }) {
        html
      }
    }
  `);

  return (
    <section id="about-me">
      <Heading icon={MdPerson} title="About Me" />

      <div className="grid lg:grid-cols-6 gap-12 items-center">
        <div className="hidden md:block lg:col-span-2 w-1/3 lg:w-3/4 mx-auto wow fadeInLeft">
          <GatsbyImage image={data.photo.childImageSharp.gatsbyImageData} />
        </div>
        <div
          className="text-justify lg:col-span-4 wow fadeIn"
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html.replace(
              "{AGE}",
              new Date().getUTCFullYear() - 1997,
            ),
          }}
        />
      </div>
    </section>
  );
};

export default AboutMe;
