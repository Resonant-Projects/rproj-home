import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Keith Elliott - Link Tree",
    short_name: "Keith Elliott",
    description: "Connect with me through my projects, newsletter, and social media.",
    start_url: "/",
    display: "standalone",
    background_color: "#2c1028",
    theme_color: "#7e3775",
    icons: [
      {
        src: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
