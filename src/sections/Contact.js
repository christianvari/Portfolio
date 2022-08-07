import React from "react";
import Heading from "../components/Heading";
import { IoIosPaperPlane } from "../components/Icons";
import Button from "../components/Button";
import { mail } from "fluent-mailto";

const Contact = () => {
  const mailto = mail
    .to("info@christianvari.dev")
    .subject("Enter your request subject here")
    .body("Enter your detailed request here")
    .build();

  return (
    <section id="contact">
      <Heading icon={IoIosPaperPlane} title="Contact" />

      <form className="lg:w-2/3 xl:w-1/2">
        <Button
          type="submit"
          className="mt-6"
          icon={IoIosPaperPlane}
          title="Send me an email"
          onClick={() => {
            window.open(mailto, "mail");
          }}
        />
      </form>
    </section>
  );
};

export default Contact;
