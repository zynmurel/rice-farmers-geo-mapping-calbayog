import React from "react";
import DistributionOverview2 from "./_components/distribution-chart-2";
import PageLayout from "@/app/_components/page-layout";
import RiceComputationChart from "./_components/rice-charts";

function Page() {
  return (
    // <PageLayout title="Overview" description="View overall statistics of crops and yield" icon="LayoutDashboard">
      <div className=" py-5">
        <RiceComputationChart/>
        <DistributionOverview2 />
        {/* <DistributionOverview /> */}
      </div>
    // </PageLayout>
  );
}

export default Page;
