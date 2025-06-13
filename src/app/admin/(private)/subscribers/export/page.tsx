'use client';

import Button from '@/components/ui/Button';
import { NewsletterSubscriber } from '@/lib/supabase';
import Link from 'next/link';
import { useState } from 'react';
import { FaCheck, FaDownload } from 'react-icons/fa';
import { getSubscribers } from '../actions';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Function to export subscribers as CSV
  async function handleExportCSV() {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await getSubscribers();

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.subscribers || result.subscribers.length === 0) {
        throw new Error('No subscribers to export');
      }

      // Create CSV content
      const csvContent = generateCSV(result.subscribers);

      // Create a downloadable blob
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      // Create a temporary download link
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      link.href = url;
      link.setAttribute('download', `gophercamp-newsletter-subscribers-${dateStr}.csv`);
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err: Error | unknown) {
      console.error('Error exporting subscribers:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to export subscribers. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Generate CSV content from subscribers data
  function generateCSV(subscribers: NewsletterSubscriber[]): string {
    // CSV header
    const header = ['Email', 'Status', 'Subscribed Date', 'Confirmed Date'];

    // Format each row
    const rows = subscribers.map(subscriber => {
      const status = subscriber.confirmed ? 'Confirmed' : 'Pending';
      const subscribedDate = subscriber.subscribed_at
        ? new Date(subscriber.subscribed_at).toISOString()
        : '';
      const confirmedDate = subscriber.confirmed_at
        ? new Date(subscriber.confirmed_at).toISOString()
        : '';

      return [subscriber.email, status, subscribedDate, confirmedDate];
    });

    // Combine header and rows
    const csvContent = [header.join(','), ...rows.map(row => row.join(','))].join('\n');

    return csvContent;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Export Subscribers</h1>
        <Link href="/admin/subscribers">
          <Button variant="outline">Back to Subscribers</Button>
        </Link>
      </div>

      <div className="bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)] p-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-go-blue/10 rounded-full flex items-center justify-center">
                <FaDownload className="h-8 w-8 text-go-blue" />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-primary">
              Export Newsletter Subscribers
            </h2>
            <p className="mt-2 text-sm text-secondary">
              Download a CSV file containing all newsletter subscribers, including confirmation
              status and subscription dates.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded flex items-center">
              <FaCheck className="mr-2" /> Subscribers data has been exported successfully.
            </div>
          )}

          <Button
            onClick={handleExportCSV}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FaDownload className="h-4 w-4" />
            {loading ? 'Exporting...' : 'Export Subscribers as CSV'}
          </Button>
        </div>
      </div>
    </div>
  );
}
