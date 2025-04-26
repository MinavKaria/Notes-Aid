import { Brain } from "lucide-react";

const adb = {
  name: "Advanced Databases",
  icon: Brain,
  color: "blue",
  modules: {
    1: {
      notesLink: [
        {
          title: "Parallel and Distributed Databases Notes",
          url: ""
        }
      ],
      topics: [
        {
          title: "1.1: Parallel Database Concepts, Parallel Query Evaluation",
          description: "Fundamentals of parallel databases",
          videos: [
            {
              title: "1.1.1: Parallel Database Concepts",
              url: ""
            },
            {
              title: "1.1.2: Parallel Query Evaluation",
              url: ""
            }
          ]
        },
        {
          title: "1.2: Parallelizing Individual Operations, Sorting, Join",
          description: "Techniques for parallel operations",
          videos: [
            {
              title: "1.2.1: Parallelizing Individual Operations",
              url: ""
            },
            {
              title: "1.2.2: Sorting and Join",
              url: ""
            }
          ]
        },
        {
          title: "1.3: Distributed Database Concepts, Types, Architecture",
          description: "Overview of distributed databases",
          videos: [
            {
              title: "1.3.1: Distributed Database Concepts",
              url: ""
            },
            {
              title: "1.3.2: Types and Architecture",
              url: ""
            }
          ]
        },
        {
          title: "1.4: Distributed Database Design, Data Fragmentation, Replication, and Allocation Techniques",
          description: "Design strategies for distributed databases",
          videos: [
            {
              title: "1.4.1: Distributed Database Design",
              url: ""
            },
            {
              title: "1.4.2: Data Fragmentation, Replication, and Allocation",
              url: ""
            }
          ]
        },
        {
          title: "1.5: Query Processing and Optimization in Distributed Databases",
          description: "Optimizing queries in distributed systems",
          videos: [
            {
              title: "1.5.1: Query Processing",
              url: ""
            },
            {
              title: "1.5.2: Query Optimization",
              url: ""
            }
          ]
        },
        {
          title: "1.6: Concurrency Control and Recovery in Distributed Databases",
          description: "Managing concurrency and recovery",
          videos: [
            {
              title: "1.6.1: Concurrency Control",
              url: ""
            },
            {
              title: "1.6.2: Recovery Mechanisms",
              url: ""
            }
          ]
        }
      ]
    },
    2: {
      notesLink: [
        {
          title: "Object Based Databases Notes",
          url: ""
        }
      ],
      topics: [
        {
          title: "2.1: Features of Object Based DBMS",
          description: "Core features of ORDBMS",
          videos: [
            {
              title: "2.1.1: Object Based DBMS Features",
              url: ""
            }
          ]
        },
        {
          title: "2.2: Database Design Concepts for an ORDBMS",
          description: "Design principles for ORDBMS",
          videos: [
            {
              title: "2.2.1: ORDBMS Design Concepts",
              url: ""
            }
          ]
        },
        {
          title: "2.3: Nested Relations and Collections",
          description: "Advanced data structures in ORDBMS",
          videos: [
            {
              title: "2.3.1: Nested Relations and Collections",
              url: ""
            }
          ]
        }
      ]
    },
    3: {
      notesLink: [
        {
          title: "In-memory, Spatial, and NOSQL Databases Notes",
          url: ""
        }
      ],
      topics: [
        {
          title: "3.1: In-memory Databases, Architecture, Applications, Challenges",
          description: "Fundamentals of in-memory databases",
          videos: [
            {
              title: "3.1.1: In-memory Databases Architecture",
              url: ""
            },
            {
              title: "3.1.2: Applications and Challenges",
              url: ""
            }
          ]
        },
        {
          title: "3.2: Spatial Databases, Components, Objects, Dimensions, and Relations",
          description: "Spatial database concepts and queries",
          videos: [
            {
              title: "3.2.1: Spatial Database Components",
              url: ""
            },
            {
              title: "3.2.2: Spatial SQL Queries and Applications",
              url: ""
            }
          ]
        },
        {
          title: "3.3: NOSQL Databases, Business Drivers, Data Architectural Patterns",
          description: "NOSQL database types and applications",
          videos: [
            {
              title: "3.3.1: NOSQL Business Drivers",
              url: ""
            },
            {
              title: "3.3.2: Document, Key-Value, Graph, and Column Family",
              url: ""
            }
          ]
        }
      ]
    },
    4: {
      notesLink: [
        {
          title: "Data Warehousing and Multi-Dimensional Modeling Notes",
          url: ""
        }
      ],
      topics: [
        {
          title: "4.1: Decision Support Systems, Need for Data Warehousing",
          description: "Introduction to data warehousing",
          videos: [
            {
              title: "4.1.1: Decision Support Systems",
              url: ""
            },
            {
              title: "4.1.2: Need for Data Warehousing",
              url: ""
            }
          ]
        },
        {
          title: "4.2: Data Warehouse Features, Information Flow, Architecture, Metadata",
          description: "Core components of data warehousing",
          videos: [
            {
              title: "4.2.1: Data Warehouse Architecture",
              url: ""
            },
            {
              title: "4.2.2: Role of Metadata",
              url: ""
            }
          ]
        },
        {
          title: "4.3: Data Marts, Data Warehousing Design Strategies, Modeling",
          description: "Designing data warehouses and marts",
          videos: [
            {
              title: "4.3.1: Data Marts",
              url: ""
            },
            {
              title: "4.3.2: Data Warehouse Modeling",
              url: ""
            }
          ]
        },
        {
          title: "4.4: Star Schema, Fact Tables, Dimension Tables, Schema Types",
          description: "Data warehouse schema designs",
          videos: [
            {
              title: "4.4.1: Star and Snowflake Schema",
              url: ""
            },
            {
              title: "4.4.2: Fact and Dimension Tables",
              url: ""
            }
          ]
        },
        {
          title: "4.5: Updates to Dimension Tables, Slowly Changing Dimensions",
          description: "Managing dimension table updates",
          videos: [
            {
              title: "4.5.1: Slowly Changing Dimensions",
              url: ""
            },
            {
              title: "4.5.2: Types of Dimension Changes",
              url: ""
            }
          ]
        },
        {
          title: "4.6: Data Lake, Architecture, Applications",
          description: "Introduction to data lakes",
          videos: [
            {
              title: "4.6.1: Data Lake Architecture",
              url: ""
            },
            {
              title: "4.6.2: Applications",
              url: ""
            }
          ]
        }
      ]
    },
    5: {
      notesLink: [
        {
          title: "ETL Process and OLAP Notes",
          url: ""
        }
      ],
      topics: [
        {
          title: "5.1: ETL Process, Data Quality, Issues in Data Cleansing",
          description: "Fundamentals of ETL processes",
          videos: [
            {
              title: "5.1.1: ETL Process",
              url: ""
            },
            {
              title: "5.1.2: Data Cleansing Issues",
              url: ""
            }
          ]
        },
        {
          title: "5.2: Data Extraction, Identification of Data Sources",
          description: "Extracting data for ETL",
          videos: [
            {
              title: "5.2.1: Data Extraction Techniques",
              url: ""
            },
            {
              title: "5.2.2: Immediate and Deferred Extraction",
              url: ""
            }
          ]
        },
        {
          title: "5.3: Data Transformation, Tasks Involved",
          description: "Transforming data in ETL",
          videos: [
            {
              title: "5.3.1: Data Transformation Tasks",
              url: ""
            }
          ]
        },
        {
          title: "5.4: Data Loading, Techniques, Loading Fact and Dimension Tables",
          description: "Loading data into warehouses",
          videos: [
            {
              title: "5.4.1: Data Loading Techniques",
              url: ""
            },
            {
              title: "5.4.2: Loading Fact and Dimension Tables",
              url: ""
            }
          ]
        },
        {
          title: "5.5: OLAP and Multidimensional Analysis, OLAP Operations",
          description: "OLAP concepts and operations",
          videos: [
            {
              title: "5.5.1: OLAP and Multidimensional Analysis",
              url: ""
            },
            {
              title: "5.5.2: Rollup, Drill-down, Dice, Slice, Pivot",
              url: ""
            }
          ]
        },
        {
          title: "5.6: Self-Learning: OLAP Models, MOLAP, ROLAP, HOLAP",
          description: "Advanced OLAP models",
          videos: [
            {
              title: "5.6.1: MOLAP, ROLAP, HOLAP",
              url: ""
            }
          ]
        }
      ]
    }
  },
};

export default adb;
