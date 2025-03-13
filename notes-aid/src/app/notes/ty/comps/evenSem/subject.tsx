import {
  Signal,
  Brain,
  EarthLock,
  MessageSquareLock,
  Server,
  Database,
} from "lucide-react";

import { Subjects } from "@/app/interfaces/Subject";

const subjects: Subjects = {
  dsip: {
    name: "Digital Systems and Image Processing",
    icon: Signal,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/Chapter%201%20DSIP%202022.pptx.pdf?alt=media&token=7d6bd8e7-ce2a-4d1d-bf88-c38fee89642e",
        ],
        topics: [
          {
            title: "1.1.1 Introduction to digital signals and systems",
            description: "Basic theoretical concepts",
            videos: [
              {
                title: "Introduction to Digital Signals and Systems",
                url: "https://www.youtube.com/embed/iCaDt9Esdv4?si=KFIJ7HSUSv-S6pRo",
              },
              {
                title: "Representation of Discrete Time Signals",
                url: "https://www.youtube.com/embed/ZU6YFD5NQ8E?si=kbEPUnYPRQ4WRj_i",
              },

              {
                title: "Types of Signals",
                url: "https://www.youtube.com/embed/N2qDknnckHc?si=86ur6m8GS9NLpm-p",
              },
              {
                title: "Sampling Theorem (Definition only) ",
                url: "https://www.youtube.com/embed/XyZerq7-IvA?si=5D4KVG8u27VPgHV-",
              },
            ],
            // notes: [
            //   {
            //     title: "Lecture Notes - Week 1",
            //     url: "https://example.com/notes1.pdf",
            //   },
            //   {
            //     title: "Practice Problems",
            //     url: "https://example.com/practice1.pdf",
            //   },
            // ],
          },
          {
            title: "1.1.2 Properties and operations on digital signals.",
            description: "Basic numerical based concepts",
            videos: [
              {
                title: "Operations on Signals",
                url: "https://www.youtube.com/embed/H5RZPorc1z4?si=6qCxBHZatmGmjSWF",
              },
            ],
          },
          {
            title: "1.2 Classification of signals, system, LTI system",
            description: "Important Topic for Exam ⭐ - Numerical based",
            videos: [
              {
                title: "Video 1 - Deterministic and Non Deterministic Signals",
                url: "https://www.youtube.com/embed/tu9TPkS0uZE?si=f7rqIaoD8EnfaSaL",
              },
              {
                title: "Video 1 - Periodic and Aperiodic",
                url: "https://www.youtube.com/embed/o6BHBjKQ8io?si=F6VFofnRs734JYl4",
              },
              {
                title: "Video 1 - Symmetric and Antisymmetric",
                url: "https://www.youtube.com/embed/wfnIbHHtfHM?si=jX5ETZGA7lHtruRZ",
              },
              {
                title: "Video 1 - Even and Odd",
                url: "https://www.youtube.com/embed/4R0vHEnUGug?si=qgLs-Td3jQDo7Up1",
              },
              {
                title: "Video 1 - Casual and Non-Casual",
                url: "https://www.youtube.com/embed/8qAPF9QbOi8?si=kbpY_E0XYXHkwqX1",
              },
              {
                title: "Video 1 - Energy and Power ",
                url: "https://www.youtube.com/embed/yGEEvn8CzrU?si=22aPNcgJR-FcKEQu",
              },
              {
                title: "Block Diagram & Signal Flow Graph",
                url: "https://www.youtube.com/embed/BDI4zf9Azpk?si=OOfMbLy-cbIG4ib7"
              },
              {
                title: "Block Diagram & Signal Flow Graph - Part 2",
                url: "https://www.youtube.com/embed/rjC_7YOiM3I?si=ncTFhky6vsF2PEPK"
              },
              {
                title: "Block Diagram & Signal Flow Graph - Part 2",
                url: "https://www.youtube.com/embed/rjC_7YOiM3I?si=ncTFhky6vsF2PEPK"
              },
              {
                title: "Block Diagram & Signal Flow Graph - Part 3",
                url: "https://www.youtube.com/embed/BYMc-YEy89E?si=6kmCxOIYxiqTARVB"
              },
              {
                title: "Video 2 (Classification of Discrete Time System) 1",
                url: "https://www.youtube.com/embed/ejKmKNujx7c?si=TCACor4C2mrW4Qqk",
              },
              {
                title: "Video 2 (Classification of Discrete Time System) 2",
                url: "https://www.youtube.com/embed/L2M1SE1GvNI?si=tUn_gY2AKx58dyRA",
              },
              {
                title:
                  "Video 3 (Classification of Linear Time Invariant Signals) 1",
                url: "https://www.youtube.com/embed/LezLNMznZm4?si=PZPuQJ4Xy0x1f1rQ",
              },
              {
                title:
                  "Video 4 (Linear Time Invariant Signals - Solved Example) 1",
                url: "https://www.youtube.com/embed/BZq7j2b-7Lw?si=e8WloXJp39DIt-RR",
              },
              {
                title:
                  "Video 5 (Linear Time Invariant Signals - Solved Example) 2",
                url: "https://www.youtube.com/embed/P4_iWrawCZs?si=KgmOoeyaCxd4Cf4x",
              },
            ],
          },
          {
            title: "1.3.1 Convolution in time domain - Linear Convolution.",
            description: "Important Topic for Exam ⭐",
            videos: [
              {
                title: "Video 1 (Matrix Method for Linear Convolution)",
                url: "https://www.youtube.com/embed/TrgfP7QD3Nk?si=MwfL3kmDN58h6vAi",
              },
              {
                title: "Video 2 (Graph Method)",
                url: "https://www.youtube.com/embed/uwpxL_NrAMA?si=Me_zJEP5V8UhHh4f",
              },
              {
                title: "Video 3 (Tabular Method)",
                url: "https://www.youtube.com/embed/27kJKCAiR8g?si=c8PS__xL0-CXDUo3",
              },
            ],
          },
          {
            title: "1.3.2 Convolution in time domain - Circular Convolution",
            description: "Important Topic for Exam ⭐- Numerical based",
            videos: [
              {
                title: "Video 1 (Matrix Method for Circular Convolution)",
                url: "https://www.youtube.com/embed/TrgfP7QD3Nk?si=i1wauBtCp5ioeTOm&amp;start=258",
              },
              {
                title: "Video 2 (Graph Method)",
                url: "https://www.youtube.com/embed/z2vH9uw_qjU?si=wArKeyKj0lcOdW2E",
              },
              {
                title: "Video 3 (Tabular Method)",
                url: "https://www.youtube.com/embed/HNYC26dxwNY?si=RtaaO-dQU4kC0L9x",
              },
            ],
          },
          {
            title: "1.3.3 Auto Correlation and Cross Correlation",
            description: "Important Topic for Exam ⭐- Numerical based",
            videos: [
              {
                title: "Auto Correlation and Cross Correlation Introduction",
                url: "https://www.youtube.com/embed/R7kVI3AS6LY?si=LtG8wNq1U57MCPR-",
              },
              {
                title: "Cross Correlation - Graphical Method",
                url: "https://www.youtube.com/embed/YtkDjm_oSxY?si=skuUStKrtWO94qWv",
              },
              {
                title: "Cross Correlation - Tabular Method",
                url: "https://www.youtube.com/embed/dCD5GVWT7BQ?si=koRmvPZ3egm1KHof",
              },
              {
                title: "Cross Correlation - Matrix Method",
                url: "https://www.youtube.com/embed/GEFvLJhlPNg?si=LF9jMxoc6kkU3_vl",
              },
              {
                title: "Auto Correlation - Numerical",
                url: "https://www.youtube.com/embed/gunRa-XSYU4?si=JQUrMSJPhz3gObBq",
              },
            ],
          },
        ],
      },
      2: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/Chapter%202.pdf?alt=media&token=050c1cc3-45f5-425f-a1eb-a05c93d9e445",
        ],
        topics: [
          {
            title:
              "2.1.1 Digital image Representation, Elements of digital image processing systems",
            description: "Basic theoretical concepts",
            videos: [
              {
                title: "Introduction to Digital Image Processing",
                url: "https://www.youtube.com/embed/J-KxVvDRl18?si=srXPYdbpQAGLU5PD",
              },
              {
                title: "Key stages in digital image processing",
                url: "https://www.youtube.com/embed/8ekTeZD_lNY?si=qH5PtZ4UXvdPXXU8",
              },
            ],
          },
          {
            title:
              "2.1.2 Sampling and quantization and basic relationships between pixels, mathematical operations on images.",
            description: "Basic theoretical concepts",
            videos: [
              {
                title: "Sampling and quantization",
                url: "https://www.youtube.com/embed/KWc9SOOLfLw?si=Nj8R7fPo6ygm0R7o",
              },
              {
                title: "Basic relationships between pixels",
                url: "https://www.youtube.com/embed/AjFURMXJTbw?si=YSVpaJwLLwaf2dn_",
              },
              {
                title: "Mathematical operations on images",
                url: "https://www.youtube.com/embed/kTxKca5i5tQ?si=IBH0ndCJnwUX8uCS",
              },
            ],
          },
          {
            title:
              "2.2.1 Spatial domain enhancement techniques: Point processing",
            description: "Important Topic for Exam ⭐- Numerical based",
            videos: [
              {
                title: "Image Negative or Digital Negative,Thresholding, Bit Plane Slicing",
                url: "https://www.youtube.com/embed/FMDmXz6ynvk?si=7qKfBYj1VAyfMPzh",
              },
              {
                title: "Contrast Stretching or Contrast Adjustment",
                url: "https://www.youtube.com/embed/YJIgFMoC_yg?si=KVVwA_UX-rubmTJp",
              },
              {
                title: " Digital Negative, Bit Plane Slicing and Contrast Stretching- Part 2",
                url: "https://www.youtube.com/embed/pu-897YlpKM?si=lSUzYYZv4185jtGH"
              },
              {
                title: "Grey Level Slicing (Intensity slicing)",
                url: "https://www.youtube.com/embed/_roeBr60AP8?si=pj-sOZ781n9qXCZq",
              },
              {
                title: "Log Transformation & Power Law Transformation",
                url: "https://www.youtube.com/embed/jfoXoFoDb48?si=D-p6Yg2ec1Xu2zmQ",
              },
            ],
          },
          {
            title:
              "2.2.2 Neighborhood processing, spatial domain filtering, zooming. ",
            description: "Important Topic for Exam ⭐- Numerical based",
            videos: [
              {
                title: "Lowpass and Highpass Filter ",
                url: "https://www.youtube.com/embed/tcLJ3FQ2FqI?si=1ATrP-2LaV3CxXBM",
              },
              {
                title: "Weighted Averaging Filter and Median Filter",
                url: "https://www.youtube.com/embed/x6zoQ-a7A9U?si=2F7eqpvEiiSqaeOn",
              },
              {
                title: "Median Filter",
                url: "https://www.youtube.com/embed/IsMWGkhnHpo?si=WgL1qKkFoUa7Se-9",
              },
              {
                title: "Sum on Lowpass Filter",
                url: "https://www.youtube.com/embed/L7odWbdRutE?si=ZJEQNU1870ZiyspL",
              },
              {
                title: "Sum on Highpass Filter",
                url: "https://www.youtube.com/embed/Ow-i41-Tz9k?si=oM_-q3t7AXt-Rt0v",
              },
              {
                title: "Highboost Filter",
                url: "https://www.youtube.com/embed/Hutnurzr59o?si=l2McHv2YXFzHxTRR",
              },
              {
                title: "Replication & Zooming",
                url: "https://www.youtube.com/embed/gH4LA71_Ko0?si=YJq0OUcgKwpsxV1M",
              },
            ],
          },
          {
            title:
              "2.3 Spatial enhancement: Global processing: Histogram Equalization ",
            description: "Important Topic for Exam ⭐- Numerical based",
            videos: [
              {
                title: "Introduction to Histogram Plotting",
                url: "https://www.youtube.com/embed/m7NSfpfMshA?si=TCGTSLNHmXOw4sc3",
              },
              {
                title: "Histogram Stretching or Linear Contrast Stretching",
                url: "https://www.youtube.com/embed/j9lMwuCpzeM?si=K8m7mNxeJ2gHgHqL",
              },
              {
                title: "Histogram Equalization",
                url: "https://www.youtube.com/embed/_PjgOllbAxY?si=Op9s-onCtkIDmAY6",
              },
            ],
          },
        ],
      },
    },
  },
  ai: {
    name: "Artificial Intelligence",
    icon: Brain,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          "https://somaiya0-my.sharepoint.com/:b:/g/personal/minav_karia_somaiya_edu/Ea5TxRERSnNMk8dJziSwhr4B59EW4oP51sNa7uOmTKA1ZA?e=JueEIi",
        ],
        topics: [
          {
            title:
              "1.1 History of Artificial Intelligence, The AI problem*, The AI technique*, Foundations of AI",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "History of AI",
                url: "https://www.youtube.com/embed/3qRJfUv7W_Y?si=cjelR7-yfd_FbOTL",
              },
              {
                title: "Introduction to AI",
                url: "https://www.youtube.com/embed/saNiKk06f1Y?si=dr4mgvMOsAaLGjHc",
              },
              {
                title: "Foundation of AI",
                url: "https://www.youtube.com/embed/b-YcALlUR6k?si=mrD84BxkNyLO9ff7",
              },
              {
                title:
                  "Acting Humanly & Rationally , Thinking Humanly & Rationally",
                url: "https://www.youtube.com/embed/aStninMO6E8?si=-6H34Mqdwwwabksk",
              },
              {
                title: "The AI problem (Refer Page 30 of the notes)",
                url: "https://www.youtube.com/embed/32QyFxFTqwg?si=B0Sy7YEIwUiTvgIx",
              },
              {
                title: "The AI Technique",
                url: "https://www.youtube.com/embed/HXGaabF6T7U?si=wMsokWwiwrmHWlt0",
              },
            ],
          },
          {
            title:
              "1.2 Categorization of Intelligent System, Components of AI Program.",
            description: "Theoretical based concepts",
            videos: [
              {
                title:
                  "Components of AI Program (Refer Page 22-25 of the notes)",
                url: "https://www.youtube.com/embed/Cw-FqnU-QkA?si=rCxHpr-sOwMd15XK",
              },
            ],
          },
          {
            title:
              "1.3 Sub-areas of AI, Applications of AI, Current trends in AI. ",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Applications of AI",
                url: "https://www.youtube.com/embed/U4t1qFteDjs?si=TW_hGGydb33R24BJ",
              },
              {
                title: "Applications of AI - Part 2",
                url: "https://www.youtube.com/embed/Oth_jnB5lOA?si=aHmFbVGetlyh8eil",
              },
            ],
          },
        ],
      },
      2: {
        notesLink: [
          "https://somaiya0-my.sharepoint.com/:b:/g/personal/minav_karia_somaiya_edu/EVTpki7L6b1Nsq50m8uOL6EB-8Td3LndwzkLk-VMQCbTbg?e=CYBbWp",
        ],
        topics: [
          {
            title: "2.1 Agents and Environments",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Introduction to Rational Agent",
                url: "https://www.youtube.com/embed/SE8kwTr-nmc?si=tQbl0MfkXHjw_xik",
              },
              {
                title: "Agent and Environment",
                url: "https://www.youtube.com/embed/Yp_EUYtNBb8?si=H8ka2aFKK7hcil4n",
              },
              {
                title: "Classic Vacuum Cleaner Problem",
                url: "https://www.youtube.com/embed/KX09yGiPW70?si=ytZLlgDXTGKn-9CP",
              },
            ],
          },
          {
            title: "2.1 The concept of rationality",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Concept of Rationality",
                url: "https://www.youtube.com/embed/xN2fCNKzsbw?si=BeZU_A0HQu07Lr9a",
              },
            ],
          },
          {
            title: "2.1 The Task environment and their properties",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Properties of Task Environments",
                url: "https://www.youtube.com/embed/yHXatUO6h28?si=Rw3atD12AFja9zgp",
              },
              {
                title: "Properties of Task Environments - Part 2",
                url: "https://www.youtube.com/embed/FiD_xBYGjgE?si=bfa_uU4BRzG003RE",
              },
            ],
          },
          {
            title: "2.1 PEAS",
            description: "Theoretical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "PEAS (Performance, Environment, Actuators, Sensors)",
                url: "https://www.youtube.com/embed/n8z9HNV__OA?si=tNAFIaAesWSvv_dm",
              },
              {
                title: "PEAS (Self Driving Car) - Part 2",
                url: "https://www.youtube.com/embed/n9rwoA-36iY?si=Y3z18ACSZERAm5lK",
              },
              {
                title: "PEAS (More Examples) - Part 3",
                url: "https://www.youtube.com/embed/70qc0wPeJtQ?si=aDbUdqazdkxtQrve",
              },
            ],
          },
          {
            title: "2.1 The structure of Agents & Types of Agents",
            description: "Theoretical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "Structure of Agents",
                url: "https://www.youtube.com/embed/ER9QomwqFmQ?si=GcmZ6HWNMYfXYzE4",
              },
              {
                title: "Types of Agents",
                url: "https://www.youtube.com/embed/WNrymh1jzGk?si=aMvvKQtqH6ENcP7H",
              },
            ],
          },
          {
            title: "2.1 Learning Agent",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Learning Agent",
                url: "https://www.youtube.com/embed/LAkscQo_Cak?si=A07Hh3RJcWjMmN3u",
              },
            ],
          },
        ],
      },
      3: {
        notesLink: [
          'https://drive.google.com/file/d/1esiJaNmR6CyKEBRptQA60GMU8clbyR0n/view?usp=drive_link',
          'https://drive.google.com/file/d/1mDPMwUxSFYGvdhVRn4mLNdWnld1Z6uCk/view?usp=drive_link',
          'https://drive.google.com/file/d/19yLUfnPABTv3jw_umuHvCKhywIhpup6j/view?usp=drive_link',
        ],
        topics: [
          {
            title: "3.1 Solving Problems by Searching",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Problem Solving Agents",
                url: "https://www.youtube.com/embed/PLOtEiTjSt8?si=yJq04QHdInQ3ehxb",
              },
              {
                title: "8-Puzzle Problem",
                url: "https://www.youtube.com/embed/r14GPj1YcCQ?si=StO05MSVMLYTdED3",
              },
              {
                title: "Vaccum Cleaner Problem",
                url: "https://www.youtube.com/embed/KX09yGiPW70?si=34FEEPXamWg4sEoY",
              },
            ],
          },
          {
            title: "3.2 Uninformed Search Strategies",
            description: "Algorithm based concepts - Important for Exam ⭐",
            videos: [
              {
                title: "Breadth First Search",
                url: "https://www.youtube.com/embed/ZjPXeJaGEus?si=7ZPlqwSbyG3_mrW3",
              },
              {
                title: "Depth First Search",
                url: "https://www.youtube.com/embed/axtcFOsKlGM?si=D00MN38REY7YgJLn",
              },
              {
                title: "Depth Limited Search",
                url: "https://www.youtube.com/embed/v3GCQ1Y-1dI?si=L6nsklY3tQ4Gy3lC",
              },
              {
                title: "Iterative Deepening Depth First Search",
                url: "https://www.youtube.com/embed/ubsBoqXnvfE?si=eSsitM-1eaJLkkHc",
              }
            ],
          },
          {
            title: "3.3 Informed Search Strategies",
            description: "Algorithm based concepts - Important for Exam ⭐",
            videos: [
              {
                title: "Heurestic Function",
                url: "https://www.youtube.com/embed/E48Hn3nfCqg?si=sXU_L8vKSRSoc9IY",
              },
              {
                title: "Best Fit Search",
                url: "https://www.youtube.com/embed/MboFR7C8gNQ?si=1XYTf9M_S_qa-NCV",
              },
              {
                title: "A* Search",
                url: "https://www.youtube.com/embed/tvAh0JZF2YE?si=R5HH08iQPUnx2TVq",
              },
              {
                title: "AO* Search",
                url: "https://www.youtube.com/embed/u_TE42-uWD0?si=iw06IakOO1CI-z33",
              },
            ],
          },
          {
            title: "3.4 Local Search Algorithms",
            description: "Algorithm based concepts - Important for Exam ⭐",
            videos: [
              {
                title: "Hill Climbing Algorithm",
                url: "https://www.youtube.com/embed/1w-2fJAYNmE?si=jubzlhvRXjiDL333",
              },
              {
                title: "Hill Climbing Algorithm - Solved Numerical",
                url: "https://www.youtube.com/embed/2SlO34_VsY4?si=PqTdXd206mCghlNZ",
              },
              {
                title: "Constraint Satisfaction Problem",
                url: "https://www.youtube.com/embed/AgyCSmDVk5s?si=2Lde08Mz0endcjx7",
              },
              {
                title: "Constraint Satisfaction Problem - Part 2",
                url: "https://www.youtube.com/embed/udOfKqeLVSg?si=sHjEZRTk9sC194Z0",
              },
              {
                title: "Genetic Algorithm",
                url: "https://www.youtube.com/embed/WueuYdDqUt0?si=_5h3AIs6BMIt6-a2",
              },
              {
                title: "Genetric Algorithm - Solved Numerical",
                url: "https://www.youtube.com/embed/Dj1AZ0T-m-I?si=0j0oFGbu7ZT7EtKL",
              },
              {
                title: "Crossover and Mutation",
                url: "https://www.youtube.com/embed/iYxM9dQQyTw?si=_BpcsMVTi9GibfVO",
              },
            ],
          },
          {
            title: "3.5 Adversarial Search",
            description: "Algorithm based concepts - Important for Exam ⭐",
            videos: [
              {
                title: "Adversarial Search and Game Playing",
                url: "https://www.youtube.com/embed/6k8WilOGtXY?si=cVlNmwKNPBQeCTXJ",
              },
            ],
          },
        ],
      },

      // 3: {
      //   notesLink: [
      //     "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/AI%20Module%203.pdf?alt=media&token=f0c4d4a0-f75e-4816-a3c2-471592794634",
      //   ],
      //   topics: [
      //     {
      //       title:
      //         " Knowledge based Agents, The Wumpus World, inference procedures, First Order Logic: Syntax and Semantic, Inference in FOL, Unification and lifting, Forward chaining, backward Chaining, Resolution, Answer set programming",
      //       description: "Basic concepts and importance",
      //       videos: [
      //         {
      //           title: "Basic Concepts - Part 1",
      //           url: "https://www.youtube.com/embed/example1",
      //         },
      //         {
      //           title: "Implementation Overview - Part 2",
      //           url: "https://www.youtube.com/embed/example2",
      //         },
      //       ],
      //     },
      //   ],
      // },
      4: {
        notesLink: [
          "https://somaiya0-my.sharepoint.com/:b:/g/personal/minav_karia_somaiya_edu/Ea0c7C72Nv9DhETaPxfCfZgB_JiRc_fBV3FeMcCWRRMuqw?e=DoEypQ",
        ],
        topics: [
          {
            title: "Knowledge based Agents",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Knowledge based Agents",
                url: "https://www.youtube.com/embed/a_bXNyCR5Vs?si=VTMj9SgPdBL6j32U",
              },
            ],
          },
          {
            title: "The Wumpus World",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Wumpus World Example",
                url: "https://www.youtube.com/embed/xSy2nwae2no?si=3MhIy4YhD1kzz2WQ",
              },
              {
                title: "Wumpus World - Part 2",
                url: "https://www.youtube.com/embed/SHfP8SPOEEw?si=ktojXZvDSN2IbMGc",
              },
              {
                title: "Knowledge Base for Wumpus World",
                url: "https://www.youtube.com/embed/R32KPiOBBxg?si=OURZVYLObzJl7tc-0",
              },
            ],
          },
          {
            title: "Inference procedures",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "Propositional Logic",
                url: "https://www.youtube.com/embed/6490tKrGEic?si=9uVqYLxqbP3UYEg6",
              },
              // {
              //   title: "Inference Procedures (Refer Page 7 of the notes)",
              //   url: "https://www.youtube.com/embed/aVwcNDKXcHU?si=oy47KP1SzhDAyUj3",
              // },
            ],
          },
          {
            title: "First Order Logic: Syntax and Semantic, Inference in FOL",
            description: "Numerical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "First Order Logic",
                url: "https://www.youtube.com/embed/wgb9_BJhaT0?si=OZcA13Cm4934JBAY",
              },
              {
                title: "Quantifiers in FOL",
                url: "https://www.youtube.com/embed/3WYCk2Pm1G4?si=gT9TYvMmeuI7MA5y",
              },
              {
                title: "Quantifiers in FOL - Part 2",
                url: "https://www.youtube.com/embed/x5GfV8ORetQ?si=elXaD-L8SgqNQ0FT",
              },
              {
                title: "Inference rules for quantifiers",
                url: "https://www.youtube.com/embed/cOhA95ukJf0?si=9vIjOwbqk2q94oPS",
              },
              {
                title: "Inference in FOL",
                url: "https://www.youtube.com/embed/DZXTVoSQzFo?si=V1-DAlbkZ4ChHpEM",
              },
              {
                title: "Inference in FOL - Part 2",
                url: "https://www.youtube.com/embed/5JcNbX6UM5w?si=gBGhjbxt4WOjFbUB",
              },
            ],
          },
          {
            title: "Unification and lifting",
            description: "Numerical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "Unification basic",
                url: "https://www.youtube.com/embed/S4Y2PMsoueg?si=ZFmcQGZFMom_WKtW",
              },
              {
                title: "Unification in FOL ",
                url: "https://www.youtube.com/embed/MbAsMEpJL-k?si=UZpg_mfBZyaNiNtC",
              },
              {
                title: "Unification in FOL- Part 2",
                url: "https://www.youtube.com/embed/JEWtrRUa1g0?si=pATr6ktswTfWPND2",
              },
            ],
          },
          {
            title: "Resolution",
            description: "Numerical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "Represent Facts or Knowledge",
                url: "https://www.youtube.com/embed/tFYngFwDuJQ?si=Ys3STjMuCedzpdM3",
              },
              {
                title:
                  "Steps to Convert Propositional Logic Statement into CNF",
                url: "https://www.youtube.com/embed/Jf2T8RdCYfA?si=LI2-3ESe_AHy6_OO",
              },
              {
                title: "Steps of Resolution",
                url: "https://www.youtube.com/embed/CbI-Q2a5rUU?si=3xMm1l42WK06fpsv",
              },
              {
                title: "Resolution : FOL to CNF , Resolution Tree",
                url: "https://www.youtube.com/embed/7g6cB3kIHJI?si=yjpEr7fKxLm5pGEX",
              },
            ],
          },
          {
            title: "Forward chaining, backward Chaining",
            description: "Numerical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "Forward Chaining",
                url: "https://www.youtube.com/embed/rbtr4VnjA2c?si=JDC-DHutbIFd_iMt",
              },
              {
                title: "Backward Chaining",
                url: "https://www.youtube.com/embed/2UJV1nmjNGw?si=nOUkn7Sjw6wBrxZe",
              },
            ],
          },
        ],
      },
    },
  },
  is: {
    name: "Information Security",
    icon: EarthLock,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/1%20Introduction.pdf?alt=media&token=f354e878-b2c2-46b9-a729-9181fd474eec",
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/2%20Cryptography.pdf?alt=media&token=287136ed-9315-4d4b-9945-063ee1b78c18",
        ],
        topics: [
          {
            title:
              "1.1 What Is Computer Security?,  Threats, Harm, Vulnerabilities, Controls ",
            description: "Theoretical based concepts- Important for Exam ⭐",
            videos: [
              {
                title:
                  "Security Goals : Confidentiality, Integrity, Availability",
                url: "https://www.youtube.com/embed/CrLRFn5O_F8?si=spYdUV6zNiwX-BRa",
              },
              {
                title: "Types of Threats",
                url: "https://www.youtube.com/embed/U5o2hOODCFw?si=X7Prmd7ZaBFoxEYI",
              },
              {
                title: "Security Attacks : Active and Passive Attack",
                url: "https://www.youtube.com/embed/szHSgMWYSiQ?si=tfSMssZx2xdXUM6S",
              },
              {
                title: "Types of Active Attacks",
                url: "https://www.youtube.com/embed/tSkh7zqbQwg?si=znmsdTMrmZQIF2Vn",
              },
              {
                title: "Active Attack Vs Passive Attack ",
                url: "https://www.youtube.com/embed/mjaY0ExSmFU?si=3bCLW7kXPmHz3Mq1",
              },
              {
                title: "Advanced Persistent threat APT",
                url: "https://www.youtube.com/embed/49iU-0Focsk?si=wfNEacd6rJoUqQ63",
              },
              {
                title: "Security Attacks - Part 2 (Refer Notes 1)",
                url: "https://www.youtube.com/embed/yIm0Ol9Dg4Y?si=I0sMutl6IGnf-Hmy",
              },
            ],
          },
          {
            title:
              "1.2 Use of Cryptography in System Security: Problems Addressed by Encryption, Terminology. ",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Uses of Cryptography",
                url: "https://www.youtube.com/embed/GUmk_pNY9Ik?si=OVYT20ULznKPVxRg",
              },
              {
                title: "Terminologies in Cryptography",
                url: "https://www.youtube.com/embed/Xb4_VT4y9kQ?si=S0-5LyFyMs36BPx9",
              },
            ],
          },
          {
            title: "1.2 Types of Cryptography and other important concepts",
            description: "Theoretical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "Symmetric Key Cryptography",
                url: "https://www.youtube.com/embed/fKFKThuUdnI?si=OqN1GqlX4F6J30Gc",
              },
              {
                title: "Asymmetric Key Cryptography",
                url: "https://www.youtube.com/embed/yvf3lgBxdrA?si=4j-cipLIP0hFVslT",
              },
              {
                title: "Stream Cipher vs. Block Cipher",
                url: "https://www.youtube.com/embed/3adBPqIB4Tw?si=VtpSAtt9XW3f2tEC",
              },
              {
                title: "Cryptanalysis",
                url: "https://www.youtube.com/embed/Kejs-saINOo?si=avO_PSSO_amRWuC-",
              },
            ],
          },
          {
            title: "1.2  DES: The Data Encryption Standard",
            description: "Theoretical based concepts- Important for Exam ⭐",
            videos: [
              {
                title: "Introduction to DES",
                url: "https://www.youtube.com/embed/j53iXhTSi_s?si=F_cj1-OYh3UdtuQk",
              },
              {
                title: "Single Round of DES Algorithm",
                url: "https://www.youtube.com/embed/nynAQ593HdU?si=iOCZapqb5AMRWbm3",
              },
              {
                title: "The F Function of DES (S block)",
                url: "https://www.youtube.com/embed/OePPcJR--F4?si=kUGiXfMciBjVuPoF",
              },
              {
                title: "Key Scheduling and Decryption in DES",
                url: "https://www.youtube.com/embed/S-vLA7d1ORI?si=YjCR1YbZ3Xxadb9_",
              },
              {
                title: "Avalanche Effect and the Strength of DES",
                url: "https://www.youtube.com/embed/kF_h9gl-vyw?si=hkD6gVLvuYRKHFVL",
              },
              {
                title: "Weakness of DES",
                url: "https://www.youtube.com/embed/4Uo7kivJ0EQ?si=wv0QwQJDul7rdz5y",
              },
              {
                title: "Multiple Encryption and Triple DES",
                url: "https://www.youtube.com/embed/4R_kocR1roM?si=t0CNzGjp8CKfXcGf",
              },
              {
                title: "AES vs DES",
                url: "https://www.youtube.com/embed/BPXEy6FzoWU?si=9Jj_F51-6-KzUSdx",
              },
            ],
          },
          {
            title:
              "1.2 Public Key Cryptography, Public Key Cryptography to Exchange Secret Keys",
            description:
              "Theoretical and numerical based concepts - Important for Exam ⭐",
            videos: [
              {
                title: "Public Key Cryptography",
                url: "https://www.youtube.com/embed/i6jUOJRThC0?si=2OHEBtwtTDDm_JXp",
              },
              {
                title: "Public Key Cryptography - Part 2",
                url: "https://www.youtube.com/embed/xw19eT5thIE?si=j93UHQsyDApxQvwL",
              },
              {
                title: "Diffie Hellman Key Exchange Algorithm (Page 64 of the notes) - Added in Numericals as well",
                url: "https://www.youtube.com/embed/OGTQ8Y1rDuI?si=fcCOXl8jkXxuPHNb",
              },
              {
                title: "Man-in-the-Middle Attack",
                url: "https://www.youtube.com/embed/9OzbjSbzDlk?si=5AUhjD5BIlIDbjnE",
              },
              {
                title: "Station to Station Key Agreement",
                url: "https://www.youtube.com/embed/ucWKa_Mpae0?si=eqpy0VSN1L4xnRoU",
              },
              {
                title: "RSA Algorithm- Added in Numericals as well",
                url: "https://www.youtube.com/embed/di3OXhHMZmI?si=eS45PGfIBXdesgu-",
              },
            ],
          },
          {
            title:
              "1.2 Error Detecting Codes, Trust, Certificates: Trustable Identities and Public Keys, Digital Signatures—All the Pieces",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Error Detecting Codes (Refer Page 67 of the notes)",
                url: "https://www.youtube.com/embed/Bwih7_AT1oI?si=8rehCoeYSubjA71N",
              },
              {
                title: "Hash Functions",
                url: "https://www.youtube.com/embed/0wFI04w345k?si=m3os4WpQy5qR2uyP",
              },
              {
                title: "Digital Signatures",
                url: "https://www.youtube.com/embed/yUeI4nqvNs8?si=Rus3TQnCNnHAehAE",
              },
              {
                title: "Digital Certificates",
                url: "https://www.youtube.com/embed/stsWa9A3sOM?si=EAXhnuST9lHWRXJ6"
              }
            ],
          },
          {
            title:
              "Numericals: RSA Algorithm, Ciphers, Diffie Hellman Key Exchange Algorithm",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Caesar Cipher- Part 1",
                url: "https://www.youtube.com/embed/JtbKh_12ctg?si=IW7ixglXgR5NJjWv",
              },
              {
                title: "Ceaser Cipher - Part 2",
                url: "https://www.youtube.com/embed/na5rapg1XsI?si=TAsU6mB5GlBpTXLD",
              },
              {
                title: "Monoalphabetic Substitution Cipher",
                url: "https://www.youtube.com/embed/J-utjSeUq_c?si=D6CTum76TfSGwE0N",
              },
              {
                title: "Multiplicative Cipher",
                url: "https://www.youtube.com/embed/G8D5daIhDmM?si=jqStFmWXOXo2Qg3W",
              },
              {
                title: "Playfair Cipher - Part 1",
                url: "https://www.youtube.com/embed/UURjVI5cw4g?si=AXDqjehMTkQTU0k8",
              },
              {
                title: "Playfair Cipher - Part 2",
                url: "https://www.youtube.com/embed/whEJfas9MAI?si=aAgfOAcPah37Y0sr",
              },
              {
                title: "Playfair Cipher - Solved Example",
                url: "https://www.youtube.com/embed/hHsUJxikM3g?si=G3QLNDzULooE0Su3",
              },
              {
                title: "Rail Fence Cipher",
                url: "https://www.youtube.com/embed/hINK8zCIxJ4?si=eEMAoRcyrR2ammG7"
              },
              {
                title: "Row Column or Columnar Transposition Cipher",
                url: "https://www.youtube.com/embed/cPQXaYUMOjQ?si=Smk9isi2haB_K5Eo"
              },
              {
                title: "Row Column or Columnar Transposition Cipher - Solved Example",
                url: "https://www.youtube.com/embed/K7Mth_55y9E?si=Be-xHMeIBkPjzYVO"
              },
              {
                title: "RSA Algorithm",
                url: "https://www.youtube.com/embed/di3OXhHMZmI?si=eS45PGfIBXdesgu-",
              },
              {
                title: "Diffie Hellman Key Exchange Algorithm (Page 64 of the notes)",
                url: "https://www.youtube.com/embed/OGTQ8Y1rDuI?si=fcCOXl8jkXxuPHNb",
              },
            ],
          },
        ],
      },
      2: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/3%20Software%20Security-updated.pdf?alt=media&token=780f208d-7eaa-456c-a6c4-c8c99820ce88",
        ],
        topics: [
          {
            title:
              "2.1 Unintentional (Non-malicious) Programming: Oversights - Buffer Overflow,  Incomplete Mediation",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Buffer Overflow",
                url: "https://www.youtube.com/embed/AD-iXWANggo?si=yJuSNQmeJQ4GZU1w",
              },
              {
                title: "Defense against Buffer Overflow",
                url: "https://www.youtube.com/embed/JxC7U6dQ_u8?si=FxPAYFRE83tJBN3j",
              },
              {
                title: "Buffer Overflow - Part 2",
                url: "https://www.youtube.com/embed/mTrTwg03N9M?si=6jk8WbqzWecNV0Xo",
              },
              {
                title: "Stack Canary",
                url: "https://www.youtube.com/embed/N7kGd76evsM?si=sWRBGNOXo1baOvAP",
              },
              {
                title: "Incomplete Mediation",
                url: "https://www.youtube.com/embed/JWFNNiOPMvg?si=u2Eu-1SvMvC2LsXR",
              },
            ],
          },
          {
            title:
              "Time-of Check to Time-of-Use,  Undocumented Access Point Off-by-One,  Error Integer Overflow, Unterminated Null-Terminated String, Parameter Length, Type, and Number,  Unsafe Utility Program, Race Condition (Refer Notes for these topics from page 32)",
            description: "Basic concepts and importance",
            videos: [],
          },
          {
            title:
              "2.2 Malicious Code—Malware- Malware—Viruses, Trojan Horses, and Worms,  Technical Details: Malicious Code (Refer Notes for these topics from page 58)",
            description: "Theoretical based concepts",
            videos: [
              {
                title: "Malware and its types",
                url: "https://www.youtube.com/embed/eaVBvrhwbk0?si=I32-caYNZffQdZdJ",
              },
              {
                title:
                  "Virus & Related Threats - Worms, Trojan Horses, Countermeasures ",
                url: "https://www.youtube.com/embed/ds5Cbw6QmXs?si=cgZvq9W1DEqvoLpP",
              },
            ],
          },
          {
            title:
              "2.3 Countermeasures: Countermeasures for Users, Countermeasures for Developers,  Countermeasure Specifically for Security, Countermeasures that Dont Work (Refer Notes for these topics from page 73)",
            description: "Basic concepts and importance",
            videos: [],
          },
        ],
      },
    },
  },
  ac: {
    name: "Applied Cryptography",
    icon: MessageSquareLock,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/AC%20Module%201.pdf?alt=media&token=42db56c3-72f1-4758-acb8-8f3ecab36ff3",
        ],
        topics: [
          {
            title:
              "1.1 Information Security and its goals, Vulnerability Threats and Attacks ",
            description: "Theoretical based concepts- Important for exam ⭐",
            videos: [
              {
                title:
                  "Security Goals : Confidentiality, Integrity, Availability",
                url: "https://www.youtube.com/embed/CrLRFn5O_F8?si=spYdUV6zNiwX-BRa",
              },
              {
                title: "Types of Threats",
                url: "https://www.youtube.com/embed/U5o2hOODCFw?si=X7Prmd7ZaBFoxEYI",
              },
              {
                title: "Security Attacks : Active and Passive Attack",
                url: "https://www.youtube.com/embed/szHSgMWYSiQ?si=tfSMssZx2xdXUM6S",
              },
              {
                title: "Types of Active Attacks",
                url: "https://www.youtube.com/embed/tSkh7zqbQwg?si=znmsdTMrmZQIF2Vn",
              },
              {
                title: "Active Attack Vs Passive Attack ",
                url: "https://www.youtube.com/embed/mjaY0ExSmFU?si=3bCLW7kXPmHz3Mq1",
              },
              {
                title: "Security Attacks - Part 2 (Refer Notes 1)",
                url: "https://www.youtube.com/embed/yIm0Ol9Dg4Y?si=I0sMutl6IGnf-Hmy",
              },
            ],
          },
          {
            title:
              "1.2 Encryption and Decryption, Symmetric and Asymmetric Key Cryptography, Stream and Block Cipher, Cryptanalysis, Brute Force Attack",
            description: "Theoretical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "Symmetric Key Cryptography",
                url: "https://www.youtube.com/embed/fKFKThuUdnI?si=OqN1GqlX4F6J30Gc",
              },
              {
                title: "Asymmetric Key Cryptography",
                url: "https://www.youtube.com/embed/yvf3lgBxdrA?si=4j-cipLIP0hFVslT",
              },
              {
                title: "Stream Cipher vs. Block Cipher",
                url: "https://www.youtube.com/embed/3adBPqIB4Tw?si=VtpSAtt9XW3f2tEC",
              },
            ],
          },
          {
            title:
              "1.3 Mathematics of Cryptography: Integer Arithmetic, The Extended Euclidean Algorithm, Modular Arithmetic,  Matrices, Linear Congruence ",
            description: "Numerical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "Multiplicative Inverse",
                url: "https://www.youtube.com/embed/YwaQ4m1eHQo?si=0K4wW2moIyDiNiMn",
              },
              {
                title: "Modular Arithmetic (Part 1)",
                url: "https://www.youtube.com/embed/M42uDLGRSpI?si=2ypr8CcrW7zFrT-M",
              },
              {
                title: "Modular Arithmetic (Part 2)",
                url: "https://www.youtube.com/embed/P7P03gg3msE?si=oMhoDfElMtvVhrKs",
              },
              {
                title: "Euclidean Algorithm",
                url: "https://www.youtube.com/embed/yHwneN6zJmU?si=VCoIe-f-bTXwts3w",
              },
              {
                title: "Extended Euclidean Algorithm",
                url: "https://www.youtube.com/embed/YwaQ4m1eHQo?si=0K4wW2moIyDiNiMn",
              },
            ],
          },
          {
            title:
              "1.4 Classical Cryptography: Substitution and Transposition Techniques: Any two from each",
            description: "Numerical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "Caesar Cipher- Part 1",
                url: "https://www.youtube.com/embed/JtbKh_12ctg?si=IW7ixglXgR5NJjWv",
              },
              {
                title: "Ceaser Cipher - Part 2",
                url: "https://www.youtube.com/embed/na5rapg1XsI?si=TAsU6mB5GlBpTXLD",
              },
              {
                title: "Monoalphabetic Cipher",
                url: "https://www.youtube.com/embed/J-utjSeUq_c?si=D6CTum76TfSGwE0N",
              },
              {
                title: "Multiplicative Cipher",
                url: "https://www.youtube.com/embed/G8D5daIhDmM?si=jqStFmWXOXo2Qg3W",
              },
              {
                title: "Autokey Cipher",
                url: "https://www.youtube.com/embed/-UgLXx-RIKE?si=oYPdIrDhDfhdhiQy",
              },
              {
                title: "Affine Cipher",
                url: "https://www.youtube.com/embed/7JNO9hQ71_U?si=Yn-UFSJUb0915l3-",
              },
              {
                title: "Playfair Cipher - Part 1",
                url: "https://www.youtube.com/embed/UURjVI5cw4g?si=AXDqjehMTkQTU0k8",
              },
              {
                title: "Playfair Cipher - Part 2",
                url: "https://www.youtube.com/embed/whEJfas9MAI?si=aAgfOAcPah37Y0sr",
              },
              {
                title: "Playfair Cipher - Solved Example",
                url: "https://www.youtube.com/embed/hHsUJxikM3g?si=G3QLNDzULooE0Su3",
              },
              {
                title: "Rail Fence Cipher",
                url: "https://www.youtube.com/embed/hINK8zCIxJ4?si=eEMAoRcyrR2ammG7"
              },
              {
                title: "Row Column or Columnar Transposition Cipher",
                url: "https://www.youtube.com/embed/cPQXaYUMOjQ?si=Smk9isi2haB_K5Eo"
              },
              {
                title: "Row Column or Columnar Transposition Cipher - Solved Example",
                url: "https://www.youtube.com/embed/K7Mth_55y9E?si=Be-xHMeIBkPjzYVO"
              },
              {
                title: "Vigenere Cipher",
                url: "https://www.youtube.com/embed/GQrKEwLZcPY?si=FK6WooDkwTIV-5gE",
              },
              {
                title: "Vernam Cipher",
                url: "https://www.youtube.com/embed/Qojvtgf7SQw?si=8WWWXEtloCouVTAo",
              },
              {
                title: "One Time Pad (Vernam Cipher)",
                url: "https://www.youtube.com/embed/VFMSnDZ7FEI?si=za8SOp3bmAdx0sta",
              },
              {
                title: "One Time Pad - Solved Example",
                url: "https://www.youtube.com/embed/rlrpcNYNPBY?si=bIBHYZdH51a157lB",
              },
              {
                title: "Hill Cipher",
                url: "https://www.youtube.com/embed/ytJAdBLNjn0?si=V9mx5-DLeY3z_xQv",
              },
              {
                title: "Hill Cipher - Solved Example",
                url: "https://www.youtube.com/embed/6T46sgty4Mk?si=4-xF3AOLYoAbVDcJ",
              },

            ],
          },
        ],
      },
      2: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/AC%20Module%202.pdf?alt=media&token=e83fe56e-c1e6-4b86-935e-ff49986cad74",
        ],
        topics: [
          {
            title:
              "2.1 Mathematics of Symmetric Key Cryptography: Algebraic Structures, Group, Ring, Field, GF Fields",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "Rings, Fields and Finite Fields",
                url: "https://www.youtube.com/embed/oBL-Cb5GxA0?si=sq428wOWhDPTiqM_",
              },
            ],
          },
          {
            title:
              "2.2 Modern Block Ciphers: Components of Modern Block Cipher, Product Ciphers, Diffusion and Confusion, Classes of Product Cipher DES: DES Structure, DES Analysis: Properties, Design Criteria, DES Strength and Weaknesses, DES Security, Multiple DES, 3DES ",
            description: "Theoretical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "Introduction to DES",
                url: "https://www.youtube.com/embed/j53iXhTSi_s?si=F_cj1-OYh3UdtuQk",
              },
              {
                title: "Single Round of DES Algorithm",
                url: "https://www.youtube.com/embed/nynAQ593HdU?si=iOCZapqb5AMRWbm3",
              },
              {
                title: "The F Function of DES (S block)",
                url: "https://www.youtube.com/embed/OePPcJR--F4?si=kUGiXfMciBjVuPoF",
              },
              {
                title: "Key Scheduling and Decryption in DES",
                url: "https://www.youtube.com/embed/S-vLA7d1ORI?si=YjCR1YbZ3Xxadb9_",
              },
              {
                title: "Avalanche Effect and the Strength of DES",
                url: "https://www.youtube.com/embed/kF_h9gl-vyw?si=hkD6gVLvuYRKHFVL",
              },
              {
                title: "Weakness of DES",
                url: "https://www.youtube.com/embed/4Uo7kivJ0EQ?si=wv0QwQJDul7rdz5y",
              },
              {
                title: "Multiple Encryption and Triple DES",
                url: "https://www.youtube.com/embed/4R_kocR1roM?si=t0CNzGjp8CKfXcGf",
              },
              {
                title: "AES vs DES",
                url: "https://www.youtube.com/embed/BPXEy6FzoWU?si=9Jj_F51-6-KzUSdx",
              },
            ],
          },
          {
            title:
              "2.3 AES:  AES Structure,   Transformations, Key Expansion in AES-128, Key Expansion in AES-192 and AES-256, KeyExpansion Analysis,   Analysis   of   AES: Security, Implementation, Simplicity and Cost ",
            description: "Theoretical based concepts - Important for exam ⭐",
            videos: [
              {
                title: "Introduction to AES",
                url: "https://www.youtube.com/embed/3MPkc-PFSRI?si=3ty_MlCnVg8FU1cN",
              },
              {
                title: "AES Encryption and Decryption",
                url: "https://www.youtube.com/embed/4KiwoeDJFiA?si=EfCWLa861JCT5sf1",
              },
              {
                title: "AES Round Transformation ",
                url: "https://www.youtube.com/embed/IpuvKyeCrvU?si=j_sZ4IoJhDDskz6A",
              },
              {
                title: "AES Key Expansion",
                url: "https://www.youtube.com/embed/0RxLUf4fxs8?si=Kl62SpaihIjBoKr1",
              },
            ],
          },
        ],
      },
    },
  },
  cc: {
    name: "Cloud Computing",
    icon: Server,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%201.pdf?alt=media&token=5fdc10e7-7eef-41c1-a2a8-d5fac03bf238",
        ],
        topics: [
          {
            title: "1.1 Introduction to Cloud Computing",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "1.1.1 Cloud Computing at a Glance",
                url: "https://www.youtube.com/embed/8C_kHJ5YEiA?si=nsQPnHteHy7XGmds",
              },
              {
                title: "1.1.2 Historical Developments",
                url: "https://www.youtube.com/embed/mphoO_bxWy0?si=LNhHmrhR8odiQppO",
              },
              {
                title: "1.1.3 NIST Definitions and Models",
                url: "https://www.youtube.com/embed/raXHR3jjSow?si=kKDXFx1p9qlGZpC_",
              },
              {
                title: "1.1.4 Cost Models",
                url: "https://www.youtube.com/embed/lsvpvCU6Oxs?si=ptAwZ71PsHS2K3Pz",
              },
              {
                title: "1.1.5 Advantages of Cloud Computing",
                url: "https://www.youtube.com/embed/oFga9Q1nd8M?si=EDvUhDLkNDUFLHVv",
              },
              {
                title: "1.1.6 Disadvantages of Cloud Computing",
                url: "https://www.youtube.com/embed/TuDIr0ZEp6k?si=EdyksNeQ68sEDLxF",
              },
              {
                title: "1.1.7 Deployment Models",
                url: "https://www.youtube.com/embed/5G0L7XCt6XQ?si=BI-IB0_LoGb0J-Ql",
              },
              {
                title: "1.1.8 Evolutionary Trends",
                url: "https://www.youtube.com/embed/lsvpvCU6Oxs?si=ptAwZ71PsHS2K3Pz",
              },
              {
                title: "1.1.9 Building Cloud Environments",
                url: "https://www.youtube.com/embed/Uaue6aanZrY?si=6s3mX_1aq59dCJ_M",
              },
              {
                title: "1.1.10 Web Services and SOA",
                url: "https://www.youtube.com/embed/AoimJr4WBac?si=tZ1hgyUi6nooHRiG",
              },
            ],
          },
        ],
      },
      2: {
        notesLink: [
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%202.1%2C%202.2%2C%202.3.pdf?alt=media&token=2e06924c-2866-4875-93b8-e110fcf1e284",
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%202%20Hardware-assisted%20CPU%20virtualization%20in%20KVM%20QEMU.pdf?alt=media&token=12fc3a59-97de-42b6-bbd4-1b356871fc4d",
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%202%20Virtualization.pdf?alt=media&token=e45c11af-8b7d-4b7d-8fe8-197ad96dd3c2",
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%202%20Virtualization%202.pdf?alt=media&token=48376b43-fe35-4d54-a424-b3101f861f9c",
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%202%20Parairtualization%20in%20Xen.pdf?alt=media&token=da1c8a39-0c00-46e6-bfa5-9a56db6493a1",
          "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/CC%20Module%202%20Full%20virtualization.pdf?alt=media&token=8afdc23b-9adb-4689-883f-be7b807f1cbe",
        ],

        topics: [
          {
            title:
              "2.1 Introduction, Characteristics of Virtualized Environments ,Taxonomy of Virtualization Techniques, Virtualization and Cloud Computing, Pros and Cons of Virtualization",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "2.1.1 Introduction to Virtualization",
                url: "https://www.youtube.com/embed/7yXlLgZkiJM?si=34s0XW3xX03tmn0o",
              },
              {
                title: "2.1.2 Characteristics of Virtualized Environments",
                url: "https://www.youtube.com/embed/smV9-Pd2FMk?si=_6n-IkrgniK7K-8W",
              },
              {
                title: "2.1.3 Taxonomy of Virtualization Techniques",
                url: "https://www.youtube.com/embed/HQ_0kAJWweM?si=HTu30XsiCYMwKrLy",
              },
            ],
          },

          {
            title:
              "2.2 Technology Examples, Xen: Para virtualization, VMware: Full Virtualization, Microsoft Hyper-V",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "2.2.1  Para virtualization",
                url: "https://www.youtube.com/embed/-rrnt79YPZ4?si=_9bM1qtFn0QRQj9X",
              },

              {
                title: "2.2.2 Full Virtualization",
                url: "https://www.youtube.com/embed/wh9ZUxiB2j8?si=QKOGLI91FX_mMas3",
              },

              {
                title: "2.2.3 Microsoft Hyper V",
                url: "https://www.youtube.com/embed/RCIVFJLqy-s?si=sBgBWwnE2aZ20CcZ",
              },


            ],
          },

          {
            title:
              "2.3 Cloud Computing Architecture : Cloud Reference Model, Types of Clouds, Economics of the Cloud, Open Challenges",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "2.3.1 Cloud Reference Model",
                url: "https://www.youtube.com/embed/pGe4VZbSmTw?si=gfd_K_eHIS7FbpIk",
              },
              {
                title: "2.3.2 Types of Clouds",
                url: "https://www.youtube.com/embed/lsvpvCU6Oxs?si=aDz06sSN7vH9S3SR",
              },
              {
                title: "2.3.3 Economics of the Cloud",
                url: "https://www.youtube.com/embed/YwkBJe9Z_cY?si=RJmSr0zZyyRWcnIg",
              },
              {
                title: "2.3.4 Open Challenges",
                url: "https://www.youtube.com/embed/icSXPCL-vZw?si=AI2hlsnwVWF3324i",
              },
            ],
          },
        ],
      },
    },
  },
  adm: {
    name: "Honors - Advanced Data Mining",
    icon: Database,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          "https://drive.google.com/file/d/1yMCgNSGgRlqBfouRmyNXgXEEaPRjOL86/view?usp=sharing",
          "https://drive.google.com/file/d/1zITv6KHvz5x1Hjg0kp2hGqcQ9dQGkpZE/view?usp=sharing",
          "https://drive.google.com/file/d/1lXXUJ_Di70sqcGYLpZ1xXTJhSWN-3VcF/view?usp=drive_link",
          "https://drive.google.com/file/d/1n7Lv6A7qlkk0iWzOarnP0z7gGeGvOYPu/view?usp=drive_link",
          "https://drive.google.com/file/d/1yOYbvs03ULo5rbgkxuucQVc4gINnRQFb/view?usp=drive_link"
        ],
        topics: [
          {
            title: "1.1 Data Mining Introduction",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "1.1.1 What is Data Mining",
                url: "https://www.youtube.com/embed/N9hGamh4Gfs?si=CckFYYS_k4bVRcxe",
              },
            ],
          },
          {
            title: "1.2 Data Preprocessing",
            description: "Theoretical Based Concepts - Important for exam ⭐",
            videos: [
              {
                title: "1.2.1 Data Preprocessing and KDD Process",
                url: "https://www.youtube.com/embed/_NYZ0rOdsSI?si=vSOdv0oy38IGRqdk",
              },
            ],
          },
          {
            title: "1.3 Data Mining Tasks",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "1.3.1 Data Mining Tasks",
                url: "https://www.youtube.com/embed/I0DanOCgcjE?si=jize8z_nYElrP_4N",
              },
              {
                title: "1.3.2 Distributive Computing",
                url: "https://www.youtube.com/embed/ajjOEltiZm4?si=xZICZ1Zij8iAXJth",
              },
            ],
          },
          {
            title: "1.4 Hadoop",
            description: "Basic concepts and importance",
            videos: [
              {
                title: "1.4.1 Hadoop",
                url: "https://www.youtube.com/embed/aReuLtY0YMI?si=Ns6rA9sMZMsOPg4U",
              }
            ],
          }
        ],
      },
      2: {
        notesLink: [
          "https://drive.google.com/file/d/1XnBn-vbZDp0rGePs_pJ8fYrWqCaMh9tC/view?usp=drive_link",
          "https://drive.google.com/file/d/1gzWTcj9re10FsvKA9bL4B9welJqAfU8t/view?usp=sharing",
          "https://drive.google.com/file/d/14zH7me3thnh3OzDbvo2fPAtoQ-nlIGYC/view?usp=drive_link",
        ],
        topics: [
          {
            title: "2.1 Association Rule Mining",
            description: "Numerical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "2.1.1 Apiori Algorithm",
                url: "https://www.youtube.com/embed/NT6beZBYbmU?si=Y346a80KM44WYVRy",
              },
              {
                title: "2.1.2 FP Growth Algorithm",
                url: "https://www.youtube.com/embed/7oGz4PCp9jI?si=d_ekEfSPleKPv1BZ",
              },
              {
                title: "2.1.3 Other important Algorithms",
                url: "https://www.youtube.com/embed/asWqVHex9kY?si=ikPJpc80hjDU5lqV",
              },
              {
                title: "2.1.4 Multi-Level Association Mining",
                url: "https://www.youtube.com/embed/1H8KM2s6ce0?si=jUk9a0g-bIlN8rXU",
              },
              {
                title: "2.1.5 Multi-Dimensional Association Mining",
                url: "https://www.youtube.com/embed/M3wyG3HKuNg?si=o_P4EaAahylemwYh",
              },
            ],
          },
          {
            title: "2.2 Stream Data Mining",
            description: "Numerical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "2.2.1 Stream Data Mining",
                url: "https://www.youtube.com/embed/nbBJ27XhEyM?si=zOBjeJXV_K0utLk4",
              },
              {
                title: "2.2.2 Sampling from a data stream",
                url: "https://www.youtube.com/embed/YI4y3Z1Tp8Y?si=EKKj0LDQ1rvtm79L",
              },
              {
                title: "2.2.3 Bloom Filters",
                url: "https://www.youtube.com/embed/F_3AmAcbvuk?si=IjeomfcSc8tOzfOv"
              },
              {
                title: "2.2.4 FM Algorithm",
                url: "https://www.youtube.com/embed/fhaA5hQmlbk?si=OyFYOlM3pIwioXwC",
              },
              {
                title: "2.2.5 DGIM Algorithm",
                url: "https://www.youtube.com/embed/2HTh7hK_eNQ?si=NYLB4jU1Pyh5lWk0",
              },
            ],
          },
        ],
      },
      4: {
        notesLink: [
          "https://drive.google.com/file/d/1RbLSaz9NbJ77TE1FPD-U4pZjWP2F7Hnz/view?usp=drive_link",
          "https://drive.google.com/file/d/1icdkCzmQ1nayrfX-CZmO7mjla1FFOvm8/view?usp=drive_link",
          "https://drive.google.com/file/d/1QMeVY6BVN_t1RnHuz72EhrrgSIYqtOv8/view?usp=drive_link",
          "https://drive.google.com/file/d/1K1Goft-MF16n0YRZPvitc6IICxUbPbJ4/view?usp=drive_link",
          "https://drive.google.com/file/d/1utyDeaQF7T9MUeLWG9I3AtfoUJWhmLbd/view?usp=drive_link",
          "https://drive.google.com/file/d/1P4G76f9NttJXtZN-ZbAua2R6LE6wNMX7/view?usp=drive_link",
        ],
        topics: [
          {
            title: "4.1 Clustering",
            description: "Numerical based concepts- Important for exam ⭐",
            videos: [
              {
                title: "4.1.1 Hierarchical Clustering",
                url: "https://www.youtube.com/embed/tXYAdGn-SuM?si=4aDUO_b7OP0tq16d",
              },
              {
                title: "4.1.2 K-Means Clustering",
                url: "https://www.youtube.com/embed/KzJORp8bgqs?si=G0FzNFTpb0QmC69i",
              },
            ],
          },
        ],
      }
    },
  },
};

export default subjects;