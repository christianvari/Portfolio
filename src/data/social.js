import { mail } from "fluent-mailto";
import {
  FaGithubAlt,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMailBulk,
} from "../components/Icons";

const social = [
  {
    title: "Twitter",
    icon: FaTwitter,
    link: "https://twitter.com/decentra_chris",
    class: "bg-twitter",
  },
  {
    title: "LinkedIn",
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/in/christianvari/",
    class: "bg-linkedin",
  },
  {
    title: "GitHub",
    icon: FaGithubAlt,
    link: "https://github.com/christianvari",
    class: "bg-github",
  },
  {
    title: "Instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/decentralized_christian/",
    class: "bg-instagram",
  },
  {
    title: "Mail",
    icon: FaMailBulk,
    link: mail
      .to("info@christianvari.dev")
      .subject("Enter your request subject here")
      .body("Enter your detailed request here")
      .build(),
    class: "bg-google",
  },
];

export default social;
