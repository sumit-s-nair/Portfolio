"use client";

import { FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';
import { SocialLinks } from '@/lib/firestore';
import AdminButton from '@/components/AdminButton';
import AdminInput from '@/components/AdminInput';

interface AdminSocialLinksProps {
  localSocialLinks: Partial<SocialLinks>;
  setLocalSocialLinks: (data: Partial<SocialLinks> | ((prev: Partial<SocialLinks>) => Partial<SocialLinks>)) => void;
  saving: boolean;
  handleSave: (
    section: string,
    data: Partial<SocialLinks>,
    updateFunction: (data: Partial<SocialLinks>) => Promise<boolean>
  ) => Promise<void>;
  updateSocial: (data: Partial<SocialLinks>) => Promise<boolean>;
}

export default function AdminSocialLinks({
  localSocialLinks,
  setLocalSocialLinks,
  saving,
  handleSave,
  updateSocial
}: AdminSocialLinksProps) {
  return (
    <div className="space-y-8">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Social Links</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AdminInput
                label="LinkedIn URL"
                value={localSocialLinks.linkedin || ""}
                onChange={(value) => setLocalSocialLinks(prev => ({ ...prev, linkedin: value }))}
                type="url"
                placeholder="https://www.linkedin.com/in/your-profile"
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <FiLinkedin className="w-4 h-4 text-blue-500" />
                Your professional LinkedIn profile
              </div>
            </div>

            <div>
              <AdminInput
                label="GitHub URL"
                value={localSocialLinks.github || ""}
                onChange={(value) => setLocalSocialLinks(prev => ({ ...prev, github: value }))}
                type="url"
                placeholder="https://github.com/your-username"
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <FiGithub className="w-4 h-4 text-gray-400" />
                Your GitHub profile showcasing your repositories
              </div>
            </div>

            <div>
              <AdminInput
                label="Instagram URL"
                value={localSocialLinks.instagram || ""}
                onChange={(value) => setLocalSocialLinks(prev => ({ ...prev, instagram: value }))}
                type="url"
                placeholder="https://www.instagram.com/your-profile"
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <FiInstagram className="w-4 h-4 text-pink-500" />
                Your Instagram profile for personal content
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg font-medium text-gray-200 mb-4">Social Links Preview</h3>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              <div className="flex gap-4">
                {localSocialLinks.linkedin && (
                  <a
                    href={localSocialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                  >
                    <FiLinkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {localSocialLinks.github && (
                  <a
                    href={localSocialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                )}
                {localSocialLinks.instagram && (
                  <a
                    href={localSocialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-pink-600/20 text-pink-400 rounded-lg hover:bg-pink-600/30 transition-colors"
                  >
                    <FiInstagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
              {!localSocialLinks.linkedin && !localSocialLinks.github && !localSocialLinks.instagram && (
                <div className="text-gray-500 text-center py-4">
                  Add social links to see preview
                </div>
              )}
            </div>
          </div>

          <AdminButton
            onClick={() => handleSave('social', localSocialLinks, updateSocial)}
            loading={saving}
          >
            Save Social Links
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
