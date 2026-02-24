import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;