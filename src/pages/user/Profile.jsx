import UserLayout from "../../layouts/UserLayout";
import PlaceholderPage from "../common/PlaceholderPage";

const Profile = () => (
  <UserLayout>
    <PlaceholderPage
      title="My Profile"
      description="Manage your account and vehicle information."
    />
  </UserLayout>
);

export default Profile;