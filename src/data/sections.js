import {
  GoTools,
  IoIosDocument,
  IoIosPaperPlane,
  MdPerson,
  MdSchool,
  MdWork,
  FaDev,
} from "../components/Icons";

const sections = [
  { id: "about-me", title: "About Me", icon: MdPerson },
  { id: "work", title: "Work", icon: MdWork },
  { id: "education", title: "Education", icon: MdSchool },
  { id: "skills", title: "Skills", icon: GoTools },
  { id: "projects", title: "Projects", icon: FaDev },
  { id: "resume", title: "Resume", icon: IoIosDocument },
  { id: "contact", title: "Contact", icon: IoIosPaperPlane },
];

export default sections;
