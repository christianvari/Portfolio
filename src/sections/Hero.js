import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import ScrollDown from "../components/ScrollDown";
import Social from "../components/Social";
import Subtitle from "../components/Subtitle";

const Hero = () => {
  const [showSocial, setShowSocial] = useState(false);
  const data = useStaticQuery(graphql`
    {
      photo: file(relativePath: { eq: "photo.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, layout: CONSTRAINED)
        }
      }
    }
  `);

  return (
    <section id="hero" className="h-screen flex items-center container">
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 lg:gap-16 justify-center lg:justify-start items-center">
        <div className="col-span-2">
          <div className="max-w-lg mx-auto max-h-[70vh]" data-depth="0.4">
            <GatsbyImage
              image={data.photo.childImageSharp.gatsbyImageData}
              className="max-h-[70vh]"
            />
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="sr-only">
            Christian Vari&apos;s Portfolio Resume on the Web <br />
            Software Engineer, Blockchain Auditor, Blockchain Consultant,
            Codezen Founder, Owner and Lead Engineer
          </h1>

          <div className="text-center lg:text-left flex flex-col items-center lg:ml-4 lg:items-start">
            <Subtitle onDone={() => setShowSocial(true)} />

            <div className="w-full md:w-auto my-2">
              {showSocial && <Social />}
              {showSocial && <ScrollDown />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
