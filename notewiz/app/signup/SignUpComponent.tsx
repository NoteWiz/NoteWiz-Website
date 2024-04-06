import React from 'react';
import Image from 'next/image';
import Logo from './notewiz logo.png';
import Link from 'next/link';

const SignUpComponent = () => {

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-secondary">
      {/* Navbar */}
      <nav className="bg-[#FFE57D] py-4 fixed w-full z-10 top-12 rounded-full mx-auto max-w-4xl">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
          <div className='flex items-center'>
            <Link href='/'>
              <div className="flex items-center">
                <Image src={Logo} alt='Logo' width={30} height={30} />
                <span className="text-2xl font-semibold ml-2 hover:underline">NoteWiz</span>
              </div>
            </Link>
          </div>
          <Link href="#" className="text-lg hover:underline">Link 1</Link>
          <Link href="#" className="text-lg hover:underline">Link 2</Link>
          <Link href="#" className="text-lg hover:underline">Link 3</Link>
          <button className="bg-black hover:bg-white hover:text-black text-white rounded-full font-medium py-2 px-6">Call to Action</button>
        </div>
      </nav>

      {/* Logo */}
      <div className="mt-40 text-4xl font-bold">LOGO</div>

      {/* Sign-up */}
      <section className="flex-grow flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
              <input type="text" name="name" id="name" className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
              <input type="email" name="email" id="email" className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" className="w-full py-3 px-4 rounded border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg py-3">Sign up</button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700 dark:text-gray-400">Already have an account? <Link href="/login" className="text-pink-400 hover:underline font-bold">Sign in</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUpComponent;
