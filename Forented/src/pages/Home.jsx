import React from "react";
import Navbar from "../components/Navbar";
import FrameHoverPlayer from "../components/FrameHoverPlayer";
import image from "../assets/frontload.png";
import video from "../assets/Video Project 1.mp4"
import { motion } from "framer-motion";
import ClickableVideo from "../components/ClickableVideo"
import engineVideo from "../assets/engine.module.mp4";
import Stylecard from "../components/Stylecard";
import interior from "../assets/interior.mp4";
import brake from "../assets/brake.mp4";
import bumper from "../assets/bumper.mp4";
import details from "../assets/details.mp4"
import pookie from "../assets/pookie.mp4"
import back from "../assets/back - Trim.mp4";
import mirror from "../assets/mirror.mp4";
import tyers from "../assets/tyers.mp4";
import sideline from "../assets/sideline.mp4"
import steering from "../assets/steering.mp4"
import VideoSection from "../components/VideoSection";
import service from "../assets/service.mp4"
import FAQSection from "../components/FAQ";
import FuelSection from "../components/Fuelsection";
import Footer from "../components/Footer";
import { useRef } from "react";
import SectionNav from "../components/SectionNav";
import { Navigate, useNavigate } from "react-router-dom";



function Home() {
  const frames = Array.from({ length: 207 }, (_, i) =>
    `/frames/BMW - Made with Clipchamp_${String(i + 1).padStart(4, "0")}.jpg`);
  const heroRef = useRef(null);
  const navigate=useNavigate()
  return (
    <div>
      <div ref={heroRef} className="h-screen w-full relative overflow-hidden">

        {/* NAVBAR */}
        <Navbar />
        <SectionNav heroRef={heroRef}></SectionNav>
        <FrameHoverPlayer frames={frames} fps={30} />
        {/* heroesction */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        {/* CONTENT  */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-20 text-white pointer-events-none">
          <p className="tracking-[0.3em] text-sm">THE</p>

          <h1 className="text-[140px] font-light leading-none flex">
            <span>M5</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">

              <span className="italic font-black text-3xl leading-none text-[#1C69D4] tracking-[-8px]">/</span>
              <span className="italic font-black text-3xl leading-none text-[#113d7a] tracking-[-8px]">/</span>
              <span className="italic font-black text-3xl leading-none text-[#E30613] tracking-[-8px]">/</span>
            </div>
            <span className="text-white text-lg font-semibold tracking-wide  ">
              The all-new BMW M5.
            </span>
          </div>
          <button
          onClick={()=>navigate("/testdrive")}
            className="mt-8 px-6 py-3 bg-blue-600 w-fit rounded hover:bg-blue-700 transition pointer-events-auto cursor-pointer "
          >
            Register Your Interest
          </button>
        </div>
      </div>
      <div id="section-trigger" className="h-1"></div>

   
      <div className="bg-white text-black py-10 ">
        <h2 className="text-3xl font-light mb-6 mx-25 flex  justify-center ">
          Driving pleasure. To the core.
        </h2>

        <div className="text-gray-700 tracking-[-10x] flex  justify-center mb-10">
          Introducing the new BMW M5 Sedan Plug-in Hybrid — where racetrack-ready
          M driving dynamics <br />meet elegant everyday driving. Discover this
          high-performance sedan sports car, its equipment <br />
          options and technical specifications, plus financing options available.
        </div>
      </div>
 {/* Build section */}
      <motion.div
        id="build"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.6 }}
        transition={{ staggerChildren: 0.2 }}
        className="relative h-screen overflow-hidden scroll-mt-24"
      >
        <motion.img
          src={image}
          alt="detail description of bmw"
          className="w-full h-full object-cover"
          variants={{
            hidden: { scale: 1.1, opacity: 0 },
            visible: { scale: 1, opacity: 1 }
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-start px-20 text-white bg-gradient-to-r from-black/70 to-transparent"
          variants={{
            hidden: { y: 80, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl mb-4">
            In a league of its own.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed">
            The BMW M5 Sedan with M Hybrid is high-tech to the core.
            Its tremendously powerful high-performance M TwinPower
            Turbo V8-cylinder petrol engine combined with an electric
            drive brings a system power of 535 kW (727 hp) to the road.
            Comfort, driving dynamics and handling combine to form a
            perfect symbiosis of business sedan and thoroughbred sports car,
            capable of accelerating up to a top speed of 305 km/h
            with the M Driver’s package.
          </p>
        </motion.div>
      </motion.div>

     {/* Perfromance Scetion  */}
      <div id="performance" className="flex flex-wrap justify-center" >
        <span className="text-4xl  font-light mt-30 mb-10">
          Performance.
        </span>
        <ClickableVideo
          src={video}
          className="w-[1200px] h-[600px] object-cover"
        />

      </div>

      <div className="flex gap-10 mt-10 ml-7.5">


        <div className="w-[800px] cursor-pointer">
          <Stylecard
            src={engineVideo}
          ></Stylecard>
        </div>

        <div className="w-1/2">

          <h2 className="text-3xl  font-light leading-tight text-gray-800 mt-20 ">
            For unadulterated joy. M Hybrid.
          </h2>

          <p className="mt-8 text-[18px] leading-relaxed text-gray-600 w-[450px] ">
            Its M Hybrid powertrain with high-performance M
            TwinPower Turbo V8-cylinder petrol engine and electric
            drive thrusts you into the back of your seat with an
            impressive system power of 535 kW (727 hp). Its torque
            of up to 1000 Nm is dynamically distributed by the M
            xDrive to all four wheels.
          </p>

        </div>

      </div>

      <div className="mt-10 px-10 ">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div>
            <Stylecard src={interior} />
            <h2 className="text-2xl  font-light text-gray-800 mt-6">
              Drive however the mood takes
              you.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Adaptive M suspension combines driving
              dynamics with comfort. It adapts
              automatically to the road conditions and
              your driving style.
            </p>
          </div>

          {/* Card 2 */}
          <div>
            <Stylecard src={brake} />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Lighter and more direct.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">

              The M Carbon ceramic brake (optional)
              delivers top performance in terms of thermal
              load capacity and durability. It is also lighter
              compared to the compound brake.
            </p>
          </div>

          {/* Card 3 */}
          <div>
            <Stylecard src={bumper} />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Immersive sound.

            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">

              On the exterior, four exhaust tailpipes with
              flap control deliver what you have come to
              expect from an M. In the interior, the M
              sound adapts to the drive mode selected.
            </p>
          </div>

        </div>
      </div>
      <div className="w-[1200px]  object-cover mt-7 ml-8">
        <ClickableVideo
          playMode="scroll"
          src={details}

        />
      </div> 

      {/* Exterior Design  */}
       <div id="design" className="flex flex-wrap justify-center scroll-mt-24" >
        <span className="text-3xl  font-light mt-20">
          Exterior design.
        </span>
      </div>
      <div className="flex gap-10 mt-10 ml-7.5">
        <div className="ml-15">

          <h2 className="text-3xl  font-light leading-tight text-gray-800 mt-20 ">
            Unmistakable even in the dark.
          </h2>

          <p className="text-[18px] leading-relaxed text-gray-600 w-[450px] ">
            Highlight features include the completely
            reinterpreted design of the BMW kidney Iconic
            Glow with contour line lighting, the new double
            light signature of the front headlights, and the
            dynamic M-specific Welcome Light Carpet.
          </p>

        </div>
        <div className="w-[800px] cursor-pointer mr-7">
          <Stylecard
            src={pookie}
            mode="scroll"
          ></Stylecard>
        </div>
      </div>
      <div className="mt-16 px-10">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div>
            <Stylecard src={back} />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Power at its most beautiful.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Flared wheel arches and widened side panels.
              Its definitive power is immediately evident
              with the BMW M5 Sedan.
            </p>
          </div>

          {/* Card 2 */}
          <div>
            <Stylecard src={sideline} />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Self-consciously composed.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              A stylish tail. The two-section diffuser,
              which powerfully frames the four exhaust
              tailpipes, shapes the lower part of the rear.
            </p>
          </div>

          {/* Card 3 */}
          <div>
            <Stylecard src={tyers} />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Sporty ambitions.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Distinctive, dark, linear. 20"/21" M light alloy
              wheels Double-spoke style 951 M Black
              match any paintwork colour.
            </p>
          </div>

        </div>
      </div>
      <div className="flex gap-10 mt-10 ml-7.5">


        <div className="w-[800px] cursor-pointer">
          <Stylecard
            src={mirror}
          ></Stylecard>
        </div>

        <div className="w-1/2">

          <h2 className="text-3xl  font-light leading-tight text-gray-800 mt-30  w-[460px] ">
            A material that wows
            you visually as well.
          </h2>

          <p className="mt-8 text-[18px] leading-relaxed text-gray-600 w-[450px] ">
            The M Carbon exterior package lends your
            BMW M an even sportier look. The roof, exterior
            mirror caps and rear spoiler are made of
            lightweight and robust carbon fibre.
          </p>

        </div>

      </div>
      <div className="flex flex-wrap justify-center" >
        <span className="text-3xl  font-light mt-10">
          Interior Design.
        </span>
      </div>
      <div className="w-[1200px]  object-cover mt-7 ml-8">
        <ClickableVideo
          playMode="scroll"
          src={steering}
        />
      </div>
      <div className="flex gap-10 mt-10 ml-7.5">
        <div className="ml-15">

          <h2 className="text-3xl  font-light leading-tight text-gray-800 mt-28 ">
            A perfect fit.
          </h2>

          <p className="text-[18px] leading-relaxed text-gray-600 w-[450px] mt-5 ">
            From the individual backrest width to seat heating.
            Both M multifunction seats can be adjusted in
            many ways for optimum support and comfort.
          </p>

        </div>
        <div className="w-[800px] cursor-pointer mr-7">
          <Stylecard
            src="/inside.mp4"
            mode="scroll"
          ></Stylecard>
        </div>
      </div>

      <div className="mt-16 px-10">
        <div className="grid md:grid-cols-3 gap-10 cursor-pointer">

          {/* Card 1 */}
          <div>
            <Stylecard src="/mainScreen.mp4" />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Moulded for precise control.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">

              Feels sporty, looks even sportier. The M
              steering wheel with its red 12 o'clock
              marking, M shift paddles and M1/M2 keys
              for saved vehicle settings.
            </p>
          </div>

          {/* Card 2 */}
          <div>
            <Stylecard src="/gearbox.mp4" />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Everything in one place.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">

              The red Start-Stop button, the BMW
              Controller with M logo, or M Modes. The M-
              specific centre console provides quick
              access to the key functions.
            </p>
          </div>

          {/* Card 3 */}
          <div>
            <Stylecard src="/combination.mp4" />
            <h2 className="text-2xl font-light text-gray-800 mt-6 ">
              More dynamics.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">

              Coordinated to your BMW M: ambient
              lighting generates a visual experience.
              Lighting effects in typical M colours
              welcome you as you get in.
            </p>
          </div>

        </div>
      </div>

      {/* Technologies  */}
      <div  id= "technologies" className="flex flex-wrap justify-center items-center text-3xl mt-15 font-light scroll-mt-24 ">
        <h2> Digital highlights.</h2>

      </div>
      <div className="mt-16 px-10">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div>
            < img src="/M.png" alt="map"
            />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Always visible. Typically M.
            </h2>
            <p className="mt-11 leading-relaxed text-gray-600">
              The BMW head-up display adapts visually to
              the drive mode. It displays extensive or
              minimal information, depending on the M
              Mode selected.
            </p>
          </div>

          {/* Card 2 */}
          <div>
            < img src="/screen.png" alt="map"
            />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Operation is intuitive. The
              displays are always M.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Many functions can be accessed simply and
              quickly with BMW iDrive. By voice control,
              touch or using the exclusive M-design BMW
              Controller.
            </p>
          </div>

          {/* Card 3 */}
          <div>
            < img src="/made.png" alt="map"
            />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Made-to-measure driving
              experience.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              Made-to-measure driving
              experience.
              Whether relaxed everyday driving or
              focussed on the racetrack. All assistance
              systems are active in ROAD My Mode with
              coordinated displays, while TRACK mode
              reduces them to a minimum.
            </p>
          </div>

        </div>
      </div>





      <div className="flex flex-wrap justify-center items-center text-3xl mt-15 font-light ">
        <h2> Electric driving pleasure.</h2>

      </div>
      <div className="mt-16 px-10">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Card 1 */}
          <div>
            < img src="/front.png" alt="map"
            />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Purely electric. Pure driving
              pleasure.
            </h2>
            <p className="mt-11 leading-relaxed text-gray-600">


              The efficient BMW eDrive system lets you
              drive up to 69 kms purely electrically.
              Virtually silent and locally emission-free.
            </p>
          </div>

          {/* Card 2 */}
          <div>
            < img src="/side.png" alt="map"
            />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              Full torque From the very first
              revolution.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">


              The 535 kW (727 hp) powerful electric motor
              delivers powerful forward thrust. It
              maximises acceleration in seamless
              interplay with the 4.4-litre V8 engine.
            </p>
          </div>

          {/* Card 3 */}
          <div>
            < img src="/gear.png" alt="map"
            />
            <h2 className="text-2xl font-light text-gray-800 mt-6">
              The package that delivers an
              adrenaline punch.
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">


              M Drive Professional is your reliable
              companion for fast laps, while Boost Control
              delivers breathtaking acceleration.
            </p>
          </div>

        </div>
      </div>
   
      <div className="flex gap-10 mt-10 ml-7.5 ">
        <div className="w-[800px] ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.6 }}
            transition={{ staggerChildren: 0.2 }}
            className="relative h-screen overflow-hidden"
          >
            <motion.img
              src="/view.png"
              alt="detail description of bmw"
              variants={{
                hidden: { scale: 1.1, opacity: 0 },
                visible: { scale: 1, opacity: 1 }
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          </motion.div>
        </div>

        <div className="w-1/2">

          <h2 className="text-3xl  font-light leading-tight text-gray-800 mt-30  w-[460px] ">
            WE VALUE TRANSPARENCY.
          </h2>

          <p className="mt-8 text-[18px] leading-relaxed text-gray-600 w-[450px] ">

            The BMW M5 contributes to a more sustainable future.
            We use secondary materials and green energy
            during production,
            optimising the CO2 footprint of the BMW M5
            even before we hand it over to you.
          </p>

        </div>

      </div>




      <div  className="flex flex-wrap justify-center items-center text-3xl mt-2 font-light tracking-wide text-gray-800 ">
        <h2> Intelligently by your side.</h2>
      </div>
      <div>
        <VideoSection />
      </div>

   {/* Leasing and Finance  */}
      <div  id= "leasing" className="flex gap-10 mt-20 ml-7.5 scroll-mt-24">


        <div className="w-[800px] ">
          <img src="/moutain.png"></img>
        </div>

        <div className="w-1/2">

          <h2 className="text-3xl  font-light leading-tight text-gray-800 mt-30  w-[460px] ">
            Your BMW M5 Sedan.
          </h2>

          <p className="mt-8 text-[18px] leading-relaxed text-gray-600 w-[450px] ">

            Enrich your individual lease or loan product with attractive
            services and insurance in one package.
            All in. Simply smart. BMW Financial Services
          </p>

        </div>
      </div>


{/* Advice and Service  */}

      <div  id="advice" className="flex flex-wrap justify-center  scroll-mt-24" >
        <span className="text-3xl  font-light mt-15">
          Proactive Care in the BMW M5.
        </span>
      </div>
      <div className="mt-20">
        <Stylecard
          src={service}
          mode="scroll"
        >

        </Stylecard>
      </div>
      <div className="w-full -mt-12 relative z-10 overflow-hidden">
        <div className="bg-white p-10 shadow-2xl w-240 h-40 ml-10">
          <h2 className="text-2xl font-light">Service - precisely when you need it.</h2>
          <p className="text-[15px] leading-relaxed text-gray-600 w-[800px] ">
            Always one step ahead. Whether a service is due or the
            tyres are worn: we contact you in good time. You can arrange an
            appointment directly via the message in your
            My BMW app. And then relax as you continue your journey.</p>

        </div>
      </div>

      <FAQSection />

      {/* Accessories  */}

      <section  id="accessories" className="bg-[#f2f2f2] py-20 px-6 md:px-16 mt-10 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-8">
              GENUINE BMW ACCESSORIES
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              Customise your BMW with the Genuine BMW Accessories design to
              make every drive iconic. Discover our range of M Performance Parts
              and Essential BMW Accessories that perfectly align with your
              individual preferences.
            </p>

            <button
              onClick={() => window.open("/Accessories.pdf", "_blank")}
              className="border border-black px-8 py-4 text-lg font-medium hover:bg-black hover:text-white transition duration-300 cursor-pointer">

              Find Out More

            </button>
          </div>
          <div>
            <img
              src="/Accessories.png"
              alt="BMW Accessories"
              className="w-800"
            />
          </div>

        </div>
      </section>
      <FuelSection />
      <Footer />
    </div>

  );
}

export default Home;
