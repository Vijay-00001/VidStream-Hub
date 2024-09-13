import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import moment from "moment";
import { ChartSettings } from "@/Types";

export function Chart({ users }: any) {
  const tickPlacement = "middle";
  const tickLabelPlacement = "middle";

  // Function to calculate user counts for each month of the last 12 months up to the current month
  const getUserCountsByMonth = () => {
    const currentMonth = moment().month(); // Get the index of the current month
    const last6Months = [];
    for (let i = currentMonth - 5; i <= currentMonth; i++) {
      const monthIndex = i < 0 ? 12 + i : i; // Handle negative indices for months from the previous year
      last6Months.push({
        month: moment().month(monthIndex).format("MMM"), // Get the month abbreviation
        users: users.filter(
          (user: any) => moment(user.createdAt).month() === monthIndex // Filter users based on month index
        ).length,
      });
    }
    return last6Months;
  };

  const dataset = getUserCountsByMonth();

  const valueFormatter = (value: number | null) => `${value} user join`;

  const chartSetting = {
    yAxis: [
      {
        label: "Number of Users",
      },
    ],
    series: [{ dataKey: "users", label: "Users", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        fill: "white",
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}

export function Chart2({
  moviesByYear,
}: {
  moviesByYear: {
    year: number;
    count: number;
  };
}) {
  // Transform data from object to array
  const transformData = (
    data: Record<number, number>
  ): {
    year: number;
    count: number;
  }[] => {
    return Object.entries(data).map(([year, count]) => ({
      year: Number(year),
      count,
    }));
  };

  const dataset: {
    year: number;
    count: number;
  }[] = transformData(moviesByYear);

  const valueFormatter = (value: number) => `${value} movies`;

  const chartSetting: ChartSettings = {
    yAxis: [
      {
        label: "Number of Movies",
      },
    ],
    series: [{ dataKey: "count", label: "Movies", valueFormatter }],
    height: 300,
    sx: {
      [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        fill: "white",
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "year",
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
