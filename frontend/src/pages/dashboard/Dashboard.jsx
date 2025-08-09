import { useGetUserByIdQuery } from "../../slices/usersApiSlice";
import { useGetLoggedInPermissionsQuery } from "../../slices/loggedInApiSlice";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { DASHBOARD_DATA } from "../../constants/constants";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userId = useSelector((state) => state.auth.userId);

  // Fetch user data
  const { data: userData } = useGetUserByIdQuery(userId);

  // Fetch logged-in user permissions
  const { data: permissions, isLoading: permissionsLoading } =
    useGetLoggedInPermissionsQuery();

    console.log(permissions)

  return (
    <div className="space-y-6">
      <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back,{" "}
          {userData ? `${userData?.FirstName} ${userData?.LastName}` : ""}! 👋
        </h1>
        <p className="text-1xl sm:text-2xl font-bold mb-2">
          You have the following permission{permissions?.length !== 1 && "s"}:{" "}
          {permissions?.map((perm) => perm.Name).join(", ")}.
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
