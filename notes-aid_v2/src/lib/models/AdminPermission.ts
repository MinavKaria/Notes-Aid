import mongoose from "mongoose";

export interface IAdminPermission {
  githubUsername: string;
  name?: string;
  role: "super-admin" | "subject-admin";
  allowedSubjects?: string[]; // Collection names they can edit
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // GitHub username of who created this permission
}

const AdminPermissionSchema = new mongoose.Schema<IAdminPermission>(
  {
    githubUsername: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ["super-admin", "subject-admin"],
      required: true,
      default: "subject-admin",
    },
    allowedSubjects: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for efficient querying
AdminPermissionSchema.index({ githubUsername: 1, role: 1 });

export function getAdminPermissionModel(conn: mongoose.Connection) {
  return (
    conn.models.AdminPermission ||
    conn.model<IAdminPermission>("AdminPermission", AdminPermissionSchema)
  );
}
