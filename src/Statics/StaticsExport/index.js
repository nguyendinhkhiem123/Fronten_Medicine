import React from "react";

import ChartLine from "./ChartLine";
import StactisFromTo from "./StaticsFromTo";
import StaticsProduct from './StaticsProduct';
export default function StaticsExport() {
  return (
    <div className="mt-5">
      <div className="px-4 mb-14">
        <div>
          <ChartLine />
        </div>
      </div>

      <div className=" h-auto">
        <div className="container mx-auto max-w-full">
          <div className="flex flex-col gap-y-14">
            <div>
              <StactisFromTo />
            </div>
            <div>
              <StaticsProduct/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
