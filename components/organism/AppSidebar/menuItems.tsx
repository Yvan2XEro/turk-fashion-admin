import {
  Archive,
  Box,
  Gift,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  ShoppingCart,
  Stars,
  Tag,
  Users,
  ListFilter,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: <Layers />,
  },
  {
    name: "Filters",
    href: "/filters",
    icon: <ListFilter />,
  },
  {
    name: "Sub-Categories",
    href: "/sub-categories",
    icon: <Layers />,
  },
  {
    name: "Products",
    href: "/products",
    icon: <Box />,
  },
  //   {
  //     name: "Stock Management",
  //     href: "/stock-management",
  //     icon: <Archive />,
  //   },
  //   {
  //     name: "Tags Management",
  //     href: "/tags-management",
  //     icon: <Tag />,
  //   },
  //   {
  //     name: "Orders",
  //     href: "/orders",
  //     icon: <ShoppingCart />,
  //   },
  //   {
  //     name: "Users",
  //     href: "/users",
  //     icon: <Users />,
  //   },
  //   {
  //     name: "Reviews",
  //     href: "/reviews",
  //     icon: <Stars />,
  //   },
  //   {
  //     name: "Promotion & Offers",
  //     href: "/promotion-offers",
  //     icon: <Gift />,
  //   },
  //   {
  //     name: "Settings",
  //     href: "/settings",
  //     icon: <Settings />,
  //   },
  //   {
  //     name: "Help",
  //     href: "/help",
  //     icon: <LifeBuoy />,
  //   },
];

export default menuItems;
