"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Carousel } from "@/components/Carousel";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import Image from "next/image";
import { usePortfolioData } from "@/hooks/usePortfolioData";

export default function Home() {
  const { homeData, projects, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Portfolio</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header />

      <main className="px-6 py-16 max-w-7xl mt-24 mx-auto">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl">
            {homeData?.heroTitle || "Hi, I'm Sumit Santhosh Nair"}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            {homeData?.heroSubtitle}
          </p>
          <div className="mt-8">
            <Link
              href="#about"
              className="px-6 py-3 text-lg border-2 border-red-900 text-red-900 rounded-full hover:bg-red-900 hover:text-white transition-colors"
            >
              Learn More About Me
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-32 text-center space-y-12">
          <h2 className="text-3xl font-semibold text-gray-100">
            Know More About Me
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12">
            <div className="w-48 h-48 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              <Image
                src={homeData?.profileImageUrl || "/images/profile.jpg"}
                alt="Profile Image"
                width={240}
                height={240}
                className="rounded-full object-cover"
              />
            </div>
            <div className="max-w-lg text-center sm:text-left">
              <p className="text-lg text-gray-300">
                {homeData?.aboutText}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="mt-32 text-center space-y-12">
          <h2 className="text-3xl font-semibold text-gray-100">
            {homeData?.featuredProjectsTitle || "Featured Projects"}
          </h2>
          <div className="mt-8">
            {projects && projects.length > 0 ? (
              <Carousel
                images={projects.filter(project => project.featured).map(project => ({
                  src: project.imageUrl,
                  alt: project.name
                }))}
                indicator="line"
                aspectRatio="16 / 9"
              />
            ) : (
              <div className="text-gray-400">No projects available</div>
            )}
          </div>
          <div className="mt-8">
            <p className="text-lg text-gray-400">
              {homeData?.featuredProjectsDescription || (
                projects && projects.length > 0 ? (
                  <>
                    Explore my projects like{" "}
                    {projects.filter(project => project.featured).slice(0, 3).map((project, index) => (
                      <span key={project.id}>
                        <strong>{project.name}</strong>
                        {index < Math.min(projects.filter(project => project.featured).length, 3) - 1 && 
                          (index === Math.min(projects.filter(project => project.featured).length, 3) - 2 ? " and " : ", ")
                        }
                      </span>
                    ))}
                    .
                  </>
                ) : (
                  "Check back soon for exciting projects!"
                )
              )}
            </p>
            <div className="mt-6">
              <Link
                href="/work"
                className="px-6 py-3 text-lg border-2 border-red-900 text-red-900 rounded-full hover:bg-red-900 hover:text-white transition-colors"
              >
                See All Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
