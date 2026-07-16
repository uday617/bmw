import { useState, useRef } from "react";
import Stylecard from "./Stylecard";

import model1 from "../assets/model.mp4";
import model2 from "../assets/parking.mp4";
import remote1 from "../assets/remote key.mp4";
import remote2 from "../assets/self driving.mp4";

function VideoSection() {
  const [active, setActive] = useState("assistance");
  const [activeSlide, setActiveSlide] = useState(0);

  const dragStart = useRef(0);
  const dragOffset = useRef(0);
  const dragging = useRef(false);

  const data = {
    assistance: [
      {
        title: "Your attentive assistant.",
        description: `The Driving Assistant Professional
          (optional) actively keeps you in lane at up to 210 km/h and at 
           a safe distance.If need be, your
         BMW will brake to a standstill and automatically drive off again. 
          A real help especially in stop- and - go traffic`, video: model1
      },
      {
        title: "Your BMW parks itself and leaves parking spaces too", description: `The Parking Assistant Plus makes parking and 
          manoeuvring the vehicle easier. It features among others the Surround View
           system including Top View, Panorama View, Remote 3D View.
            `, video: model2
      },
    ],
    connectivity: [
      {
        title: "More than just a key.",
        description: `
            With BMW Digital Key Plus, you can use compatible mobile
             devices as a vehicle key. And share it digitally with up
              to five people
            As soon as you approach your BMW, it opens automatically 
            accompanied by lighting effects.`
        , video: remote1
      },
      {
        title: "See more at a glance.",
        description: `The BMW head-up display projects
         navigation and driving information directly into
          your field of vision. Augmented View displays
          information on route guidance via live video images in the
          control display and in the instrument cluster.`
        , video: remote2
      },
    ],
  };

  const handleDragStart = (e) => {
    dragging.current = true;
    dragStart.current = e.type === "touchstart"
      ? e.touches[0].clientX
      : e.clientX;
  };

  const handleDragMove = (e) => {
    if (!dragging.current) return;

    const currentX = e.type === "touchmove"
      ? e.touches[0].clientX
      : e.clientX;

    dragOffset.current = currentX - dragStart.current;
  };

  const handleDragEnd = () => {
    dragging.current = false;

    if (dragOffset.current < -80 &&
      activeSlide < data[active].length - 1) {
      setActiveSlide(prev => prev + 1);
    }

    if (dragOffset.current > 80 && activeSlide > 0) {
      setActiveSlide(prev => prev - 1);
    }

    dragOffset.current = 0;
  };

  return (
    <div className="flex flex-col items-center gap-10 py-20">

      {/* Top Buttons */}
      <div className="flex bg-gray-100 p-1 border border-gray-200">
        <button
          onClick={() => {
            setActive("assistance");
            setActiveSlide(0);
          }}
          className={`px-8 cursor-pointer py-3 ${active === "assistance"
            ? "bg-white shadow text-black"
            : "text-gray-500"
            }`}
        >
          Assistance
        </button>

        <button
          onClick={() => {
            setActive("connectivity");
            setActiveSlide(0);
          }}
          className={`px-8 cursor-pointer py-3 ${active === "connectivity"
            ? "bg-white shadow text-black"
            : "text-gray-500"
            }`}
        >
          Connectivity
        </button>
      </div>

      {/* Video */}
      <div className="w-full">
        <Stylecard src={data[active][activeSlide].video} />
      </div>

      {/* Cards */}
      <div className="w-full -mt-24 relative z-10 overflow-hidden">
        <div
          className="flex transition-transform duration-800 ease-in-out"
          style={{
            transform: `translateX(-${activeSlide * 920}px)`
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {data[active].map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[900px] mr-5 cursor-grab active:cursor-grabbing ml-10 select-none"
            >
              <div className="bg-white p-10 shadow-2xl">
                <h2 className="text-2xl font-light">
                  {item.title}
                </h2>
                <h3 className="text-[13px] leading-relaxed text-gray-600 w-[800px] pt-5">
                  {item.description}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default VideoSection;