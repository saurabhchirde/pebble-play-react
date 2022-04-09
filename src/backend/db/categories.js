import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Photography",
    description:
      "Photography tutorials for capturing better landscape pictures.",
  },
  {
    _id: uuid(),
    categoryName: "Editing",
    description:
      "Photo editing using softwares such as Adobe Photoshop, Lightroom etc",
  },
  {
    _id: uuid(),
    categoryName: "Film",
    description: "Film making",
  },
  {
    _id: uuid(),
    categoryName: "Vlogs",
    description: "vlogs",
  },
];
