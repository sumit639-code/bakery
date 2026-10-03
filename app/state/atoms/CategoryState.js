import { atom } from "recoil";

export const CategoryState = atom({
  key: "SelectedCategory",
  default: "All",
});
