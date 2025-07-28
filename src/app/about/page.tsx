"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const About = () => {
  const { aboutData, homeData, loading, error } = usePortfolioData();

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const flattenedExperience =
    aboutData?.experience.flatMap((exp) => [
      { ...exp, isPromotion: false },
      ...(exp.promotions || []).map((promo) => ({
        ...promo,
        company: exp.company,
        isPromotion: true,
      })),
    ]) || [];

  return (
    <>
      <Header />

      <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-16 mt-24 space-y-12 md:space-y-0">
        {/* Side Navigation */}
        <aside className="hidden md:block md:w-1/4 sticky top-24 space-y-6">
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
                src={homeData?.profileImageUrl || "/images/profile.jpg"}
                alt="Profile Image"
                width={150}
                height={150}
                className="rounded-full object-cover"
              />
              <div>
                <h1 className="text-4xl font-extrabold text-white">
                  {aboutData?.fullName || "Sumit Santhosh Nair"}
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                  {aboutData?.title || "Full Stack Developer | Videographer"}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {aboutData?.location || "Bengaluru, Karnataka"}
                </p>
              </div>
            </div>
            {aboutData?.introduction && (
              <div className="text-lg text-gray-300 leading-relaxed">
                {aboutData.introduction
                  .split(/<br\s*\/?>/i)
                  .map((para, idx) =>
                    para.trim() ? (
                      <p key={idx} className="mb-4 last:mb-0">{para.trim()}</p>
                    ) : null
                  )}
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div id="skills" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">
              Technical Skills
            </h2>
            {aboutData?.skills && aboutData.skills.length > 0 ? (
              <div className="flex flex-wrap gap-4 mt-4">
                {aboutData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-2 text-lg text-gray-300 transition-all duration-300 ease-out hover:bg-red-900/50 hover:border-red-700 hover:text-white hover:-translate-y-1 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No skills available</div>
            )}
          </div>

          {/* Experience Section */}
          <div id="experience" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100 mb-8">
              Professional Journey
            </h2>
            {flattenedExperience.length > 0 ? (
              <div className="relative">
                {/* Timeline bar */}
                <div className="absolute top-0 left-4 w-2 h-full bg-gradient-to-b from-red-600 via-red-800 to-transparent rounded-sm"></div>

                {flattenedExperience.map((job, index) => (
                  <div key={index} className="relative mb-8 group">
                    <div
                      className={`absolute left-5 border-4 border-black/30 rounded-full z-10 -translate-x-1/2 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] transition-all duration-300 ease-out ${
                        job.isPromotion
                          ? "top-[18px] w-6 h-6 bg-slate-700 group-hover:bg-red-600"
                          : "top-[22px] w-8 h-8 bg-rose-950 group-hover:bg-red-500"
                      }`}
                    ></div>

                    {/* Card Container */}
                    <div
                      className={`${
                        job.isPromotion ? "ml-20" : "ml-12"
                      } transition-all duration-300 ease-out ${
                        job.isPromotion
                          ? "bg-gradient-to-br from-gray-900/50 to-gray-900/20 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-gray-700"
                          : "bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-gray-800 shadow-lg hover:border-red-600/60 hover:-translate-y-1"
                      }`}
                    >
                      {/* Main Role Card Content */}
                      {!job.isPromotion && (
                        <>
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-red-400 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span>{job.title}</span>
                            </h3>
                            <p className="text-sm text-gray-400 mt-2 md:mt-1 md:ml-4 flex-shrink-0 flex items-center gap-2">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              {job.duration}
                            </p>
                          </div>
                          <p className="text-lg text-red-200 font-semibold mt-1">
                            {job.company}
                          </p>
                          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                            {job.description
                              .split("•")
                              .map(
                                (item, i) =>
                                  item.trim() && <li key={i}>{item.trim()}</li>
                              )}
                          </ul>
                        </>
                      )}

                      {/* Promotion Card Content */}
                      {job.isPromotion && (
                        <div className="m-2">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <h4 className="font-semibold text-white text-lg">
                              {job.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1 sm:mt-0 sm:ml-4 flex-shrink-0">
                              {job.duration}
                            </p>
                          </div>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-400">
                            {job.description
                              .split("•")
                              .map(
                                (item, i) =>
                                  item.trim() && <li key={i}>{item.trim()}</li>
                              )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No experience data available</div>
            )}
          </div>

          {/* Education Section */}
          <div id="education" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Education</h2>
            {aboutData?.education && aboutData.education.length > 0 ? (
              <div className="text-lg text-gray-300">
                {aboutData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="mb-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
                  >
                    <p className="font-semibold text-white">
                      {edu.institution}
                    </p>
                    <p>{edu.degree}</p>
                    <span className="text-gray-400">{edu.year}</span>
                    {edu.description && (
                      <p className="mt-2">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No education data available</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
