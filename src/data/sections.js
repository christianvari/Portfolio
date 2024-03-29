import {
  GoTools,
  IoIosPaperPlane,
  MdPerson,
  MdSchool,
  MdWork,
  FaDev,
  FaAward,
  FaCertificate,
} from "../components/Icons";

const sections = [
  { id: "about-me", title: "About Me", icon: MdPerson },
  { id: "work", title: "Work", icon: MdWork },
  { id: "education", title: "Education", icon: MdSchool },
  { id: "achievements", title: "Achievements", icon: FaAward },
  { id: "certifications", title: "Certifications", icon: FaCertificate },
  { id: "skills", title: "Skills", icon: GoTools },
  { id: "projects", title: "Projects", icon: FaDev },
  { id: "contact", title: "Contact", icon: IoIosPaperPlane },
];

export default sections;
