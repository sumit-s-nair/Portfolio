import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';

// Types
export interface HomeData {
  id?: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  profileImageUrl: string;
  featuredProjectsTitle: string;
  featuredProjectsDescription: string;
  updatedAt?: Timestamp;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
  featured: boolean;
  category: 'featured' | 'open-source' | 'freelance';
  technologies?: string[];
  updatedAt?: Timestamp;
}

export interface AboutData {
  id?: string;
  fullName: string;
  title: string;
  introduction: string;
  location: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    duration: string;
    description: string;
    promotions?: {
      title: string;
      duration: string;
      description: string;
    }[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
    description?: string;
  }[];
  updatedAt?: Timestamp;
}

export interface WorkData {
  id?: string;
  featuredProjectsDescription: string;
  openSourceDescription: string;
  freelanceDescription: string;
  updatedAt?: Timestamp;
}

export interface SocialLinks {
  id?: string;
  email?: string;
  linkedin: string;
  github: string;
  instagram: string;
  updatedAt?: Timestamp;
}

export interface SiteConfig {
  id?: string;
  siteName: string;
  location: string;
  tagline: string;
  updatedAt?: Timestamp;
}

// Home Data Functions
export const getHomeData = async (): Promise<HomeData | null> => {
  try {
    const docRef = doc(db, 'portfolio', 'home');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as HomeData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
};

export const updateHomeData = async (data: Partial<HomeData>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'portfolio', 'home');
    await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating home data:', error);
    return false;
  }
};

// Project Functions
export const getProjects = async (): Promise<Project[]> => {
  try {
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const addProject = async (project: Omit<Project, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...project,
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'projects', id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
    return true;
  } catch (error) {
    console.error('Error updating project:', error);
    return false;
  }
};

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, 'projects', id));
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
};

// About Data Functions
export const getAboutData = async (): Promise<AboutData | null> => {
  try {
    const docRef = doc(db, 'portfolio', 'about');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as AboutData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching about data:', error);
    return null;
  }
};

export const updateAboutData = async (data: Partial<AboutData>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'portfolio', 'about');
    await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating about data:', error);
    return false;
  }
};

// Work Data Functions
export const getWorkData = async (): Promise<WorkData | null> => {
  try {
    const docRef = doc(db, 'portfolio', 'work');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as WorkData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching work data:', error);
    return null;
  }
};

export const updateWorkData = async (data: Partial<WorkData>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'portfolio', 'work');
    await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating work data:', error);
    return false;
  }
};

// Social Links Functions
export const getSocialLinks = async (): Promise<SocialLinks | null> => {
  try {
    const docRef = doc(db, 'portfolio', 'socialLinks');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SocialLinks;
    }
    return null;
  } catch (error) {
    console.error('Error fetching social links:', error);
    return null;
  }
};

export const updateSocialLinks = async (data: Partial<SocialLinks>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'portfolio', 'social');
    await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating social links:', error);
    return false;
  }
};

// Site Config Functions
export const getSiteConfig = async (): Promise<SiteConfig | null> => {
  try {
    const docRef = doc(db, 'portfolio', 'config');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SiteConfig;
    }
    return null;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
};

export const updateSiteConfig = async (data: Partial<SiteConfig>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'portfolio', 'config');
    await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating site config:', error);
    return false;
  }
};

// Updated Project Functions with Categories
export const getProjectsByCategory = async (category: 'featured' | 'open-source' | 'freelance'): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, 'projects'), 
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const allProjects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    
    return allProjects.filter(project => project.category === category);
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, 'projects'), 
      orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    const allProjects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    
    return allProjects.filter(project => project.featured === true);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Image Upload Functions
export const uploadImage = async (file: File, path: string): Promise<string | null> => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export const deleteImage = async (path: string): Promise<boolean> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  return true;
} catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Gallery Storage Functions
export const addGalleryImage = async (file: File): Promise<string | null> => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `gallery/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    return null;
  }
};

export const fetchGalleryImages = async (): Promise<{ src: string; alt: string; name: string }[]> => {
  try {
    const { listAll } = await import('firebase/storage');
    const galleryRef = ref(storage, 'gallery');
    const res = await listAll(galleryRef);
    const images = await Promise.all(res.items.map(async (itemRef, idx) => {
      const url = await getDownloadURL(itemRef);
      return {
        src: url,
        alt: `Gallery Image ${idx + 1}`,
        name: itemRef.name
      };
    }));
    return images;
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

export const deleteGalleryImage = async (name: string): Promise<boolean> => {
  try {
    const storageRef = ref(storage, `gallery/${name}`);
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return false;
  }
};
