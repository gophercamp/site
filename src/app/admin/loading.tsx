/**
 * Loading component for admin pages
 * Displays a centered spinner while content is being loaded
 */
export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-go-blue/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-go-blue rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <p className="text-secondary text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
