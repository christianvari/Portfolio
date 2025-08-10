import React, { useContext } from "react";
import Heading from "../components/Heading";
import { IoIosPaperPlane } from "../components/Icons";
import { mail } from "fluent-mailto";
import * as styles from "./Contact.module.css";
import messanger from "../images/contacts/messanger.svg";
import ThemeContext from "../context/ThemeContext";

const Contact = () => {
  const { dark } = useContext(ThemeContext);
  const mailto = mail
    .to("info@codezen.tech")
    .subject("Enter your request subject here")
    .body("Enter your detailed request here")
    .build();

  return (
    <section id="contact">
      <Heading icon={IoIosPaperPlane} title="Contact" />

      <div className={styles.container}>
        <div
          className="wow fadeIn grid cursor-pointer"
          style={{
            animationDelay: `300ms`,
          }}
          onClick={() => {
            window.open(mailto, "mail");
          }}
        >
          <h6 className="mb-4 font-semibold text-center">Send me an email</h6>
          <img
            className={[
              "absolute w-full rounded-lg duration-200 h-64 relative flex-center shadow-lg hover:opacity-50",
              dark ? "bg-white" : "bg-black",
            ].join(" ")}
            src={messanger}
            alt="Send me an email"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
