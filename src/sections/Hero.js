import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
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
    <section id="hero" className="min-h-screen flex items-center container">
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 row-gap-8 lg:gap-16 justify-center lg:justify-start items-center mt-8 md:mt-12 lg:mt-0">
        <div className="col-span-2">
          <div className="max-w-lg mx-auto" data-depth="0.4">
            <GatsbyImage image={data.photo.childImageSharp.gatsbyImageData} />
          </div>
        </div>
        <div className="col-span-3">
          <h1 className="sr-only">
            Christian Vari&apos;s Portfolio Resume on the Web <br />
            Software Engineer, Blockchain Auditor, Blockchain Consultant,
            Developer from Segni, Italy
          </h1>

          <div className="text-center lg:text-left flex flex-col items-center lg:ml-4 lg:items-start">
            <Subtitle onDone={() => setShowSocial(true)} />

            <div className="w-full md:w-auto h-20 my-20">
              {showSocial && <Social />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
