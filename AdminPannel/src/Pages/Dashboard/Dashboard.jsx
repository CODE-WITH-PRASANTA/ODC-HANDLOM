import React from 'react'
import DashboardMain from '../../Components/DashboardMain/DashboardMain'
import DashboardOverview from '../../Components/DashboardOverview/DashboardOverview';
import DashboardCategory from '../../Components/DashboardCategory/DashboardCategory';
import StoreDashboard from '../../Components/StoreDashboard/StoreDashboard';

const Dashboard = () => {
  return (
    <div>
      <DashboardMain/>
      <DashboardOverview/>
      <DashboardCategory/>
      <StoreDashboard/>
      
    </div>
  );
};

export default Dashboard;