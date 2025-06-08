import Analytics from '@/components/Analytics';
import DefaultLayout from '@/components/layout/DefaultLayout';
import PageTracker from '@/components/PageTracker';

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <PageTracker />
      <DefaultLayout>{children}</DefaultLayout>
    </>
  );
}
