import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
        </div>

        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-500">{description}</p>
    </article>
  );
}

export default StatCard;
