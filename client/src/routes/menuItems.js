import {
    FaHome,
    FaUsers,
    FaUserGraduate,
    FaClipboardCheck,
    FaChartBar,
    FaCog,
    FaUser
} from "react-icons/fa";

export const menuItems = {

    Admin: [

        {
            title: "Dashboard",
            icon: FaHome,
            path: "/"
        },

        {
            title: "Students",
            icon: FaUserGraduate,
            path: "/students"
        },

        {
            title: "Users",
            icon: FaUsers,
            path: "/users"
        },

        {
            title: "Attendance",
            icon: FaClipboardCheck,
            path: "/attendance"
        },

        {
            title: "Reports",
            icon: FaChartBar,
            path: "/reports"
        },

        {
            title: "Settings",
            icon: FaCog,
            path: "/settings"
        }

    ],

    Lecturer: [

        {
            title: "Dashboard",
            icon: FaHome,
            path: "/"
        },

        {
            title: "Students",
            icon: FaUserGraduate,
            path: "/students"
        },

        {
            title: "Attendance",
            icon: FaClipboardCheck,
            path: "/attendance"
        },

        {
            title: "Reports",
            icon: FaChartBar,
            path: "/reports"
        }

    ],

    Student: [

        {
            title: "Dashboard",
            icon: FaHome,
            path: "/"
        },

        {
            title: "My Attendance",
            icon: FaClipboardCheck,
            path: "/my-attendance"
        },

        {
            title: "Profile",
            icon: FaUser,
            path: "/profile"
        }

    ]

};