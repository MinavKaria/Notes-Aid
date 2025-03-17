import { Subjects } from "@/interfaces/Subject";
import cldm from "./cldm/data";
import dbms from "./dbms/data";
import dgs from "./dgs/data";
import ds from "./ds/data";
import fds from "./fds/data";

const subjects: Subjects = {
  cldm: cldm,
  dbms: dbms,
  dgs: dgs,
  ds: ds,
  fds: fds,
};

export default subjects;
