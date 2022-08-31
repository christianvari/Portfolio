import React, { useState } from "react";
import Heading from "../components/Heading";
import { IoIosPaperPlane } from "../components/Icons";
import { mail } from "fluent-mailto";
import * as styles from "./Contact.module.css";
import messanger from "../images/contacts/messanger.svg";
import call from "../images/contacts/call.svg";
import { PopupModal } from "react-calendly";

const Contact = () => {
  const [isOpen, setIsOpen] = useState();
  const mailto = mail
    .to("info@christianvari.dev")
    .subject("Enter your request subject here")
    .body("Enter your detailed request here")
    .build();

  return (
    <section id="contact">
      <Heading icon={IoIosPaperPlane} title="Contact" />

      <div className={styles.container}>
        <div
          className="wow fadeIn grid"
          style={{
            animationDelay: `300ms`,
          }}
          onClick={() => {
            window.open(mailto, "mail");
          }}
        >
          <h5 className="mb-4 font-semibold text-center">Send me an email</h5>
          <img
            className="absolute w-full rounded-lg duration-200 h-64 relative flex-center shadow-lg cursor-pointer hover:opacity-50"
            src={messanger}
            alt="Send me an email"
          />
        </div>
        <div
          className="wow fadeIn grid"
          style={{
            animationDelay: `300ms`,
          }}
          onClick={() => setIsOpen(true)}
        >
          <h5 className="mb-4 font-semibold text-center">Schedule a call</h5>
          <img
            className="absolute w-full rounded-lg duration-200 h-64 relative flex-center shadow-lg cursor-pointer hover:opacity-50"
            src={call}
            alt="Schedule a call"
          />
        </div>
      </div>
      <PopupModal
        url="https://calendly.com/vari-christian/one-to-one"
        // pageSettings={object("pageSettings", pageSettings)}
        // utm={object("utm", utm)}
        // prefill={object("prefill", prefill)}
        iframeTitle="Calendly Scheduling Page"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.getElementById("___gatsby")}
      />
    </section>
  );
};

export default Contact;
