import { create } from "zustand";

type Store = {
  isEducator: boolean;
  currency: string;
};

export const useStore = create<Store>(() => ({
  isEducator: true,
  currency: "$",
}));
