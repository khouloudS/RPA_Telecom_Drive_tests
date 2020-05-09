import Index from "views/statistics/statistics";
import Profile from "views/examples/Profile.js";
// Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";

import Maps from "views/driver/Maps.js";
import RPA from "views/rpa/rpa-process.js";
import Demo from "views/driver/Current_User_Position.js";
import ListRpaProcess from "views/rpa/list_rpa_process.js"
import ChatRoom from "./views/chatRoom/chat_room_request";
import Chat from "components/App/App_chat";
import ClaimsList from "./views/Claim/ClaimsList";
import AddClaim from "./views/Claim/AddClaim";
import PlanningDriveTest from "./views/DriveTest/Engineer/PlanningDriveTest";
import DrivetestlistAdmin from "./views/DriveTest/Engineer/DriveTestListAdmin";
import EditDriveTestInformations from "./views/DriveTest/Engineer/EditDriveTestInformations";
import EnginnerList from "./views/DriveTest/Engineer/EnginnerList";
import UserLogin from "./views/Users/UserLogin";
import UserRegister from "./views/Users/UserRegister";
import UserProfile from "./views/Users/UserProfile";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    role1: "Admin",
    role2:"Engineer"
  },
  {
    path: "/UserProfile",
    name: "UserProfile",
    icon: "ni ni-single-02 text-yellow",
    component: UserProfile,
    layout: "/admin",
    role1: "Admin",
    role2:"Engineer"
  },
 /* {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin"
  },*/
  {
    path: "/DrivetestListAdmin",
    name: "Drive Tests List",
    icon: "ni ni-bullet-list-67  text-info",
    component: DrivetestlistAdmin,
    layout: "/admin",
    role1:"Admin",
  },
  {
    path: "/Engineer",
    name: "Engineer Drive Tests List ",
    icon: "ni ni-bullet-list-67  text-info",
    component: EnginnerList,
    layout: "/admin",
    role2:"Engineer"
  },
  {
    path: "/PlanDriveTest",
    name: "Plan Drive Test ",
    icon: "ni ni-bullet-list-67  text-info",
    component: PlanningDriveTest,
    layout: "/admin",
    invisible: true,

  },
  {
    path: "/ClaimsList",
    name: "Claims",
    icon: "ni ni-notification-70 text-orange",
    component: ClaimsList,
    layout: "/admin",
    role1: "Admin",
    role2:"Engineer"

  },
  {
    path: "/AddClaim",
    name: "Add Claim",
    icon: "ni ni-notification-70 text-orange",
    component: AddClaim,
    layout: "/admin",
    invisible: true,

  } ,
  {
    path: "/UserLogin",
    name: "UserLogin",
    icon: "ni ni-key-25 text-info",
    component: UserLogin,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/UserRegister",
    name: "UserRegiter",
    icon: "ni ni-circle-08 text-pink",
    component: UserRegister,
    layout: "/auth",
    invisible: true
  },
  {
    path: "/EditDriveTest/:_id",
    name: "Edit Drive Test",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  },

  {
    path: "/rpa/list_RPA_process",
    name: "List RPA",
    icon: "ni ni-pin-3 text-orange",
    component: ListRpaProcess,
    layout: "/admin",
    role3:"Driver"
  },
  {
    path: "/chatRoom",
    name: "Chat Room",
    icon: "ni ni-tv-2 text-primary",
    component: ChatRoom,
    layout: "/driver",
    role2:"Engineer",
    role3:"Driver"
  },{
    path: "/maps/:_id",
    // name: "Maps",
    //  icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
    role3:"Driver"
  },
  /*{
    path: "/rpa",
    name: "RPA",
    icon: "ni ni-pin-3 text-orange",
    component: RPA,
    layout: "/driver"
  },*/
 /* {
    path: "/chat",
    name: "Chat",
    icon: "ni ni-tv-2 text-primary",
    component: Chat,
    layout: "/admin",
    role2:"Engineer"
  },*/
  {
    path: "/EditDriveTest/:_id",
    name: "Edit Drive Test",
    icon: "ni ni-circle-08 text-pink",
    component: EditDriveTestInformations,
    layout: "/admin",
    invisible: true,

  },
];
export default routes;
