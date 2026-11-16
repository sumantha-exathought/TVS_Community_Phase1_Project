import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import { apiRequest } from "../../lib/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Sign in to view your profile.");
      return;
    }

    apiRequest("/api/community/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((result) => setProfile(result.user))
      .catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <UserLayout>
      <main className="management-page min-w-0 p-4 sm:p-6 lg:p-8">
        <section className="max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-500">
            Your account details from the community profile.
          </p>
          {error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}
          {!profile && !error && <p className="mt-5 text-sm text-slate-500">Loading profile...</p>}
          {profile && (
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Full name", profile.full_name],
                ["Email", profile.email],
                ["Mobile", profile.mobile],
                ["Status", profile.status],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm font-medium text-slate-500">{label}</dt>
                  <dd className="mt-1 text-sm text-slate-900">{value || "Not provided"}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </main>
    </UserLayout>
  );
};

export default Profile;