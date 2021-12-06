import { atom } from "recoil";

export const selectedDateMainAtom = atom({
    key: "selectedDateMain",
    default: new Date(),
});
