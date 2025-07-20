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
                <p>{aboutData.introduction}</p>
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div id="skills" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Skills</h2>
            {aboutData?.skills && aboutData.skills.length > 0 ? (
              <ul className="list-disc list-inside mt-4 text-lg text-gray-300">
                {aboutData.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400">No skills available</div>
            )}
          </div>

          {/* Experience Section */}
          <div id="experience" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Experience</h2>
            {aboutData?.experience && aboutData.experience.length > 0 ? (
              <div className="space-y-6">
                {aboutData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-gray-600">
                    {/* Timeline dot */}
                    <div className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-2"></div>

                    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-gray-300 font-medium">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-400">
                          {exp.duration}
                        </p>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>

                      {exp.promotions && exp.promotions.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-200 mb-2">Previous Roles</h4>
                          <div className="space-y-4">
                            {exp.promotions.map((promo, promoIdx) => (
                              <div key={promoIdx} className="bg-black/10 rounded-md p-4 border border-gray-800">
                                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                  <span className="font-semibold text-white">{promo.title}</span>
                                  <span className="text-sm text-gray-400 md:ml-2">{promo.duration}</span>
                                </div>
                                <p className="text-gray-300 mt-2">{promo.description}</p>
                              </div>
                            ))}
                          </div>
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
                  <div key={index} className="mb-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
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
