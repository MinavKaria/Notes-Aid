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
