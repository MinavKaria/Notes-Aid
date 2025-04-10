
import { Brain } from "lucide-react";

const rdbms = {
  name: "Relational Database Management Systems",
  icon: Brain,
  color: "green",
  modules: {
    1: {
      notesLink: [
        {
          title: "Module 1 Notes (Placeholder)",
          url: "https://your-link-here.com/module1-notes",
        },
      ],
      topics: [
        {
          title: "1.1: Introduction to Databases",
          description: "Introduction to DBMS (Database Management System) With Real life examples | What is DBMS",
          videos: [
            {
              title: "1.1.1: Introduction",
              url: "https://www.youtube.com/embed/3EJlovevfcA?si=LuGrhrFCiEJG80KT",
            },
            {
              title: "1.1.2: File Structure vs DBMS",
              url: "https://www.youtube.com/embed/ZtVw2iuFI2w?si=iCEVU_8EWvnjXogN"
            },
            
          ],
        },
        {
          title: "1.2: Database System Concepts and Architecture",
          description: "Data Models, Schemas, Architecture, Interfaces",
          videos: [
            {
              title: "1.2.1: 2 tier and 3 tier Architecture",
              url: "https://www.youtube.com/embed/VyvTabQHevw?si=XUuDBAgcdHnre-8R",
            },
            {
              title: "1.2.2: What is a schema",
              url: "https://www.youtube.com/embed/3EJlovevfcA?si=LuGrhrFCiEJG80KT",
            },
            {
              title: "1.2.3: 3 schema architecture",
              url: "https://www.youtube.com/embed/pDX4NR4eY3A?si=ziKQudl2yETfmOXC",
            },
            {
              title: "1.2.4: Data Independence",
              url: "https://www.youtube.com/embed/upUSGUSK5k0?si=VA9hy66MX1Hb2Gs1",
            },
            {
              title: "1.2.5: DBMS languages and interfaces",
              url: "https://www.youtube.com/embed/DkEMtOFMNQE?si=GmVW4XCWPk-iXd3G",
            }

          ],
        },
      ],
    },
    2: {
      notesLink: [
        {
          title: "Module 2 Notes (Placeholder)",
          url: "https://your-link-here.com/module2-notes",
        },
      ],
      topics: [
        {
          title: "2.1: ER Modeling",
          description: "Entity types, Relationships, Keys, ER Diagrams",
          videos: [
            {
              title: "2.1.1: ER model",
              url: "https://www.youtube.com/embed/gbVev8RuZLg?si=4h0KpmVbFKGcHYhe",
            },
            {
              title: "2.1.2: Attributes in ER model",
              url: "https://www.youtube.com/embed/WEo3g6Ir-vA?si=aJXvdY8_pIg-VeI_",
            },
            {
              title: "2.1.3: Keys in ER model",
              url: "https://www.youtube.com/embed/_UZLrD_R0T4?si=JzYsdPNnkLix2YME",
            },
            {
              title: "2.1.4: Weak entity set",
              url:"https://www.youtube.com/embed/vzuzUvbj_bU?si=1A_ZzdtefdWXrKgj",
            },
            {
              title: "2.1.5: Relationship set",
              url: "https://www.youtube.com/embed/zaq6aR1S_c8?si=conOnJx7c4xRsrxe",
            },
            
          ],
        },
        {
          title: "2.2: Enhanced ER Model",
          description: "Specialization, Generalization, Inheritance",
          videos: [
            {
              title: "2.2.1: Introduction to EER Model",
              url: "https://www.youtube.com/embed/LpsA0vgu2MI?si=XH3J5U2VlrXjYiYK",
            },
            {
              title: "2.2.2: Generalization and specialzation",
              url:"https://www.youtube.com/embed/4_vsGgy9cGs?si=_fDOP9Jp4pJFDL5m",
            },
            {
              title: "2.2.3: Aggregation",
              url: "https://www.youtube.com/embed/H2AGn0QHcSI?si=b-C3Nv3Rm0fnuBn7"
            }
          ],
        },
        {
          title: "2.3: Relational Data Model and Constraints",
          description: "Relational Concepts, Constraints, Schemas",
          videos: [
            {
              title: "2.3.1: Introduction to Relational Model",
              url: "https://www.youtube.com/embed/Q45sr5p_NmQ?si=F2BOkQ8Yvgo1egXG",
            },
          ],
        },
        {
          title: "2.4: ER/EER to Relational Mapping",
          description: "Mapping high-level models to relational schemas",
          videos: [
            {
              title: "2.4.1: EER to Relational Mapping",
              url: "https://www.youtube.com/embed/v3qGAu88ifI?si=jFbGJ694-nwnetvx",
            },
          ],
        },
      ],
    },
    3: {
      notesLink: [
        {
          title: "Module 3 Notes (Placeholder)",
          url: "https://your-link-here.com/module3-notes",
        },
      ],
      topics: [
        {
          title: "3.1: Relational Algebra",
          description: "SELECT, PROJECT, JOIN, DIVISION, Set operations",
          videos: [
            {
              title: "3.1.1: Relational Algebra Complete",
              url: "https://www.youtube.com/embed/ryeGFOMZhK4?si=FbrCHOTaLSmaR45j",
            },
          ],
        },
        {
          title: "3.2: SQL",
          description: "DDL, DML, Constraints, Views, Triggers, Complex Queries",
          videos: [
            {
              title: "3.2.1: SQL one shot",
              url: "https://www.youtube.com/embed/hlGoQC332VM?si=OWhuI-nXZ4OPTDYM",
            },
          ],
        },
      ],
    },
    4: {
      notesLink: [
        {
          title: "Module 4 Notes (Placeholder)",
          url: "https://your-link-here.com/module4-notes",
        },
      ],
      topics: [
        {
          title: "4.1: Relational Database Design",
          description: "FDs, Normal Forms, Minimal Cover, Decomposition",
          videos: [
            {
              title: "4.1.1: Functional Dependency",
              url: "https://www.youtube.com/embed/qn5neFBpU40?si=x_qgoTciPd1wVVGF",
            },
            {
              title: "4.1.2: Normalization",
              url: "https://www.youtube.com/embed/5GDTIUVlHB8?si=vvHk2yLQgVdB-Dot",
            },
            {
              title: "4.1.3: Armstrong's Axioms",
              url: "https://www.youtube.com/embed/eIH7zRVelnw?si=vTKlklTMu2ZmbTVJ",
            },
            {
              title: "4.1.4: Relational Decomposition",
              url: "https://www.youtube.com/embed/DeSBEIYaBfU?si=pZe2qUmMkktADkz7",
            }
          ],
        },
        {
          title: "4.2: Indexing Structures",
          description: "Single & Multi-level Indexes, B/B+ Trees",
          videos: [
            {
              title: "4.2.1: Indexing introduction",
              url: "https://www.youtube.com/embed/E--yzX05_k8?si=IaRQpaz3dgbMK0S9",
            },
            {
              title: "4.2.2: Types of Indexes",
              url: "https://www.youtube.com/embed/vjrHiaIfOl8?si=u6n65nGm08spMnOd",
            },
            {
              title: "4.2.3: B+ Tree",
              url: "https://www.youtube.com/embed/9AkRxwT8T1E?si=JpPlc-A0qppwGTfu",
            },
            {
              title: "4.2.4: B-Tree",
              url: "https://www.youtube.com/embed/KcApkM5WYGw?si=Ew1tS-gpHckjnWhc",
            }
          ],
        },
        {
          title: "4.3: Query Processing",
          description: "Algorithms for SELECT and PROJECT",
          videos: [
            {
              title: "4.3.1: Query Processing and Optimization",
              url: "https://www.youtube.com/embed/TyHUU05XKMY?si=VjXBGbHPD9Tg6vhl",
            },
            
          ],
        },
      ],
    },
    // 5: {
    //   notesLink: [
    //     {
    //       title: "Module 5 Notes (Placeholder)",
    //       url: "https://your-link-here.com/module5-notes",
    //     },
    //   ],
    //   topics: [
    //     {
    //       title: "5.1: Transaction Processing Concepts",
    //       description: "ACID, Recoverability, Serializability",
    //       videos: [
    //         {
    //           title: "5.1.1: Video Placeholder",
    //           url: "https://www.youtube.com/embed/your-video-id",
    //         },
    //       ],
    //     },
    //     {
    //       title: "5.2: Concurrency Control Techniques",
    //       description: "Lock-based, Timestamp, Validation, Deadlocks",
    //       videos: [
    //         {
    //           title: "5.2.1: Video Placeholder",
    //           url: "https://www.youtube.com/embed/your-video-id",
    //         },
    //       ],
    //     },
    //     {
    //       title: "5.3: Recovery Techniques",
    //       description: "Deferred & Immediate Update, Shadow Paging",
    //       videos: [
    //         {
    //           title: "5.3.1: Video Placeholder",
    //           url: "https://www.youtube.com/embed/your-video-id",
    //         },
    //       ],
    //     },
    //   ],
    // },
  },
};

export default rdbms;
