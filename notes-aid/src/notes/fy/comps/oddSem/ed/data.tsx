import { Brain } from "lucide-react";
import { describe } from "node:test";

const ed = {
  name: "Engineering Drawing",
  icon: Brain,
  color: "blue",
  modules: {
    1: {
      notesLink: [
        {
          title: "Projection of Points lines and planes",
          url: "https://drive.google.com/drive/folders/1NNtOEAd-dMCIf78W6bbu0NxtvvNsXISp?usp=share_link",
        },
        {
          title: "Projection of PLP Drawings",
          url: "https://drive.google.com/drive/folders/1Y59zzKsQqPMC1CmyGVUrMLhQfTWPzvaH?usp=share_link",
        },
        {
          title: "AutoCad File Projection of Lines",
          url: "https://drive.google.com/file/d/1VJ0EISC5V2Y6UwBr5dFPF_SQuVqZpa_b/view?usp=share_link",
        },
        {
          title: "AutoCad File Projection of Planes",
          url: "https://drive.google.com/file/d/1R3RsRtHZfFsRNVG8Ej7KZ9YXGMOpipH3/view?usp=share_link ",
        },
      ],
      topics: [
        {
          title: "Introduction to Engineering Drawings",
          description: "",
          videos: [
            {
              title: "Things to Carry",
              url: "https://www.youtube.com/embed/FQhGBy0-tYw?si=aTrV94S6DoKHNd5s",
            },
          ]
        },
        {
          title: "Projections of Point,Lines and Planes",
          description: "Introduction and AutoCad",
          videos: [
            {
              title: "Projections of Lines and Planes",
              url: "https://www.youtube.com/embed/aKg5q3rLEdg?si=F5ppUXnTEzYL6udx" ,
            },
            {
              title:"Projection of Planes",
              url:"https://www.youtube.com/embed/dJD-1a3FMyU?si=hyyd_2eg2yf65sB5",
            }
          ]
        },
      ]
    },
    2: {
      notesLink: [
        {
          title: "Orthogonal Projections",
          url: "https://drive.google.com/drive/folders/your-new-folder-link?usp=share_link",
        },
        {
          title: "Orthogonal Projections Drawings",
          url: "https://drive.google.com/drive/folders/1-7ov3ehTncWBHMJh1GZ1jmQiNz7GNa3I?usp=share_link",
        },
        {
          title: "AutoCad File Sectional Orthographic Assignment",
          url: "https://drive.google.com/file/d/158XWzg5MFHGz5Ogt1orNSRQhQCm8PHRR/view?usp=share_link",
        }
      ],
      topics:[
        {
          title: "Orthogonal Projection of Solids",
          description: "",
          videos: [
            {
              title: "Introductions to Orthogonal Projections",
              url: "https://www.youtube.com/embed/bVy-_iqLo1k?si=nkYYTdNKoqLDuvcR&amp;controls=0",
            }
          ]
        }
      ]
    },
    3: {
      notesLink: [
        {
          title: "Isometric Views",
          url: "https://drive.google.com/drive/folders/1rYpucN_OZZZRNOtlhjuIRxcS20nERXdM?usp=share_link",
        },
      ],
      topics: [
        {
          title:"Isometric Views",
          videos:[
            {
              title:"How to construct a Isometric View of an Object",
              url:"https://www.youtube.com/embed/zKFAbmnUvGU?si=tdA_VUEtS86Bvwgq",  
            }
          ]
        },
        {
          title: "Quetions on Isometric Views",
          description: "",
          videos: [
            {
              title: "Q1",
              url: "https://www.youtube.com/embed/qvfBXHrIaWE?si=RYEhmgi7JN31Nt1z",
            },
            {
              title: "Q2",
              url: "https://www.youtube.com/embed/WSME3_4sLoA?si=42aYrEvmcxmib3aL",
            },
            {
              title: "Q3",
              url: "https://www.youtube.com/embed/yF2hsEr7AI8?si=PKoznNIwSgGJtX0y",
            },
            {
              title: "Q4",
              url: "https://www.youtube.com/embed/vqvJ0RK32Es?si=Sk09S7p-W15_TX06",
            },
            {
              title: "Q5",
              url: "https://www.youtube.com/embed/jys3XcdLdWw?si=ZdA_4Ewltl0fptgy",
            },
            {
              title: "Q6",
              url: "https://www.youtube.com/embed/jys3XcdLdWw?si=WsbRH6IuBNrcq_hO",
            },
            {
              title: "Q7",
              url: "https://www.youtube.com/embed/HiAAyZz24oA?si=nPTtb8wvJxdDjBvy",
            },
            {
              title: "Q8",
              url: "https://www.youtube.com/embed/RjpQMnK0w2Y?si=vJZlhdfqZO0BcJwM",
            }
          ]
        }
      ],
    },
    4: {
      notesLink: [
        {
          title: "Projections of Solids",
          url: "https://drive.google.com/drive/folders/1spCNaeG5ir19Myhy2FK1NuVgVBg_-4y5?usp=share_link",
        },
        {
          title: "Projections of Solids Drawings",
          url: "https://drive.google.com/drive/folders/13dVBvOdLJ8OrdrwR-KuSfTCXZ0gGDD_Y?usp=share_link",
        },
        {
          title: "AutoCad File - Projections of Solids ",
          url: "https://drive.google.com/file/d/1H9vVteanjDcM0vIFPq64q4gwPiebp8A5/view?usp=share_link",
        },
        {
          title:"AutoCad File- Projection of Cones",
          url:"https://drive.google.com/file/d/1H9vVteanjDcM0vIFPq64q4gwPiebp8A5/view?usp=share_link",
        }
      ],
      topics: [
        
        {
          title: "Projection of Solids",
          description: "",
          videos: [
            {
              title: "True Shape Orientation",
              url: "https://www.youtube.com/embed/zi7XYYoqg9E?si=1Vxeokc7f2qjNKW6",
            },
            {
              title: "Projection of Square Pyramid",
              url: "https://www.youtube.com/embed/Ht922zIOE1k?si=l0bAc50sbrhei9Yg", 
            },
            {
              title: "Projection of Solids-Cones",
              url: "https://www.youtube.com/embed/iCqxpcsqBLg?si=UxACv742L81VP1Ze",
            },
          ]
        }
      ],
    },
    5: {
      notesLink: [
        {
          title: "Section and Development of Solids",
          url: "https://drive.google.com/drive/folders/1XepFjoOrg7LvjsomK0GJNxSICthx1QFc?usp=share_link",
        },
        {
          title: "Section and Development of Solids Drawings",
          url: "https://drive.google.com/drive/folders/1oIxlMFmWhV7noTTfRTFA7votS2-DZxS2?usp=share_link",
        },
        {
          title: "AutoCad- Section and Development of Solids Part 1",
          url: "https://drive.google.com/file/d/1tdUeXsgJwSQ9hB9UlHCTf4xdv-UHbAmb/view?usp=share_link",
        },
        {
          title: "AutoCad- Section and Development of Solids Part 2",
          url: "https://drive.google.com/file/d/1b5PYhS8UFSTc7cVdCguNH1soTi5G20Sx/view?usp=share_link",
        },

      ],
      topics: [
        {
          title: "Sectional and Development of Solids",
          description: "",
          videos: [
            {
              title: "Sectional Orthographic Projections",
              url: "https://www.youtube.com/embed/4ATWYImE6U4?si=ymlf_ENPg4PfArJM",
            },
            {
              title: "Sectional of Petagon Prism",
              url:"https://www.youtube.com/embed/A7RuvwMXdSI?si=P2I4Eb6CbdHZJ_pt" ,
            },
          ]
        }
      ],
    },
  },
};

export default ed;
