import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Where is the BMW M5  produced?",
    answer:
      "We produce this model at our BMW plant in Dingolfing, Bavaria. It is now the seventh generation of the BMW M5 .",
  },
  {
    question: "What engine does the BMW M5  have?",
    answer:
      "This high-performance vehicle features a plug-in hybrid drive with a system power of 535 kW (727 hp). An M TwinPower Turbo V8-cylinder petrol engine is combined with an electric motor.",
  },
  {
    question: "How quickly does the BMW M5 accelerate?",
    answer: "The BMW M5 accelerates from 0 to 100 km/h in 3.5 seconds, and from 0 to 200 km/h in 10.9 seconds."
    },
    {
        question:"How fast is the BMW M5 ?",
        answer:"When combined with the M Driver's Package, this sports sedan can reach a maximum speed of 305 km/h."

    },
    {
        question:"What are the dimensions of the BMW M5 Sedan?",
        answer:"This model has a length of 5,096 millimetres, a width of 1,970 millimetres, and a height of 1,510 millimetres. The BMW M5 Sedan therefore offers a spacious and comfortable interior."
    }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" py-20 px-4 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Heading */}
        <h2 className="text-3xl md:text-3xl font-light text-center mb-14 tracking-wide">
          Frequently asked questions on the BMW M5 Sedan.
        </h2>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-t border-gray-300 pt-6">

              {/* Question */}
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left text-lg md:text-xl font-normal"
              >
                {faq.question}

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  openIndex === index
                    ? "max-h-40 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default FAQSection;