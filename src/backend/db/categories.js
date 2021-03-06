import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Photography",
    category: "photography",
    description:
      "Photography tutorials for capturing better landscape pictures.",
    icon: "fas fa-camera",
  },
  {
    _id: uuid(),
    categoryName: "Editing",
    category: "editing",
    description:
      "Photo editing using softwares such as Adobe Photoshop, Lightroom etc",
    icon: "fas fa-desktop",
  },
  {
    _id: uuid(),
    categoryName: "Film",
    category: "film",
    description: "Film making",
    icon: "fas fa-film",
  },
  {
    _id: uuid(),
    categoryName: "Vlogs",
    category: "vlog",
    description: "vlogs",
    icon: "fas fa-video",
  },
];
