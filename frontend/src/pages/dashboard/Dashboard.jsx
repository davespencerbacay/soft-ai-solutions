import { useGetUserByIdQuery } from "../../slices/usersApiSlice";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { DASHBOARD_DATA } from "../../constants/constants";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.userId);
  const { data } = useGetUserByIdQuery(user);

  return (
    <div className="space-y-6">
      <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back, {data ? `${data?.FirstName} ${data?.LastName}` : ""}! 👋
        </h1>
        <p className="text-sm sm:text-base opacity-90 max-w-3xl">
          Manage users, monitor activities, and configure settings all in one place.  
          Stay in control with your dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_DATA.map((cardData, index) => (
          <DashboardCard
            key={index}
            title={cardData.title}
            description={cardData.description}
            subDescription={cardData.subDescription}
            features={cardData.features}
            link={cardData.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
