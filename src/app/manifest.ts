import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PunjKash Travel & Tourism", short_name: "PunjKash", description: "Flights, holidays, Umrah and Hajj, tours, hotels and visas from Pakistan.",
    start_url: "/", display: "standalone", background_color: "#FBFAF7", theme_color: "#FBFAF7",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" }],
  };
}
