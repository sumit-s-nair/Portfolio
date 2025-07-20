"use client";

import Image from 'next/image';
import { FiMapPin, FiPlus, FiTrash2, FiBriefcase } from 'react-icons/fi';
import { HomeData, AboutData } from '@/lib/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminButton from '@/components/AdminButton';

interface AdminAboutPreviewProps {
  localHomeData: Partial<HomeData>;
  localAboutData: Partial<AboutData>;
  setLocalAboutData: (data: Partial<AboutData> | ((prev: Partial<AboutData>) => Partial<AboutData>)) => void;
  saving: boolean;
  handleImageUpload: (file: File, type: 'profile' | 'project', projectId?: string) => Promise<void>;
  handleSave: (
    section: string,
    data: Partial<AboutData>,
    updateFunction: (data: Partial<AboutData>) => Promise<boolean>
  ) => Promise<void>;
  updateAbout: (data: Partial<AboutData>) => Promise<boolean>;
}

export default function AdminAboutPreview({
  localHomeData,
  localAboutData,
  setLocalAboutData,
  saving,
  handleImageUpload,
  handleSave,
  updateAbout
}: AdminAboutPreviewProps) {
  
  const addExperience = () => {
    setLocalAboutData(prev => ({
      ...prev,
      experience: [...(prev.experience || []), {
        title: "Job Title",
        company: "Company Name",
        duration: "Start - End",
        description: "Job description...",
        promotions: []
      }]
    }));
  };

  const addPromotion = (expIndex: number) => {
    setLocalAboutData(prev => {
      const newExp = [...(prev.experience || [])];
      if (!newExp[expIndex].promotions) {
        newExp[expIndex].promotions = [];
      }
      newExp[expIndex].promotions!.push({
        title: "Promoted Role",
        duration: "Start - End",
        description: "Promotion description..."
      });
      return { ...prev, experience: newExp };
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    setLocalAboutData(prev => {
      const newExp = [...(prev.experience || [])];
      newExp[index] = { ...newExp[index], [field]: value };
      return { ...prev, experience: newExp };
    });
  };

  const updatePromotion = (expIndex: number, promIndex: number, field: string, value: string) => {
    setLocalAboutData(prev => {
      const newExp = [...(prev.experience || [])];
      if (newExp[expIndex].promotions) {
        newExp[expIndex].promotions![promIndex] = { 
          ...newExp[expIndex].promotions![promIndex], 
          [field]: value 
        };
      }
      return { ...prev, experience: newExp };
    });
  };

  const removeExperience = (index: number) => {
    setLocalAboutData(prev => {
      const newExp = [...(prev.experience || [])];
      newExp.splice(index, 1);
      return { ...prev, experience: newExp };
    });
  };

  const removePromotion = (expIndex: number, promIndex: number) => {
    setLocalAboutData(prev => {
      const newExp = [...(prev.experience || [])];
      if (newExp[expIndex].promotions) {
        newExp[expIndex].promotions!.splice(promIndex, 1);
      }
      return { ...prev, experience: newExp };
    });
  };

  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto px-6 py-16 mt-24 space-y-12 md:space-y-0">
        {/* Side Navigation */}
        <aside className="hidden md:block md:w-1/4 sticky top-24 space-y-6">
          <nav className="flex flex-col space-y-4 text-lg">
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Introduction
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Skills
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Experience
            </button>
            <button className="text-gray-300 hover:text-white transition-colors text-left">
              Education
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="md:w-3/4 space-y-24">
          {/* Profile Section */}
          <div id="intro" className="space-y-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="profile-image-upload-about"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file, 'profile');
                  }}
                />
                <label htmlFor="profile-image-upload-about" className="cursor-pointer block">
                  <Image
                    src={localHomeData.profileImageUrl || "/images/profile.jpg"}
                    alt="Profile Image"
                    width={150}
                    height={150}
                    className="rounded-full object-cover border-2 border-transparent hover:border-red-500/50 transition-colors"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">Click to change</span>
                  </div>
                </label>
              </div>
              <div>
                <h1 
                  contentEditable
                  suppressContentEditableWarning
                  className="text-4xl font-extrabold text-white outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                  onBlur={(e) => setLocalAboutData(prev => ({ ...prev, fullName: e.target.textContent || "" }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                    }
                  }}
                >
                  {localAboutData.fullName || "Sumit Santhosh Nair"}
                </h1>
                <p 
                  contentEditable
                  suppressContentEditableWarning
                  className="text-lg text-gray-300 mt-2 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                  onBlur={(e) => setLocalAboutData(prev => ({ ...prev, title: e.target.textContent || "" }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                    }
                  }}
                >
                  {localAboutData.title || "Full Stack Developer | Videographer"}
                </p>
                <p 
                  contentEditable
                  suppressContentEditableWarning
                  className="text-sm text-gray-400 mt-1 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500 flex items-center gap-1"
                  onBlur={(e) => setLocalAboutData(prev => ({ ...prev, location: e.target.textContent?.replace('📍 ', '') || "" }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                    }
                  }}
                >
                  <FiMapPin className="text-red-500 w-4 h-4" />
                  {localAboutData.location || "Bengaluru, Karnataka"}
                </p>
              </div>
            </div>
            {localAboutData.introduction && (
              <div className="text-lg text-gray-300 leading-relaxed">
                <p 
                  contentEditable
                  suppressContentEditableWarning
                  className="outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                  onBlur={(e) => setLocalAboutData(prev => ({ ...prev, introduction: e.target.textContent || "" }))}
                >
                  {localAboutData.introduction}
                </p>
              </div>
            )}
          </div>

          {/* Skills Section */}
          <div id="skills" className="space-y-8">
            <h2 className="text-3xl font-semibold text-gray-100">Skills</h2>
            {localAboutData.skills && localAboutData.skills.length > 0 ? (
              <ul className="list-disc list-inside mt-4 text-lg text-gray-300 space-y-2">
                {localAboutData.skills.map((skill, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <span
                      contentEditable
                      suppressContentEditableWarning
                      className="outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500 flex-1"
                      onBlur={(e) => {
                        const newSkills = [...(localAboutData.skills || [])];
                        newSkills[index] = e.target.textContent || "";
                        setLocalAboutData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          (e.target as HTMLElement).blur();
                        }
                      }}
                    >
                      {skill}
                    </span>
                    <button 
                      onClick={() => {
                        const newSkills = [...(localAboutData.skills || [])];
                        newSkills.splice(index, 1);
                        setLocalAboutData(prev => ({ ...prev, skills: newSkills }));
                      }}
                      className="p-1 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-400">No skills available</div>
            )}
            <button 
              onClick={() => 
                setLocalAboutData(prev => ({ 
                  ...prev, 
                  skills: [...(prev.skills || []), "New Skill"] 
                }))
              }
              className="flex items-center gap-2 px-4 py-2 bg-green-600/80 hover:bg-green-700 text-white rounded-lg transition-colors backdrop-blur-sm border border-green-500/30"
            >
              <FiPlus className="w-4 h-4" />
              Add Skill
            </button>
          </div>

          {/* Experience Section */}
          <div id="experience" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-gray-100">Experience</h2>
              <button 
                onClick={addExperience}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/80 hover:bg-green-700 text-white rounded-lg transition-colors backdrop-blur-sm border border-green-500/30"
              >
                <FiPlus className="w-4 h-4" />
                Add Experience
              </button>
            </div>
            
            {localAboutData.experience && localAboutData.experience.length > 0 ? (
              <div className="space-y-8">
                {localAboutData.experience.map((exp, expIndex) => (
                  <div key={expIndex} className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-600"></div>
                    
                    {/* Main Experience */}
                    <div className="relative pl-12">
                      {/* Timeline dot */}
                      <div className="absolute w-4 h-4 bg-red-600 rounded-full -left-2 top-6 border-2 border-gray-900"></div>
                      
                      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FiBriefcase className="text-red-500 w-5 h-5" />
                              <h3 
                                contentEditable
                                suppressContentEditableWarning
                                className="text-xl font-semibold text-white outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                                onBlur={(e) => updateExperience(expIndex, 'title', e.target.textContent || "")}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    (e.target as HTMLElement).blur();
                                  }
                                }}
                              >
                                {exp.title}
                              </h3>
                            </div>
                            <p 
                              contentEditable
                              suppressContentEditableWarning
                              className="text-lg text-gray-300 font-medium outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                              onBlur={(e) => updateExperience(expIndex, 'company', e.target.textContent || "")}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  (e.target as HTMLElement).blur();
                                }
                              }}
                            >
                              {exp.company}
                            </p>
                            <p 
                              contentEditable
                              suppressContentEditableWarning
                              className="text-sm text-gray-400 mb-3 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                              onBlur={(e) => updateExperience(expIndex, 'duration', e.target.textContent || "")}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  (e.target as HTMLElement).blur();
                                }
                              }}
                            >
                              {exp.duration}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => addPromotion(expIndex)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-600/80 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                            >
                              <FiPlus className="w-3 h-3" />
                              Promotion
                            </button>
                            <button 
                              onClick={() => removeExperience(expIndex)}
                              className="flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-700 text-white text-sm rounded transition-colors"
                            >
                              <FiTrash2 className="w-3 h-3" />
                              Remove
                            </button>
                          </div>
                        </div>
                        <p 
                          contentEditable
                          suppressContentEditableWarning
                          className="text-gray-300 leading-relaxed outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                          onBlur={(e) => updateExperience(expIndex, 'description', e.target.textContent || "")}
                        >
                          {exp.description}
                        </p>
                      </div>
                    </div>

                    {/* Promotions */}
                    {exp.promotions && exp.promotions.length > 0 && (
                      <div className="ml-12 mt-4 space-y-4">
                        {exp.promotions.map((promotion, promIndex) => (
                          <div key={promIndex} className="relative">
                            {/* Promotion Timeline dot */}
                            <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-6 top-4 border-2 border-gray-900"></div>
                            
                            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-600 ml-4">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                  <h4 
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="text-lg font-medium text-blue-300 outline-none border-2 border-transparent hover:border-blue-500/50 rounded p-1 transition-colors focus:border-blue-500"
                                    onBlur={(e) => updatePromotion(expIndex, promIndex, 'title', e.target.textContent || "")}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        (e.target as HTMLElement).blur();
                                      }
                                    }}
                                  >
                                    {promotion.title}
                                  </h4>
                                  <p 
                                    contentEditable
                                    suppressContentEditableWarning
                                    className="text-sm text-gray-400 outline-none border-2 border-transparent hover:border-blue-500/50 rounded p-1 transition-colors focus:border-blue-500"
                                    onBlur={(e) => updatePromotion(expIndex, promIndex, 'duration', e.target.textContent || "")}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.preventDefault();
                                        (e.target as HTMLElement).blur();
                                      }
                                    }}
                                  >
                                    {promotion.duration}
                                  </p>
                                </div>
                                <button 
                                  onClick={() => removePromotion(expIndex, promIndex)}
                                  className="flex items-center gap-1 px-2 py-1 bg-red-600/80 hover:bg-red-700 text-white text-xs rounded transition-colors"
                                >
                                  <FiTrash2 className="w-3 h-3" />
                                </button>
                              </div>
                              <p 
                                contentEditable
                                suppressContentEditableWarning
                                className="text-gray-300 text-sm leading-relaxed outline-none border-2 border-transparent hover:border-blue-500/50 rounded p-2 transition-colors focus:border-blue-500"
                                onBlur={(e) => updatePromotion(expIndex, promIndex, 'description', e.target.textContent || "")}
                              >
                                {promotion.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No experience data available</div>
            )}
          </div>

          {/* Education Section */}
          <div id="education" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-semibold text-gray-100">Education</h2>
              <button 
                onClick={() => 
                  setLocalAboutData(prev => ({ 
                    ...prev, 
                    education: [...(prev.education || []), {
                      degree: "Degree Name",
                      institution: "Institution Name",
                      year: "Year",
                      description: "Description (optional)"
                    }] 
                  }))
                }
                className="flex items-center gap-2 px-4 py-2 bg-green-600/80 hover:bg-green-700 text-white rounded-lg transition-colors backdrop-blur-sm border border-green-500/30"
              >
                <FiPlus className="w-4 h-4" />
                Add Education
              </button>
            </div>
            
            {localAboutData.education && localAboutData.education.length > 0 ? (
              <div className="text-lg text-gray-300 space-y-4">
                {localAboutData.education.map((edu, index) => (
                  <div key={index} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p 
                          contentEditable
                          suppressContentEditableWarning
                          className="font-semibold text-white outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                          onBlur={(e) => {
                            const newEdu = [...(localAboutData.education || [])];
                            newEdu[index] = { ...newEdu[index], institution: e.target.textContent || "" };
                            setLocalAboutData(prev => ({ ...prev, education: newEdu }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              (e.target as HTMLElement).blur();
                            }
                          }}
                        >
                          {edu.institution}
                        </p>
                        <p 
                          contentEditable
                          suppressContentEditableWarning
                          className="outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                          onBlur={(e) => {
                            const newEdu = [...(localAboutData.education || [])];
                            newEdu[index] = { ...newEdu[index], degree: e.target.textContent || "" };
                            setLocalAboutData(prev => ({ ...prev, education: newEdu }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              (e.target as HTMLElement).blur();
                            }
                          }}
                        >
                          {edu.degree}
                        </p>
                        <span 
                          contentEditable
                          suppressContentEditableWarning
                          className="text-gray-400 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                          onBlur={(e) => {
                            const newEdu = [...(localAboutData.education || [])];
                            newEdu[index] = { ...newEdu[index], year: e.target.textContent || "" };
                            setLocalAboutData(prev => ({ ...prev, education: newEdu }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              (e.target as HTMLElement).blur();
                            }
                          }}
                        >
                          {edu.year}
                        </span>
                        {edu.description && (
                          <p 
                            contentEditable
                            suppressContentEditableWarning
                            className="mt-2 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-1 transition-colors focus:border-red-500"
                            onBlur={(e) => {
                              const newEdu = [...(localAboutData.education || [])];
                              newEdu[index] = { ...newEdu[index], description: e.target.textContent || "" };
                              setLocalAboutData(prev => ({ ...prev, education: newEdu }));
                            }}
                          >
                            {edu.description}
                          </p>
                        )}
                      </div>
                      <button 
                        onClick={() => {
                          const newEdu = [...(localAboutData.education || [])];
                          newEdu.splice(index, 1);
                          setLocalAboutData(prev => ({ ...prev, education: newEdu }));
                        }}
                        className="flex items-center gap-1 px-3 py-1 bg-red-600/80 hover:bg-red-700 text-white text-sm rounded transition-colors"
                      >
                        <FiTrash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400">No education data available</div>
            )}
          </div>

          {/* Save Button */}
          <div className="text-center">
            <AdminButton
              onClick={() => handleSave('about', localAboutData, updateAbout)}
              loading={saving}
            >
              Save About Page Changes
            </AdminButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
