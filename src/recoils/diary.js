import { atom } from "recoil";

export const dateAtom = atom({ key: "date", default: new Date() });
export const isUpdateNow = atom({ key: "isUpdateDiary", default: false });
