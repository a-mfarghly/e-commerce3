"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminRouteGuard from "@/components/admin/AdminRouteGuard";
import StatsCard from "@/components/admin/StatsCard";
import RecentOrders from "@/components/admin/RecentOrders";
import { 
  FaBox, 
  FaShoppingBag, 
  FaUsers, 
  FaDollarSign 
} from "react-icons/fa";
import { adminApi } from "@/services/adminApi";

function AdminDashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Mock data - Replace with actual API calls
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats and recent orders from local JSON files
      const [statsData, ordersData] = await Promise.all([
        adminApi.getDashboardStats().catch(() => ({ data: { totalProducts: 0, totalOrders: 0, totalUsers: 0, totalRevenue: 0 } })),
        adminApi.getAllOrders().catch(() => ({ data: [] })),
      ]);
      
      if (statsData?.data) {
        setStats(statsData.data);
      } else {
        setStats({
          totalProducts: 0,
          totalOrders: 0,
          totalUsers: 0,
          totalRevenue: 0,
        });
      }
      
      // Get recent orders (last 10)
      const orders = ordersData?.data || [];
      const recent = orders
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
      
      setRecentOrders(recent);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Set defaults on error
      setStats({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
      });
      setRecentOrders([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-full">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Products"
                value={stats.totalProducts}
                icon={<FaBox className="w-6 h-6" />}
                bgColor="bg-blue-500"
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Total Orders"
                value={stats.totalOrders}
                icon={<FaShoppingBag className="w-6 h-6" />}
                bgColor="bg-green-500"
                trend={{ value: 8, isPositive: true }}
              />
              <StatsCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<FaUsers className="w-6 h-6" />}
                bgColor="bg-purple-500"
                trend={{ value: 5, isPositive: true }}
              />
              <StatsCard
                title="Total Revenue"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                icon={<FaDollarSign className="w-6 h-6" />}
                bgColor="bg-yellow-500"
                trend={{ value: 15, isPositive: true }}
              />
            </div>

            {/* Recent Orders */}
            <div className="mb-6">
              <RecentOrders 
                orders={recentOrders}
                onViewOrder={(orderId) => {
                  console.log("View order:", orderId);
                  // Navigate to order details
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminRouteGuard>
      <AdminDashboardContent />
    </AdminRouteGuard>
  );
}

