import { Subjects } from "@/interfaces/Subject";
import adc from "./adc/data";
import aoa from "./aoa/data";
import casot from "./casot/data";
import dbms from "./dbms/data";
import dsm from "./dsm/data";

const subjects: Subjects = {
    adc: adc,
    aoa: aoa,
    casot: casot,
    dbms: dbms,
    dsm: dsm,
};

export default subjects;
