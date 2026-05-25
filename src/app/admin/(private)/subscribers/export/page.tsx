'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { NewsletterSubscriber } from '@/lib/newsletter-store';
import { useState } from 'react';
import { FaCheck, FaDownload } from 'react-icons/fa';
import { getSubscribers } from '../actions';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleExportCSV() {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await getSubscribers();
      if (result.error) throw new Error(result.error);
      if (!result.subscribers || result.subscribers.length === 0) {
        throw new Error('No subscribers to export');
      }

      const csvContent = generateCSV(result.subscribers);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      link.href = url;
      link.setAttribute('download', `gophercamp-newsletter-subscribers-${dateStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to export subscribers. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function generateCSV(subscribers: NewsletterSubscriber[]): string {
    const header = ['Email', 'Status', 'Subscribed Date', 'Confirmed Date', 'Unsubscribed Date'];
    const rows = subscribers.map(subscriber => {
      let status = 'Pending';
      if (subscriber.unsubscribed) status = 'Unsubscribed';
      else if (subscriber.confirmed) status = 'Confirmed';

      return [
        subscriber.email,
        status,
        subscriber.subscribed_at ? new Date(subscriber.subscribed_at).toISOString() : '',
        subscriber.confirmed_at ? new Date(subscriber.confirmed_at).toISOString() : '',
        subscriber.unsubscribed_at ? new Date(subscriber.unsubscribed_at).toISOString() : '',
      ];
    });
    return [header.join(','), ...rows.map(row => row.join(','))].join('\n');
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
