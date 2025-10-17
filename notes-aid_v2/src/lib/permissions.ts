import dbConnect from "./mongoose";
import { getAdminPermissionModel, IAdminPermission } from "./models/AdminPermission";

const SUPER_ADMIN_USERNAME = "MinavKaria";

/**
 * Check if a user is the super admin
 */
export function isSuperAdmin(githubUsername?: string): boolean {
  if (!githubUsername) return false;
  // Case-insensitive comparison to handle any GitHub username casing
  return githubUsername.toLowerCase() === SUPER_ADMIN_USERNAME.toLowerCase();
}

/**
 * Get admin permissions for a user from database
 */
export async function getAdminPermissions(
  githubUsername: string
): Promise<IAdminPermission | null> {
  try {
    const conn = await dbConnect("admin");
    const AdminPermission = getAdminPermissionModel(conn);
    
    const permission = await AdminPermission.findOne({ githubUsername }).lean() as unknown as IAdminPermission | null;
    return permission;
  } catch (error) {
    console.error("Error fetching admin permissions:", error);
    return null;
  }
}

/**
 * Check if user has permission to access admin features
 */
export async function hasAdminAccess(githubUsername?: string): Promise<boolean> {
  if (!githubUsername) return false;
  
  // Super admin always has access - check this first without DB
  if (isSuperAdmin(githubUsername)) return true;
  
  // Check if user has any admin permissions
  try {
    const permissions = await getAdminPermissions(githubUsername);
    return permissions !== null;
  } catch (error) {
    console.error("Error checking admin access:", error);
    return false;
  }
}

/**
 * Check if user can edit a specific subject
 */
export async function canEditSubject(
  githubUsername: string | undefined,
  subjectCollection: string
): Promise<boolean> {
  if (!githubUsername) return false;
  
  // Super admin can edit all subjects
  if (isSuperAdmin(githubUsername)) return true;
  
  // Check if user has permission for this specific subject
  const permissions = await getAdminPermissions(githubUsername);
  if (!permissions) return false;
  
  // Subject admins need the subject in their allowedSubjects list
  if (permissions.role === "subject-admin") {
    return permissions.allowedSubjects?.includes(subjectCollection) || false;
  }
  
  return false;
}

/**
 * Get list of subjects a user can edit
 */
export async function getAllowedSubjects(
  githubUsername: string | undefined
): Promise<string[] | "all"> {
  if (!githubUsername) return [];
  
  // Super admin can edit all subjects
  if (isSuperAdmin(githubUsername)) return "all";
  
  // Get user's allowed subjects
  const permissions = await getAdminPermissions(githubUsername);
  if (!permissions) return [];
  
  return permissions.allowedSubjects || [];
}

/**
 * Create or update admin permissions (only super admin can do this)
 */
export async function setAdminPermissions(
  requesterUsername: string,
  targetUsername: string,
  allowedSubjects: string[],
  name?: string
): Promise<{ success: boolean; error?: string }> {
  // Only super admin can set permissions
  if (!isSuperAdmin(requesterUsername)) {
    return { success: false, error: "Unauthorized: Only super admin can manage permissions" };
  }
  
  // Cannot modify super admin permissions
  if (isSuperAdmin(targetUsername)) {
    return { success: false, error: "Cannot modify super admin permissions" };
  }
  
  try {
    const conn = await dbConnect("admin");
    const AdminPermission = getAdminPermissionModel(conn);
    
    await AdminPermission.findOneAndUpdate(
      { githubUsername: targetUsername },
      {
        githubUsername: targetUsername,
        name: name || targetUsername,
        role: "subject-admin",
        allowedSubjects,
        createdBy: requesterUsername,
      },
      { upsert: true, new: true }
    );
    
    return { success: true };
  } catch (error) {
    console.error("Error setting admin permissions:", error);
    return { success: false, error: "Failed to set permissions" };
  }
}

/**
 * Remove admin permissions (only super admin can do this)
 */
export async function removeAdminPermissions(
  requesterUsername: string,
  targetUsername: string
): Promise<{ success: boolean; error?: string }> {
  // Only super admin can remove permissions
  if (!isSuperAdmin(requesterUsername)) {
    return { success: false, error: "Unauthorized: Only super admin can manage permissions" };
  }
  
  // Cannot remove super admin
  if (isSuperAdmin(targetUsername)) {
    return { success: false, error: "Cannot remove super admin" };
  }
  
  try {
    const conn = await dbConnect("admin");
    const AdminPermission = getAdminPermissionModel(conn);
    
    await AdminPermission.deleteOne({ githubUsername: targetUsername });
    return { success: true };
  } catch (error) {
    console.error("Error removing admin permissions:", error);
    return { success: false, error: "Failed to remove permissions" };
  }
}

/**
 * Get all admin users (only super admin can see this)
 */
export async function getAllAdmins(
  requesterUsername: string
): Promise<{ success: boolean; admins?: IAdminPermission[]; error?: string }> {
  console.log(`getAllAdmins: Checking if user "${requesterUsername}" is super admin`);
  console.log(`getAllAdmins: SUPER_ADMIN_USERNAME = "${SUPER_ADMIN_USERNAME}"`);
  console.log(`getAllAdmins: Case-insensitive comparison: "${requesterUsername?.toLowerCase()}" === "${SUPER_ADMIN_USERNAME.toLowerCase()}"`);
  
  // Only super admin can view all admins
  if (!isSuperAdmin(requesterUsername)) {
    console.log(`getAllAdmins: User ${requesterUsername} is not super admin - DENYING ACCESS`);
    return { success: false, error: "Unauthorized: Only super admin can view all admins" };
  }
  
  console.log(`getAllAdmins: Super admin ${requesterUsername} accessing admin list - ACCESS GRANTED`);
  
  try {
    const conn = await dbConnect("admin");
    console.log(`getAllAdmins: Database connection established`);
    const AdminPermission = getAdminPermissionModel(conn);
    
    const admins = await AdminPermission.find({}).lean() as unknown as IAdminPermission[];
    console.log(`getAllAdmins: Found ${admins.length} admins`);
    return { success: true, admins };
  } catch (error) {
    console.error("getAllAdmins: Error fetching all admins:", error);
    return { success: false, error: "Failed to fetch admins" };
  }
}
