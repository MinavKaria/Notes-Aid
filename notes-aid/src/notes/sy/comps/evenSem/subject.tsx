import { Subjects } from "@/interfaces/Subject";
import aoa from "./aoa/data";
import os from "./os/data";
import psot from "./psot/data";
import rdbms from "./rdbms/data";

const subjects: Subjects = {
    psot: psot,
    aoa: aoa,
    os: os,
    rdbms: rdbms,
};

export default subjects;
