import { Dashboard } from "@mui/icons-material";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      canDelete: true,
      icon: <Dashboard />,
      label: "Dashboard",
    },
  },
  {
    name: "jobs",
    list: "/jobs",
    show: "/jobs/show/:id",
    meta: {
      canDelete: false,
      label: "Jobs",
    },
  },
  {
    name: "applications",
    list: "/applications",
    show: "/applications/show/:id",
    meta: {
      canDelete: false,
    },
  },
  {
    name: "applicants",
    list: "/applicants",
    show: "/applicants/show/:id",
    meta: {
      canDelete: false,
      label: "Candidates"
    },
  },
];
