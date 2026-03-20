import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { api } from "../utils/api";
import { monthOptions, dashboardCard } from "../utils/constants";
import { getSalesDetailsData, tableHeaders } from "@/components/dashboard/dashboardData";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RevenueSection from "@/components/dashboard/RevenueSection";
import CustomersCard from "@/components/dashboard/CustomersCard";
import FeaturedProductCard from "@/components/dashboard/FeaturedProductCard";
import SalesAnalyticsCard from "@/components/dashboard/SalesAnalyticsCard";
import SalesDetailsSection from "@/components/dashboard/SalesDetailsSection";
import DealsDetailsSection from "@/components/dashboard/DealsDetailsSection";

const Dashboard = () => {
  const MIN_SKELETON_MS = 800;
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingSales, setLoadingSales] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [loadingSalesDetails, setLoadingSalesDetails] = useState(false);
  const [salesMonth, setSalesMonth] = useState(monthOptions[0]);
  const [dealsMonth, setDealsMonth] = useState(monthOptions[0]);
  const [salesDetailsMonth, setSalesDetailsMonth] = useState(monthOptions[0]);
  const [tableRows, setTableRows] = useState([]);
  const [salesDetailsChartData, setSalesDetailsChartData] = useState([]);

  const salesMonthName = salesMonth?.name;
  const dealsMonthName = dealsMonth?.name;
  const salesDetailsMonthName = salesDetailsMonth?.name;

  useEffect(() => {
    let isActive = true;
    let timerId;
    const loadSalesData = async () => {
      const startedAt = Date.now();
      setLoadingSales(true);
      try {
        await api.get("/dashboard", { params: { month: salesMonthName } });
      } catch (error) {
        console.error(error);
      } finally {
        if (!isActive) return;
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(MIN_SKELETON_MS - elapsed, 0);
        if (remaining === 0) {
          setLoadingSales(false);
          return;
        }
        timerId = setTimeout(() => {
          if (isActive) setLoadingSales(false);
        }, remaining);
      }
    };
    loadSalesData();
    return () => {
      isActive = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [salesMonthName]);

  useEffect(() => {
    let isActive = true;
    let timerId;
    const loadDealsData = async () => {
      const startedAt = Date.now();
      setLoadingDeals(true);
      try {
        const response = await api.get("/dashboard", {
          params: { month: dealsMonthName },
        });
        if (isActive && response.data?.length)
          setTableRows(response.data[0].tableData);
      } catch (error) {
        console.error(error);
      } finally {
        if (!isActive) return;
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(MIN_SKELETON_MS - elapsed, 0);
        if (remaining === 0) {
          setLoadingDeals(false);
          return;
        }
        timerId = setTimeout(() => {
          if (isActive) setLoadingDeals(false);
        }, remaining);
      }
    };
    loadDealsData();
    return () => {
      isActive = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [dealsMonthName]);

  useEffect(() => {
    if (!loadingSales && !loadingDeals && initialLoading)
      setInitialLoading(false);
  }, [initialLoading, loadingSales, loadingDeals]);

  useEffect(() => {
    let isActive = true;
    let timerId;
    const startedAt = Date.now();
    setLoadingSalesDetails(true);
    const nextData = getSalesDetailsData(salesDetailsMonthName);
    const resolvedData = nextData?.length ? nextData : [];
    setSalesDetailsChartData(resolvedData);

    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(MIN_SKELETON_MS - elapsed, 0);
    if (remaining === 0) {
      setLoadingSalesDetails(false);
      return () => {};
    }
    timerId = setTimeout(() => {
      if (isActive) setLoadingSalesDetails(false);
    }, remaining);

    return () => {
      isActive = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [salesDetailsMonthName]);

  return (
    <div className="pt-[30px] flex flex-col pl-[31px] pr-[33px] pb-[30px] bg-theme-white min-h-screen dark:bg-slate-950 [--base-color:#e5e7eb] [--highlight-color:#f3f4f6] dark:[--base-color:#1f2937] dark:[--highlight-color:#334155]">
      <h1 className="font-bold text-[29.5px] tracking-tight text-gray-900 dark:text-slate-100">
        {initialLoading ? <Skeleton width={160} /> : "Dashboard"}
      </h1>

      <DashboardStats cards={dashboardCard} loading={initialLoading} />

      <SalesDetailsSection
        monthOptions={monthOptions}
        month={salesDetailsMonth}
        onChange={setSalesDetailsMonth}
        loading={loadingSalesDetails}
        data={salesDetailsChartData}
      />

      <DealsDetailsSection
        loading={loadingDeals}
        monthOptions={monthOptions}
        month={dealsMonth}
        onChange={setDealsMonth}
        headers={tableHeaders}
        rows={tableRows}
      />

      <RevenueSection
        loading={loadingSales}
        monthOptions={monthOptions}
        month={salesMonth}
        onChange={setSalesMonth}
      />

      <div className="mt-[22px] grid grid-cols-3 gap-[22px]">
        <CustomersCard />
        <FeaturedProductCard />
        <SalesAnalyticsCard />
      </div>
    </div>
  );
};

export default Dashboard;
