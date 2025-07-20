import { useState, useEffect } from 'react';
import { 
  HomeData, 
  Project, 
  AboutData,
  WorkData,
  SocialLinks,
  SiteConfig,
  getHomeData,
  getProjects,
  getAboutData,
  getWorkData,
  getSocialLinks,
  getSiteConfig,
  updateHomeData,
  updateProject,
  updateAboutData,
  updateWorkData,
  updateSocialLinks,
  updateSiteConfig,
  addProject,
  deleteProject,
  uploadImage,
  getFeaturedProjects,
  getProjectsByCategory
} from '@/lib/firestore';

export const usePortfolioData = () => {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [workData, setWorkData] = useState<WorkData | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [homeResult, projectsResult, aboutResult, workResult, socialResult, configResult] = await Promise.all([
        getHomeData(),
        getProjects(),
        getAboutData(),
        getWorkData(),
        getSocialLinks(),
        getSiteConfig()
      ]);
      
      setHomeData(homeResult);
      setProjects(projectsResult);
      setAboutData(aboutResult);
      setWorkData(workResult);
      setSocialLinks(socialResult);
      setSiteConfig(configResult);
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update functions
  const updateHome = async (data: Partial<HomeData>) => {
    try {
      const success = await updateHomeData(data);
      if (success) {
        setHomeData(prev => prev ? { ...prev, ...data } : null);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating home data:', err);
      return false;
    }
  };

  const updateProjectData = async (id: string, data: Partial<Project>) => {
    try {
      const success = await updateProject(id, data);
      if (success) {
        setProjects(prev => 
          prev.map(p => p.id === id ? { ...p, ...data } : p)
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating project:', err);
      return false;
    }
  };

  const addNewProject = async (project: Omit<Project, 'id'>) => {
    try {
      const id = await addProject(project);
      if (id) {
        setProjects(prev => [...prev, { ...project, id }]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error adding project:', err);
      return false;
    }
  };

  const removeProject = async (id: string) => {
    try {
      const success = await deleteProject(id);
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting project:', err);
      return false;
    }
  };

  const updateWork = async (data: Partial<WorkData>) => {
    try {
      const success = await updateWorkData(data);
      if (success) {
        setWorkData(prev => prev ? { ...prev, ...data } : null);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating work data:', err);
      return false;
    }
  };

  const updateAbout = async (data: Partial<AboutData>) => {
    try {
      const success = await updateAboutData(data);
      if (success) {
        setAboutData(prev => prev ? { ...prev, ...data } : null);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating about data:', err);
      return false;
    }
  };

  const updateSocial = async (data: Partial<SocialLinks>) => {
    try {
      const success = await updateSocialLinks(data);
      if (success) {
        setSocialLinks(prev => prev ? { ...prev, ...data } : null);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating social links:', err);
      return false;
    }
  };

  const updateConfig = async (data: Partial<SiteConfig>) => {
    try {
      const success = await updateSiteConfig(data);
      if (success) {
        setSiteConfig(prev => prev ? { ...prev, ...data } : null);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error updating site config:', err);
      return false;
    }
  };

  const uploadImageFile = async (file: File, path: string) => {
    try {
      const url = await uploadImage(file, path);
      return url;
    } catch (err) {
      console.error('Error uploading image:', err);
      return null;
    }
  };

  // Helper functions for specific data fetching
  const fetchFeaturedProjects = async () => {
    try {
      const featuredProjects = await getFeaturedProjects();
      return featuredProjects;
    } catch (err) {
      console.error('Error fetching featured projects:', err);
      return [];
    }
  };

  const fetchProjectsByCategory = async (category: 'featured' | 'open-source' | 'freelance') => {
    try {
      const categoryProjects = await getProjectsByCategory(category);
      return categoryProjects;
    } catch (err) {
      console.error('Error fetching projects by category:', err);
      return [];
    }
  };

  return {
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
    uploadImageFile,
    fetchFeaturedProjects,
    fetchProjectsByCategory,
    refetch: fetchData
  };
};
