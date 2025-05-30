import { mail } from "fluent-mailto";
import {
  FaGithubAlt,
  FaLinkedinIn,
  FaTwitter,
  FaMailBulk,
} from "../components/Icons";

const social = [
  {
    title: "Twitter",
    icon: FaTwitter,
    link: "https://twitter.com/christianvari_",
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
    title: "Mail",
    icon: FaMailBulk,
    link: mail
      .to("info@codezen.tech")
      .subject("Enter your request subject here")
      .body("Enter your detailed request here")
      .build(),
    class: "bg-google",
  },
];

export default social;
