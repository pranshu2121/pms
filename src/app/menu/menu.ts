import { CoreMenu } from "@core/types";

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "MENU.DASHBOARD.COLLAPSIBLE",
    type: "item",
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: "home",
    url: "dashboard",
  },
  {
    id: "admin",
    title: "Admin",
    translate: "MENU.USERS.COLLAPSIBLE",
    type: "collapsible",
    icon: "user",
    role: ['Admin'],
    children: [
      {
        id: "users",
        title: "Users",
        translate: "MENU.USERS.ADMIN",
        type: "item",
        icon: 'circle',
        url: "Admin/users-list",
      },
    ],
  },
  {
    id: "Feedback-Query",
    title: "Feedback-Query",
    // translate: "MENU.FEEDBACK-QUERY.COLLAPSIBLE",
    type: "collapsible",
    icon: "bell",
    children: [
      {
        id: "Add Query",
        title: "Add Query",
        type: "item",
        icon: 'circle',
        // role: ['Admin'],
        url: "feedback-query/query",
      },
      {
        id: "Query-List",
        title: "Query List",
        type: "item",
        icon: 'circle',
        role: ['Admin'],
        url: "feedback-query/query-list",
      },
      {
        id: "Assign-Query",
        title: "Assign Query",
        type: "item",
        icon: 'circle',
        role: ['HR_Manager','Network_Head','Delivery_Manager','Account_Head','HR'],
        department:['HR','NETWORK','ACCOUNT','SALES'],
        url: "feedback-query/assign-query-list",
      },
    ],
  }
];
