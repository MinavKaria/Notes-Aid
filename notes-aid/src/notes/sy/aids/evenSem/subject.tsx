import { Subjects } from "@/interfaces/Subject";
import ai from "./ai/data";
import aoa from "./aoa/data";
import cnis from "./cnis/data";
import os from "./os/data";
import psot from "./psot/data";

const subjects: Subjects = {
  ai: ai,
  aoa: aoa,
  cnis: cnis,
  os: os,
  psot: psot,
};

export default subjects;
