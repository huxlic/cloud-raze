"use client";

import { CloudRain } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import clsx from "clsx";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./Chart";
import useThemeStore from "@/store/useThemeStore";
import useWeather from "@/hooks/useWeather";
import { useMemo } from "react";
import getChartData from "@/lib/getChartData";

export const description = "A 7-day rain forecast chart";

const chartConfig = {
  chance: {
    label: "Rain chance (%)",
    color: "#BBD7EC",
  },
  rainfall: {
    label: "Rainfall (mm)",
    color: "#5F8EAD",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  const { theme } = useThemeStore();
  const { weather } = useWeather({ refresh: true });

  const chartData = useMemo(() => getChartData(weather), [weather]);

  return (
    <Card
      className={clsx("rounded-3xl transition-colors", {
        "border-[#2B2A31] bg-[linear-gradient(160deg,#1B1B1D_0%,#232227_54%,#162633_100%)] shadow-black/20":
          theme === "dark",
        "border-[#D7E9F8] bg-[linear-gradient(160deg,#FFFFFF_0%,#F2F4F7_52%,#D7E9F8_100%)] text-[#0F0F11] shadow-[#AECADF]/40":
          theme === "light",
      })}
    >
      <CardHeader className="gap-1">
        <div
          className={clsx("flex items-center justify-between gap-2", {
            "text-white": theme === "dark",
            "text-[#0f0f11]": theme === "light",
          })}
        >
          <CardTitle>Chance of rain</CardTitle>
          <span
            className={clsx("rounded-full border p-2 box-border", {
              "border-[#3b3941] bg-[#111015]/70 text-[#BBD7EC]":
                theme === "dark",
              "border-[#BBD7EC] bg-white/70 text-[#5F8EAD]": theme === "light",
            })}
          >
            <CloudRain className="h-4 w-4" />
          </span>
        </div>
        <CardDescription
          className={clsx("text-[.8rem]", {
            "text-[#A5A4AB]": theme === "dark",
            "text-[#5C6570]": theme === "light",
          })}
        >
          7-day outlook for the selected city
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className={clsx("aspect-auto h-60 lg:h-80 rounded-lg", {
            "bg-[#111015]/45": theme === "dark",
            "bg-white/60": theme === "light",
          })}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="chance" fill="var(--color-chance)" radius={10} />
            <Bar dataKey="rainfall" fill="var(--color-rainfall)" radius={10} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
