import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sections = [
  "build",
  "performance",
  "design",
  "technologies",
  "leasing",
  "advice",
  "accessories",
];

function SectionNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("build");
  const navigate=useNavigate();

  // ✅ Show nav after hero
  useEffect(() => {
    const trigger = document.getElementById("section-trigger");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (trigger) observer.observe(trigger);

    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, []);

  // ✅ Stable Scroll Spy + URL Sync
  useEffect(() => {
    const handleScroll = () => {
      if (!visible) {
        setActive("build");
        return;
      }

      let currentSection = sections[0];

      for (let i = sections.length - 1; i >= 0; i--) {
        const id = sections[i];
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        // Section ka top viewport ke andar aa gaya
        if (rect.top <= 100) {
          currentSection = id;
          break;
        }
      }

      if (currentSection !== active) {
        setActive(currentSection);
        if (location.pathname === "/") {
          window.history.replaceState(null, "", `/#${currentSection}`);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [active, visible]);

  return (
    <motion.div
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
    >
      <div className="flex justify-between items-center px-10 py-3">

        {/* Nav Links */}
        <div className="flex gap-8 font-semibold relative">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
                if (location.pathname === "/") {
                  window.history.pushState(null, "", `/#${id}`);
                }
              }}
              className={`relative pb-2 transition ${active === id
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
                }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}

              {active === id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-black"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </a>
          ))}
        </div>

        <button onClick={()=>navigate("/vehiclefinder")} className="bg-blue-600 text-white px-6 py-2 rounded">
          Buy New Vehicle
        </button>

      </div>
    </motion.div>
  );
}

export default SectionNav;