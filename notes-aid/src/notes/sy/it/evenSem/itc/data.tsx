import { Brain } from "lucide-react";

const itc = {
  name: "Information theory and coding",
  icon: Brain,
  color: "blue",
  modules: {
    1: {
      notesLink: [
        {
          title: "All Notes",
          url: "https://drive.google.com/drive/folders/1bWx82t91U3-B0DGc5nN-f-8hV4v8C4Gy?usp=sharing",
        }
      ],
      topics: [
        {
          title: "1.1: Basics of Information Theory",
          description: "Basic theoretical concepts",
          videos: [
            {
              title: "1.1.1: Introduction",
              url: "https://www.youtube.com/embed/yNnMJUBZd2w",
            },
            {
              title: "1.1.2: Measure of Information",
              url: "https://www.youtube.com/embed/D4RcqsdZi70",
            },
{
              title: "1.1.3: Entropy and Information rate",
              url: "https://www.youtube.com/embed/B5ls9H6oUpU",
            }
          ],
        },
        {
          title: "1.2: Entropies",
          description: "Important Topic for Exam ⭐",
          videos: [
            {
              title: "1.2.1: Joint Entropy",
              url: "https://www.youtube.com/embed/cDpL79gr6eI?si=O_w_4-5Xjw8x4UnU",
            },
            {
              title: "1.2.2: Condtional Entropy",
              url: "https://www.youtube.com/embed/cDpL79gr6eI?si=O_w_4-5Xjw8x4UnU",
            },
            {
              title: "1.2.3: Mutual Information of 2 discrete Random variables",
              url: "https://www.youtube.com/embed/UtrAhToF3cA?si=jycIkU8dO7zprMYk",
            },
          ],
        },
        {
          title: "1.3 Channels",
          description: "Important Topic for Exam ⭐",
          videos: [
            {
              title: "1.3.1: Channel Models",
              url: "https://www.youtube.com/embed/vZkPUTnfUw8?si=Z7lYv17gExDvHuaP",
            },
            {
              title: "1.3.2: Channel Capacity",
              url: "https://www.youtube.com/embed/W-OskAegz5o?si=V8o4YgQVSrW31X4X",
            },
            {
              title: "1.3.3: Shanon Theorem",
              url: "https://www.youtube.com/embed/3ekWsXeZ8TM",
            },
          ],
        }
      ],
    },
    2: {
      notesLink: [
        {
          title: "Data Compression",
          url: "https://drive.google.com/drive/folders/1_BmRePaMm4ixUbRHV78PnrQGWQfOsAbl?usp=sharing",
        }
      ],
      topics: [
        {
          title: "2.1: Introduction ",
          description: "Theoretical concepts",
          videos: [
            {
              title: "2.1.1: Introduction",
              url: "https://www.youtube.com/embed/Kq7L9S1LRGw?si=qHWZucvTnY_inKsu" ,
            },
            {
              title: "2.1.2: Coding parameters",
              url: "https://www.youtube.com/embed/zhRRA0fcgiw?si=XcMHn2E04irLHhL6",
            },
            {
              title: "2.1.3: Source coding theorem",
              url: "https://www.youtube.com/embed/zhRRA0fcgiw?si=XcMHn2E04irLHhL6",
            }
          ],
        },
        {
          title: "2.2:Types of codes",
          description: "Algorithms based on the Greedy approach",
          videos: [
            {
              title: "2.2.1: Shanon Fano coding",
              url: "https://www.youtube.com/embed/g2UlDNamG84",
            },
            {
              title: "2.2.2: Huffman coding",
              url: "https://www.youtube.com/embed/HmBH30NrM7c",
            },
            {
              title: "2.2.3: Arithmetic coding ",
              url: "https://www.youtube.com/embed/G6u8bt5unZk?si=dZSn2JcByFtw-ey3",
            },
          ],
        },
        {
          title: "2.3: Another Encoding and decoding techniques",
          description: "Algorithms based on Dynamic Programming",
          videos: [
            {
              title: "2.3.1: LZW coding",
              url: "https://www.youtube.com/embed/9gkiphD-VIY?si=YSpI5zyg1Lh9DPet" ,
            },
            {
              title: "2.3.2: Runlength Encoding",
              url: "https://www.youtube.com/embed/eqBUphYXsGk?si=Hf5WMSeuo0DVXY10",
            },
            {
              title: "2.3.3: Scalar and vector Quantization",
              url: "https://www.youtube.com/embed/8h7EELEjqN8?si=Lxv8hfgFov5DXdOu",
            },
            {
              title: "2.3.4: Differential coding",
              url: "https://www.youtube.com/embed/3IaB2a8tXLA?si=lWxntDQX_GSOZHvb",
            },
            {
              title: "2.3.5: Transform coding",
              url: "https://www.youtube.com/embed/FQjrHAjJLJU?si=iS0Xfp4vP22EU7hW",
            },
            {
              title: "2.3.6: SubBand coding ",
             // url: "https://www.youtube.com/embed/_WncuhSJZyA?si=av8Ga8ZNsfPO_23E",
            },
          ],
        },
        {
          title: "2.4: Audio & Video Coding",
          description: "Algorithms based on Branch and Bound",
          videos: [
            {
              title: "2.4.1: Introduction to Audio coding",
              url: "https://www.youtube.com/embed/Ky4CaKw7tdo?si=XAxru7b7cmkEEYnB" ,
            },
            {
              title: "2.4.2: Overview of video Compression",
              url: "https://www.youtube.com/embed/qbGQBT2Vwvc?si=rHqXkQ5chREZJM2A",
            },
          ],
        },
      ],
    },
    
   3: {
      notesLink: [
        {
          title: "Linear block codes",
          url: "https://drive.google.com/drive/folders/1dFo41IKWqV3FTz78GNT0rXOT7boYveSY?usp=sharing",
        },
      ],
      topics: [
        {
          title: "3.1: Introduction",
          description: "Basic of linear block codes",
          videos: [
            {
              title: "3.1.1: Introduction",
              url: "https://www.youtube.com/embed/DfSvzkgUNNs?si=DGtKqaITbXwxkAjE",
            },
  {
              title: "3.1.1: Need for error control coding",
              url: "",
            },{
              title: "3.1.1: Types of error control codes",
              url: "https://www.youtube.com/embed/81bvdmVwj0g?si=jRYWtD7GsGTHPp3-" ,
            },{
              title: "3.1.1: Error control techniques",
              url: "",
            },{
              title: "3.1.1: Error detection",
              url: "]",
            },{
              title: "3.1.1: Classification of error correcting codes",
              url:"https://www.youtube.com/embed/JsSgZ96vv-k?si=sTv_b4O00as_UriN",
            },
          ],
        },
        {
          title: "3.2: Linear block codes",
          description: "Efficient string matching algorithm",
          videos: [
            {
              title: "3.2.1: Introduction",
              url: "",
            },
{
              title: "3.2.1: Generator matrices",
              url: "https://www.youtube.com/embed/6aRMW4p2WEc?si=AUP8DUFYifHZk0Ev",
            },{
              title: "3.2.1: Parity check matrices",
              url: "https://www.youtube.com/embed/vSIjVc0ZAT4?si=kyuEo0UHcZhx0OEC",
            }
          ],
        },
        {
          title: "3.3:Error Relations",
          description: "Algorithms based on the Greedy approach",
          videos: [
            {
              title: "3.3.1: Error syndrome",
              url: "https://www.youtube.com/embed/T7mSu62-RLE?si=CqzJLykxdwDsAR3h" ,
            },
{
              title: "3.3.1: Error detection",
              url: "",
            },{
              title: "3.3.1:  Error detecting and error correcting capability",
              url: "https://www.youtube.com/embed/xkJZY-vrIco?si=MzU54XjmDHzP0AIv",
            },{
              title: "3.3.1:Syndrome Decoding",
              url: "https://www.youtube.com/embed/kkOWIUhd4dE?si=r9bCwQH6XS9SPnoB",
            }
          ],
        },
      ],
    },
    4: {
      notesLink: [
        {
          title: " Cyclic code and Convolution code ",
          url: "https://drive.google.com/drive/folders/1xYScRbEibMUmX7oY7wUUARlrASNTZi44?usp=sharing",
        },
      ],
      topics: [
        {
          title: "4.1: Cyclic codes",
          description: "Understanding algorithms that run in polynomial time",
          videos: [
            {
              title: "4.1.1:Introduction and generation",
              url: "https://www.youtube.com/embed/_ddQAaQg_es",
            },
{
              title: "4.1.1:Syndrome computation and error detection",
              url: "https://www.youtube.com/embed/yES7YOqK6oA",
            },{
              title: "BCH Codes",
              url: "https://www.youtube.com/embed/vKoo0HLLE50",
            }
          ],
        },
        {
          title: "4.2: Convolution codes",
          description: "Proof of NP completeness using the Vertex Cover Problem",
          videos: [
            {
              title: "4.2.1: Introduction",
              url: "https://www.youtube.com/embed/cCtNbaUIex4",
            },
{
              title: "4.2.1:  Encoder and Decoder",
              url: "https://www.youtube.com/embed/RhsZg1ns2n8",
            },{
              title: "4.2.1:  Tree and Trellis Codes",
              url: "https://www.youtube.com/embed/qnaRf1iTss4",
            },{
              title: "4.2.1: Applications",
              url: "https://www.youtube.com/embed/ABGDllGq1bQ?si=TjDy-MKTVzQV-Qk-",
            }
          ],
        },
      ],
    },
5: {
      notesLink: [
        {
          title: "Basics of Number Theory and Cryptography",
          url: "https://drive.google.com/drive/folders/15QCNZHGhMSQA4_BpshNkxozQqXbM--kE?usp=sharing",
        }
      ],
      topics: [
        {
          title: "5.1: Number generation ",
          description: "Numerical algorithms",
          videos: [
            {
              title: "5.1.1: Prime Number Generation",
              url: "",
            },
            {
              title: "5.1.2: Random Number Generation",
              url: "",
            },
            {
              title: "5.1.3: Solving Linear Congruences ax+by=d.",
              url: "",
            }
          ],
        },
        {
          title: "5.2:Modular Arithmetic",
          description: "Algorithms based on the Greedy approach",
          videos: [
            {
              title: "5.2.1: Chinese Remainder Theorem",
              url: "",
            },
            {
              title: "5.2.2: Fermat's Little and Euler Theorem",
              url: "",
            }
          ],
        },
        {
          title: "5.3: Cryptography",
          description: "Algorithms based on Dynamic Programming",
          videos: [
            {
              title: "5.3.1: Basics of cryptography",
              url: "",
            },
            {
              title: "5.3.2:  Concepts of encryption and Decryption",
              url: "",
            },
            {
              title: "5.3.3: Shannons characteristics of good cipher,",
              url: "",
            },
            {
              title: "5.3.4: confusion and diffusion",
              url: "",
            }
          ],
        },
        {
          title: "5.4: Transposition Ciphers",
          description: "Algorithms based on Branch and Bound",
          videos: [
            {
              title: "5.4.1: Row key and Column keySubstitution ciphers",
              url: "",
            },
            {
              title: "5.4.2:  Caesar cipher (additive)",
              url: "",
            },
{
              title: "5.4.2:  Affine cipher (additive and multiplicative)",
              url: "",
            },{
              title: "5.4.2:  Polyalphabetic and Monoalphabetic Ciphers: Vignere cipher",
              url: "",
            },
          ],
        },
        
      ],
    },
  },
};
export default itc;
