import Dashboard from "@/components/Dashboard";
import Welcome from "@/components/Welcome";
import { getSessionUser } from "@/lib/session";

// One address, two views: the welcome page before login, the dashboard after.
export default async function HomePage() {
  const user = await getSessionUser();
  return user ? <Dashboard user={user} /> : <Welcome />;
}
