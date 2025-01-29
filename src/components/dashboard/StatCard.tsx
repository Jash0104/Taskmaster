interface Props {
  title: string;
  value: number;
  color: string;
  children: React.ReactNode;
}

export const StatCard = ({ title, value, color, children }: Props) => {
  return (
    <div className={`p-6 rounded-lg border ${color} hover:shadow-lg transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase">{title}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-')} bg-opacity-10`}>
          {children}
        </div>
      </div>
    </div>
  );
};
