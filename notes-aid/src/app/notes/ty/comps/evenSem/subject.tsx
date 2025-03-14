import {
  // Signal,
  // Brain,
  // EarthLock,
  MessageSquareLock,
  Server,
  Database,
} from "lucide-react";

import { Subjects } from "@/app/interfaces/Subject";
import dsip from "./dsip/data";
import ai from "./ai/data";
import is from "./is/data";

const subjects: Subjects = {
  dsip: dsip,
  ai: ai,
  is: is,
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
                url: "https://www.youtube.com/embed/hINK8zCIxJ4?si=eEMAoRcyrR2ammG7",
              },
              {
                title: "Row Column or Columnar Transposition Cipher",
                url: "https://www.youtube.com/embed/cPQXaYUMOjQ?si=Smk9isi2haB_K5Eo",
              },
              {
                title:
                  "Row Column or Columnar Transposition Cipher - Solved Example",
                url: "https://www.youtube.com/embed/K7Mth_55y9E?si=Be-xHMeIBkPjzYVO",
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
          "https://drive.google.com/file/d/1yOYbvs03ULo5rbgkxuucQVc4gINnRQFb/view?usp=drive_link",
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
              },
            ],
          },
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
                url: "https://www.youtube.com/embed/F_3AmAcbvuk?si=IjeomfcSc8tOzfOv",
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
      },
    },
  },
};

export default subjects;
