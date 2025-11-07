"use client";

import { useRef, useState } from "react";

// FAQ data for Explore Bangladesh
const faqList = [
  {
    question: "What is Explore Bangladesh?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Explore Bangladesh is a travel guide platform where you can discover
        beautiful destinations like Sylhet, Cox’s Bazar, Sundarbans, and more.
        We provide trip ideas, cost estimates, and travel assistance.
      </div>
    ),
  },
  {
    question: "How can I plan a trip with Explore Bangladesh?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Simply browse the tourist spots, check details like transport cost,
        hotels, and activities. Based on your budget, our AI assistant can
        suggest customized itineraries.
      </div>
    ),
  },
  {
    question: "Do you provide budget-friendly options?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Yes! We categorize trips into <b>low</b>, <b>medium</b>, and{" "}
        <b>luxury</b> budgets. You’ll find affordable transport, hotels, and
        food options for every budget level.
      </div>
    ),
  },
  {
    question: "Can I get help while traveling?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Absolutely. Our platform offers travel tips, emergency contacts, and
        suggestions on safe routes. You can also share your trip experience with
        other travelers.
      </div>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="border-b border-gray-200">
      <button
        className="relative flex gap-3 items-center w-full py-5 text-base font-semibold text-left md:text-lg text-gray-800 hover:text-blue-600 transition"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className={`flex-1 ${isOpen ? "text-blue-600" : ""}`}>
          {item?.question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 text-gray-600 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white" id="faq">
      <div className="py-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Side Heading */}
        <div className="flex flex-col justify-center basis-1/2">
          <p className="inline-block font-semibold text-blue-600 mb-3 uppercase tracking-wide">
            FAQ
          </p>
          <h2 className="sm:text-4xl text-3xl font-extrabold text-gray-800 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Everything you need to know about exploring Bangladesh—destinations,
            costs, safety, and travel tips.
          </p>
        </div>

        {/* Right Side Accordion */}
        <ul className="basis-1/2 bg-white shadow-lg rounded-2xl p-6 divide-y divide-gray-100">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
