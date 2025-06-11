import AdminDashboard from '@/components/admin/AdminDashboard';
import ProtectedRoute from '@/components/admin/ProtectedRoute'; // Adjust path

function AdminDashboardPage() {
  return <AdminDashboard />;
}

// Wrap the page with the ProtectedRoute component for security
export default function ProtectedAdminPage() {
  return (
    <ProtectedRoute>
      <AdminDashboardPage />
    </ProtectedRoute>
  );
}
