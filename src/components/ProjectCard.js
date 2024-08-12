import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { FaGithub, FaLink } from "react-icons/fa";
import { GatsbyImage } from "gatsby-plugin-image";

const ProjectCard = ({ github, website, image, title, description, tags }) => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className="wow fadeIn grid ProjectCard"
      style={{
        animationDelay: `300ms`,
        minHeight: "25rem",
        padding: "0.5rem",
      }}
    >
      <OutboundLink
        href={github || website}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "w-full h-48 bg-black relative flex-center rounded-lg shadow-lg",
          website ? "cursor-pointer" : "",
        ].join(" ")}
      >
        {!!github ? (
          <FaGithub className="absolute" color="#FFF" size="5rem" />
        ) : !!website ? (
          <FaLink className="absolute" color="#FFF" size="5rem" />
        ) : null}

        <GatsbyImage
          className={[
            "absolute w-full h-full object-cover rounded-lg duration-200",
            website ? "hover:opacity-50" : "",
          ].join(" ")}
          image={image.childImageSharp.gatsbyImageData}
        />
        <span className="sr-only">{title}</span>
      </OutboundLink>
      <h5 className="mt-4 font-semibold">{title}</h5>
      <p className="mt-2 pb-5 text-sm text-justify">{description}</p>

      <p className="pb-2 flex text-xs font-semibold">
        {tags.reduce((p, c) => (p ? `${p}\t#${c}` : `#${c}`), "")}
      </p>

      <div className="flex gap-2 mt-2" style={{ alignSelf: "center" }}>
        {website && (
          <OutboundLink
            href={website}
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

        {github && (
          <OutboundLink
            href={github}
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
  );
};

export default ProjectCard;
