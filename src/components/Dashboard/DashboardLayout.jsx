import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-full lg:min-h-[750px]">
      {/* Left Column - 3/12 */}
      <div className="lg:col-span-3 h-[450px] lg:h-full">
        {children[0]}
      </div>
      
      {/* Center Column - 6/12 */}
      <div className="lg:col-span-6 h-[450px] lg:h-full">
        {children[1]}
      </div>
      
      {/* Right Column - 3/12 */}
      <div className="lg:col-span-3 h-auto lg:h-full">
        {children[2]}
      </div>
    </div>
  );
};

export default DashboardLayout;
