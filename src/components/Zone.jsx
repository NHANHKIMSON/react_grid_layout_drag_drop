// "use client";
// import React, { useState, useEffect } from "react";
// import { Responsive, WidthProvider } from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { ResizablePanelGroup } from "./ui/resizable";

// const ResponsiveReactGridLayout = WidthProvider(Responsive);

// export default function DragFromOutsideLayout() {
//   const [compactType, setCompactType] = useState("null");
//   const [mounted, setMounted] = useState(false);
//   const [layout, setLayout] = useState([
//     { name: "Hello", i: "a", x: 0, y: 0, w: 1, h: 2 },
//     { name: "Hello", i: "b", x: 1, y: 0, w: 3, h: 2 },
//     { name: "Hello", i: "c", x: 4, y: 0, w: 1, h: 2 },
//     { name: "Hello", i: "d", x: 0, y: 2, w: 1, h: 2 },
//   ]);

// useEffect(() => {
//   setMounted(true);
// }, []);

// const handleCompactTypeChange = (e) => {
//   const value = e.target.value;
//   setCompactType(value === "null" ? null : value);
// };

//   const onDrop = (elemParams) => {
//     alert(
//       `Element parameters:\n${JSON.stringify(
//         elemParams,
//         ["x", "y", "w", "h"],
//         2
//       )}`
//     );
//   };

//   return (
//     <div className="aspect-video overflow-x-scroll px-4">
//       <div className="w-lg h-auto font-sans text-center p-4 border-2 border-red-500">
//         {/* <div className="mb-4">
//         <label className="block text-gray-700 font-bold mb-2">
//         Select Compaction Type:
//         </label>
//         <select
//         value={compactType ?? "null"}
//         onChange={handleCompactTypeChange}
//         className="border rounded px-3 py-2"
//         >
//         <option value="vertical">Vertical</option>
//         <option value="horizontal">Horizontal</option>
//         <option value="null">No Compaction</option>
//         </select>
//         </div> */}
//         {/*
//       <div
//       className="h-[50px] w-[250px] bg-sky-400 m-2 border-2 border-dashed flex justify-center items-center cursor-move"
//       draggable={true}
//       unselectable="on"
//       onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
//       >
//       Droppable Element (Drag me!)
//       </div> */}

//         <ResizablePanelGroup>
//           <ResponsiveReactGridLayout
//             rowHeight={30}
//             cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
//             layout={layout}
//             onDrop={onDrop}
//             measureBeforeMount={false}
//             useCSSTransforms={mounted}
//             compactType={compactType}
//             // preventCollision={!compactType}
//             isDroppable={true}
//             droppingItem={{ i: "xx", h: 50, w: 250 }}
//           >
//             {layout.map((itm, i) => (
//               <div
//                 key={itm.i}
//                 data-grid={itm}
//                 className="bg-sky-400 flex justify-center items-center rounded shadow-md"
//               >
//                 {itm.name}
//               </div>
//             ))}
//           </ResponsiveReactGridLayout>
//         </ResizablePanelGroup>
//       </div>
//     </div>
//   );
// }

// "use client";

// import * as React from "react";
// import RGL, { WidthProvider } from "react-grid-layout";
// import { Card, CardContent } from "./ui/card";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import { Button } from "./ui/button";

// const ReactGridLayout = WidthProvider(RGL);

// let idCounter = 0;
// const getId = () => (++idCounter).toString();

// export default function ZoneComponent() {
//   const [layout, setLayout] = React.useState([]);
//   const [zones, setZones] = React.useState([]);
//   const [title, setTitle] = React.useState("");
//   const [type, setType] = React.useState("");

//   const addNewItem = () => {
//     if (!title || !type) return alert("Please fill in the title and type");

//     const id = getId();
//     const newItem = { x: 0, y: Infinity, w: 3, h: 3, i: id };
//     setLayout((prev) => [...prev, newItem]);
//     setZones((prev) => [...prev, { id, title, type }]);

//     setTitle(""); // Reset form
//     setType("");
//   };

//   return (
//     <Card className="p-4">
//       <form onSubmit={(e) => e.preventDefault()}>
//         <div className="grid grid-cols-2 gap-4">
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="name">Zone Title</Label>
//             <Input
//               id="name"
//               placeholder="Enter zone title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col space-y-2">
//             <Label htmlFor="type">Zone Type</Label>
//             <Select value={type} onValueChange={setType}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="General">General</SelectItem>
//                 <SelectItem value="VIP">VIP</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <Button className="mt-4" type="button" onClick={addNewItem}>
//           Add Zone
//         </Button>
//       </form>

//       <div className="mt-6">
//         <ReactGridLayout
//           className="layout"
//           layout={layout}
//           cols={12}
//           rowHeight={30}
//           width={1200}
//           onLayoutChange={(l) => setLayout(l)}
//           isDraggable={true}
//           isResizable={true}
//         >
//           {layout.map((item) => {
//             const zone = zones.find((z) => z.id === item.i);
//             return (
//               <div key={item.i} data-grid={item}>
//                 <Card className="h-full w-full">
//                   <CardContent className="h-full w-full flex flex-col items-center justify-center">
//                     <p className="text-lg font-bold">{zone?.title}</p>
//                     <p className="text-sm text-muted-foreground">{zone?.type}</p>
//                   </CardContent>
//                 </Card>
//               </div>
//             );
//           })}
//         </ReactGridLayout>
//       </div>
//     </Card>
//   );
// }










// "use client";
// import * as React from "react";
// import RGL, { WidthProvider } from "react-grid-layout";
// import { Card, CardContent } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

// const ReactGridLayout = WidthProvider(RGL);

// let idCounter = 0;
// const getId = () => (++idCounter).toString();

// export default function ZoneComponent() {
//   const [layout, setLayout] = React.useState([]);
//   const [zoneData, setZoneData] = React.useState({});
//   const [zoneTitle, setZoneTitle] = React.useState("");
//   const [zoneType, setZoneType] = React.useState("");

//   const addNewItem = () => {
//     const id = getId();
//     const newItem = { x: 0, y: 0, w: 3, h: 3, i: id };
//     setLayout((prev) => [...prev, newItem]);
//     setZoneData((prev) => ({
//       ...prev,
//       [id]: { title: zoneTitle || `Zone ${id}`, type: zoneType || "General" },
//     }));
//     setZoneTitle("");
//     setZoneType("");
//   };

//   const deleteItem = (id) => {
//     setLayout((prev) => prev.filter((item) => item.i !== id));
//     setZoneData((prev) => {
//       const copy = { ...prev };
//       delete copy[id];
//       return copy;
//     });
//   };

//   return (
//     <Card className="p-4">
//       <form className="grid grid-cols-2 gap-4 mb-4">
//         <div className="flex flex-col space-y-1.5">
//           <Label htmlFor="name">Zone Title</Label>
//           <Input
//             id="name"
//             placeholder="Enter title"
//             value={zoneTitle}
//             onChange={(e) => setZoneTitle(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col space-y-1.5">
//           <Label htmlFor="type">Zone Type</Label>
//           <Select value={zoneType} onValueChange={setZoneType}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="General">General</SelectItem>
//               <SelectItem value="VIP">VIP</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Button className="col-span-2 mt-2" type="button" onClick={addNewItem}>
//           Add Zone
//         </Button>
//       </form>

//       <div className="shadow-2xl rounded-2xl">
//         <ReactGridLayout
//           className="layout"
//           layout={layout}
//           cols={12}
//           rowHeight={30}
//           width={1200}
//           onLayoutChange={(l) => setLayout(l)}
//           isDraggable={true}
//           isResizable={true}
//           useCSSTransforms={true}
//           draggableCancel=".no-drag"
//         >
//           {layout.map((item) => {
//             const zone = zoneData[item.i] || {};
//             return (
//               <div key={item.i} data-grid={item}>
//                 <Card className="h-full w-full box-border relative">
//                   <CardContent className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
//                     <p className="text-lg font-semibold">{zone.title}</p>
//                     <p className="text-sm text-muted-foreground">{zone.type}</p>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="absolute top-1 right-1 no-drag"
//                       onClick={() => deleteItem(item.i)}
//                     >
//                       ✕
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             );
//           })}
//         </ReactGridLayout>
//       </div>
//     </Card>
//   );
// }













// "use client";
// import * as React from "react";
// import RGL, { WidthProvider } from "react-grid-layout";
// import { Card, CardContent } from "./ui/card";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";

// const ReactGridLayout = WidthProvider(RGL);

// let idCounter = 0;
// const getId = () => (++idCounter).toString();
// const STORAGE_KEY = "zone_layout";

// export default function ZoneComponent() {
//   const [layout, setLayout] = React.useState([]);
//   const [zoneData, setZoneData] = React.useState({});
//   const [zoneTitle, setZoneTitle] = React.useState("");
//   const [zoneType, setZoneType] = React.useState("");

//   // Save to localStorage
//   const saveLayoutToStorage = () => {
//     const fullData = layout.map((item) => ({
//       id: item.i,
//       layout: {
//         x: item.x,
//         y: item.y,
//         w: item.w,
//         h: item.h,
//       },
//       title: zoneData[item.i]?.title || "",
//       type: zoneData[item.i]?.type || "",
//     }));
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
//     alert("Layout saved to localStorage!");
//   };

//   const addNewItem = () => {
//     const id = getId();
//     const newItem = { x: 0, y: 0, w: 3, h: 3, i: id };
//     setLayout((prev) => [...prev, newItem]);
//     setZoneData((prev) => ({
//       ...prev,
//       [id]: { title: zoneTitle || `Zone ${id}`, type: zoneType || "General" },
//     }));
//     setZoneTitle("");
//     setZoneType("");
//   };

//   const deleteItem = (id) => {
//     setLayout((prev) => prev.filter((item) => item.i !== id));
//     setZoneData((prev) => {
//       const copy = { ...prev };
//       delete copy[id];
//       return copy;
//     });
//   };

//   return (
//     <Card className="p-4">
//       <form className="grid grid-cols-2 gap-4 mb-4">
//         <div className="flex flex-col space-y-1.5">
//           <Label htmlFor="name">Zone Title</Label>
//           <Input
//             id="name"
//             placeholder="Enter title"
//             value={zoneTitle}
//             onChange={(e) => setZoneTitle(e.target.value)}
//           />
//         </div>
//         <div className="flex flex-col space-y-1.5">
//           <Label htmlFor="type">Zone Type</Label>
//           <Select value={zoneType} onValueChange={setZoneType}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select type" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="General">General</SelectItem>
//               <SelectItem value="VIP">VIP</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <div className="col-span-2 flex gap-2 mt-2">
//           <Button type="button" onClick={addNewItem}>
//             Add Zone
//           </Button>
//           <Button type="button" onClick={saveLayoutToStorage} variant="secondary">
//             Save Layout
//           </Button>
//         </div>
//       </form>

//       <div className="shadow-2xl rounded-2xl">
//         <ReactGridLayout
//           className="layout"
//           layout={layout}
//           cols={12}
//           rowHeight={30}
//           width={1200}
//           onLayoutChange={(l) => setLayout(l)}
//           isDraggable={true}
//           isResizable={true}
//           useCSSTransforms={true}
//           draggableCancel=".no-drag"
//         >
//           {layout.map((item) => {
//             const zone = zoneData[item.i] || {};
//             return (
//               <div key={item.i} data-grid={item}>
//                 <Card className="h-full w-full box-border relative">
//                   <CardContent className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
//                     <p className="text-lg font-semibold">{zone.title}</p>
//                     <p className="text-sm text-muted-foreground">{zone.type}</p>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="absolute top-1 right-1 no-drag"
//                       onClick={() => deleteItem(item.i)}
//                     >
//                       ✕
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </div>
//             );
//           })}
//         </ReactGridLayout>
//       </div>
//     </Card>
//   );
// }









"use client";
import * as React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ReactGridLayout = WidthProvider(RGL);
const STORAGE_KEY = "zone_layout";

let idCounter = 0;
const getId = () => (++idCounter).toString();

export default function ZoneComponent() {
  const [layout, setLayout] = React.useState([]);
  const [zoneData, setZoneData] = React.useState({});
  const [zoneTitle, setZoneTitle] = React.useState("");
  const [zoneType, setZoneType] = React.useState("");

  // Load layout from localStorage on mount
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
      // Set idCounter to the highest existing id
      const maxId = Math.max(...parsed.map((z) => parseInt(z.id, 10)));
      idCounter = maxId;
    }
  }, []);

  const saveLayoutToStorage = () => {
    const fullData = layout.map((item) => ({
      id: item.i,
      layout: {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      },
      title: zoneData[item.i]?.title || "",
      type: zoneData[item.i]?.type || "",
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fullData));
    alert("Layout saved to localStorage!");
  };

  const addNewItem = () => {
    const id = getId();
    const newItem = { x: 0, y: Infinity, w: 3, h: 3, i: id }; // Use Infinity to place below last row
    setLayout((prev) => [...prev, newItem]);
    setZoneData((prev) => ({
      ...prev,
      [id]: { title: zoneTitle || `Zone ${id}`, type: zoneType || "General" },
    }));
    setZoneTitle("");
    setZoneType("");
  };

  const deleteItem = (id) => {
    setLayout((prev) => prev.filter((item) => item.i !== id));
    setZoneData((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  return (
    <Card className="p-4">
      <form className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Zone Title</Label>
          <Input
            id="name"
            placeholder="Enter title"
            value={zoneTitle}
            onChange={(e) => setZoneTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="type">Zone Type</Label>
          <Select value={zoneType} onValueChange={setZoneType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 flex gap-2 mt-2">
          <Button type="button" onClick={addNewItem}>
            Add Zone
          </Button>
          <Button type="button" onClick={saveLayoutToStorage} variant="secondary">
            Save Layout
          </Button>
        </div>
      </form>

      <div className="shadow-2xl rounded-2xl">
        <ReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={(l) => setLayout(l)}
          isDraggable
          isResizable
          useCSSTransforms
          draggableCancel=".no-drag"
        >
          {layout.map((item) => {
            const zone = zoneData[item.i] || {};
            return (
              <div key={item.i} data-grid={item}>
                <Card className="h-full w-full box-border relative">
                  <CardContent className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-lg font-semibold">{zone.title}</p>
                    <p className="text-sm text-muted-foreground">{zone.type}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 no-drag"
                      onClick={() => deleteItem(item.i)}
                    >
                      ✕
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </ReactGridLayout>
      </div>
    </Card>
  );
}