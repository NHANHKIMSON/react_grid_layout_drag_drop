"use client";
import * as React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { Card, CardContent } from "./ui/card";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);
const STORAGE_KEY = "zone_layout";

export default function ZonePreview() {
  const [layout, setLayout] = React.useState([]);
  const [zoneData, setZoneData] = React.useState({});

  React.useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const loadedLayout = parsed.map((item) => ({
        x: item.layout.x,
        y: item.layout.y,
        w: item.layout.w,
        h: item.layout.h,
        i: item.id,
      }));
      const loadedZoneData = {};
      parsed.forEach((item) => {
        loadedZoneData[item.id] = {
          title: item.title,
          type: item.type,
        };
      });
      setLayout(loadedLayout);
      setZoneData(loadedZoneData);
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Zone Preview (Read Only)</h2>
      <ReactGridLayout
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable={false}
        isResizable={false}
        useCSSTransforms
      >
        {layout.map((item) => {
          const zone = zoneData[item.i] || {};
          return (
            <div key={item.i} data-grid={item}>
              <Card className="h-full w-full box-border relative">
                <CardContent className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-lg font-semibold">{zone.title}</p>
                  <p className="text-sm text-muted-foreground">{zone.type}</p>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </ReactGridLayout>
    </div>
  );
}