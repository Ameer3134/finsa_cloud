// Turns Firebase error codes into plain English for the login and signup forms.
export function friendlyAuthError(err: unknown): string {
  const code = typeof err === "object" && err && "code" in err ? String((err as { code: unknown }).code) : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/weak-password":
      return "Use a password with at least 8 characters.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "No internet connection. Check your network and try again.";
    case "not-configured":
      return "Accounts aren’t set up yet. Add your Firebase keys to .env.local (see the README).";
    default:
      return err instanceof Error && !code ? err.message : "Something went wrong. Please try again.";
  }
}
