import React from "react";
import PropTypes from "prop-types";
import Typist from "react-typist";

const Subtitle = ({ onDone }) => (
  <Typist
    startDelay={250}
    avgTypingDelay={15}
    cursor={{ show: false }}
    className="my-2 flex"
    onTypingDone={onDone}
  >
    <code className="w-full text-sm leading-loose">
      <div>
        <span className="text-blue-600">
          <h1>ChristianVari.ts</h1>
        </span>
      </div>
      <br />
      <div>
        <span className="text-blue-600">const</span>{" "}
        <span className="text-orange-400">christianVari</span>{" "}
        <span className="text-blue-600">=</span> [
      </div>
      <div className="lg:pl-8">
        <span className="text-red-500">softwareEngineer</span>,{" "}
        <span className="text-red-500">blockchainAuditor</span>,{" "}
        <span className="text-red-500">researcher</span>,{" "}
      </div>
      <div className="lg:pl-8">
        <span className="text-red-500">sugar</span>,{" "}
        <span className="text-red-500">spice</span>, ...
        <span className="text-red-500">everythingNice</span>,
      </div>
      <div>];</div>
    </code>
  </Typist>
);

Subtitle.propTypes = {
  onDone: PropTypes.func.isRequired,
};

export default Subtitle;
