import { Book } from "lucide-react"; // Replace with a suitable Lucide icon

const analogElectronics = {
  name: "Analog Electronics",
  icon: Book, // Use an appropriate icon
  color: "green", // Consistent color scheme
  modules: {
    1: {
      notesLink: [
        {
          title: "Notes 1",
          url: "https://somaiya0-my.sharepoint.com/:b:/g/personal/....",
        },
      ],
      topics: [
        {
          title: "Frequency Response of BJT and MOSFET Amplifiers",
          description: "Very Very Important for AE & exam",
          videos: [
            {
              title: "Best for AC analysis of BJT & MOSFET low & high frequency (also good for many concepts of mod 1, match with syllabus & see)",
              url: "https://www.youtube.com/embed/videoseries?si=6wqruKIsoxNDkUET&list=PLBDB2c4Mp7hAcV9zW7SGbTd7QDXrhG6nY",
            },
            {
              title: "Difference between Analog and Digital",
              url: "https://www.youtube.com/embed/xvFZjo5PgG0?si=ii7FsVVzJTpiartE",
            },
          ],
          notes: [
            {
              title: "Module Notes",
              url: "https://drive.google.com/file/d/1-XKAB9rSpbKxcUMzJzSJvZ5F8q4UnnsT/view?usp=sharing",
            },
          ],
        },
      ],
    },
    2: {
      notesLink: [
        {
          title: "Notes 2",
          url: "https://somaiya0-my.sharepoint.com/:b:/g/personal/....",
        },
      ],
      topics: [
        {
          title: "Biasing Techniques for Integrated Circuits",
          description: "Theoretical / Practical applications",
          videos: [
            {
              title: "Working of Diodes",
              url: "https://www.youtube.com/embed/xvFZjo5PgG0?si=ii7FsVVzJTpiartE",
            },
          ],
          notes: [
            {
              title: "IC Biasing swati mam",
              url: "https://drive.google.com/file/d/1-b50blaDrskeHAJpFo4YIEBWm4Y5nEuO/view?usp=sharing",
            },
          ],
        },
      ],
    },
    3: {
      notesLink: [],
      topics: [
        {
          title: "Fundamentals of Operational Amplifier",
          description: "Theoretical & Numerical Based + Very Important for exam + easy",
          videos: [
            {
              title: "Operational amplifier BEST playlist 3.3 & 3.4",
              url: "https://www.youtube.com/embed/videoseries?si=-7i_PXDYxivGnxtx&list=PLS025GDZpC8y-D11rEFzWtj35uuTOqLNY",
            },
          ],
          notes: [],
        },
        {
          title: "Power Amplifier",
          description: "Theoretical & Numerical Based + Very Important for exam + easy",
          videos: [
            {
              title: "BEST YT",
              url: "https://www.youtube.com/embed/videoseries?si=VRIswP9hQX8UBfdL&list=PLdEuLNelwfBPCzQH7PugcsHw6jnDfROwO",
            },
          ],
          notes: [],
        },
      ],
    },
  },
};

export default analogElectronics;
