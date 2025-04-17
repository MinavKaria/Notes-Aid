import {
  // Signal,
  // Brain,
  // EarthLock,
  // MessageSquareLock,
  // Server,
  Database,
} from "lucide-react";

import { Subjects } from "@/interfaces/Subject";
import dsip from "./dsip/data";
import ai from "./ai/data";
import is from "./is/data";
import cc from "./cc/data";
import ac from "./ac/data";

const subjects: Subjects = {
  dsip: dsip,
  ai: ai,
  is: is,
  ac: ac,
  cc: cc,
  adm: {
    name: "Honors - Advanced Data Mining",
    icon: Database,
    color: "blue",
    modules: {
      1: {
        notesLink: [
          {
            title: "Notes 1",
            url: "https://drive.google.com/file/d/1yMCgNSGgRlqBfouRmyNXgXEEaPRjOL86/view?usp=sharing",
          },
          {
            title: "Notes 2",
            url: "https://drive.google.com/file/d/1zITv6KHvz5x1Hjg0kp2hGqcQ9dQGkpZE/view?usp=sharing",
          },
          {
            title: "Notes 3",
            url: "https://drive.google.com/file/d/1lXXUJ_Di70sqcGYLpZ1xXTJhSWN-3VcF/view?usp=drive_link",
          },
          {
            title: "Notes 4",
            url: "https://drive.google.com/file/d/1n7Lv6A7qlkk0iWzOarnP0z7gGeGvOYPu/view?usp=drive_link",
          },
          {
            title: "Notes 5",
            url: "https://drive.google.com/file/d/1yOYbvs03ULo5rbgkxuucQVc4gINnRQFb/view?usp=drive_link",
          },
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
          {
            title: "Notes 1",
            url: "https://drive.google.com/file/d/1XnBn-vbZDp0rGePs_pJ8fYrWqCaMh9tC/view?usp=drive_link",
          },
          {
            title: "Notes 2",
            url: "https://drive.google.com/file/d/1gzWTcj9re10FsvKA9bL4B9welJqAfU8t/view?usp=sharing",
          },
          {
            title: "Notes 3",
            url: "https://drive.google.com/file/d/14zH7me3thnh3OzDbvo2fPAtoQ-nlIGYC/view?usp=drive_link",
          },
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
          {
            title: "Clustering",
            url: "https://drive.google.com/file/d/1RbLSaz9NbJ77TE1FPD-U4pZjWP2F7Hnz/view?usp=drive_link",
          },
          {
            title: "Hierarchial Clustering",
            url: "https://drive.google.com/file/d/1icdkCzmQ1nayrfX-CZmO7mjla1FFOvm8/view?usp=drive_link",
          },
          {
            title: "Aggolomerative Clustering",
            url: "https://drive.google.com/file/d/1QMeVY6BVN_t1RnHuz72EhrrgSIYqtOv8/view?usp=drive_link",
          },
          {
            title: "Complete Linkage",
            url: "https://drive.google.com/file/d/1K1Goft-MF16n0YRZPvitc6IICxUbPbJ4/view?usp=drive_link",
          },
          {
            title: "K-Means Clustering - 1",
            url: "https://drive.google.com/file/d/1utyDeaQF7T9MUeLWG9I3AtfoUJWhmLbd/view?usp=drive_link",
          },
          {
            title: "K-Means Clustering - 2",
            url: "https://drive.google.com/file/d/1P4G76f9NttJXtZN-ZbAua2R6LE6wNMX7/view?usp=drive_link",
          },
          {
            title: "Text Mining",
            url: "https://drive.google.com/file/d/1QzLr-KmXKAw6NWvqlvmCz_fQtQs2XX39/view?usp=drive_link",
          },
          {
            title: "TF-IDF",
            url: "https://drive.google.com/file/d/1lBFfvG4oMKQkvLnDnFVTGpwKCGZEey_U/view?usp=drive_link",
          },
          {
            title: "Bag of Words vs TF-IDF",
            url: "https://drive.google.com/file/d/14-lfVEjhwu_MBtuJtr1b4qtUK8eeE5cd/view?usp=drive_link",
          },
          {
            title: "Recommender Systems",
            url: "https://drive.google.com/file/d/1ykf45vqnM_cdOwWxu1x6ScgkwxPuPpD1/view?usp=drive_link",
          },
          {
            title: "Hybrid Recommender Systems",
            url: "https://drive.google.com/file/d/1iXT8UpYRV6bfT4sD3qxLVfVfIo8O1KyW/view?usp=drive_link",
          },
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
