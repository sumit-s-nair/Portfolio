'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { Project } from '@/lib/firestore';
import Image from 'next/image';
import Link from 'next/link';

const Work = () => {
  const { workData, loading, error, fetchProjectsByCategory } = usePortfolioData();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [openSourceProjects, setOpenSourceProjects] = useState<Project[]>([]);
  const [freelanceProjects, setFreelanceProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjectsByCategory = async () => {
      if (fetchProjectsByCategory) {
        const [featured, openSource, freelance] = await Promise.all([
          fetchProjectsByCategory('featured'),
          fetchProjectsByCategory('open-source'), 
          fetchProjectsByCategory('freelance')
        ]);
        setFeaturedProjects(featured);
        setOpenSourceProjects(openSource);
        setFreelanceProjects(freelance);
      }
    };
    loadProjectsByCategory();
  }, [fetchProjectsByCategory]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 96;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
      <div className="min-h-screen bg-black/30 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Projects</h2>
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
              onClick={() => handleScroll('featured-projects')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Featured Projects
            </button>
            <button
              onClick={() => handleScroll('open-source')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Open Source
            </button>
            <button
              onClick={() => handleScroll('freelance-work')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Freelance Work
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="md:w-3/4 space-y-24">
          {/* Featured Projects Section */}
          <div id="featured-projects" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Featured Projects</h2>
            {workData?.featuredProjectsDescription && (
              <p className="text-lg text-gray-300 leading-relaxed">
                {workData.featuredProjectsDescription}
              </p>
            )}
            {featuredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, index) => (
                  <div key={project.id || index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      <p className="text-gray-400 mt-2">{project.description}</p>
                      <Link
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : '_self'}
                        rel={project.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="mt-4 inline-block px-4 py-2 text-sm text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No featured projects available at the moment</div>
                <p className="text-gray-500 mt-2">Check back soon for exciting new projects!</p>
              </div>
            )}
          </div>

          {/* Open Source Section */}
          <div id="open-source" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Open Source Contributions</h2>
            <div className="bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
              <p className="text-lg text-gray-300 leading-relaxed">
                {workData?.openSourceDescription || 
                  "I actively contribute to open-source projects to give back to the developer community. My work includes fixing bugs, improving documentation, and adding new features to popular repositories."
                }
              </p>
            </div>
            {openSourceProjects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {openSourceProjects.map((project, index) => (
                  <div key={project.id || index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      <p className="text-gray-400 mt-2">{project.description}</p>
                      <Link
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : '_self'}
                        rel={project.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="mt-4 inline-block px-4 py-2 text-sm text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Freelance Work Section */}
          <div id="freelance-work" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Freelance Work</h2>
            <div className="bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
              <p className="text-lg text-gray-300 leading-relaxed">
                {workData?.freelanceDescription ||
                  "I have worked with various clients to design and develop responsive websites and applications tailored to their needs. My focus is on delivering clean, efficient, and user-friendly solutions."
                }
              </p>
            </div>
            {freelanceProjects.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {freelanceProjects.map((project, index) => (
                  <div key={project.id || index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-red-500 transition-colors">
                    <Image
                      src={project.imageUrl}
                      alt={project.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                      <p className="text-gray-400 mt-2">{project.description}</p>
                      <Link
                        href={project.link}
                        target={project.link.startsWith('http') ? '_blank' : '_self'}
                        rel={project.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="mt-4 inline-block px-4 py-2 text-sm text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Work;
