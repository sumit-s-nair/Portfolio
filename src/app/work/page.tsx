'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const Work = () => {
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

  const projects = [
    {
      title: 'Quantum Repo',
      description: 'A GitHub clone offering advanced repository management features.',
      image: '/images/assets/QuantumRepo.png',
      link: 'https://quantum-repo.vercel.app/',
    },
    {
      title: 'Nexus',
      description: 'Interactive 3D web experiences built with Three.js.',
      image: '/images/assets/NexusPES.png',
      link: 'https://nexus-pesu.vercel.app/',
    },
    {
      title: 'Quillcove',
      description: 'A seamless note-taking app designed for productivity.',
      image: '/images/assets/QuillCove.png',
      link: '/projects/quillcove',
    },
  ];

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="text-gray-400 mt-2">{project.description}</p>
                    <Link
                      href={project.link}
                      className="mt-4 inline-block px-4 py-2 text-sm text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Open Source Section */}
          <div id="open-source" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Open Source Contributions</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I actively contribute to open-source projects to give back to the developer community. 
              My work includes fixing bugs, improving documentation, and adding new features to popular repositories.
            </p>
          </div>

          {/* Freelance Work Section */}
          <div id="freelance-work" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Freelance Work</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              I have worked with various clients to design and develop responsive websites and applications tailored to their needs. 
              My focus is on delivering clean, efficient, and user-friendly solutions.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Work;
