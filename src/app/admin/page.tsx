"use client";

import { useState, useEffect } from 'react';
import { FaCheck, FaCross } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { HomeData, AboutData, WorkData, SocialLinks, SiteConfig, Project } from '@/lib/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import AdminHomePreview from '@/components/admin/AdminHomePreview';
import AdminAboutPreview from '@/components/admin/AdminAboutPreview';
import AdminWorkPreview from '@/components/admin/AdminWorkPreview';
import AdminGalleryPreview from '@/components/admin/AdminGalleryPreview';
import { addGalleryImage, fetchGalleryImages, deleteGalleryImage } from '@/lib/firestore';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminSocialLinks from '@/components/admin/AdminSocialLinks';
import AdminSiteConfig from '@/components/admin/AdminSiteConfig';

export default function AdminPage() {
  const { signOut } = useAuth();
  const {
    homeData,
    projects,
    aboutData,
    workData,
    socialLinks,
    siteConfig,
    loading,
    error,
    updateHome,
    updateProjectData,
    addNewProject,
    removeProject,
    updateAbout,
    updateWork,
    updateSocial,
    updateConfig,
    uploadImageFile
  } = usePortfolioData();

  // Local state for all data sections
  const [localHomeData, setLocalHomeData] = useState<Partial<HomeData>>({});
  const [localAboutData, setLocalAboutData] = useState<Partial<AboutData>>({});
  const [localWorkData, setLocalWorkData] = useState<Partial<WorkData>>({});
  const [localSocialLinks, setLocalSocialLinks] = useState<Partial<SocialLinks>>({});
  const [localSiteConfig, setLocalSiteConfig] = useState<Partial<SiteConfig>>({});
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt: string; name: string }[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [activeTab, setActiveTab] = useState('home');
  // Gallery image fetch
  useEffect(() => {
    if (activeTab === 'gallery') {
      setGalleryLoading(true);
      fetchGalleryImages()
        .then(images => {
          setGalleryImages(images);
          setGalleryError(null);
        })
        .catch(() => {
          setGalleryError('Error fetching gallery images');
        })
        .finally(() => setGalleryLoading(false));
    }
  }, [activeTab]);

  // Gallery image upload
  const handleGalleryImageUpload = async (file: File) => {
    setGalleryLoading(true);
    try {
      await addGalleryImage(file);
      const images = await fetchGalleryImages();
      setGalleryImages(images);
      setGalleryError(null);
      setSaveStatus('success');
    } catch {
      setGalleryError('Error uploading image');
      setSaveStatus('error');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Gallery image delete
  const handleGalleryImageDelete = async (name: string) => {
    setGalleryLoading(true);
    try {
      await deleteGalleryImage(name);
      const images = await fetchGalleryImages();
      setGalleryImages(images);
      setGalleryError(null);
      setSaveStatus('success');
    } catch {
      setGalleryError('Error deleting image');
      setSaveStatus('error');
    } finally {
      setGalleryLoading(false);
    }
  };

  // Sync with fetched data
  useEffect(() => {
    if (homeData) {
      setLocalHomeData({
        heroTitle: homeData.heroTitle || "",
        heroSubtitle: homeData.heroSubtitle || "",
        aboutText: homeData.aboutText || "",
        profileImageUrl: homeData.profileImageUrl || "",
        featuredProjectsTitle: homeData.featuredProjectsTitle || "Featured Projects",
        featuredProjectsDescription: homeData.featuredProjectsDescription || ""
      });
    }
  }, [homeData]);

  useEffect(() => {
    if (aboutData) {
      setLocalAboutData({
        fullName: aboutData.fullName || "Sumit Santhosh Nair",
        title: aboutData.title || "Full Stack Developer | Videographer",
        introduction: aboutData.introduction || "",
        location: aboutData.location || "Bengaluru, Karnataka",
        skills: aboutData.skills || [],
        experience: aboutData.experience || [],
        education: aboutData.education || []
      });
    }
  }, [aboutData]);

  useEffect(() => {
    if (workData) {
      setLocalWorkData({
        featuredProjectsDescription: workData.featuredProjectsDescription || "",
        openSourceDescription: workData.openSourceDescription || "",
        freelanceDescription: workData.freelanceDescription || ""
      });
    }
  }, [workData]);

  useEffect(() => {
    if (socialLinks) {
      setLocalSocialLinks({
        linkedin: socialLinks.linkedin || "",
        github: socialLinks.github || "",
        instagram: socialLinks.instagram || ""
      });
    }
  }, [socialLinks]);

  useEffect(() => {
    if (siteConfig) {
      setLocalSiteConfig({
        siteName: siteConfig.siteName || "Sumit S Nair",
        location: siteConfig.location || "Bangalore, India",
        tagline: siteConfig.tagline || "Building the future, one line of code at a time."
      });
    }
  }, [siteConfig]);

  useEffect(() => {
    if (projects) {
      setLocalProjects(projects);
    }
  }, [projects]);

  // Generic save function
  function handleSave<T>(
    section: string,
    data: T,
    updateFunction: (data: T) => Promise<boolean>
  ): Promise<void> {
    setSaving(true);
    setSaveStatus('idle');
    return updateFunction(data)
      .then(success => {
        setSaveStatus(success ? 'success' : 'error');
      })
      .catch(() => {
        setSaveStatus('error');
      })
      .finally(() => {
        setSaving(false);
      });
  }

  const handleImageUpload = async (file: File, type: 'profile' | 'project', projectId?: string) => {
    setSaving(true);
    try {
      const path = type === 'profile' ? 
        `portfolio/profile-${Date.now()}` : 
        `portfolio/projects/${projectId}-${Date.now()}`;
      
      const imageUrl = await uploadImageFile(file, path);
      if (imageUrl) {
        if (type === 'profile') {
          const newData = { ...localHomeData, profileImageUrl: imageUrl };
          setLocalHomeData(newData);
          await updateHome(newData);
        } else if (projectId) {
          await updateProjectData(projectId, { imageUrl });
        }
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const handleProjectUpdate = async (projectId: string, field: string, value: string | boolean) => {
    try {
      await updateProjectData(projectId, { [field]: value });
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    }
  };

  const handleAddProject = async () => {
    const newProject: Omit<Project, 'id'> = {
      name: "New Project",
      description: "Project description",
      imageUrl: "/images/assets/placeholder.png",
      link: "#",
      order: localProjects.length,
      featured: false,
      category: 'featured',
      technologies: []
    };
    
    try {
      await addNewProject(newProject);
      setSaveStatus('success');
    } catch {
      setSaveStatus('error');
    }
  };

  // ...existing code...

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
          <LoadingSpinner size="large" />
          <p className="text-gray-300 mt-4 text-center">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-red-500/50 text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-4 text-red-400">Error Loading Data</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'work', label: 'Work Page' },
    { id: 'gallery', label: 'Gallery Page' },
    { id: 'projects', label: 'Projects' },
    { id: 'social', label: 'Social Links' },
    { id: 'config', label: 'Site Config' }
  ];

  return (
    <>
      <Header />
      <main className="px-6 py-16 max-w-7xl mt-24 mx-auto">
        {/* Admin Header */}
        <div className="mb-8 bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Portfolio Admin Dashboard</h1>
              <p className="text-gray-300 mt-2">Manage your portfolio content with real-time preview</p>
            </div>
            <button
              onClick={signOut}
              className="px-6 py-3 bg-red-600/80 hover:bg-red-700 text-white rounded-lg transition-colors backdrop-blur-sm border border-red-500/30"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Save Status */}
        {saveStatus !== 'idle' && (
          <div className={`mb-6 p-4 rounded-lg backdrop-blur-sm border ${
            saveStatus === 'success' 
              ? 'bg-green-900/30 text-green-400 border-green-500/50' 
              : 'bg-red-900/30 text-red-400 border-red-500/50'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {saveStatus === 'success' ? <FaCheck/> : <FaCross />}
              </span>
              <span className="font-medium">
                {saveStatus === 'success' ? 'Changes saved successfully!' : 'Error saving changes'}
              </span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                  activeTab === tab.id 
                    ? 'bg-red-600/80 text-white border border-red-500/50 backdrop-blur-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Home Page Content */}
        {activeTab === 'home' && (
          <AdminHomePreview
            localHomeData={localHomeData}
            setLocalHomeData={setLocalHomeData}
            projects={projects}
            saving={saving}
            handleImageUpload={handleImageUpload}
            handleSave={handleSave}
            updateHome={updateHome}
          />
        )}

        {/* About Page Content */}
        {activeTab === 'about' && (
          <AdminAboutPreview
            localHomeData={localHomeData}
            localAboutData={localAboutData}
            setLocalAboutData={setLocalAboutData}
            saving={saving}
            handleImageUpload={handleImageUpload}
            handleSave={handleSave}
            updateAbout={updateAbout}
          />
        )}

        {/* Work Page Content */}
        {activeTab === 'work' && (
          <AdminWorkPreview
            localWorkData={localWorkData}
            setLocalWorkData={setLocalWorkData}
            projects={projects}
            saving={saving}
            handleSave={handleSave}
            updateWork={updateWork}
          />
        )}

        {/* Gallery Page Content */}
        {activeTab === 'gallery' && (
          <AdminGalleryPreview
            localSiteConfig={localSiteConfig}
            setLocalSiteConfig={setLocalSiteConfig}
            saving={galleryLoading}
            handleSave={handleSave}
            updateConfig={updateConfig}
            galleryImages={galleryImages}
            galleryError={galleryError}
            handleGalleryImageUpload={handleGalleryImageUpload}
            handleGalleryImageDelete={handleGalleryImageDelete}
          />
        )}

        {/* Projects Management */}
        {activeTab === 'projects' && (
          <AdminProjects
            localProjects={localProjects}
            saving={saving}
            handleImageUpload={handleImageUpload}
            handleProjectUpdate={handleProjectUpdate}
            handleAddProject={handleAddProject}
            removeProject={async (projectId: string) => { await removeProject(projectId); }}
          />
        )}

        {/* Social Links */}
        {activeTab === 'social' && (
          <AdminSocialLinks
            localSocialLinks={localSocialLinks}
            setLocalSocialLinks={setLocalSocialLinks}
            saving={saving}
            handleSave={handleSave}
            updateSocial={updateSocial}
          />
        )}

        {/* Site Configuration */}
        {activeTab === 'config' && (
          <AdminSiteConfig
            localSiteConfig={localSiteConfig}
            setLocalSiteConfig={setLocalSiteConfig}
            saving={saving}
            handleSave={handleSave}
            updateConfig={updateConfig}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
