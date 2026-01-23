import { StyleGuide } from "@/redux/api/style-guide";

export const mockStyleGuide: StyleGuide = {
  theme: "Playful Pastel",
  description: "Creative projects and fun user experiences.",
  colorSections: [
    {
      title: "Primary Colours",
      swatches: [
        {
          name: "Lavender Dream",
          hexColor: "#E8D5F2",
          description: "Soft purple for headers and primary elements",
        },
        {
          name: "Cloud White",
          hexColor: "#FEFEFE",
          description: "Pure white background with subtle warmth",
        },
        {
          name: "Mint Cream",
          hexColor: "#F0FDF4",
          description: "Gentle mint for light backgrounds and accents",
        },
      ],
    },
    {
      title: "Secondary & Accent Colors",
      swatches: [
        {
          name: "Peach Glow",
          hexColor: "#FFD6C9",
          description: "Warm accent for highlights and CTAs",
        },
        {
          name: "Sky Blue",
          hexColor: "#E0F2FE",
          description: "Soft blue for secondary backgrounds",
        },
      ],
    },
    {
      title: "UI Component Colors",
      swatches: [
        {
          name: "Border Soft",
          hexColor: "#E5E7EB",
          description: "Default border color for cards and inputs",
        },
        {
          name: "Surface Muted",
          hexColor: "#F9FAFB",
          description: "Muted surface for panels and sections",
        },
      ],
    },
    {
      title: "Utility & Form Colors",
      swatches: [
        {
          name: "Input Background",
          hexColor: "#FFFFFF",
          description: "Form input background",
        },
        {
          name: "Input Border",
          hexColor: "#D1D5DB",
          description: "Form input border color",
        },
      ],
    },
    {
      title: "Status & Feedback Colors",
      swatches: [
        {
          name: "Success",
          hexColor: "#22C55E",
          description: "Success states and confirmations",
        },
        {
          name: "Warning",
          hexColor: "#F59E0B",
          description: "Warnings and caution messages",
        },
        {
          name: "Error",
          hexColor: "#EF4444",
          description: "Errors and destructive actions",
        },
      ],
    },
  ],
  typographySections: [
    {
      title: "Headings",
      styles: [
        {
          name: "H1",
          fontFamily: "Inter",
          fontSize: "2.25rem",
          fontWeight: "700",
          lineHeight: "2.5rem",
        },
        {
          name: "H2",
          fontFamily: "Inter",
          fontSize: "1.875rem",
          fontWeight: "600",
          lineHeight: "2.25rem",
        },
      ],
    },
    {
      title: "Body Text",
      styles: [
        {
          name: "Body",
          fontFamily: "Inter",
          fontSize: "1rem",
          fontWeight: "400",
          lineHeight: "1.75rem",
        },
        {
          name: "Small",
          fontFamily: "Inter",
          fontSize: "0.875rem",
          fontWeight: "400",
          lineHeight: "1.25rem",
        },
      ],
    },
  ],
}
