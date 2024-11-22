"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 100;
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header />

      <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-16 mt-24 space-y-12 md:space-y-0">
        {/* Side Navigation */}
        <aside className="md:w-1/4 sticky top-24 space-y-6">
          <nav className="flex flex-col space-y-4 text-lg">
            <button
              onClick={() => handleScroll("intro")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Introduction
            </button>
            <button
              onClick={() => handleScroll("skills")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => handleScroll("experience")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => handleScroll("education")}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Education
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="md:w-3/4 space-y-24">
          {/* Profile Section */}
          <div id="intro" className="space-y-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Image
                src="/images/profile.jpg"
                alt="Profile Image"
                width={150}
                height={150}
                className="rounded-full"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-white">
                  Sumit Santhosh Nair
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                  Full Stack Developer | Videographer
                </p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div id="skills" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Skills</h2>
            <ul className="list-disc list-inside mt-4 text-lg text-gray-300">
              <li>MERN Stack</li>
              <li>Flutter</li>
              <li>Python</li>
              <li>JavaScript</li>
              <li>MongoDB, PostgreSQL</li>
              <li>Git, GitHub</li>
              <li>REST APIs, Firebase</li>
            </ul>
          </div>

          {/* Experience Section */}
          <div id="experience" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Experience</h2>
            <div className="text-lg text-gray-300 leading-relaxed">
              <p>
                <strong>Web Developer | GronIT PESU</strong> <br />
                <span>October 2024 - Present</span> <br />
                Designed and developed the official website, collaborated on
                projects, and maintained up-to-date content.
              </p>
              <p className="mt-4">
                <strong>Web Developer | Nexus PESU</strong> <br />
                <span>November 2024 - Present</span> <br />
                Provided technical guidance and contributed to the design and
                development of the club&apos;s website.
              </p>
              <p className="mt-4">
                <strong>Videographer | Pixels Photography Club</strong> <br />
                <span>November 2024 - Present</span> <br />
                Captured and produced high-quality videos for campus events.
              </p>
              <p className="mt-4">
                <strong>Part-Time Tutor | Pure Mind Tutoring Center</strong>{" "}
                <br />
                <span>July 2024 - Present</span> <br />
                Tutored students in math, helping them excel in algebra,
                geometry, and calculus.
              </p>
            </div>
          </div>

          {/* Education Section */}
          <div id="education" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Education</h2>
            <p className="text-lg text-gray-300">
              <strong>PES University</strong> <br />
              Bachelor of Technology in Computer Science and Engineering (AIML)
              <br />
              2023 - 2027
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
