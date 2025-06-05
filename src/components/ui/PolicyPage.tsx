import React from 'react';

/**
 * PolicyPage component for consistent layout of policy pages
 * @param title - the main heading of the policy page
 * @param lastUpdated - optional last updated date text
 * @param children - page content
 */
export interface PolicyPageProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function PolicyPage({ title, lastUpdated, children }: PolicyPageProps) {
  return (
      <div className="min-h-screen bg-secondary py-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <div className="bg-primary rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-4xl font-bold text-primary mb-8">{title}</h1>
            
            <div className="prose prose-lg max-w-none text-primary">
              {lastUpdated && (
                <p className="lead text-xl text-secondary mb-8">
                  Last updated: {lastUpdated}
                </p>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
  );
}
