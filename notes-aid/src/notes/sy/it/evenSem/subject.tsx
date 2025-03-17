import { Subjects } from "@/interfaces/Subject";
import adb from "./adb/data";
import aoa from "./aoa/data";
import itc from "./itc/data";
import psot from "./psot/data";

const subjects: Subjects = {
  adb: adb,
  aoa: aoa,
  itc: itc,
  psot: psot,
};

export default subjects;
