import {
  MdDashboard,
  MdInventory2,
  MdFavoriteBorder,
  MdInbox,
  MdListAlt,
  MdWarehouse,
  MdAttachMoney,
  MdCalendarMonth,
  MdCheckCircleOutline,
  MdContactMail,
  MdReceiptLong,
  MdWidgets,
  MdGroup,
  MdTableChart,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { LiaAwardSolid } from "react-icons/lia";
import { FiGift } from "react-icons/fi";

export const SIDEBAR_SECTIONS = [
  {
    key: "main",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        path: ["/dashboard",'/'],
        icon: MdDashboard,
      },
      {
        key: "products",
        label: "Products",
        path: ["/products"],
        icon: MdInventory2,
      },
      {
        key: "favourites",
        label: "Favourites",
        path: ["/favourites"],
        icon: MdFavoriteBorder,
      },
      { key: "inbox", label: "Inbox", path: ["/inbox"], icon: MdInbox },
      {
        key: "order-lists",
        label: "Order Lists",
        path: ["/order-lists"],
        icon: MdListAlt,
      },
      {
        key: "product-stock",
        label: "Product Stock",
        path: ["/product-stock"],
        icon: MdWarehouse,
      },
    ],
  },
  {
    key: "pages",
    heading: "Pages",
    items: [
      {
        key: "pricing",
        label: "Pricing",
        path: ["/pricing"],
        icon: MdAttachMoney,
      },
      {
        key: "calendar",
        label: "Calendar",
        path: ["/calendar"],
        icon: MdCalendarMonth,
      },
      {
        key: "to-do",
        label: "To-Do",
        path: ["/to-do"],
        icon: MdCheckCircleOutline,
      },
      {
        key: "spin-wheel",
        label: "Spin Wheel",
        path: ["/spin-wheel"],
        icon: FiGift,
      },
      {
        key: "contact",
        label: "Contact",
        path: ["/contact"],
        icon: MdContactMail,
      },
      { key: "reward", label: "Rewards", path: ["/rewards"], icon: LiaAwardSolid },
      {
        key: "invoice",
        label: "Invoice",
        path: ["/invoice"],
        icon: MdReceiptLong,
      },
      {
        key: "ui-elements",
        label: "UI Elements",
        path: ["/ui-elements"],
        icon: MdWidgets,
      },
      { key: "team", label: "Team", path: ["/team"], icon: MdGroup },
      { key: "table", label: "Table", path: ["/table"], icon: MdTableChart },
      
    ],
  },

];

export const monthOptions = [
  { name: "January" },
  { name: "February" },
  { name: "March" },
  { name: "April" },
  { name: "May" },
  { name: "June" },
  { name: "July" },
  { name: "August" },
  { name: "September" },
  { name: "October" },
  { name: "November" },
  { name: "December" },
];

export const dashboardCard = [
  {
    heading: "total user",
    icon: "users",
    iconColor: "",
    iconBgColor: "rgba(130, 128, 255, 0.3)",
    count: "40,689",
    up: true,
    percent: "8.5",
    footer: "Up from yesterday",
  },
  {
    heading: "total order",
    icon: "box",
    iconColor: "",
    iconBgColor: "rgba(254, 197, 61, 0.3)",
    count: "10,293",
    up: true,
    percent: "1.3",
    footer: "Up from past week",
  },
  {
    heading: "total sales",
    icon: "graph",
    iconColor: "",
    iconBgColor: "rgba(74, 217, 145, 0.3)",
    count: "$89,000",
    up: false,
    percent: "4.3",
    footer: "Down from yesterday",
  },
  {
    heading: "total pending",
    icon: "timer",
    iconColor: "",
    iconBgColor: "rgba(255, 144, 102, 0.3)",
    count: "2,040",
    up: false,
    percent: "1.8",
    footer: "Up from yesterday",
  },
];

export const AUTH_SESSION_KEY = "auth_session";
export const DARK_MODE_KEY = "dark_mode_enabled";
export const SIDEBAR_COLLAPSED_KEY = "sidebar_collapsed";
export const SELECTED_PRICING_PLAN_KEY = "selected_pricing_plan";
const barData1 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    cd: 1000,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    cd: 1000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    cd: 1000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    cd: 1000,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    cd: 1000,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    cd: 1000,
    amt: 2100,
  },
];

const barColors1 = {
  first: "#1CCAB8",
  second: "#BDEEE1",
  third: "#D0F1FA",
};

const barData2 = [
  { v: 55 },
  { v: 75 },
  { v: 40 },
  { v: 85 },
  { v: 60 },
  { v: 45 },
  { v: 70 },
  { v: 50 },
  { v: 65 },
];
const barColors2 = [
  "#5DD6C8",
  "#3DC8B8",
  "#7DE2D6",
  "#2EBFB0",
  "#5DD6C8",
  "#8EEAE0",
  "#3DC8B8",
  "#5DD6C8",
  "#2EBFB0",
];

const barData3 = [
  { v: 90 },
  { v: 60 },
  { v: 75 },
  { v: 45 },
  { v: 85 },
  { v: 55 },
  { v: 70 },
  { v: 95 },
  { v: 65 },
  { v: 50 },
];
const barColors3 = [
  "#FF9F2E",
  "#4F6FE8",
  "#FF9F2E",
  "#4F6FE8",
  "#FF9F2E",
  "#4F6FE8",
  "#FF9F2E",
  "#FF7B00",
  "#4F6FE8",
  "#FF9F2E",
];

const barData4 = [
  { v: 65 },
  { v: 45 },
  { v: 75 },
  { v: 55 },
  { v: 85 },
  { v: 40 },
  { v: 70 },
  { v: 50 },
  { v: 60 },
];
const barColors4 = [
  "#FF8FAB",
  "#FFB3C6",
  "#FF6B8E",
  "#FFB3C6",
  "#FF8FAB",
  "#FFCCD8",
  "#FF6B8E",
  "#FF8FAB",
  "#FFB3C6",
];

const pieData1 = [{ value: 30 }, { value: 70 }];
const pieColors1 = ["#5B6FE8", "#E8EAF6"];

const pieData2 = [{ value: 35 }, { value: 65 }];
const pieColors2 = ["#CC66FF", "#E8EAF6"];

const pieData3 = [{ value: 45 }, { value: 55 }];
const pieColors3 = ["#FF6B35", "#E8EAF6"];

const pieData4 = [{ value: 25 }, { value: 75 }];
const pieColors4 = ["#4F9CF9", "#E8EAF6"];

const donut1 = [{ value: 70 }, { value: 30 }];
const donutColors1 = ["#2EBFB0", "#E8EAF6"];

const donut2 = [{ value: 55 }, { value: 45 }];
const donutColors2 = ["#4F6FE8", "#E8EAF6"];

const donut3 = [{ value: 60 }, { value: 40 }];
const donutColors3 = ["#FFC533", "#2EBFB0"];

const donut4 = [{ value: 40 }, { value: 35 }, { value: 25 }];
const donutColors4 = ["#FF6B35", "#FFC533", "#2EBFB0"];

export {
  barData1,
  barColors1,
  barData2,
  barColors2,
  barData3,
  barColors3,
  barData4,
  barColors4,
  pieData1,
  pieColors1,
  pieData2,
  pieColors2,
  pieData3,
  pieColors3,
  pieData4,
  pieColors4,
  donut1,
  donutColors1,
  donut2,
  donutColors2,
  donut3,
  donutColors3,
  donut4,
  donutColors4,
};
