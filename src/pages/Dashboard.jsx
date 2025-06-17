// Icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

// Components
import SalesChart from "../components/sales-chart";
import RecentOrdersTable from "../components/recent-orders";
import SummaryCard from "../components/summary-card";

const Dashboard = () => {
  const formatCurrencyIN = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatNumberIN = (value) =>
    new Intl.NumberFormat("en-IN").format(value);
  return (
    <div className="container-fluid px-4">
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <SummaryCard
            title="Total Sales"
            value={formatCurrencyIN(99956)}
            icon={AttachMoneyIcon}
          />
        </div>
        <div className="col-12 col-md-4">
          <SummaryCard
            title="Total Orders"
            value={formatNumberIN(6000)}
            icon={ShoppingCartIcon}
          />
        </div>
        <div className="col-12 col-md-4">
          <SummaryCard
            title="Active Users"
            value={formatNumberIN(1987)}
            icon={PeopleIcon}
          />
        </div>
      </div>

      {/* Charts */}

      <div className="mb-4">
        <SalesChart />
      </div>

      {/* Recent Orders */}

      <div className="mb-4">
        <RecentOrdersTable />
      </div>
    </div>
  );
};

export default Dashboard;
