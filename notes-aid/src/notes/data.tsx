import subjects_comps_fy_odd from "./fy/comps/oddSem/subjects";
import subjects_comps_fy_evenSem from "./fy/comps/evenSem/subject";

import subjects_comps_sy_oddSem from "./sy/comps/oddSem/subject";
import subjects_comps_sy_evenSem from "./sy/comps/evenSem/subject";
import subjects_it_sy_oddSem from "./sy/it/oddSem/subject";
import subjects_it_sy_evenSem from "./sy/it/evenSem/subject";
import subjects_aids_sy_oddSem from "./sy/aids/oddSem/subject";
import subjects_aids_sy_evenSem from "./sy/aids/evenSem/subject";
import subjects_excp_sy_oddSem from "./sy/excp/oddSem/subject";
import subjects_excp_sy_evenSem from "./sy/excp/evenSem/subject";
import subjects_extc_sy_oddSem from "./sy/extc/oddSem/subject";
import subjects_extc_sy_evenSem from "./sy/extc/evenSem/subject";

import subjects_comps_ty_even from "./ty/comps/evenSem/subject";
import subjects_comps_ty_odd from "./ty/comps/oddSem/subject";
import subjects_it_ty_even from "./ty/it/evenSem/subject";
// import subjects_it_ty_odd from "./ty/it/oddSem/subject";
// import subjects_mech_ty_even from "./ty/mech/evenSem/subject";
// import subjects_mech_ty_odd from "./ty/mech/oddSem/subject";
import subjects_excp_ty_even from "./ty/excp/evenSem/subject";
// import subjects_excp_ty_odd from "./ty/excp/oddSem/subject";

const NotesData = {
  fy: {
    comps: {
      odd: subjects_comps_fy_odd,
      even: subjects_comps_fy_evenSem,
    },
  },
  sy: {
    comps: {
      odd: subjects_comps_sy_oddSem,
      even: subjects_comps_sy_evenSem,
    },
    it: {
      odd: subjects_it_sy_oddSem,
      even: subjects_it_sy_evenSem,
    },
    excp: {
      odd: subjects_excp_sy_oddSem,
      even: subjects_excp_sy_evenSem,
    },
    aids: {
      odd: subjects_aids_sy_oddSem,
      even: subjects_aids_sy_evenSem,
    },
    extc: {
      odd: subjects_extc_sy_oddSem,
      even: subjects_extc_sy_evenSem,
    },
  },
  ty: {
    comps: {
      odd: subjects_comps_ty_odd,
      even: subjects_comps_ty_even,
    },
    it: {
      // odd: subjects_it_ty_odd,
      even: subjects_it_ty_even,
    },
    excp: {
      // odd: subjects_excp_ty_odd,
      even: subjects_excp_ty_even,
    },
    // mech: {
    //   odd: subjects_mech_ty_odd,
    //   even: subjects_mech_ty_even,
    // },
  },
  ly: {
    comps: {
      odd: {},
      even: {},
    },
    it: {
      odd: {},
      even: {},
    },
    excp: {
      odd: {},
      even: {},
    },
  },
};

export default NotesData;
