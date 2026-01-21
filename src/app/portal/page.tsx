import { redirect } from 'next/navigation';

export default function AdminDashboardRedirect() {
  redirect('/portal/submissions?type=brand');
}
