export const BASE_URL = "http://localhost:5000";
export const USERS_URL = "/api/users"
export const APP_NAME = "IAM-Style Access Control System";
export const EMPTY = "—"

export const ADD_ACTION = "ADD";
export const EDIT_ACTION = "EDIT";
export const DELETE_ACTION = "DELETE";

export const DASHBOARD_DATA = [
  {
    title: "Users",
    description: "Manage user accounts including creation, updates, deletion, and authentication access.",
    features: [
      { text: "Create users", icon: "" },
      { text: "Delete users", icon: "" },
      { text: "View users", icon: "" },
      { text: "Update users", icon: "" },
      { text: "Authenticate users", icon: "" }
    ],
    subDescription: "Full control over all user account operations.",
    link: {
      to: "/users",
      text: "View all users"
    }
  },
  {
    title: "Groups",
    description: "Organize users into groups and manage group operations efficiently.",
    features: [
      { text: "Assign users to group", icon: "" },
      { text: "Create groups", icon: "" },
      { text: "Delete groups", icon: "" },
      { text: "View groups", icon: "" },
      { text: "Update groups", icon: "" }
    ],
    subDescription: "Easily manage and structure user groups.",
    link: {
      to: "/groups",
      text: "View all groups"
    }
  },
  {
    title: "Roles",
    description: "Assign specific roles to groups and control access permissions for better security and management.",
    features: [
      { text: "Assign roles to groups", icon: "" },
      { text: "Create roles", icon: "" },
      { text: "Delete roles", icon: "" },
      { text: "View roles", icon: "" },
      { text: "Update roles", icon: "" }
    ],
    subDescription: "Manage role-based access control settings.",
    link: {
      to: "/roles",
      text: "View all roles"
    }
  },
  {
    title: "Modules",
    description: "Create, update, view, or delete modules and define permissions for improved management.",
    features: [
      { text: "Create modules", icon: "" },
      { text: "Update modules", icon: "" },
      { text: "View modules", icon: "" },
      { text: "Delete modules", icon: "" },
      { text: "Manage module permissions", icon: "" }
    ],
    subDescription: "Control available features and their permissions.",
    link: {
      to: "/modules",
      text: "View all modules"
    }
  }
];