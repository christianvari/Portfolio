import { OutboundLink } from "gatsby-plugin-google-gtag";
import React from "react";
import social from "../data/social";
import { container } from "./Social.module.css";

const Social = () => {
  return (
    <div className={container}>
      {social.map((x, i) => {
        const Icon = x.icon;

        return (
          <OutboundLink
            key={i}
            href={x.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${x.class} animated fadeIn`}
            style={{ animationDelay: `${i * 0.05 + 0.05}s` }}
          >
            <Icon color="#FFF" size="0.9em" />
            <span className="sr-only">{x.title}</span>
          </OutboundLink>
        );
      })}
    </div>
  );
};

export default Social;
