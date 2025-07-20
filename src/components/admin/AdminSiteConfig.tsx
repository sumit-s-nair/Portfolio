"use client";

import { FiGlobe, FiMapPin, FiMessageCircle } from 'react-icons/fi';
import { SiteConfig } from '@/lib/firestore';
import AdminButton from '@/components/AdminButton';
import AdminInput from '@/components/AdminInput';

interface AdminSiteConfigProps {
  localSiteConfig: Partial<SiteConfig>;
  setLocalSiteConfig: (data: Partial<SiteConfig> | ((prev: Partial<SiteConfig>) => Partial<SiteConfig>)) => void;
  saving: boolean;
  handleSave: (
    section: string,
    data: Partial<SiteConfig>,
    updateFunction: (data: Partial<SiteConfig>) => Promise<boolean>
  ) => Promise<void>;
  updateConfig: (data: Partial<SiteConfig>) => Promise<boolean>;
}

export default function AdminSiteConfig({
  localSiteConfig,
  setLocalSiteConfig,
  saving,
  handleSave,
  updateConfig
}: AdminSiteConfigProps) {
  return (
    <div className="space-y-8">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100 mb-6">Site Configuration</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <AdminInput
                label="Site Name"
                value={localSiteConfig.siteName || ""}
                onChange={(value) => setLocalSiteConfig(prev => ({ ...prev, siteName: value }))}
                placeholder="Sumit S Nair"
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <FiGlobe className="w-4 h-4 text-blue-500" />
                This appears in the browser title and header
              </div>
            </div>

            <div>
              <AdminInput
                label="Location"
                value={localSiteConfig.location || ""}
                onChange={(value) => setLocalSiteConfig(prev => ({ ...prev, location: value }))}
                placeholder="Bangalore, India"
              />
              <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <FiMapPin className="w-4 h-4 text-red-500" />
                Your current location or base
              </div>
            </div>
          </div>

          <div>
            <AdminInput
              label="Tagline"
              value={localSiteConfig.tagline || ""}
              onChange={(value) => setLocalSiteConfig(prev => ({ ...prev, tagline: value }))}
              type="textarea"
              placeholder="Building the future, one line of code at a time."
            />
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
              <FiMessageCircle className="w-4 h-4 text-green-500" />
              A brief description that represents you and your work
            </div>
          </div>

          {/* Preview Section */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg font-medium text-gray-200 mb-4">Site Preview</h3>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-white">
                  {localSiteConfig.siteName || "Your Site Name"}
                </h1>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <FiMapPin className="w-4 h-4" />
                  <span>{localSiteConfig.location || "Your Location"}</span>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {localSiteConfig.tagline || "Your tagline will appear here"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="border-t border-gray-600 pt-6">
            <h3 className="text-lg font-medium text-gray-200 mb-4">Additional Settings</h3>
            <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Theme:</span>
                  <span className="text-gray-300">Dark (Default)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Analytics:</span>
                  <span className="text-gray-300">Google Analytics (if configured)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SEO:</span>
                  <span className="text-gray-300">Optimized meta tags</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance:</span>
                  <span className="text-gray-300">Next.js optimized</span>
                </div>
              </div>
            </div>
          </div>

          <AdminButton
            onClick={() => handleSave('config', localSiteConfig, updateConfig)}
            loading={saving}
          >
            Save Site Configuration
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
