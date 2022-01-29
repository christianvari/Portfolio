import React from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { IoIosDocument } from "../components/Icons";

const Resume = () => {
  return (
    <section id="resume">
      <Heading icon={IoIosDocument} title="Resume" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8 items-center">
        <div className="col-span-1 md:col-span-3">
          <h5 className="text-lg lg:text-xl font-semibold">
            To those HRs out there who need a more organized and minimal version
            of my information, you can download the trusted PDF version here:
          </h5>

          <Button
            className="mt-8"
            icon={IoIosDocument}
            title="Download Resume"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1b7NJlAT-3hMMY0cYI6piUITZTL-QS3Kv/view?usp=sharing",
                "_blank",
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Resume;
