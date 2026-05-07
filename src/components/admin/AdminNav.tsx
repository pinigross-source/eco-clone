import { cn } from "@/lib/utils";
import {
  Package,
  CreditCard,
  Users,
  TrendingUp,
  Tag,
  ShoppingCart,
  BarChart3,
  MessageSquare,
  ShieldCheck,
  ScrollText,
  Globe,
  Upload,
  FileSpreadsheet,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  value: string;
  label: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

interface NavGroup {
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
  adminOnly?: boolean;
}

type NavEntry = NavItem | NavGroup;

const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

const navEntries: NavEntry[] = [
  { value: "home", label: "Home", icon: <BarChart3 className="w-4 h-4" /> },
  { value: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
  { value: "products", label: "Products", icon: <ShoppingCart className="w-4 h-4" /> },
  { value: "subscriptions", label: "Subscriptions", icon: <CreditCard className="w-4 h-4" />, adminOnly: true },
  {
    label: "Customers",
    icon: <Users className="w-4 h-4" />,
    adminOnly: true,
    items: [
      { value: "users", label: "User Management", icon: <ShieldCheck className="w-4 h-4" />, adminOnly: true },
      { value: "leads", label: "Quiz Leads", icon: <Users className="w-4 h-4" />, adminOnly: true },
      { value: "inquiries", label: "Contact Inquiries", icon: <MessageSquare className="w-4 h-4" />, adminOnly: true },
    ],
  },
  {
    label: "Marketing",
    icon: <TrendingUp className="w-4 h-4" />,
    items: [
      { value: "coupons", label: "Coupons", icon: <Tag className="w-4 h-4" /> },
      { value: "affiliates", label: "Affiliates", icon: <TrendingUp className="w-4 h-4" /> },
      { value: "abandoned-carts", label: "Abandoned Carts", icon: <ShoppingCart className="w-4 h-4" />, adminOnly: true },
      { value: "analytics", label: "Upsell Analytics", icon: <BarChart3 className="w-4 h-4" />, adminOnly: true },
    ],
  },
  {
    label: "Settings",
    icon: <Globe className="w-4 h-4" />,
    items: [
      { value: "shipping", label: "Shipping Countries", icon: <Globe className="w-4 h-4" /> },
      { value: "activity", label: "Activity Log", icon: <ScrollText className="w-4 h-4" />, adminOnly: true },
      { value: "import", label: "Import Subscribers", icon: <Upload className="w-4 h-4" />, adminOnly: true },
      { value: "woo-import", label: "WooCommerce Import", icon: <FileSpreadsheet className="w-4 h-4" />, adminOnly: true },
    ],
  },
];

interface AdminNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
}

export function AdminNav({ activeTab, onTabChange, isAdmin }: AdminNavProps) {
  const isTabInGroup = (group: NavGroup, tab: string) =>
    group.items.some((item) => item.value === tab);

  return (
    <nav className="flex items-center gap-1 border-b border-border bg-card rounded-t-xl px-2 overflow-x-auto">
      {navEntries.map((entry, idx) => {
        if (!isGroup(entry)) {
          // Simple top-level tab
          if (entry.adminOnly && !isAdmin) return null;
          const active = activeTab === entry.value;
          return (
            <button
              key={entry.value}
              onClick={() => onTabChange(entry.value)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              {entry.icon}
              {entry.label}
            </button>
          );
        }

        // Dropdown group
        const visibleItems = entry.items.filter(
          (item) => !item.adminOnly || isAdmin
        );
        if (visibleItems.length === 0) return null;
        if (entry.adminOnly && !isAdmin) return null;

        const groupActive = isTabInGroup(entry, activeTab);
        const activeItem = visibleItems.find((i) => i.value === activeTab);

        return (
          <DropdownMenu key={idx}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors outline-none",
                  groupActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                )}
              >
                {entry.icon}
                {activeItem ? activeItem.label : entry.label}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              {visibleItems.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => onTabChange(item.value)}
                  className={cn(
                    "gap-2 cursor-pointer",
                    activeTab === item.value && "bg-accent font-medium"
                  )}
                >
                  {item.icon}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      })}
    </nav>
  );
}
