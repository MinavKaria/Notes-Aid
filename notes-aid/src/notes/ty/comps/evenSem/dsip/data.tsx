import {
    Signal,
  } from "lucide-react";

const dsip = {
  name: "Digital Systems and Image Processing",
  icon: Signal,
  color: "blue",
  modules: {
    1: {
      notesLink: [
        {
          title: "Notes 1",
          url: "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/Chapter%201%20DSIP%202022.pptx.pdf?alt=media&token=7d6bd8e7-ce2a-4d1d-bf88-c38fee89642e",
        },
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
              url: "https://www.youtube.com/embed/BDI4zf9Azpk?si=OOfMbLy-cbIG4ib7",
            },
            {
              title: "Block Diagram & Signal Flow Graph - Part 2",
              url: "https://www.youtube.com/embed/rjC_7YOiM3I?si=ncTFhky6vsF2PEPK",
            },
            {
              title: "Block Diagram & Signal Flow Graph - Part 2",
              url: "https://www.youtube.com/embed/rjC_7YOiM3I?si=ncTFhky6vsF2PEPK",
            },
            {
              title: "Block Diagram & Signal Flow Graph - Part 3",
              url: "https://www.youtube.com/embed/BYMc-YEy89E?si=6kmCxOIYxiqTARVB",
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
        {
          title: "Notes 1",
          url: "https://firebasestorage.googleapis.com/v0/b/acm-bruh.appspot.com/o/Chapter%202.pdf?alt=media&token=050c1cc3-45f5-425f-a1eb-a05c93d9e445",
        },
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
              title:
                "Image Negative or Digital Negative,Thresholding, Bit Plane Slicing",
              url: "https://www.youtube.com/embed/FMDmXz6ynvk?si=7qKfBYj1VAyfMPzh",
            },
            {
              title: "Contrast Stretching or Contrast Adjustment",
              url: "https://www.youtube.com/embed/YJIgFMoC_yg?si=KVVwA_UX-rubmTJp",
            },
            {
              title:
                " Digital Negative, Bit Plane Slicing and Contrast Stretching- Part 2",
              url: "https://www.youtube.com/embed/pu-897YlpKM?si=lSUzYYZv4185jtGH",
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
    3: {
      notesLink: [
        {url:"https://drive.google.com/file/d/1kiOclPKHD8JUWR5AVooKY0Bwe_e5zhLB/view?usp=drive_link", title:"Notes 1"},
      ],
      topics: [
        {
          title: "3.1 Image Transformation - DFT, FFT, DIT-FFT",
          description: "Numerical based concepts- Important for Exam ⭐",
          videos: [
            {
              title: "Need for Image Transformation", 
              url: "https://www.youtube.com/embed/YvTVI0dboiM?si=vgPnYnxdkOJLN25L",
            },
            {
              title: "Discrete Fourier Transform (DFT)",
              url: "https://www.youtube.com/embed/oGwIPM7aLfg?si=qOJg98EbNVGbdFBv",
            },
            {
              title: "Discrete Fourier Transform (DFT) - Solved Numerical",
              url: "https://www.youtube.com/embed/qDDziKkr6FY?si=ALRefWF_y_pIsTwl",
            },
            {
              title: "Fast Fourier Transform (FFT)",
              url: "https://www.youtube.com/embed/BXghmsH-mKY?si=8Ob1NY_00i_p4nq_",
            },
            {
              title: "4-Point DIT-FFT",
              url: "https://www.youtube.com/embed/t5sBJWD53nE?si=ySKz2vDTCbWZfYXS",
            },
            {
              title: "8-Point DIT-FFT",
              url: "https://www.youtube.com/embed/4H6e7iLgtbI?si=soM4pkHoEKB5dtFr",
            },
          ],
        },
        {
          title: "3.2 Image Transformation - DCT, Walsh, Hadamard, Haar, PCA",
          description: "Numerical based concepts- Important for Exam ⭐",
          videos: [
            {
              title: "Discrete Cosine Transform (DCT)",
              url: "https://www.youtube.com/embed/mK9Avw7jX6E?si=OdjBT-9OxqdiOusj",
            },
            {
              title: "Walsh Transform",
              url: "https://www.youtube.com/embed/n0zYz8eQtU4?si=K1cID_CuK-cfM09q",
            },
            {
              title: "Hadamard Transform",
              url: "https://www.youtube.com/embed/avFvEsw1fgs?si=EPAZ4lFZYznoRxZR",
            },
            {
              title: "Haar Transform",
              url: "https://www.youtube.com/embed/s02VrcLObvU?si=615BzJM2p90_N9WP",
            },
            {
              title: "Principal Component Analysis (PCA) / Karhunen-Loeve Transform",
              url: "https://www.youtube.com/embed/sjCCdY3ySd0?si=1GnNhADQAUR97oc7",
            },
          ],
        },
        {
          title: "3.3 Frequency Domain Filtering - Low and High Pass",
          description: "Basic theoretical concepts",
          videos: [
            {
              title: "Frequency Domain Filtering",
              url: "https://www.youtube.com/embed/guPIbJIZ7QI?si=iQt0-qo_z-OXSyn9",
            },
          ],
        },
      ],
    },
  },
};

export default dsip;
