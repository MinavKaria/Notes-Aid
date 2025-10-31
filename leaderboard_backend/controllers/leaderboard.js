import StudentMarks from "../models/studentMarks.js";

/**
 * Helper function to assign ranks with proper tie handling (Dense Ranking: 1,2,2,3,4,4,5)
 * @param {Array} students - Array of students sorted by score
 * @param {string} scoreField - Field name to compare for ties (e.g., 'cgpa', 'semesterSGPA')
 * @param {number} startRank - Starting rank (for pagination)
 * @returns {Array} Students with proper rank assignment
 */
const assignRanksWithTies = (students, scoreField, startRank = 1) => {
  if (students.length === 0) return students;

  let currentRank = startRank;

  return students.map((student, index) => {
    if (index > 0) {
      // Check if current student has same score as previous student
      const currentScore = student[scoreField];
      const previousScore = students[index - 1][scoreField];

      if (currentScore !== previousScore) {
        // Different score, increment rank
        currentRank++;
      }
      // If same score, keep the same rank
    }

    return {
      ...student,
      rank: currentRank,
    };
  });
};

/**
 * @desc    Get overall CGPA leaderboard for a specific admission year
 * @route   GET /api/v1/leaderboard?admission_year=2021&limit=50
 * @access  Private
 */
export const getOverallLeaderboard = async (req, res) => {
  try {
    const { admission_year, limit = 50, page = 1 } = req.query;

    if (!admission_year) {
      return res.status(400).json({
        success: false,
        message: "Admission year is required",
      });
    }

    const skip = (page - 1) * limit;

    // Aggregate pipeline to calculate CGPA and rank students
    const pipeline = [
      {
        $match: {
          admission_year: parseInt(admission_year),
        },
      },
      {
        $addFields: {
          // Calculate CGPA (average of all SGPA values)
          cgpa: {
            $cond: {
              if: { $gt: [{ $size: "$sgpa_list" }, 0] },
              then: {
                $round: [{ $avg: "$sgpa_list.sgpa" }, 2],
              },
              else: 0,
            },
          },
          // Get total semesters completed
          totalSemesters: { $size: "$sgpa_list" },
          // Get latest semester SGPA
          latestSGPA: {
            $cond: {
              if: { $gt: [{ $size: "$sgpa_list" }, 0] },
              then: {
                $let: {
                  vars: {
                    lastSemester: {
                      $arrayElemAt: [
                        {
                          $sortArray: {
                            input: "$sgpa_list",
                            sortBy: { semester: -1 },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  in: "$$lastSemester.sgpa",
                },
              },
              else: 0,
            },
          },
          // Get latest semester number
          latestSemester: {
            $cond: {
              if: { $gt: [{ $size: "$sgpa_list" }, 0] },
              then: { $max: "$sgpa_list.semester" },
              else: 0,
            },
          },
        },
      },
      {
        $match: {
          cgpa: { $gt: 0 }, // Only include students with CGPA > 0
        },
      },
      {
        $sort: {
          cgpa: -1, // Sort by CGPA in descending order
          latestSGPA: -1, // Then by latest SGPA
          name: 1, // Then alphabetically by name
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          seat_number: 1,
          name: 1,
          admission_year: 1,
          cgpa: 1,
          totalSemesters: 1,
          latestSGPA: 1,
          latestSemester: 1,
          sgpa_list: 1,
        },
      },
    ];
    const students = await StudentMarks.aggregate(pipeline);

    // For proper tie handling, we need to get all students with their ranks
    // and then apply pagination to the ranked results
    if (page === 1) {
      // For first page, we can directly assign ranks
      const studentsWithRank = assignRanksWithTies(students, "cgpa", 1);

      // Get total count for pagination
      const totalCountPipeline = [
        {
          $match: {
            admission_year: parseInt(admission_year),
          },
        },
        {
          $addFields: {
            cgpa: {
              $cond: {
                if: { $gt: [{ $size: "$sgpa_list" }, 0] },
                then: { $avg: "$sgpa_list.sgpa" },
                else: 0,
              },
            },
          },
        },
        {
          $match: {
            cgpa: { $gt: 0 },
          },
        },
        {
          $count: "total",
        },
      ];

      const totalCountResult = await StudentMarks.aggregate(totalCountPipeline);
      const total = totalCountResult.length > 0 ? totalCountResult[0].total : 0;

      res.status(200).json({
        success: true,
        data: studentsWithRank,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        meta: {
          admission_year: parseInt(admission_year),
          type: "overall_cgpa",
        },
      });
    } else {
      // For subsequent pages, we need to get all students to calculate proper ranks
      const allStudentsPipeline = [
        {
          $match: {
            admission_year: parseInt(admission_year),
          },
        },
        {
          $addFields: {
            cgpa: {
              $cond: {
                if: { $gt: [{ $size: "$sgpa_list" }, 0] },
                then: {
                  $round: [{ $avg: "$sgpa_list.sgpa" }, 2],
                },
                else: 0,
              },
            },
            totalSemesters: { $size: "$sgpa_list" },
            latestSGPA: {
              $cond: {
                if: { $gt: [{ $size: "$sgpa_list" }, 0] },
                then: {
                  $let: {
                    vars: {
                      lastSemester: {
                        $arrayElemAt: [
                          {
                            $sortArray: {
                              input: "$sgpa_list",
                              sortBy: { semester: -1 },
                            },
                          },
                          0,
                        ],
                      },
                    },
                    in: "$$lastSemester.sgpa",
                  },
                },
                else: 0,
              },
            },
            latestSemester: {
              $cond: {
                if: { $gt: [{ $size: "$sgpa_list" }, 0] },
                then: { $max: "$sgpa_list.semester" },
                else: 0,
              },
            },
          },
        },
        {
          $match: {
            cgpa: { $gt: 0 },
          },
        },
        {
          $sort: {
            cgpa: -1,
            latestSGPA: -1,
            name: 1,
          },
        },
        {
          $project: {
            seat_number: 1,
            name: 1,
            admission_year: 1,
            cgpa: 1,
            totalSemesters: 1,
            latestSGPA: 1,
            latestSemester: 1,
            sgpa_list: 1,
          },
        },
      ];

      const allStudents = await StudentMarks.aggregate(allStudentsPipeline);
      const allStudentsWithRank = assignRanksWithTies(allStudents, "cgpa", 1);

      // Apply pagination to ranked results
      const startIndex = skip;
      const endIndex = startIndex + parseInt(limit);
      const paginatedStudents = allStudentsWithRank.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        data: paginatedStudents,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: allStudents.length,
          pages: Math.ceil(allStudents.length / limit),
        },
        meta: {
          admission_year: parseInt(admission_year),
          type: "overall_cgpa",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching leaderboard",
      error: error.message,
    });
  }
};

/**
 * @desc    Get semester-wise leaderboard for a specific admission year and semester
 * @route   GET /api/v1/leaderboard/:semester?admission_year=2021&limit=50
 * @access  Private
 */
export const getSemesterLeaderboard = async (req, res) => {
  try {
    const { semester } = req.params;
    const { admission_year, limit = 50, page = 1 } = req.query;

    if (!admission_year) {
      return res.status(400).json({
        success: false,
        message: "Admission year is required",
      });
    }

    if (!semester || isNaN(semester)) {
      return res.status(400).json({
        success: false,
        message: "Valid semester number is required",
      });
    }

    const skip = (page - 1) * limit;

    // Aggregate pipeline to get semester-specific SGPA and rank students
    const pipeline = [
      {
        $match: {
          admission_year: parseInt(admission_year),
          "sgpa_list.semester": parseInt(semester),
        },
      },
      {
        $addFields: {
          // Extract SGPA for the specific semester
          semesterSGPA: {
            $let: {
              vars: {
                semesterData: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$sgpa_list",
                        cond: { $eq: ["$$this.semester", parseInt(semester)] },
                      },
                    },
                    0,
                  ],
                },
              },
              in: "$$semesterData.sgpa",
            },
          },
          // Calculate overall CGPA for reference
          cgpa: {
            $cond: {
              if: { $gt: [{ $size: "$sgpa_list" }, 0] },
              then: {
                $round: [{ $avg: "$sgpa_list.sgpa" }, 2],
              },
              else: 0,
            },
          },
          totalSemesters: { $size: "$sgpa_list" },
        },
      },
      {
        $match: {
          semesterSGPA: { $exists: true, $ne: null },
        },
      },
      {
        $sort: {
          semesterSGPA: -1, // Sort by semester SGPA in descending order
          cgpa: -1, // Then by overall CGPA
          name: 1, // Then alphabetically by name
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          seat_number: 1,
          name: 1,
          admission_year: 1,
          semesterSGPA: 1,
          cgpa: 1,
          totalSemesters: 1,
          sgpa_list: 1,
        },
      },
    ];
    const students = await StudentMarks.aggregate(pipeline);

    // For proper tie handling, we need to get all students with their ranks
    // and then apply pagination to the ranked results
    if (page === 1) {
      // For first page, we can directly assign ranks
      const studentsWithRank = assignRanksWithTies(students, "semesterSGPA", 1);

      // Get total count for pagination
      const totalCountPipeline = [
        {
          $match: {
            admission_year: parseInt(admission_year),
            "sgpa_list.semester": parseInt(semester),
          },
        },
        {
          $count: "total",
        },
      ];

      const totalCountResult = await StudentMarks.aggregate(totalCountPipeline);
      const total = totalCountResult.length > 0 ? totalCountResult[0].total : 0;

      res.status(200).json({
        success: true,
        data: studentsWithRank,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        meta: {
          admission_year: parseInt(admission_year),
          semester: parseInt(semester),
          type: "semester_sgpa",
        },
      });
    } else {
      // For subsequent pages, we need to get all students to calculate proper ranks
      const allStudentsPipeline = [
        {
          $match: {
            admission_year: parseInt(admission_year),
            "sgpa_list.semester": parseInt(semester),
          },
        },
        {
          $addFields: {
            semesterSGPA: {
              $let: {
                vars: {
                  semesterData: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$sgpa_list",
                          cond: {
                            $eq: ["$$this.semester", parseInt(semester)],
                          },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: "$$semesterData.sgpa",
              },
            },
            cgpa: {
              $cond: {
                if: { $gt: [{ $size: "$sgpa_list" }, 0] },
                then: {
                  $round: [{ $avg: "$sgpa_list.sgpa" }, 2],
                },
                else: 0,
              },
            },
            totalSemesters: { $size: "$sgpa_list" },
          },
        },
        {
          $match: {
            semesterSGPA: { $exists: true, $ne: null },
          },
        },
        {
          $sort: {
            semesterSGPA: -1,
            cgpa: -1,
            name: 1,
          },
        },
        {
          $project: {
            seat_number: 1,
            name: 1,
            admission_year: 1,
            semesterSGPA: 1,
            cgpa: 1,
            totalSemesters: 1,
            sgpa_list: 1,
          },
        },
      ];

      const allStudents = await StudentMarks.aggregate(allStudentsPipeline);
      const allStudentsWithRank = assignRanksWithTies(
        allStudents,
        "semesterSGPA",
        1
      );

      // Apply pagination to ranked results
      const startIndex = skip;
      const endIndex = startIndex + parseInt(limit);
      const paginatedStudents = allStudentsWithRank.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        data: paginatedStudents,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: allStudents.length,
          pages: Math.ceil(allStudents.length / limit),
        },
        meta: {
          admission_year: parseInt(admission_year),
          semester: parseInt(semester),
          type: "semester_sgpa",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching semester leaderboard",
      error: error.message,
    });
  }
};

/**
 * @desc    Get current semester leaderboard for a specific admission year
 * @route   GET /api/v1/leaderboard/current?admission_year=2021&limit=50
 * @access  Private
 */
export const getCurrentSemesterLeaderboard = async (req, res) => {
  try {
    const { admission_year, limit = 50, page = 1 } = req.query;

    if (!admission_year) {
      return res.status(400).json({
        success: false,
        message: "Admission year is required",
      });
    }

    // First, find the current/latest semester for the given admission year
    const currentSemesterPipeline = [
      {
        $match: {
          admission_year: parseInt(admission_year),
        },
      },
      {
        $unwind: "$sgpa_list",
      },
      {
        $group: {
          _id: null,
          maxSemester: { $max: "$sgpa_list.semester" },
        },
      },
    ];

    const currentSemesterResult = await StudentMarks.aggregate(
      currentSemesterPipeline
    );

    if (currentSemesterResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No semester data found for the specified admission year",
      });
    }

    const currentSemester = currentSemesterResult[0].maxSemester;
    const skip = (page - 1) * limit;

    // Get leaderboard for the current semester
    const pipeline = [
      {
        $match: {
          admission_year: parseInt(admission_year),
          "sgpa_list.semester": currentSemester,
        },
      },
      {
        $addFields: {
          // Extract SGPA for the current semester
          currentSemesterSGPA: {
            $let: {
              vars: {
                semesterData: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$sgpa_list",
                        cond: { $eq: ["$$this.semester", currentSemester] },
                      },
                    },
                    0,
                  ],
                },
              },
              in: "$$semesterData.sgpa",
            },
          },
          // Calculate overall CGPA for reference
          cgpa: {
            $cond: {
              if: { $gt: [{ $size: "$sgpa_list" }, 0] },
              then: {
                $round: [{ $avg: "$sgpa_list.sgpa" }, 2],
              },
              else: 0,
            },
          },
          totalSemesters: { $size: "$sgpa_list" },
        },
      },
      {
        $match: {
          currentSemesterSGPA: { $exists: true, $ne: null },
        },
      },
      {
        $sort: {
          currentSemesterSGPA: -1, // Sort by current semester SGPA in descending order
          cgpa: -1, // Then by overall CGPA
          name: 1, // Then alphabetically by name
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          seat_number: 1,
          name: 1,
          admission_year: 1,
          currentSemesterSGPA: 1,
          cgpa: 1,
          totalSemesters: 1,
          sgpa_list: 1,
        },
      },
    ];
    const students = await StudentMarks.aggregate(pipeline);

    // For proper tie handling, we need to get all students with their ranks
    // and then apply pagination to the ranked results
    if (page === 1) {
      // For first page, we can directly assign ranks
      const studentsWithRank = assignRanksWithTies(
        students,
        "currentSemesterSGPA",
        1
      );

      // Get total count for pagination
      const totalCountPipeline = [
        {
          $match: {
            admission_year: parseInt(admission_year),
            "sgpa_list.semester": currentSemester,
          },
        },
        {
          $count: "total",
        },
      ];

      const totalCountResult = await StudentMarks.aggregate(totalCountPipeline);
      const total = totalCountResult.length > 0 ? totalCountResult[0].total : 0;

      res.status(200).json({
        success: true,
        data: studentsWithRank,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
        meta: {
          admission_year: parseInt(admission_year),
          currentSemester: currentSemester,
          type: "current_semester_sgpa",
        },
      });
    } else {
      // For subsequent pages, we need to get all students to calculate proper ranks
      const allStudentsPipeline = [
        {
          $match: {
            admission_year: parseInt(admission_year),
            "sgpa_list.semester": currentSemester,
          },
        },
        {
          $addFields: {
            currentSemesterSGPA: {
              $let: {
                vars: {
                  semesterData: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$sgpa_list",
                          cond: { $eq: ["$$this.semester", currentSemester] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: "$$semesterData.sgpa",
              },
            },
            cgpa: {
              $cond: {
                if: { $gt: [{ $size: "$sgpa_list" }, 0] },
                then: {
                  $round: [{ $avg: "$sgpa_list.sgpa" }, 2],
                },
                else: 0,
              },
            },
            totalSemesters: { $size: "$sgpa_list" },
          },
        },
        {
          $match: {
            currentSemesterSGPA: { $exists: true, $ne: null },
          },
        },
        {
          $sort: {
            currentSemesterSGPA: -1,
            cgpa: -1,
            name: 1,
          },
        },
        {
          $project: {
            seat_number: 1,
            name: 1,
            admission_year: 1,
            currentSemesterSGPA: 1,
            cgpa: 1,
            totalSemesters: 1,
            sgpa_list: 1,
          },
        },
      ];

      const allStudents = await StudentMarks.aggregate(allStudentsPipeline);
      const allStudentsWithRank = assignRanksWithTies(
        allStudents,
        "currentSemesterSGPA",
        1
      );

      // Apply pagination to ranked results
      const startIndex = skip;
      const endIndex = startIndex + parseInt(limit);
      const paginatedStudents = allStudentsWithRank.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        data: paginatedStudents,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: allStudents.length,
          pages: Math.ceil(allStudents.length / limit),
        },
        meta: {
          admission_year: parseInt(admission_year),
          currentSemester: currentSemester,
          type: "current_semester_sgpa",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching current semester leaderboard",
      error: error.message,
    });
  }
};

/**
 * @desc    Get available admission years for leaderboard
 * @route   GET /api/v1/leaderboard/meta/years
 * @access  Private
 */
export const getAvailableYears = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$admission_year",
        },
      },
      {
        $sort: { _id: -1 }, // Most recent first
      },
    ];

    const yearResult = await StudentMarks.aggregate(pipeline);
    const years = yearResult.map((item) => item._id);

    res.status(200).json({
      success: true,
      data: years,
      count: years.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available years",
      error: error.message,
    });
  }
};

/**
 * @desc    Get available semesters for a specific admission year
 * @route   GET /api/v1/leaderboard/meta/semesters?admission_year=2021
 * @access  Private
 */
export const getAvailableSemesters = async (req, res) => {
  try {
    const { admission_year } = req.query;

    if (!admission_year) {
      return res.status(400).json({
        success: false,
        message: "Admission year is required",
      });
    }

    const pipeline = [
      {
        $match: {
          admission_year: parseInt(admission_year),
        },
      },
      {
        $unwind: "$sgpa_list",
      },
      {
        $group: {
          _id: "$sgpa_list.semester",
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const semesterResult = await StudentMarks.aggregate(pipeline);
    const semesters = semesterResult.map((item) => item._id);

    res.status(200).json({
      success: true,
      data: semesters,
      count: semesters.length,
      admission_year: parseInt(admission_year),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching available semesters",
      error: error.message,
    });
  }
};
