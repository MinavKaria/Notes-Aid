# Contributing to Notes Aid

Welcome to Notes Aid! We appreciate your interest in contributing. This document provides guidelines for both **developers** and **notes contributors**.

## Table of Contents
- [For Developers](#for-developers)
  - [Project Setup](#project-setup)
  - [Development Guidelines](#development-guidelines)
  - [Submitting a Pull Request](#submitting-a-pull-request)
- [For Notes Contributors](#for-notes-contributors)
  - [Notes Format](#notes-format)
  - [Adding Notes](#adding-notes)
  - [Submitting a Pull Request](#submitting-a-pull-request-1)

---

## For Developers

### Project Setup
1. **Fork the Repository**: Click the 'Fork' button on GitHub.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/<Your Github ID>/Notes-Aid.git
   cd Notes-Aid/notes-aid
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```

### Development Guidelines
- Use **TypeScript** for consistency.
- Follow the **existing folder structure** and coding conventions.
- Ensure all **components use Lucide Icons** for UI consistency.
- Validate JSON data before committing.
- Run **prettier and eslint** before pushing:
  ```bash
  npm run build
  ```

_Note: Do not commit service-worker.js or workbox-*.js files._

### Submitting a Pull Request
1. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
2. Make your changes and commit:
   ```bash
   git commit -m "Added feature-name"
   ```
3. Push your branch:
   ```bash
   git push origin feature-name
   ```
4. Open a Pull Request (PR) on GitHub.

---

## For Notes Contributors

### Notes Format
Notes should follow the structured TypeScript format:

You need to contribute in `Notes-Aid\Notes-Aid\notes-aid\src\app\notes` folder where you will find:

There are 4 folder for each year
```
📂fy/
📂sy/
📂ty/
📂ly/
```

Each year has folders of various branches within it:
```
📂fy/
├──📂comps/
├──📂it/
..
📂sy/
├──📂comps/
├──📂it/
..
.
.
similar for each folder
```

```
📂fy/
├──📂comps/
│  ├── 📂evenSem
│  ├── 📂oddSem
├──📂it/
│  ├── 📂evenSem
│  ├── 📂oddSem
.
.
similar for each folder
```

Each evenSem and oddSem Folder has <subject>/data.tsx
```
📂ty/
├──📂comps/
│  ├──📂evenSem/
│  │  ├──📂 dsip/📄data.tsx
│  │  ├──📂 ai/📄data.tsx
│  │  ├──📂 cc/📄data.tsx
│  │  ├──📂 is/📄data.tsx
│  │  ├──📄subject.tsx
│  ├──📂oddSem
│  │  ├──📂 cn/📄data.tsx
│  │  ├──📂 os/📄data.tsx
│  │  ├──📂 cg/📄data.tsx
...
.
.
```





Format of `data.tsx` file is as follows:

### Adding Notes
1. Navigate to `<subject>/data.tsx`.
2. Find the appropriate subject or add a new one following the above format.
3. Include:
   - **Topics** (with titles, icon & descriptions)
   - **Videos** (if available)
   - **Notes** (as URLs)
   - **Description** of the topic
4. Moreover As per syllabus, C and P batch in **First Year** have the same syllabus only the subjects are swapped, We have followed:
   - C Batch -> Comps and AIDs
   - P Batch -> Others 


_Bonus Tip: We have 1 TB of storage on Sharepoint with somaiya.edu account, so you can upload your notes there and share the link here._

---

Currently taking notes for Artificial Intelligence as an example:


```ts
import {SomeLucideIcon} from "lucide-react";  // choose icon from lucide.dev

const ai: Subject = {
  name: "Artificial Intelligence",
  icon: SomeLucideIcon,
  color: "blue", // Make it blue for consistent color scheme
  modules: {
    // For each module make different
    1: {
    
      notesLink: [
         {
            title: "Notes 1",
            url: "https://somaiya0-my.sharepoint.com/:b:/g/personal/....",
         },
         // ... Add notes here with title and url here
      ],
      // Topics of Module like 1.1, 1.2 ....
      topics: [
        {
          title: "1.1 Introduction to AI",
          description: "Theortical Topic / Numerical Based / Important for exam",
          videos: [
            // Videos for that topic
            { title: "Introduction to AI", url: "https://www.youtube.com/embed/xvFZjo5PgG0?si=ii7FsVVzJTpiartE" }
      
            { title: "History of AI", url: "https://www.youtube.com/embed/xvFZjo5PgG0?si=ii7FsVVzJTpiartE" }
            // Use embed link of youtube video for url which you will get when you click on share button of youtube video
            // Add more videos if needed or else leave the array empty
          ],
          notes: [
            { title: "Module 1.1 Notes", url: "https://example.com/ai-notes" }
            // Add notes if needed
            // Use drive link or any other link where notes are stored
          ],
        },
      ],
    },
    2: {
        // Same format as above
    },
    3: {
        // Same format as above
    },
  },
};

export default ai; 

// You can refer to the src/app folder for more examples
```

For testing wether the notes are added correctly or not, you can run the project locally and check the notes in the browser with steps mentioned in [README.md](README.md)


### Submitting a Pull Request
1. Fork the repository.
2. Clone it and create a new branch:
   ```bash
   git checkout -b add-notes-subject
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Added notes for subject XYZ"
   ```
4. Push your branch:
   ```bash
   git push origin add-notes-subject
   ```
5. Open a Pull Request (PR) on GitHub.

---

Thank you for contributing! 🎉

