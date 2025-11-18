import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b border-gray-300 dark:border-gray-700 py-4 cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {question}
        </h3>
        {isOpen ? (
          <FaChevronUp className="text-primary transition-transform" />
        ) : (
          <FaChevronDown className="text-gray-500 transition-transform" />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-line">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
