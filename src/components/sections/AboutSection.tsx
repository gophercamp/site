"use client";

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-go-black mb-6">About Gophercamp</h2>
          <p className="text-lg text-gray-600">
            The Go programming language conference in the Czech Republic
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-100"
          >
            <div className="w-12 h-12 bg-go-blue/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-go-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-go-black">Inspiring Talks</h3>
            <p className="text-gray-600">
              Join industry experts and Go enthusiasts for talks covering everything from fundamentals to cutting-edge applications of Go.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-100"
          >
            <div className="w-12 h-12 bg-go-blue/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-go-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-go-black">Workshops</h3>
            <p className="text-gray-600">
              Deepen your knowledge with hands-on workshops led by Go experts, covering best practices, tools, and techniques.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-gray-50 p-6 rounded-lg border border-gray-100"
          >
            <div className="w-12 h-12 bg-go-blue/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-go-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-go-black">Networking</h3>
            <p className="text-gray-600">
              Connect with a vibrant community of Go developers, share experiences, and forge valuable professional relationships.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 bg-go-blue/5 p-6 md:p-8 rounded-lg border border-go-blue/10 relative overflow-hidden"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-go-black mb-4">Past Success</h3>
            <p className="text-gray-600 mb-4">
              Following the tremendous success of Gophercamp 2025, the first Go conference in the Czech Republic, 
              we're excited to bring you an even more engaging experience in 2026.
            </p>
            <p className="text-gray-600">
              Stay tuned for announcements about keynote speakers, agenda, and early bird ticket opportunities.
            </p>
          </div>
          
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-go-blue/10 rounded-full"></div>
          <div className="absolute right-20 -bottom-20 w-60 h-60 bg-go-blue/5 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}
