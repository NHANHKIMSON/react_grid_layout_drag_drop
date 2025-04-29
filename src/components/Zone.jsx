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
// const STORAGE_KEY = "zone_layout";

// let idCounter = 0;
// const getId = () => (++idCounter).toString();

// export default function ZoneComponent() {
//   const [layout, setLayout] = React.useState([]);
//   const [zoneData, setZoneData] = React.useState({});
//   const [zoneTitle, setZoneTitle] = React.useState("");
//   const [zoneType, setZoneType] = React.useState("");

//   // Load layout from localStorage on mount
//   React.useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) {
//       const parsed = JSON.parse(saved);
//       const loadedLayout = parsed.map((item) => ({
//         x: item.layout.x,
//         y: item.layout.y,
//         w: item.layout.w,
//         h: item.layout.h,
//         i: item.id,
//       }));
//       const loadedZoneData = {};
//       parsed.forEach((item) => {
//         loadedZoneData[item.id] = {
//           title: item.title,
//           type: item.type,
//         };
//       });
//       setLayout(loadedLayout);
//       setZoneData(loadedZoneData);
//       // Set idCounter to the highest existing id
//       const maxId = Math.max(...parsed.map((z) => parseInt(z.id, 10)));
//       idCounter = maxId;
//     }
//   }, []);

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
//     const newItem = { x: 0, y: Infinity, w: 3, h: 3, i: id }; // Use Infinity to place below last row
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
//           isDraggable
//           isResizable
//           useCSSTransforms
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
    const newItem = { x: 0, y: Infinity, w: 3, h: 3, i: id };
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

  const updateZoneField = (id, field, value) => {
    setZoneData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  return (
    <Card className="p-4 bg-card text-card-foreground">
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
                <Card className="h-full w-full box-border relative bg-card text-card-foreground">
                  <CardContent className="h-full w-full flex flex-col gap-2 items-center justify-center p-4 text-center">
                    <Input
                      className="no-drag text-center text-lg font-semibold"
                      value={zone.title}
                      onChange={(e) => updateZoneField(item.i, "title", e.target.value)}
                    />
                    <Select
                      value={zone.type}
                      onValueChange={(value) => updateZoneField(item.i, "type", value)}
                    >
                      <SelectTrigger className="w-32 no-drag">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                      </SelectContent>
                    </Select>
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