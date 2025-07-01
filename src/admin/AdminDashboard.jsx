import AddProject from "../components/admin/AddProject";
import AddClient from "../components/admin/AddClient";
import ViewContacts from "../components/admin/ViewContacts";
import ViewSubscribers from "../components/admin/ViewSubscribers";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddProject />
        <AddClient />
      </div>
      <div className="mt-10">
        <ViewContacts />
      </div>
      <div className="mt-10">
        <ViewSubscribers />
      </div>
    </div>
  );
}
