import { Brain } from "lucide-react";

const eeee = {
  name: "Elements of Electrical and Electronics Engineering",
  icon: Brain,
  color: "blue",
  modules: {
    1: {
      notesLink: [
        {
          title:"TextBook",
          url:"https://drive.google.com/file/d/1y3DurEuISxbwoMcKuICUJgAhySxSIZBr/view?usp=sharing"
        }
      ],
      topics: [
        {
          title:
            "Concept of dependent and independent sources, ideal and practical voltage and current sources, Kirchhoff's Laws, source transformation and network terminology.",
          description:
            "The concept of dependent and independent sources is fundamental in circuit analysis. Independent sources provide a constant voltage or current regardless of the circuit conditions, while dependent sources rely on other circuit variables. Kirchhoff's Laws, which include the Current Law (KCL) and Voltage Law (KVL), are essential for analyzing complex circuits. Source transformation allows us to convert between voltage and current sources, simplifying circuit analysis. Network terminology includes terms like nodes, branches, and loops, which are crucial for understanding circuit topology.",
          videos: [
            {
              title: "Dependent and Independent Sources",
              url: "https://www.youtube.com/embed/u0TexU5_uwU?si=qMvUQVj2U1e64i0s",
            },
            {
              title: "Ideal and Practical Voltage Sources",
              url: "https://www.youtube.com/embed/qjf9L-fmNWg?si=mR9eGTzLRScoNq1B",
            },
            {
              title: "Ideal and Practical Current Sources",
              url: "https://www.youtube.com/embed/NI-ZnmFa3JA?si=eTZN7r4rC0d2zDP0",
            },
            {
              title: "Kirchhoff's Current Law (KCL)",
              url: "https://www.youtube.com/embed/fPyZH1Hg4mU?si=HVXwR0xdMB6uRjMq",
            },
            {
              title: "Kirchhoff's Voltage Law (KVL)",
              url: "https://www.youtube.com/embed/a2tmHmIQ3hw?si=HJdVyvGUQy3khFyI",
            },
            {
              title: "Source Transformation",
              url: "https://www.youtube.com/embed/p_c-RfLEMfc?si=45V3Bg3_OYwrSO5s",
            },
            {
              title: "Network Terminology",
              url: "https://www.youtube.com/embed/JpNQ-9_VEKA?si=bpspolax5JvFe-Hm",
            },
          ],
        },
        {
          title:
            "Resistive network simplification, Series, parallel connection and Star-Delta transformations",
          description:
            "Resistive network simplification involves reducing complex circuits to simpler equivalent circuits. Series and parallel connections are fundamental configurations in circuit design. In a series connection, components share the same current, while in a parallel connection, they share the same voltage. Star-Delta transformations allow us to convert between star (Y) and delta (Δ) configurations, which is useful for analyzing three-phase circuits.",
          videos: [
            {
              title: "Resistive Network Simplification",
              url: "https://www.youtube.com/embed/tnYQ_tQmYrM?si=-co1Ey0BzOZD7Yfp",
            },
            {
              title: "Series and Parallel Connections",
              url: "https://www.youtube.com/embed/7mdc-lRrW1c?si=y_JVve9DKTTnIycV",
            },
            {
              title: "Delta(Δ) to Star(Y) Transformation",
              url: "https://www.youtube.com/embed/7np1d5ez1hs?si=Pcsussj-5YRLQQWE",
            },
            {
              title: "Star(Y) to Delta(Δ) Transformation",
              url: "https://www.youtube.com/embed/5_mmZNkn9J0?si=u0ID89i94il7NXni",
            },
          ],
        },
        {
          title:
            "Mesh and nodal analysis, concept of super mesh and super node (Analysis only with independent sources )",
          description:
            "Mesh and nodal analysis are systematic methods for analyzing electrical circuits. Mesh analysis involves writing KVL equations for loops in the circuit, while nodal analysis uses KCL equations at nodes. The concept of super mesh and super node is introduced when there are dependent sources or multiple meshes/nodes, allowing for more efficient analysis.",
          videos: [
            {
              title: "Mesh Analysis",
              url: "https://www.youtube.com/embed/SkBAJ7TooDk?si=8bYrwjDC5lriQn9X",
            },
            {
              title: "Nodal Analysis",
              url: "https://www.youtube.com/embed/fHj2RdOnTqg?si=VtnU1KCRQz3iV-6q",
            },
            {
              title: "Super Mesh Analysis",
              url: "https://www.youtube.com/embed/2pStuMpHVZw?si=0zhyZ_WMi1JJeK12",
            },
            {
              title: "Super Node Analysis",
              url: "https://www.youtube.com/embed/XO1cGlsYFT4?si=gEtrZfRoxKXyaSiC",
            },
          ],
        },
        {
          title:
            " Superposition theorem, Thevenin's theorem, Norton's theorem, Maximum power transfer theorem (Analysis only with independent sources)",
          description:
            "Superposition, Thevenin's, Norton's, and Maximum Power Transfer theorems are fundamental techniques for analyzing linear electrical circuits. Superposition helps evaluate the contribution of individual sources, while Thevenin's and Norton's theorems simplify networks to equivalent circuits. The Maximum Power Transfer theorem determines the load condition for maximum power delivery. Analysis is limited to circuits with independent sources only.",
          videos: [
            {
              title: "Superposition Theorem",
              url: "https://www.youtube.com/embed/ZJ8zD8m-B1Q?si=0eJfgA9TEFsTWhY6",
            },

            {
              title: "Thevenin's Theorem",
              url: "https://www.youtube.com/embed/veAFVTIpKyM?si=Py4QvpUvy1nYmzTq",
            },
            {
              title: "Norton's Theorem",
              url: "https://www.youtube.com/embed/RkSN_JxBGt0?si=8vSAfewU42fYJn4L",
            },
            {
              title: "Maximum Power Transfer Theorem",
              url: "https://www.youtube.com/embed/U85eA3-suiQ?si=SCOoWjgL0YzFhLvV",
            },
          ],
        },
      ],
    },
    2: {
      notesLink: [
        {
          title:"TextBook",
          url:"https://drive.google.com/file/d/1y3DurEuISxbwoMcKuICUJgAhySxSIZBr/view?usp=sharing"
        }
      ],
      topics: [
        {
          title:
            "Generation of alternating voltage, average value, RMS value, form factor, crest factor, phasor representation in rectangular and polar form.",
          description:
            "The generation of alternating voltage involves the use of AC generators or alternators. The average value of an AC waveform is the mean value over one cycle, while the RMS (Root Mean Square) value represents the effective value of the AC voltage or current. Form factor is the ratio of the RMS value to the average value, and crest factor is the ratio of the peak value to the RMS value. Phasor representation allows us to express AC voltages and currents in rectangular (Cartesian) and polar forms, simplifying calculations in AC circuits.",
          videos: [
            {
              title: "Generation of Alternating Voltage",
              url: "https://www.youtube.com/embed/qAgFZfJMkVQ?si=zrqPsCoHjPpqKW8N",
            },
            {
              title:
                "Peak, Average, RMS values, Form Factor and Peak/Crest Factor of AC Waveform",
              url: "https://www.youtube.com/embed/fn5LBjSSX0k?si=JChZ_WyFRvo-_oes",
            },
            {
              title: "RMS Value of AC Waveform",
              url: "https://www.youtube.com/embed/MKnWoy0GI0s?si=F7gmCtG0ZcYuAKVC",
            },
            {
              title: "Phasor",
              url: "https://www.youtube.com/embed/qyKEw9X-yHQ?si=OB6vk4hI6rU8UBCc",
            },
          ],
        },
        {
          title:
            "Steady state behaviour of single phase AC circuits with pure R, L, and C, concept of inductive and capacitive reactance, phasor diagram of impedance, phase relationship in voltage and current.",
          description:
            "The steady-state behavior of single-phase AC circuits can be analyzed using pure resistive (R), inductive (L), and capacitive (C) components. Inductive reactance (XL) and capacitive reactance (XC) are frequency-dependent parameters that describe the opposition to AC current in inductors and capacitors, respectively. The phasor diagram of impedance illustrates the relationship between voltage and current in these circuits, highlighting the phase shift caused by reactance.",
          videos: [
            {
              title: "Introduction",
              url: "https://www.youtube.com/embed/Aau_pyvDoWQ?si=awPbROEzbOHSDDNu",
            },
            {
              title:
                "Steady State Behaviour of Single Phase AC Circuits with Pure R",
              url: "https://www.youtube.com/embed/MG5PNYvgGUQ?si=ebaIQbeSBgT7eMBg",
            },
            {
              title:
                "Steady State Behaviour of Single Phase AC Circuits with Pure L",
              url: "https://www.youtube.com/embed/t2qDPfk8f8M?si=yRH-Qa8ktVlGtPtb",
            },
            {
              title:
                "Steady State Behaviour of Single Phase AC Circuits with Pure C",
              url: "https://www.youtube.com/embed/AejbzRS_MQs?si=4hlQWPDEBu_UZKm4",
            },
            {
              title: "Inductive Reactance",
              url: "https://www.youtube.com/embed/GKLKoPMaIsQ?si=tSDWk4_ESctuta6f",
            },
            {
              title: "Capacitive Reactance",
              url: "https://www.youtube.com/embed/b4K7qnO0TLw?si=sEmtHluCWxDjerNs",
            },
            {
              title: "Phasor Diagram of Impedance",
              url: "https://www.youtube.com/embed/6ieUk3Rm1yY?si=oAZN642RYveGq43T",
            },
            {
              title: "Phase Relationship in Voltage and Current",
              url: "https://www.youtube.com/embed/LCGcCqah1Ps?si=wK9VJhizmm0koqPl",
            },
          ],
        },
        {
          title:
            "RL, RC and RLC series and parallel circuits, concept of impedance and admittance, power triangle, power factor, active, reactive and apparent power, concept of power factor improvement.",
          description:
            "RL, RC, and RLC circuits can be analyzed in both series and parallel configurations. Impedance (Z) is the total opposition to AC current, while admittance (Y) is the reciprocal of impedance. The power triangle relates active power (P), reactive power (Q), and apparent power (S). The power factor (PF) is the ratio of active power to apparent power, indicating how effectively electrical power is being converted into useful work. Power factor improvement techniques aim to reduce reactive power and increase the efficiency of AC systems.",
          videos: [
            {
              title: "RL Series Circuit",
              url: "https://www.youtube.com/embed/tXH01Qm1wrQ?si=f8YRSx_tlailAUHt",
            },
            {
              title: "RC Series Circuit",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title: "RLC Series Circuit",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title: "RL Parallel Circuit",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title: "RC Parallel Circuit",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title: "RLC Parallel Circuit",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title: "Power Triangle",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title: "Power Factor",
              url: "https://www.youtube.com/embed/5n8J0GgH8nM?si=7xQqkX1aE1aS6z0m",
            },
            {
              title:"Active, Reactive and Apparent Power",
              url:"https://www.youtube.com/embed/0f7YkVorOmY?si=zEZMqHvvslonh9az"
            },
            {
              title:"Power Factor Improvement",
              url:"https://www.youtube.com/embed/iDYWfBGwT1w?si=itcUSFwjCb7qVt9-"
            }
          ],
        },
        {
          title:"Series and parallel resonance, Q-factor and bandwidth",
          description:"Series and parallel resonance occur in RLC circuits when the inductive and capacitive reactances cancel each other out, resulting in maximum or minimum impedance. The Q-factor (quality factor) is a measure of the selectivity or sharpness of the resonance peak, while bandwidth indicates the range of frequencies over which the circuit can operate effectively.",
          videos:[
            {
              title:"Series and Parallel Resonance",
              url:"https://www.youtube.com/embed/YfpMKsmD-4Y?si=eg6E3HGq6BbHJt2F",
            },
            {
              title:"Q-Factor and Bandwidth",
              url:"https://www.youtube.com/embed/GxcmW98i7PI?si=FtuuHvrcCAj08Rpn"
            },
          ]
        },
        {
          title:"Measurement of power in 3-phase system using two wattmeter method",
          description:"The two wattmeter method is a technique used to measure power in a three-phase system. It involves using two wattmeters to measure the power in two phases, allowing for accurate calculation of total power in balanced and unbalanced loads.",
          videos:[
            {
              title:"Measurement of Power in 3-Phase System using Two Wattmeter Method",
              url:"https://www.youtube.com/embed/N8Grpthfm_I?si=lPsZ-caA5CNuoic9"
            }
          ]
        }
      ],
    },
    3: {
      notesLink: [
        {
          title:"TextBook",
          url:"https://drive.google.com/file/d/1y3DurEuISxbwoMcKuICUJgAhySxSIZBr/view?usp=sharing"
        }
      ],
      topics: [
        {
          title:
            "Single phase transformer construction and principle of working, emf equation of a transformer, losses in transformer, equivalent circuit of Ideal and practical transformer, voltage regulation and efficiency of transformer, phasor diagram at various loading condition (No numerical expected)",
          description:
            "The single-phase transformer is a static electrical device that transfers electrical energy between two or more circuits through electromagnetic induction. The construction includes primary and secondary windings, a core, and insulation. The principle of working is based on Faraday's law of electromagnetic induction. The emf equation relates the number of turns, magnetic flux, and frequency. Losses in transformers include copper losses (I²R losses) and iron losses (hysteresis and eddy current losses). The equivalent circuit represents the transformer as an ideal transformer with series resistance and reactance. Voltage regulation indicates how much the voltage changes from no-load to full-load conditions. Efficiency is the ratio of output power to input power. Phasor diagrams illustrate voltage and current relationships under various loading conditions.",
          videos: [
            {
              title: "Single Phase Transformer",
              url: "https://www.youtube.com/embed/wFE7J6_9c6w?si=77alqsrtTywCCLMK",
            },
            {
              title: "EMF Equation of Transformer",
              url: "https://www.youtube.com/embed/cvJxyp9yFAI?si=bR4f28LUycM2qH_K",
            },
            {
              title: "Losses in Transformer",
              url: "https://www.youtube.com/embed/4g4FJikiSMM?si=D2I2e0fn9PcQ-GMn",
            },
            {
              title: "Equivalent Circuit of Transformer",
              url: "https://www.youtube.com/embed/V_qGxDyUIBU?si=ziePYeXD6FDW85zK",
            },
            {
              title: "Voltage Regulation and Efficiency of Transformer",
              url: "https://www.youtube.com/embed/K_S1e06FAKc?si=5MFD8t8TLer5DGGH",
            },
            {
              title: "Phasor Diagram of Transformer",
              url: "https://www.youtube.com/embed/Y4FLaqdNaTw?si=Gl9VrcocZrwZEyGG",
            },
          ],
        },
        {
          title:
            "Construction and working principle of DC motors such as series, shunt and compound, torque-speed characteristics, selection criteria and applications (no derivations and numerical expected)",
          description:
            "DC motors are electromechanical devices that convert direct current electrical energy into mechanical energy. The construction includes a stator, rotor, commutator, and brushes. Series, shunt, and compound motors differ in their field winding configurations. Series motors have field windings in series with the armature, shunt motors have field windings parallel to the armature, and compound motors combine both configurations. Torque-speed characteristics describe the relationship between torque and speed for different motor types. Selection criteria depend on the application requirements, such as starting torque, speed regulation, and load characteristics.",
          videos: [
            {
              title: "Construction and Working Principle of DC Motors",
              url: "https://www.youtube.com/embed/xi0jaPAl2II?si=CkxdbPR_PWByQmuL",
            },
            {
              title: "Torque-Speed Characteristics of DC Motors",
              url: "https://www.youtube.com/embed/SP98tDcH3sE?si=ZO2g3mAPUiLvwusB",
            },
            {
              title: "Selection Criteria and Applications of DC Motors",
              url: "https://www.youtube.com/embed/ETDwJQ4emPc?si=ZInpdGS9QjwWeAM6",
            },
          ],
        },
        {
          title:"Single phase induction motor: Construction, working principle,double field revolving theory, split phase, capacitor start andshaded pole motor. applications (no derivations and numericalexpected)",
          description:"Single-phase induction motors are widely used in various applications due to their simplicity and reliability. The construction includes a stator with a single winding and a rotor. The working principle is based on the interaction between the stator's rotating magnetic field and the rotor. The double field revolving theory explains how the motor develops torque. Split-phase motors use two windings to create a phase shift, while capacitor-start motors use a capacitor to improve starting torque. Shaded pole motors are simple and inexpensive, suitable for low-power applications. Applications include fans, pumps, and small appliances.",
          videos:[
            {
              title:"Construction and Working Principle of Single Phase Induction Motors",
              url:"https://www.youtube.com/embed/SdWM_jSu0PY?si=bRogZMFwR-YxFswZ"
            },
            {
              title:"Double Field Revolving Theory",
              url:"https://www.youtube.com/embed/gcWRaOgwDmw?si=oJqMeUEnNlRwbr3B"
            },
            {
              title:"Split Phase Induction Motors",
              url:"https://www.youtube.com/embed/ZWRbU_nTMgA?si=Ljsr1x-2IMXGPZVn"
            },
            {
              title:"Capacitor Start Induction Motors",
              url:"https://www.youtube.com/embed/qGVSXFdMiwY?si=YXIuh42m2VM3YnyM"
            },
            {
              title:"Shaded Pole Induction Motors",
              url:"https://www.youtube.com/embed/6y_jQNAZPug?si=BLJ1hVtKp1wiEVB4"
            },
            {
              title:"Applications of Single Phase Induction Motors",
              url:"https://www.youtube.com/embed/4Y5OF6Jdu1c?si=fBGjrMHJpCcfdKk-"
            }
          ]
        },
        {
          title:"Three phase induction motor: Construction, working principle, Generation of rotating magnetic field, applications. (no derivations and numerical expected)",
          description:"Three-phase induction motors are widely used in industrial applications due to their efficiency and reliability. The construction includes a stator with three-phase windings and a rotor. The working principle is based on the generation of a rotating magnetic field by the stator windings, which induces current in the rotor. This interaction produces torque, causing the rotor to rotate. Applications include pumps, compressors, conveyors, and fans.",
          videos:[
            {
              title:"Construction and Working Principle of Three Phase Induction Motors",
              url:"https://www.youtube.com/embed/59HBoIXzX_c?si=LpplCyqg5Zw33uC7"
            },
            {
              title:"Generation of Rotating Magnetic Field",
              url:"https://www.youtube.com/embed/x7YOmgat2O0?si=CbSrGrr6CtGupNF3"
            },
            {
              title:"Applications of Three Phase Induction Motors",
              url:"https://www.youtube.com/embed/rO5yM1ZdgPI?si=tQZMEVpr2JkI-7vM"
            }
          ]
        }
      ],
    },
    4:{
      notesLink: [
        {
          title:"TextBook",
          url:"https://drive.google.com/file/d/1y3DurEuISxbwoMcKuICUJgAhySxSIZBr/view?usp=sharing"
        }
      ],
      topics:[
        {
          title:"P-N Junction diode",
          description:"The P-N junction diode is a semiconductor device formed by joining p-type and n-type materials. It allows current to flow in one direction (forward bias) while blocking it in the opposite direction (reverse bias). The diode's I-V characteristics, including forward voltage drop and reverse breakdown, are essential for understanding its behavior in circuits.",
          videos:[
            {
              title:"Construction and Working of P-N Junction Diode",
              url:"https://www.youtube.com/embed/Fwj_d3uO5g8?si=a3DkCntTuGHqMoKu"
            },
            {
              title:"I-V Characteristics of P-N Junction Diode",
              url:"https://www.youtube.com/embed/_vKeaPHXF9U?si=GQnRN2ttk5x8qrx2"
            },
            {
              title:"Half wave rectifier",
              url:"https://www.youtube.com/embed/Ll0IOk_Ltfc?si=9bGbZTbyXk8OtLDh"
            },
            {
              title:"Half Wave Rectifier (RMS Load Current & RMS Load Voltage)",
              url:"https://www.youtube.com/embed/XTfWAYuyfVU?si=059_qHG_NtX9fq5Q"
            },
            {
              title:"Half Wave Rectifier (Form Factor)",
              url:"https://www.youtube.com/embed/PJLUpzt5ZME?si=EK9U7MrZIyzcJddY"
            },
            {
              title:"Half Wave Rectifier (Ripple Factor)",
              url:"https://www.youtube.com/embed/SgK_kyIIbrk?si=m5xVgCsnKH-IA9SQ"
            },
            {
              title:"Half Wave Rectifier (Efficiency & PIV)",
              url:"https://www.youtube.com/embed/XLBtAmcXYKA?si=F_oKTQTYNNwo7T3F"
            },
            {
              title:"Full Wave Center-Tapped Rectifier",
              url:"https://www.youtube.com/embed/CGZ0yHaAmjs?si=Q-CQeB6DN3MlTIE3"
            },
            {
              title:"Full Wave Bridge Rectifier",
              url:"https://www.youtube.com/embed/Kl8IOESVWlM?si=p13ZVJQJB4I9ylr-"
            },
            {
              title:"Full Wave Rectifier (DC Load Current & DC Load Voltage)",
              url:"https://www.youtube.com/embed/XI4mHDveD7g?si=QxwDTavIMuaWLc10"
            },
            {
              title:"Full Wave Rectifier (RMS Load Current & RMS Load Voltage)",
              url:"https://www.youtube.com/embed/czhNvqGO7I4?si=kCwmNIq9m-DEdQbd"
            },
            {
              title:"Full Wave Rectifier (Form Factor & Ripple Factor)",
              url:"https://www.youtube.com/embed/J6k9IStBYyU?si=h7dfm8lMHAyQUsL9",
            },
            {
              title:"Full Wave Rectifier (Efficiency & PIV)",
              url:"https://www.youtube.com/embed/NzxjUGk_pFE?si=geYWwR7F_C5jXvnB"
            },
            {
              title:"Diode Rectifier Circuits",
              url:"https://www.youtube.com/embed/Xmu31a-59vw?si=xySO5ReDlNfb6YUq"
            },
            {
              title:"Diode Rectifier Circuits (Numerical Problem)",
              url:"https://www.youtube.com/embed/UQVAFcCLoKo?si=-m1xjyI7OTg4TYcB"
            }
          ]
        },
        {
          title:"Zener diode",
          description:"The Zener diode is a special type of diode designed to operate in the reverse breakdown region. It allows current to flow in the reverse direction when the voltage exceeds a certain value, known as the Zener voltage. This property makes Zener diodes useful for voltage regulation and clamping applications.",
          videos:[
            {
              title:"Introduction to Zener Diode",
              url:"https://www.youtube.com/embed/JdL3DnnFHXw?si=1tMefakpldiDgg8j"
            },
            {
              title:"Effects of Temperature on Zener Voltage",
              url:"https://www.youtube.com/embed/JffJpym7K8Y?si=S1pQD-uotI2u1C9T"
            },
            {
              title:"Zener Diode as Voltage Regulator (Part 1)",
              url:"https://www.youtube.com/embed/6xGCOrPBL4s?si=xtM3j-aTmaLn48ij"
            },
            {
              title:"Zener Diode as Voltage Regulator (Part 2)",
              url:"https://www.youtube.com/embed/LtWMuoQKMIc?si=3egBcwWB9HxZWw72"
            },
            {
              title:"Zener Diode as Voltage Regulator (Part 3)",
              url:"https://www.youtube.com/embed/HBaddgGeIrM?si=FedPMcWmdhH72leR"
            },
            {
              title:"Zener Diode as Voltage Regulator (Part 4)",
              url:"https://www.youtube.com/embed/_Glio3MxT2Q?si=Df1LDg0LaOGWrrWz"
            },
          ]
        },
        {
          title:"LED and Photodiode",
          description:"Light Emitting Diodes (LEDs) are semiconductor devices that emit light when current flows through them. They are widely used in displays, indicators, and lighting applications. Photodiodes are semiconductor devices that convert light into electrical current. They are used in optical communication, light sensing, and imaging applications.",
          videos:[
            {
              title:"LED",
              url:"https://www.youtube.com/embed/NUR9tebFDRc?si=VMK5x5MZavUtYg1L"
            },
            {
              title:"Photodiode",
              url:"https://www.youtube.com/embed/KgKcbW77txY?si=QQE5dgXHIldA-4AJ"
            }
          ]
        }
      ]
    },
    5:{
      notesLink: [
        {
          title:"TextBook",
          url:"https://drive.google.com/file/d/1y3DurEuISxbwoMcKuICUJgAhySxSIZBr/view?usp=sharing"
        }
      ],
      topics:[
        {
          title:"Bipolar Junction Transistor (BJT)",
          description:"The Bipolar Junction Transistor (BJT) is a semiconductor device that can amplify or switch electronic signals. It consists of three layers of semiconductor material, forming two p-n junctions. The BJT can operate in three regions: active, cutoff, and saturation. In the active region, it can amplify signals, while in the cutoff region, it is off, and in the saturation region, it is fully on.",
          videos:[
            {
              title:"Introduction to BJT",
              url:"https://www.youtube.com/embed/-VwPSDQmdjM?si=LHpY-AZhZ3fd5kp_"
            },
            {
              title:"Common Base Configuration",
              url:"https://www.youtube.com/embed/NMD4KECE-7I?si=oT9ZKP6Y1hRRV9nu"
            },
            {
              title:"Common Emitter Configuration",
              url:"https://www.youtube.com/embed/KynKHr2cXgk?si=GyOmGujFXb5c_OFo"
            },
            {
              title:"Common Collector Configuration",
              url:"https://www.youtube.com/embed/qwWj3bqnuDk?si=kR2mgMvb4mCZ2V3H"
            },
            {
              title:"Operating Point and DC Bias",
              url:"https://www.youtube.com/embed/5T84Jzcgj7M?si=IzucCDycj-S1y1aO"
            }
          ]
        },
        {
          title:"Application of BJT-CE configuration: Voltage amplifier,Electronic Switch (No Numerical expected)",
          description:"The Common Emitter (CE) configuration of the BJT is widely used as a voltage amplifier due to its high voltage gain. In this configuration, the input signal is applied between the base and emitter terminals, while the output is taken from the collector and emitter terminals. The CE configuration can also be used as an electronic switch, where it can control a larger current in the collector circuit based on a smaller input current at the base.",
          videos:[
            {
              title:"Voltage Amplifier using BJT-CE Configuration",
              url:"https://www.youtube.com/embed/UqxFSYTQC5o?si=ekAgI7UPqjXCJkCI"
            },
            {
              title:"Electronic Switch using BJT-CE Configuration",
              url:"https://www.youtube.com/embed/SFhexy3emhE?si=6zBmC3Yz3eDNYfuC"
            }
          ]
        }
      ]        
    }
  },
};

export default eeee;
