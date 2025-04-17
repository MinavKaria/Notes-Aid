import { Brain } from "lucide-react";

const os = {
  name: "Operating System",
  icon: Brain,
  color: "blue",
  modules: {
    1: {
      notesLink: [
        {
          title: "Viraj's Notes",
          url: "https://drive.google.com/file/d/1M1RFzW0xAQHZHL8kvb9fBTsn_vI6gaYn/view?usp=drive_link",
        },
        {
          title: "College Notes MOD 1",
          url: "https://drive.google.com/drive/folders/1JR-GzaLlc9ziQWZJl-ysRlPCWFugUHu0?usp=sharing",
        },
      ],
      topics: [
        {
          title: "1. Introduction to System software",
          description:
            "Basic theoretical concepts (These should be clear for understanding the rest of the topics)",
          videos: [
            {
              title: "1.1.1 Introduction",
              url: "https://www.youtube.com/embed/WJ-UaAaumNA?si=Ia7xCavBE-Awj-Dc",
            },
            {
              title: "1.1.2 Types of OS",
              url: "https://www.youtube.com/embed/povNcHSasgs?si=9_l7wCDsuTLCjkYZ",
            },
            {
              title: "1.1.3 Process States",
              url: "https://www.youtube.com/embed/2dJdHMpCLIg?si=IkqHMr6aEUDMy_bE",
            },
            {
              title: "1.1.4 Process States and Schedulers",
              description: "Very Important Topic for Exam ⭐",
              url: "https://www.youtube.com/embed/2dJdHMpCLIg?si=BRFArjiwY0bNFAuA",
            },
            {
              title: "1.1.5 Linux Commands",
              url: "https://www.youtube.com/embed/-Mq8Mm_NGxI?si=qYE6IlbVyYAxyWAi",
            },
          ],
        },
        {
          title: "1.2 System Calls",
          description:
            "Very Important Topic for Exam ⭐⭐ ",
          videos: [
            {
              title: "1.2.1 System calls",
              url: "https://www.youtube.com/embed/tWPa-rZiGM8?si=o6coBCZO-6Cfs9Br",
            },
            {
              title: "1.2.2 fork() system call",
              url: "https://www.youtube.com/embed/ixq5cpdEO2Q?si=x2sFQ99O3pg5KHbM",
            },
            {
              title : "Questions on fork() system call",
              url : "https://www.youtube.com/embed/8duV1LLHHJU?si=mtv5AUcf3z-TXM6o"
            }
          ],
        },
        {
          title: "1.3 Process and Threads",
          description:
            "Questions will be asked in the form of distinguish between",
          videos: [
            {
              title: "1.3.1 User mode and Kernel Mode in OS",
              url: "https://www.youtube.com/embed/8duV1LLHHJU?si=5FE1O7836wMhWSgK",
            },
            {
              title: "1.3.2 Process v/s Threads",
              url: "https://www.youtube.com/embed/ITc09gOrqZk?si=N6oOkkG_YkZN6u2U",
            },
            {
              title: "1.3.3 User level thread v/s Kernel level thread",
              url: "https://www.youtube.com/embed/-NONm-Jq34Y?si=iNAiWeU60saG2V2N",
            },
            
          ],
        },
        
        
      ],
    },
    2: {
      notesLink: [
        {
          title: "Short Notes Mod 2",
          url: "https://drive.google.com/drive/folders/1wtKDk-7P-yrmiYiv83QsNm_rp4uhKTAt?usp=drive_link",
        },
        {
          title: "College Notes MOD 2",
          url: "https://drive.google.com/drive/folders/1JR-GzaLlc9ziQWZJl-ysRlPCWFugUHu0?usp=sharing",
        },
      ],
      topics:[
        {
          title: "2.1: Process Concept and Threads",
          description: "Fundamentals of processes and threading concepts.",
          videos: [
            {
              title: "2.1.1 Concept of a Process",
              url: "https://www.youtube.com/embed/ITc09gOrqZk?si=NqmdcoEdaPi0qzaW",
            },
            {
              title: "2.1.2 Process States",
              url: "https://www.youtube.com/embed/2dJdHMpCLIg?si=7JUhI3GiGMdgefGk",
            },
            {
              title: "2.1.3 Process Control Block",
              url: "https://www.youtube.com/embed/4s2MKuVYKV8?si=iu65JezilmAH7DPA",
            },
            {
              title: "2.1.4 Operations on Processes Part 1",
              url: "https://www.youtube.com/embed/pSW9d3Oaie8?si=DGi3dtGMkoSYTPap",
            },
            {
              title: "2.1.4 Operations on Processes Part 2",
              url: "https://www.youtube.com/embed/SFc3jt8t5rU?si=ixXEqNTr0Sq3DsJ1",
            },
            {
              title: "2.1.5 Threads Definition, Types and MultiThreading",
              url: "https://www.youtube.com/embed/AvsXoy9rstY?si=fWzFDPktLCN3hFnN",
            }
          ],
        },
        {
          title: "2.2: Scheduling Algorithms",  
          description: "Types of scheduling and scheduling algorithms.",
          videos: [
            {
              title: "2.2.1 Uniprocessor Scheduling Part 1",
              url: "https://www.youtube.com/embed/0TQDx7vwnGs?si=oNQ1ynSURfofw65V",
            },
            {
              title: "2.2.2 Uniprocessor Scheduling Part 2",
              url: "https://www.youtube.com/embed/v_3Gu084VwE?si=jc26ay1wsn8TKnGA"
            },
            {
              title: "2.2.3 Preemptive and Non-preemptive Scheduling",
              url: "https://www.youtube.com/embed/zFnrUVqtiOY?si=mzH7e2GR_SVg2cxS",
            },
            {
              title: "2.2.4 FCFS Scheduling Algorithm",
              url: "https://www.youtube.com/embed/MZdVAVMgNpA?si=B162o6zb9oW11dJR",
            },
            {
              title: "2.2.5.1 SJF Algorithm Non-Premptive",
              url: "https://www.youtube.com/embed/VCIVXPoiLpU?si=ZU8qUWQEP76MHHl_",
            },
            {
              title: "2.2.5.2 SJF Algorithm Premptive",
              url: "https://www.youtube.com/embed/kbfCRoNAPbY?si=3m8gtXPfTx93kk7G",
            },
            {
              title: "2.2.6 SRTN Schedulding",
              url: "https://www.youtube.com/embed/hoN7_VMzw_g?si=r4lCT1L1vnX-yjtt",
            },
            {
              title: "2.2.7 Round Robin",
              url: "https://www.youtube.com/embed/TxjIlNYRZ5M?si=16gAES3wF3QXK-fE",
            },
            {
              title: "2.2.8 Priority Based Schedulding",
              url: "https://www.youtube.com/embed/rsDGfFxSgiY?si=SfaQVDCZllGxgtvG",
            },
            {
              title: "2.2.9.1 Multilevel Queue Scheduling",
              url: "https://www.youtube.com/embed/hBPYP0ZEvS8?si=Jf6Y7w41mU_gElIj"
            },
            {
              title: "2.2.9.2 Multilevel FeedBack Queue Scheduling",
              url: "https://www.youtube.com/embed/-94WGbrWveI?si=Vg_sLIHWXbefEcR2"
            }
          ],
        },
        {
          title: "2.3: Multi Processor Scheduling",
          description: "Concepts and techniques for multiprocessor scheduling.",
          videos: [
            {
              title: "2.3.1 Introduction to thread",
              url: "https://www.youtube.com/embed/LOfGJcVnvAk?si=96A4ZMhxD2_TNw1Q",
            },
            {
              title: "2.3.2 Multithreading models",
              url: "https://www.youtube.com/embed/HW2Wcx-ktsc?si=6k7fYgPK5jQTuewc",
            }
          ],
        }
      ],
    },
    3: {
      notesLink: [
        {
          title: "College Notes MOD 3",
          url: "https://drive.google.com/drive/folders/1uywZAxjkJ-vCQhU3XQd5gnoGKN99KxaH?usp=sharing",
        },
      ],
      topics: [
        {
          title: "3.1: Concurrency",
          description: "Principles of concurrency, interprocess communication, and process/thread synchronization.",
          videos: [
            {
              title: "3.1.1 Concurrency Basics (Watch on Youtube)",
              url: "https://www.youtube.com/embed/xmUYD7yT93I?si=9V8YiAiGGwe2M5SD",
            },
            {
              title: "3.1.2 Interprocess Communication",
              url: "https://www.youtube.com/embed/dJuYKfR8vec?si=v3sKIn9vb6zLHUzX",
            },
            {
              title: "3.1.3 Process and Thread Synchronization",
              url: "https://www.youtube.com/embed/ph2awKa8r5Y?si=CLHFwgeFYXMj-LvC",
            },
          ],
        },
        {
          title: "3.2: Mutual Exclusion",
          description: "Peterson's Solution, software/hardware/OS support, semaphores and mutex, monitors, classical problems.",
          videos: [
            {
              title: "3.2.1 Critical Section Problem",
              url: "https://www.youtube.com/embed/UtEORPakw5Y?si=C472-zs0_VIXkVdR",
            },
            {
              title: "3.2.2 Peterson's Solution",
              url: "https://www.youtube.com/embed/gYCiTtgGR5Q?si=D6BetUeBVnurOHED",
            },   
            {
              title: "3.2.3 Test and Set Lock",
              url: "https://www.youtube.com/embed/5oZYS5dTrmk?si=xM1eeQIHdaIi9N8d", 
            },
            {
              title: "3.2.4 Semaphores Part 1",
              url: "https://www.youtube.com/embed/XDIOC2EY5JE?si=u9oBzO8rQwnj8-8o",
            },
            {
              title: "3.2.4 Semaphores Part 2",
              url: "https://www.youtube.com/embed/2cGo2HdA0dM?si=aGdnvA5gTN5w8qDs",
            },
            {
              title: "3.2.5 Mutex",
              url: "https://www.youtube.com/embed/oq29KUy29iQ?si=c6XTrDBgMwxpBH4t",
            },
            {
              title: "3.2.6 Monitors",
              url: "https://www.youtube.com/embed/ufdQ0GR855M?si=1wMNZwJ72A5_H8pc",
            },
            {
              title: "3.2.7 Consumer Producer Problem",
              url: "https://www.youtube.com/embed/iMD1Z3f9ioI?si=gfNBrheVNOR7Im_Z",
            },
            {
              title: "3.2.8 Readers Writers Problem",
              url: "https://www.youtube.com/embed/p2XDhW5INOo?si=Dj_GtzRPJvy8n7Hx",
            }
          ],
        },
        {
          title: "3.3: Principles of Deadlock",
          description: "Deadlock conditions, resource allocation graphs, prevention and avoidance.",
          videos: [
            {
              title: "3.3.1 Deadlock Conditions",
              url: "https://www.youtube.com/embed/rWFH6PLOIEI?si=t9tQeqjD-Fp-0xoo",
            },
            {
              title: "3.3.2 Resource Allocation Graphs Single Instance",
              url: "https://www.youtube.com/embed/BW74JYB3QOM?si=ktPd3TtyHEidegxl",
            },
            {
              title: "3.3.2 Resource Allocation Graphs Multiple Instance",
              url: "https://www.youtube.com/embed/hJhB2ddOQtg?si=VU_osPLHEtLQDI6G",
            },
            {
              title: "3.3.3 Deadlock Prevention and Handling methods",
              url: "https://www.youtube.com/embed/pPM9Ajqmy_4?si=JJIlyBAfgdmNQk66",
            },
            {
              title: "3.3.4 Banker's Algorithm",
              url: "https://www.youtube.com/embed/7gMLNiEz3nw?si=pUSpTKdcuJ2CmgIf",
            },
          ],
        },
        {
          title: "3.4: Deadlock Handling & Dining Philosophers Problem",
          description: "Deadlock detection, recovery, and dining philosophers problem.",
          videos: [
            {
              title: "3.4.1 Deadlock Detection and Recovery",
              url: "https://www.youtube.com/embed/2-7JGoy52Qo?si=ArhhkChsZqr7j_gr",
            },
            {
              title: "3.4.2 Dining Philosophers Problem",
              url: "https://www.youtube.com/embed/FYUi-u7UWgw?si=jPHvUibr0KURAoFK",
            },
            {
              title: "3.4.3 Dining Philosophers Problem Solution using Monitors",
              url: "https://www.youtube.com/embed/K52NiClfvyE?si=Ia6zgI9WelskVusz",
            },
          ],
        },
      ],
    },
    4: {
      notesLink: [
        {
          title: "College Notes MOD 4",
          url: "https://drive.google.com/drive/folders/16RD0VckwHmMg9lfyB99LusXbtpNlc1Ym?usp=sharing",
        },
      ],
      topics: [
        {
          title: "4.1: File Management",
          description: "Overview of file management, file organization and access, directories, sharing, secondary storage, Linux file systems.",
          videos: [
            {
              title: "4.1.1 File System Overview",
              url: "https://www.youtube.com/embed/0LtuQhNFFe0?si=Vb2RHtEQkGeiLWgZ",
            },
            {
              title: "4.1.2 File Atrributes & Operations",
              url: "https://www.youtube.com/embed/q1wGGZbOr4s?si=bs6iv6r_ojLH-afr",
            },
            {
              title: "4.1.3 File Allocation Methods in OS Part 1",
              url: "https://www.youtube.com/embed/J6wVO4pvUCw?si=2BZAMSBBqCUoaG2J",
            },
            {
              title: "4.1.4 File Allocation Methods in OS Part 2",
              url: "https://www.youtube.com/embed/J6wVO4pvUCw?si=0QMiJZ7OZz4xbqj5",
            },
            {
              title: "4.1.5 Linked list Allocation (Watch on Youtube)",
              url: "https://www.youtube.com/embed/irGdM3iIS54?si=sPnp4937ZQDsZnQM",
            },
            {
              title: "4.1.6 Indexed File Allocation",
              url: "https://www.youtube.com/embed/S6lLRz7SQUw?si=-H5Hm2HFkcO2hzj8",
            },
            {
              title: "4.1.7 Inode structure (Watch on Youtube)",
              url: "https://www.youtube.com/embed/BJ13GsC0_os?si=HA0XLMUIVJ1QT6xL",
            },
            {
              title: "4.1.8 Linux Virtual File System",
              url: "https://www.youtube.com/embed/0vZSEK2XTwM?si=-5hmuWP6wCXjX9Od",
            },
            {
              title: "4.1.9 File Protection and Access Control",
              url: "https://www.youtube.com/embed/pd3wsUGiwOs?si=uiRzkIq3rnKNpDa8",
            },
          ],
        },
        {
          title: "4.2: I/O Management and Disk Scheduling",
          description: "I/O devices, I/O buffering, disk scheduling algorithms (FCFS, SSTF, SCAN, CSCAN, LOOK, CLOOK), Linux disk management.",
          videos: [
            {
              title: "4.2.1 Introduction to I/O Systems Part 1",
              url: "https://www.youtube.com/embed/41EEkAkuo8Y?si=SKypwkHlyReeCMk3",
            },
            {
              title: "4.2.1 Introduction to I/O Systems with I/O buffering Part 2",
              url: "https://www.youtube.com/embed/4RA2sGxQHUc?si=o9Te-m6SYQOP0QOX",
            },
            {
              title: "4.2.2 FCFS, SSTF, SCAN, CSCAN",
              url: "https://www.youtube.com/embed/nnJHIgsC7ls?si=4YfWqnwKuXQFv-5t",
            },
            {
              title: "4.2.3 LOOK, CLOOK Ignore RAID levels",
              url: "https://www.youtube.com/embed/KAXPVaI4hAM?si=BcNT1_xbajURaXhl"
            },
            {
              title: "4.2.4 Linux Disk Management",
              url: "https://www.youtube.com/embed/Gb4Pt4MP7RY?si=fGVYVXJoTKiWTInV",
            },
          ],
        },
      ],
    },
        
    5: {
      notesLink: [
        {
          title: "Viraj's Notes",
          url: "https://drive.google.com/file/d/1rm-3zhheYRbHynk00XqyFZLxnAmEvmJf/view?usp=drive_link",
        },
        {
          title: "College Notes MOD 5",
          url: "https://drive.google.com/drive/folders/1JR-GzaLlc9ziQWZJl-ysRlPCWFugUHu0?usp=sharing",
        },
      ],
      topics: [
        {
          title: "5.1: Memory management",  
          description: "Memory management techniques and concepts.",
          videos: [
            {
              title: "5.1.1 Memory management introduction",
              url: "https://www.youtube.com/embed/eESIFJz7mJw?si=Bn4WfTgYInpS9nYa",
            },
            {
              title: "5.1.2 Memory management techniques",
              url: "https://www.youtube.com/embed/FrTttJLN7Kw?si=bpEqQag2wDV9mIWE",
            },
            
            
          ],
        },
        {
          title: "5.2: Memory management numerical concepts",  
          description: "Memory management numericals.",
          videos: [
            {
              title: "5.2.1 Internal Fragmentation",
              url: "https://www.youtube.com/embed/bK-VhQA512c?si=zr6YGdT_b5Otr3F6",
            },
            {
              title: "5.2.2 Variable size partitioning",
              url: "https://www.youtube.com/embed/JdPmsrYqRDY?si=bDo_U32v-aeM75-o",
            },
            {
              title: "5.2.3 First, best, worst fit, next fit",
              url: "https://www.youtube.com/embed/N3rG_1CEQkQ?si=9M5FAVl3uPlzgIfr",
            },
            {
              title:"Questions on First, best, worst fit, next fit ",
              url:"https://www.youtube.com/embed/W7wDlABjCQI?si=Nb3LWIYbYafAzyWA"
            },
          ],
        },
       
      ],
    },
  },
};

export default os;
