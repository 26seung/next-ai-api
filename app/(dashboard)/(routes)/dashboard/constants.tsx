import {
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Bot,
  FileText,
} from "lucide-react";

//  메뉴 목록 선언 (dashboard/page.tsx, components/sidebar.tsx)
export const routes = [
  {
    label: "대시보드",
    icon: LayoutDashboard,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    href: "/dashboard",
    layout: "side",
    auth: "guest",
  },
  {
    label: "대화 생성기",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    auth: "guest",
  },
  {
    label: "이미지 생성기",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/image",
    auth: "guest",
  },
  {
    label: "Chat Stream",
    icon: Bot,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/chat",
    auth: "user",
  },
  {
    label: "Chat PDF",
    icon: FileText,
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
    href: "/pdf",
    auth: "user",
  },

  {
    label: "설정",
    icon: Settings,
    href: "/setting",
    layout: "side",
    auth: "user",
  },
];
