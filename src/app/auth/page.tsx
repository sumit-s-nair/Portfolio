
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  // Simple auth check for redirect
  if (user) {
    router.replace('/admin');
    return null;
  }

  const handleGoogleSignIn = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      // Redirect handled above
    } catch {
      setError('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Always show sign-in UI
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white mb-2">
              Admin Login
            </h2>
            <p className="text-gray-300 mb-8">
              Sign in to access the portfolio admin panel
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-blue-700/50 hover:bg-blue-600/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <LoadingSpinner size="small" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              If your reading this, you probably shouldn&apos;t be here.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}