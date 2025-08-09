import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const DashboardCard = ({ features, description, subDescription, link, title }) => {
  return (
    <div className="bg-white text-gray-800 max-w-md rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6">
        {description}
      </p>

      <ul className="space-y-4 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.icon ? feature.icon : <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />}
            <span className="text-gray-700">{feature.text}</span>
          </li>
        ))}
      </ul>

      <p className="text-gray-600 mb-6">
        {subDescription}
      </p>

      <hr className="border-gray-200 mb-4" />

      <p className="text-gray-600">
        <Link
          to={link.to}
          className="text-sky-500 hover:underline"
        >
          {link.text} →
        </Link>
      </p>
    </div>
  );
};

export default DashboardCard;
