import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h2>Welcome Admin</h2>
        <p>Select an option from the sidebar to manage your system.</p>
      </div>
    </div>
  );
}
