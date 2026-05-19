import React from "react";

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const C = {
    blue: "#185FA5", blueL: "#E6F1FB", blueDark: "#0C447C",
    green: "#639922", greenL: "#EAF3DE", greenDark: "#3B6D11",
    amber: "#EF9F27", amberL: "#FAEEDA", amberDark: "#854F0B",
    red: "#E24B4A", redL: "#FCEBEB", redDark: "#A32D2D",
    teal: "#1D9E75", tealL: "#E1F5EE", tealDark: "#0F6E56",
    purple: "#7F77DD", purpleL: "#EEEDFE", purpleDark: "#534AB7",
    coral: "#D85A30", coralL: "#FAECE7", coralDark: "#993C1D",
    gray: "#888780", grayL: "#F1EFE8", grayDark: "#5F5E5A",
};
const ROLE_NAVS = {
  admin: [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "students", icon: "👨‍🎓", label: "Students" },
    { id: "staff", icon: "👨‍🏫", label: "Staff" },
    { id: "attendance", icon: "📋", label: "Attendance" },
    { id: "fees", icon: "💳", label: "Fees" },
    { id: "academics", icon: "📚", label: "Academics" },
    { id: "timetable", icon: "🗓", label: "Timetable" },
    { id: "comms", icon: "💬", label: "Communication" },
    { id: "reports", icon: "📊", label: "Reports" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ],

  teacher: [
    { id: "overview", icon: "🏠", label: "My Dashboard" },
    { id: "timetable", icon: "🗓", label: "My Timetable" },
    { id: "attendance", icon: "📋", label: "Attendance" },
    { id: "assignments", icon: "📝", label: "Assignments" },
    { id: "grades", icon: "🎯", label: "Grades & Marks" },
    { id: "comms", icon: "💬", label: "Messages" },
  ],

  student: [
    { id: "overview", icon: "🏠", label: "My Dashboard" },
    { id: "timetable", icon: "🗓", label: "Schedule" },
    { id: "attendance", icon: "📋", label: "Attendance" },
    { id: "academics", icon: "📚", label: "Grades" },
    { id: "assignments", icon: "📝", label: "Assignments" },
    { id: "fees", icon: "💳", label: "Fee Status" },
    { id: "comms", icon: "💬", label: "Notices" },
  ],

  parent: [
    { id: "overview", icon: "🏠", label: "Overview" },
    { id: "attendance", icon: "📋", label: "Attendance" },
    { id: "academics", icon: "📚", label: "Grades" },
    { id: "fees", icon: "💳", label: "Fees" },
    { id: "comms", icon: "💬", label: "Messages" },
    { id: "notices", icon: "🔔", label: "Notifications" },
  ],
};

const ROLE_META = {
  admin: {
    label: "Admin",
    sub: "St. Xavier's School",
    color: C.blue,
    icon: "🛡",
  },

  teacher: {
    label: "Mr. Arvind Sharma",
    sub: "Mathematics · Grade 10A",
    color: C.teal,
    icon: "👨‍🏫",
  },

  student: {
    label: "Aanya Reddy",
    sub: "Grade 10-A · Roll No. 01",
    color: C.purple,
    icon: "👩‍🎓",
  },

  parent: {
    label: "Mr. Sunil Reddy",
    sub: "Parent of Aanya Reddy",
    color: C.coral,
    icon: "👨‍👧",
  },
};

type Role = "admin" | "teacher" | "student" | "parent";

interface NavItem {
  id: string;
  icon: string;
  label: string;
}

interface SidebarProps {
  role: Role;
  activeSection?: string;
  onSection?: (section: string) => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeSection,
  onSection,
  collapsed = false,
  onToggle,
}) => {
  const nav: NavItem[] = ROLE_NAVS[role] || [];
  const meta = ROLE_META[role];

  return (
    <div
      style={{
        width: collapsed ? 60 : 220,
        minHeight: "100vh",
        background: "#1a1a18",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        flexShrink: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? "18px 0" : "18px 20px",
          borderBottom: "0.5px solid #2e2e2b",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: meta.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          🎓
        </div>

        {!collapsed && (
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                lineHeight: 1,
              }}
            >
              EduCore
            </div>

            <div
              style={{
                color: "#666",
                fontSize: 10,
                marginTop: 2,
              }}
            >
              School Management
            </div>
          </div>
        )}

        <button
          onClick={onToggle}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#666",
            fontSize: 16,
            padding: 2,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* User */}
      {!collapsed && (
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "0.5px solid #2e2e2b",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: meta.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {meta.icon}
          </div>

          <div>
            <div
              style={{
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {meta.label}
            </div>

            <div
              style={{
                color: "#666",
                fontSize: 10,
                marginTop: 2,
              }}
            >
              {meta.sub}
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "10px 0",
          overflowY: "auto",
        }}
      >
        {nav.map((item) => {
          const active = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSection?.(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "10px 0" : "10px 20px",
                justifyContent: collapsed ? "center" : "flex-start",
                background: active ? "#2e2e2b" : "none",
                border: "none",
                cursor: "pointer",
                borderLeft: active
                  ? `3px solid ${meta.color}`
                  : "3px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>

              {!collapsed && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#fff" : "#888",
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div
          style={{
            padding: "14px 20px",
            borderTop: "0.5px solid #2e2e2b",
            fontSize: 10,
            color: "#555",
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.green,
              display: "inline-block",
            }}
          />

          Online · Academic Year 2024–25
        </div>
      )}
    </div>
  );
};

export default Sidebar;