// lib/toast.ts
import { toast as hotToast } from "react-hot-toast";
export const toast = {
  success: (message) =>
    hotToast.success(message, {
      duration: 2000,
      className:
        "bg-background text-foreground border border-border shadow-md dark:bg-[#111] dark:text-white",
    }),
   error: (message) =>
    hotToast.error(message, {
      duration: 3000,
      className:
        "bg-destructive text-destructive-foreground border border-border shadow-md dark:bg-red-900 dark:text-white",
    }),
};