import { useState } from "react";
import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";

import StaticsExport from "Statics/StaticsExport/index";
import StaticsOrder from "Statics/StaticsOrder/index";
import StaticsImport from "Statics/StaticsImport/index";
import StaticsProfit from "Statics/StaticsProfit/index";

export default function Dashboard() {
  const [openTab, setOpenTab] = useState(1);

  return (
    <Tab>
      <TabList color="red">
        <TabItem
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(1);
          }}
          ripple="light"
          active={openTab === 1 ? true : false}
          href="tabItem"
        >
          Doanh thu
        </TabItem>
        <TabItem
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(2);
          }}
          ripple="light"
          active={openTab === 2 ? true : false}
          href="tabItem"
        >
          Phiếu nhập
        </TabItem>
        <TabItem
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(3);
          }}
          ripple="light"
          active={openTab === 3 ? true : false}
          href="tabItem"
        >
          Lợi nhuận
        </TabItem>
        <TabItem
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(4);
          }}
          ripple="light"
          active={openTab === 4 ? true : false}
          href="tabItem"
        >
          Đơn hàng
        </TabItem>
      </TabList>

      <TabContent>
        <TabPane active={openTab === 1 ? true : false}>
          <StaticsExport />
        </TabPane>
        <TabPane active={openTab === 2 ? true : false}>
          <StaticsImport/>
        </TabPane>
        <TabPane active={openTab === 3 ? true : false}>
          <StaticsProfit/>
        </TabPane>
        <TabPane active={openTab === 4 ? true : false}>
          <StaticsOrder />
        </TabPane>
      </TabContent>
    </Tab>
  );
}
