import React from "react";

function CategoryTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-wider mb-4 text-gray-900 uppercase">
            {children}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CategoryTitle;
