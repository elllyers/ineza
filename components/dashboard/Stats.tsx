import {
  TrendingDown,
  TrendingUp,
  Users,
  DollarSign,
  LineChart,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, icon }: StatCardProps) => {
  const isPositive = change > 0;

  return (
    <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className="p-2 bg-gray-800/50 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-semibold text-white mb-1">{value}</h4>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span
              className={`text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {Math.abs(change)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Stats = () => {
  const stats = [
    {
      title: "Total Customers",
      value: "24,571",
      change: 12.5,
      icon: <Users className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Revenue",
      value: "$574,321",
      change: 8.2,
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      change: -2.4,
      icon: <LineChart className="w-5 h-5 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};
