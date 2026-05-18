import { dummyDashboardData } from "@/assets/assets";
import Dashboard from "@/components/educator/Dashboard";

export default function page() {
  if (!dummyDashboardData) {
    return <div>Dashboard data not found</div>;
  }

  return <Dashboard dashboardData={dummyDashboardData} />;
}
