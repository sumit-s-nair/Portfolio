"use client";

import Image from 'next/image';
import { WorkData, Project } from '@/lib/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminButton from '@/components/AdminButton';

interface AdminWorkPreviewProps {
  localWorkData: Partial<WorkData>;
  setLocalWorkData: (data: Partial<WorkData> | ((prev: Partial<WorkData>) => Partial<WorkData>)) => void;
  projects: Project[];
  saving: boolean;
  handleSave: (
    section: string,
    data: Partial<WorkData>,
    updateFunction: (data: Partial<WorkData>) => Promise<boolean>
  ) => Promise<void>;
  updateWork: (data: Partial<WorkData>) => Promise<boolean>;
}

export default function AdminWorkPreview({
  localWorkData,
  setLocalWorkData,
  projects,
  saving,
  handleSave,
  updateWork
}: AdminWorkPreviewProps) {
  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-16 mt-24 space-y-12 md:space-y-0">
        {/* Side Navigation */}
        <aside className="hidden md:block md:w-1/4 sticky top-24 space-y-6">
          <nav className="flex flex-col space-y-4 text-lg">
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Featured Projects
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Open Source
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Freelance Work
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="md:w-3/4 space-y-24">
          {/* Featured Projects Section */}
          <div id="featured-projects" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Featured Projects</h2>
            {localWorkData.featuredProjectsDescription && (
              <p 
                contentEditable
                suppressContentEditableWarning
                className="text-lg text-gray-300 leading-relaxed outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                onBlur={(e) => setLocalWorkData(prev => ({ ...prev, featuredProjectsDescription: e.target.textContent || "" }))}
              >
                {localWorkData.featuredProjectsDescription}
              </p>
            )}
            {projects && projects.filter(p => p.featured).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.filter(project => project.featured).map((project, index) => (
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
                      <div className="mt-4 inline-block px-4 py-2 text-sm text-red-500 border border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                        View Project
                      </div>
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
              <p 
                contentEditable
                suppressContentEditableWarning
                className="text-lg text-gray-300 leading-relaxed outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                onBlur={(e) => setLocalWorkData(prev => ({ ...prev, openSourceDescription: e.target.textContent || "" }))}
              >
                {localWorkData.openSourceDescription || 
                  "I actively contribute to open-source projects to give back to the developer community. My work includes fixing bugs, improving documentation, and adding new features to popular repositories."
                }
              </p>
            </div>
          </div>

          {/* Freelance Work Section */}
          <div id="freelance-work" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Freelance Work</h2>
            <div className="bg-gray-800/30 rounded-lg p-6 backdrop-blur-sm border border-gray-700">
              <p 
                contentEditable
                suppressContentEditableWarning
                className="text-lg text-gray-300 leading-relaxed outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                onBlur={(e) => setLocalWorkData(prev => ({ ...prev, freelanceDescription: e.target.textContent || "" }))}
              >
                {localWorkData.freelanceDescription ||
                  "I have worked with various clients to design and develop responsive websites and applications tailored to their needs. My focus is on delivering clean, efficient, and user-friendly solutions."
                }
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <AdminButton
              onClick={() => handleSave('work', localWorkData, updateWork)}
              loading={saving}
            >
              Save Work Page Changes
            </AdminButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
