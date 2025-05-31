import { Dashboard } from "@mui/icons-material";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      canDelete: true,
      icon: <Dashboard />,
      label: "Dashboard"
    },
  },
  {
    name: "jobs",
    list: "/jobs",
    create: "/jobs/create",
    edit: "/jobs/edit/:id",
    show: "/jobs/show/:id",
    meta: {
      canDelete: false,
      label: "Jobs"
    },
  },
  {
    name: "applications",
    list: "/applications",
    create: "/applications/create",
    edit: "/applications/edit/:id",
    show: "/applications/show/:id",
    meta: {
      canDelete: false
    },
  },
  {
    name: "applicants",
    list: "/applicants",
    create: "/applicants/create",
    edit: "/applicants/edit/:id",
    show: "/applicants/show/:id",
    meta: {
      canDelete: false
    },
  },
];
