/**
 * Loading spinner for the admin section
 */
export default function AdminLoadingSpinner() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-primary">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-go-blue"></div>
    </div>
  );
}
