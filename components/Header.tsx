import { getSessionUser } from "@/lib/session";
import NavBar from "./NavBar";

// Finds out who is logged in, then hands the details to the menu bar.
export default async function Header() {
  const user = await getSessionUser();
  return <NavBar user={user ? { name: user.name, isAdmin: user.isAdmin } : null} />;
}
