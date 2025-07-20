"use client";

import Image from 'next/image';
import { FiPlus, FiTrash2, FiEdit3 } from 'react-icons/fi';
import { Project } from '@/lib/firestore';
import AdminButton from '@/components/AdminButton';
import AdminInput from '@/components/AdminInput';

interface AdminProjectsProps {
  localProjects: Project[];
  saving: boolean;
  handleImageUpload: (file: File, type: 'profile' | 'project', projectId?: string) => Promise<void>;
  handleProjectUpdate: (projectId: string, field: string, value: string | boolean) => Promise<void>;
  handleAddProject: () => Promise<void>;
  removeProject?: (projectId: string) => Promise<void>;
}

export default function AdminProjects({
  localProjects,
  saving,
  handleImageUpload,
  handleProjectUpdate,
  handleAddProject,
  removeProject
}: AdminProjectsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-100">Project Management</h2>
          <AdminButton
            onClick={handleAddProject}
            variant="success"
            loading={saving}
          >
            <FiPlus className="w-4 h-4 mr-2" />
            Add New Project
          </AdminButton>
        </div>
        
        <div className="space-y-6">
          {localProjects.map((project, index) => (
            <div key={project.id || index} className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/4">
                  <div className="relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && project.id) handleImageUpload(file, 'project', project.id);
                      }}
                      className="hidden"
                      id={`project-image-${index}`}
                    />
                    <label htmlFor={`project-image-${index}`} className="cursor-pointer block">
                      <Image
                        src={project.imageUrl || "/images/assets/placeholder.png"}
                        alt={project.name}
                        width={400}
                        height={200}
                        className="w-full h-32 rounded-lg object-cover border-2 border-gray-600 hover:border-red-500 transition-colors"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 text-white text-sm">
                          <FiEdit3 className="w-4 h-4" />
                          <span>Change Image</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Recommended: 16:9 aspect ratio
                  </div>
                </div>
                
                <div className="lg:w-3/4 space-y-4">
                  <AdminInput
                    label="Project Name"
                    value={project.name}
                    onChange={(value) => {
                      if (project.id) handleProjectUpdate(project.id, 'name', value);
                    }}
                    placeholder="Enter project name"
                  />
                  
                  <AdminInput
                    label="Description"
                    value={project.description}
                    onChange={(value) => {
                      if (project.id) handleProjectUpdate(project.id, 'description', value);
                    }}
                    type="textarea"
                    placeholder="Describe your project..."
                  />
                  
                  <AdminInput
                    label="Project Link"
                    value={project.link}
                    onChange={(value) => {
                      if (project.id) handleProjectUpdate(project.id, 'link', value);
                    }}
                    type="url"
                    placeholder="https://your-project-link.com"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={project.category}
                        onChange={(e) => {
                          if (project.id) handleProjectUpdate(project.id, 'category', e.target.value);
                        }}
                        className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                      >
                        <option value="featured">Featured</option>
                        <option value="open-source">Open Source</option>
                        <option value="freelance">Freelance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Order
                      </label>
                      <input
                        type="number"
                        value={project.order}
                        onChange={(e) => {
                          if (project.id) handleProjectUpdate(project.id, 'order', e.target.value);
                        }}
                        className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500 transition-colors"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center">
                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={project.featured || false}
                        onChange={(e) => {
                          if (project.id) handleProjectUpdate(project.id, 'featured', e.target.checked);
                        }}
                        className="rounded bg-black/50 border-gray-600 text-red-600 focus:ring-red-500 focus:ring-offset-0"
                      />
                      <span className="text-sm">Featured Project</span>
                    </label>

                    <div className="flex gap-2 ml-auto">
                      <AdminButton
                        onClick={() => {
                          if (project.id && removeProject) removeProject(project.id);
                        }}
                        variant="danger"
                      >
                        <FiTrash2 className="w-4 h-4 mr-1" />
                        Delete
                      </AdminButton>
                    </div>
                  </div>

                  {/* Technologies section */}
                  {project.technologies && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Technologies
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Preview */}
                  <div className="border-t border-gray-600 pt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Preview</h4>
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex gap-3">
                        <Image
                          src={project.imageUrl || "/images/assets/placeholder.png"}
                          alt={project.name}
                          width={80}
                          height={60}
                          className="w-20 h-15 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="text-white font-medium truncate">{project.name}</h5>
                          <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {project.featured && (
                              <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-full">
                                Featured
                              </span>
                            )}
                            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full capitalize">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {localProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">No projects yet</div>
              <p className="text-gray-500 mb-6">Add your first project to get started!</p>
              <AdminButton
                onClick={handleAddProject}
                variant="success"
                loading={saving}
              >
                <FiPlus className="w-4 h-4 mr-2" />
                Add Your First Project
              </AdminButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
