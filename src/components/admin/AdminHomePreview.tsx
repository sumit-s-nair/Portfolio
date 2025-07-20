"use client";

import Image from "next/image";
import { HomeData, Project } from "@/lib/firestore";
import { Carousel } from "@/components/Carousel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminButton from "@/components/AdminButton";

interface AdminHomePreviewProps {
  localHomeData: Partial<HomeData>;
  setLocalHomeData: (
    data: Partial<HomeData> | ((prev: Partial<HomeData>) => Partial<HomeData>)
  ) => void;
  projects: Project[];
  saving: boolean;
  handleImageUpload: (
    file: File,
    type: "profile" | "project",
    projectId?: string
  ) => Promise<void>;
  handleSave: (
    section: string,
    data: Partial<HomeData>,
    updateFunction: (data: Partial<HomeData>) => Promise<boolean>
  ) => Promise<void>;
  updateHome: (data: Partial<HomeData>) => Promise<boolean>;
}

export default function AdminHomePreview({
  localHomeData,
  setLocalHomeData,
  projects,
  saving,
  handleImageUpload,
  handleSave,
  updateHome,
}: AdminHomePreviewProps) {
  return (
    <>
      <Header />
      <main className="px-6 py-16 max-w-7xl mt-24 mx-auto">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1
            contentEditable
            suppressContentEditableWarning
            className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
            onBlur={(e) =>
              setLocalHomeData((prev) => ({
                ...prev,
                heroTitle: e.target.textContent || "",
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                (e.target as HTMLElement).blur();
              }
            }}
          >
            {localHomeData.heroTitle || "Hi, I'm Sumit Santhosh Nair"}
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            className="text-lg sm:text-xl text-gray-300 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
            onBlur={(e) =>
              setLocalHomeData((prev) => ({
                ...prev,
                heroSubtitle: e.target.textContent || "",
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                (e.target as HTMLElement).blur();
              }
            }}
          >
            {localHomeData.heroSubtitle ||
              "Programmer specialized in Web Development."}
          </p>
          <div className="mt-8">
            <button className="px-6 py-3 text-lg border-2 border-red-900 text-red-900 rounded-full hover:bg-red-900 hover:text-white transition-colors">
              Learn More About Me
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mt-32 text-center space-y-12">
          <h2 className="text-3xl font-semibold text-gray-100">
            Know More About Me
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12">
            <div className="w-48 h-48 rounded-full flex items-center justify-center text-white text-3xl font-bold relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-image-upload-home"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, "profile");
                }}
              />
              <label
                htmlFor="profile-image-upload-home"
                className="cursor-pointer block w-full h-full"
              >
                <Image
                  src={localHomeData.profileImageUrl || "/images/profile.jpg"}
                  alt="Profile Image"
                  width={240}
                  height={240}
                  className="rounded-full object-cover border-2 border-transparent hover:border-red-500/50 transition-colors"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm">Click to change</span>
                </div>
              </label>
            </div>
            <div className="max-w-lg text-center sm:text-left">
              <p
                contentEditable
                suppressContentEditableWarning
                className="text-lg text-gray-300 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
                onBlur={(e) =>
                  setLocalHomeData((prev) => ({
                    ...prev,
                    aboutText: e.target.textContent || "",
                  }))
                }
              >
                {localHomeData.aboutText ||
                  `I'm a second-year engineering student passionate about technology and creating impactful digital experiences. Specializing in web development with the MERN stack and Flutter, and some experience in Python. I develop websites for clubs like GronIT and Nexus, collaborate on projects, and help teammates solve challenges. As a videographer for Pixels, I've refined my creativity by covering campus events. I'm eager to apply my skills and creativity to new opportunities for growth and contribution.`}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="mt-32 text-center space-y-12">
          <h2
            contentEditable
            suppressContentEditableWarning
            className="text-3xl font-semibold text-gray-100 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
            onBlur={(e) =>
              setLocalHomeData((prev) => ({
                ...prev,
                featuredProjectsTitle: e.target.textContent || "",
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                (e.target as HTMLElement).blur();
              }
            }}
          >
            {localHomeData.featuredProjectsTitle || "Featured Projects"}
          </h2>
          <div className="mt-8">
            {projects && projects.length > 0 ? (
              <Carousel
                images={projects
                  .filter((project) => project.featured)
                  .map((project) => ({
                    src: project.imageUrl,
                    alt: project.name,
                  }))}
                indicator="line"
                aspectRatio="16 / 9"
              />
            ) : (
              <div className="text-gray-400">No projects available</div>
            )}
          </div>
          <div className="mt-8">
            <p
              contentEditable
              suppressContentEditableWarning
              className="text-lg text-gray-400 outline-none border-2 border-transparent hover:border-red-500/50 rounded p-2 transition-colors focus:border-red-500"
              onBlur={(e) =>
                setLocalHomeData((prev) => ({
                  ...prev,
                  featuredProjectsDescription: e.target.textContent || "",
                }))
              }
            >
              {localHomeData.featuredProjectsDescription ||
                (projects && projects.length > 0 ? (
                  <>
                    Explore my projects like{" "}
                    {projects
                      .filter((project) => project.featured)
                      .slice(0, 3)
                      .map((project, index) => (
                        <span key={project.id}>
                          <strong>{project.name}</strong>
                          {index <
                            Math.min(
                              projects.filter((project) => project.featured)
                                .length,
                              3
                            ) -
                              1 &&
                            (index ===
                            Math.min(
                              projects.filter((project) => project.featured)
                                .length,
                              3
                            ) -
                              2
                              ? " and "
                              : ", ")}
                        </span>
                      ))}
                    .
                  </>
                ) : (
                  "Check back soon for exciting projects!"
                ))}
            </p>
            <div className="mt-6">
              <button className="px-6 py-3 text-lg border-2 border-red-900 text-red-900 rounded-full hover:bg-red-900 hover:text-white transition-colors">
                See All Work
              </button>
            </div>
          </div>
        </section>

        {/* Save Button for Home Page */}
        <div className="mt-12 text-center">
          <AdminButton
            onClick={() => handleSave("home", localHomeData, updateHome)}
            loading={saving}
          >
            Save Home Page Changes
          </AdminButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
