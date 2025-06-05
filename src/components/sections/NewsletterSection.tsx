"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import { validateEmail, subscribeToNewsletter } from '@/lib/forms';
import { trackNewsletterSignup, trackContactClick, trackSocialClick } from '@/lib/analytics';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    // Form validation using our utility function
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Use our subscription function
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        setIsSubmitted(true);
        setSuccessMessage(result.message);
        
        // Track successful newsletter signup
        trackNewsletterSignup(email);
        
        setEmail('');
        
        // Reset success message after some time
        setTimeout(() => {
          setIsSubmitted(false);
          setSuccessMessage('');
        }, 5000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-go-blue-darker">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-go-black mb-4">Stay Informed</h2>
              <p className="text-gray-600">
                Sign up for updates about Gophercamp 2026 including speaker announcements,
                ticket sales, and more.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-go-blue focus:border-transparent"
                  disabled={isSubmitting || isSubmitted}
                />
                
                <div className="mt-4 md:absolute md:right-1 md:top-1 md:mt-0">
                  <Button
                    type="submit"
                    variant="primary" 
                    size="md"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? 'Submitting...' : isSubmitted ? 'Subscribed!' : 'Subscribe'}
                  </Button>
                </div>
              </div>
              
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              
              {isSubmitted && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-sm mt-2"
                >
                  {successMessage || "Thank you for subscribing! We'll keep you updated about the event."}
                </motion.p>
              )}
              
              <p className="text-gray-500 text-xs mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-bold text-lg mb-2 text-go-black">Contact Us</h3>
                <p className="text-gray-600">
                  <a 
                    href="mailto:info@gophercamp.cz" 
                    className="text-go-blue hover:text-go-blue-dark"
                    onClick={() => trackContactClick('email')}
                  >
                    info@gophercamp.cz
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 text-go-black">Follow Us</h3>
                <p className="text-gray-600">
                  Stay connected on 
                  <a 
                    href="https://twitter.com/gophercamp" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-go-blue hover:text-go-blue-dark ml-1"
                    onClick={() => trackSocialClick('twitter')}
                  >
                    Twitter
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-2 text-go-black">Location</h3>
                <p className="text-gray-600">Prague, Czech Republic</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
