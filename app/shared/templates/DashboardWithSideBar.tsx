import DashboardLayout from './DashboardLayout';

const DashboardWithSideBar = (props) => {
  const { children } = props;
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWithSideBar;
