import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FileText, Target, Trophy, Settings } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

type AdminPage = "overview" | "projects" | "interventions" | "milestones" | "content";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState<AdminPage>("overview");

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== "admin") {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--pastel-blue)] to-[var(--pastel-purple)] dark:from-slate-900 dark:to-slate-800">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 shadow-lg border-r border-slate-200 dark:border-slate-700 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--brand-purple)] to-[var(--brand-pink)] flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <h1 className="font-bold text-slate-900 dark:text-white">SYGO</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active={currentPage === "overview"}
            onClick={() => setCurrentPage("overview")}
          />
          <NavItem
            icon={<FileText size={20} />}
            label="Projects"
            active={currentPage === "projects"}
            onClick={() => setCurrentPage("projects")}
          />
          <NavItem
            icon={<Target size={20} />}
            label="Interventions"
            active={currentPage === "interventions"}
            onClick={() => setCurrentPage("interventions")}
          />
          <NavItem
            icon={<Trophy size={20} />}
            label="Milestones"
            active={currentPage === "milestones"}
            onClick={() => setCurrentPage("milestones")}
          />
          <NavItem
            icon={<Settings size={20} />}
            label="Content"
            active={currentPage === "content"}
            onClick={() => setCurrentPage("content")}
          />
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{user.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="w-full bg-[var(--brand-pink)] hover:bg-[#E01B6E] text-white"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentPage === "overview" && <OverviewPage />}
        {currentPage === "projects" && <ProjectsPage />}
        {currentPage === "interventions" && <InterventionsPage />}
        {currentPage === "milestones" && <MilestonesPage />}
        {currentPage === "content" && <ContentPage />}
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        active
          ? "bg-[var(--brand-purple)] text-white"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function OverviewPage() {
  const projectsQuery = trpc.projects.list.useQuery();
  const interventionsQuery = trpc.interventions.list.useQuery();
  const milestonesQuery = trpc.milestones.list.useQuery();
  const donationsQuery = trpc.donations.list.useQuery();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          label="Projects"
          value={projectsQuery.data?.length || 0}
          icon="📁"
          color="from-blue-400 to-blue-600"
        />
        <StatCard
          label="Interventions"
          value={interventionsQuery.data?.length || 0}
          icon="🎯"
          color="from-purple-400 to-purple-600"
        />
        <StatCard
          label="Milestones"
          value={milestonesQuery.data?.length || 0}
          icon="🏆"
          color="from-yellow-400 to-yellow-600"
        />
        <StatCard
          label="Donations"
          value={donationsQuery.data?.length || 0}
          icon="💝"
          color="from-pink-400 to-pink-600"
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="bg-[var(--brand-blue)] hover:bg-[#3BA8D9] text-white">
            + Add New Project
          </Button>
          <Button className="bg-[var(--brand-purple)] hover:bg-[#6A0DAD] text-white">
            + Add New Intervention
          </Button>
          <Button className="bg-[var(--brand-yellow)] hover:bg-[#E6C200] text-slate-900">
            + Add New Milestone
          </Button>
          <Button className="bg-[var(--brand-pink)] hover:bg-[#E01B6E] text-white">
            + Edit Content
          </Button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
      </div>
    </div>
  );
}

function ProjectsPage() {
  const projectsQuery = trpc.projects.list.useQuery();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projects</h1>
        <Button className="bg-[var(--brand-blue)] hover:bg-[#3BA8D9] text-white">+ Add Project</Button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {projectsQuery.data?.map((project) => (
              <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <td className="px-6 py-4 text-slate-900 dark:text-white">{project.title}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{project.category || "-"}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!projectsQuery.data || projectsQuery.data.length === 0 ? (
          <div className="p-8 text-center text-slate-600 dark:text-slate-400">
            <p>No projects yet. Create your first project!</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function InterventionsPage() {
  const interventionsQuery = trpc.interventions.list.useQuery();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Interventions</h1>
        <Button className="bg-[var(--brand-purple)] hover:bg-[#6A0DAD] text-white">
          + Add Intervention
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Partners
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {interventionsQuery.data?.map((intervention) => (
              <tr
                key={intervention.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <td className="px-6 py-4 text-slate-900 dark:text-white">{intervention.title}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{intervention.category || "-"}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{intervention.partners || "-"}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!interventionsQuery.data || interventionsQuery.data.length === 0 ? (
          <div className="p-8 text-center text-slate-600 dark:text-slate-400">
            <p>No interventions yet. Create your first intervention!</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MilestonesPage() {
  const milestonesQuery = trpc.milestones.list.useQuery();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Milestones</h1>
        <Button className="bg-[var(--brand-yellow)] hover:bg-[#E6C200] text-slate-900">
          + Add Milestone
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Featured
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {milestonesQuery.data?.map((milestone) => (
              <tr key={milestone.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <td className="px-6 py-4 text-slate-900 dark:text-white">{milestone.title}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                  {milestone.date ? new Date(milestone.date).toLocaleDateString() : "-"}
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{milestone.category || "-"}</td>
                <td className="px-6 py-4">
                  <span className={milestone.featured ? "text-yellow-600 font-bold" : "text-slate-400"}>
                    {milestone.featured ? "⭐" : "☆"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!milestonesQuery.data || milestonesQuery.data.length === 0 ? (
          <div className="p-8 text-center text-slate-600 dark:text-slate-400">
            <p>No milestones yet. Create your first milestone!</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Content Management</h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Hero Title
          </label>
          <input
            type="text"
            placeholder="Primary Focus: Youth Empowerment"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Hero Subtitle
          </label>
          <textarea
            placeholder="Cross-cutting Priority: Women & Girls Empowerment"
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
            Youth Engaged Count
          </label>
          <input
            type="number"
            placeholder="1000"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <Button className="bg-[var(--brand-pink)] hover:bg-[#E01B6E] text-white">Save Changes</Button>
      </div>
    </div>
  );
}
