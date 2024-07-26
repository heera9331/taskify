import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
  
 

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body className="overflow-hidden">
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <Sidebar />
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 overflow-hidden">
            <Navbar/>
            <main className="overflow-hidden">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

export default DashboardLayout;
