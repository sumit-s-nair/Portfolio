'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Carousel } from '@/components/Carousel';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Header />

      <main className='px-6 py-16 max-w-7xl mt-24 mx-auto'>
        {/* Hero Section */}
        <section className='text-center space-y-8'>
          <h1 className='text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl'>
            Hi, I&apos;m Sumit Santhosh Nair
          </h1>
          <p className='text-lg sm:text-xl text-gray-300'>
            Programmer specialized in Web Development.
          </p>
          <div className='mt-8'>
            <Link
              href='#about'
              className='px-6 py-3 text-lg border-2 border-red-900 text-red-900 rounded-full hover:bg-red-900 hover:text-white transition-colors'
            >
              Learn More About Me
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id='about' className='mt-32 text-center space-y-12'>
          <h2 className='text-3xl font-semibold text-gray-100'>Know More About Me</h2>
          <div className='flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-12'>
            <div className='w-48 h-48 rounded-full flex items-center justify-center text-white text-3xl font-bold'>
              <Image
                src='/images/profile.jpg'
                alt='Profile Image'
                width={240}
                height={240}
                className='rounded-full'
              />
            </div>
            <div className='max-w-lg text-center sm:text-left'>
              <p className='text-lg text-gray-300'>
                I&apos;m a second-year engineering student passionate about technology
                and creating impactful digital experiences. Specializing in web
                development with the MERN stack and Flutter, and some experience in
                Python. I develop websites for clubs like GronIT and Nexus, collaborate
                on projects, and help teammates solve challenges. As a videographer for
                Pixels, I&apos;ve refined my creativity by covering campus events. I&apos;m
                eager to apply my skills and creativity to new opportunities for growth
                and contribution.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className='mt-32 text-center space-y-12'>
          <h2 className='text-3xl font-semibold text-gray-100'>Featured Projects</h2>
          <div className='mt-8'>
            <Carousel
              images={[
                { src: '/images/assets/QuantumRepo.png', alt: 'Quantum Repo' },
                { src: '/images/assets/NexusPES.png', alt: 'Nexus' },
                { src: '/images/assets/QuillCove.png', alt: 'Quillcove' },
              ]}
              indicator='line'
              aspectRatio='16 / 9'
            />
          </div>
          <div className='mt-8'>
            <p className='text-lg text-gray-400'>
              Explore my projects like <strong>Quantum Repo</strong>, a GitHub
              clone; <strong>Nexus</strong>, a 3D project with Three.js; and{' '}
              <strong>Quillcove</strong>, a seamless notes app.
            </p>
            <div className='mt-6'>
              <Link
                href='/work'
                className='px-6 py-3 text-lg border-2 border-red-900 text-red-900 rounded-full hover:bg-red-900 hover:text-white transition-colors'
              >
                See All Work
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
