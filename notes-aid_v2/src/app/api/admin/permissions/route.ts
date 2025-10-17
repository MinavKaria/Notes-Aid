import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getAllAdmins, setAdminPermissions, removeAdminPermissions } from "@/lib/permissions";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET - Get all admins (super admin only)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("GET /api/admin/permissions - Full session:", JSON.stringify(session, null, 2));
    console.log("GET /api/admin/permissions - Session check:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      username: session?.user?.githubUsername,
      isSuperAdmin: session?.user?.isSuperAdmin,
      isAdmin: session?.user?.isAdmin
    });
    
    if (!session || !session.user) {
      console.log("GET /api/admin/permissions - No session or user");
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }
    
    if (!session.user.githubUsername) {
      console.log("GET /api/admin/permissions - No username in session, trying email");
      // Fallback to email if githubUsername is not available
      const username = (session.user.email?.split('@')[0] || session.user.name) as string | undefined;
      if (!username) {
        return NextResponse.json({ error: "Unauthorized - No identifier" }, { status: 401 });
      }
      console.log("GET /api/admin/permissions - Using fallback username:", username);
      const result = await getAllAdmins(username);
      
      if (!result.success) {
        console.log("GET /api/admin/permissions - Failed:", result.error);
        return NextResponse.json({ error: result.error }, { status: 403 });
      }
      
      console.log("GET /api/admin/permissions - Success");
      return NextResponse.json({ admins: result.admins });
    }
    
    const result = await getAllAdmins(session.user.githubUsername);
    
    if (!result.success) {
      console.log("GET /api/admin/permissions - Failed:", result.error);
      return NextResponse.json({ error: result.error }, { status: 403 });
    }
    
    console.log("GET /api/admin/permissions - Success");
    return NextResponse.json({ admins: result.admins });
  } catch (error) {
    console.error("Error in GET /api/admin/permissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Add or update admin permissions (super admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("POST /api/admin/permissions - Full session:", JSON.stringify(session, null, 2));
    console.log("POST /api/admin/permissions - Session check:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      username: session?.user?.githubUsername,
      isSuperAdmin: session?.user?.isSuperAdmin
    });
    
    if (!session || !session.user) {
      console.log("POST /api/admin/permissions - No session or user");
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }
    
    let username = session.user.githubUsername;
    if (!username) {
      console.log("POST /api/admin/permissions - No username, trying fallback");
      username = (session.user.email?.split('@')[0] || session.user.name) as string | undefined;
      if (!username) {
        return NextResponse.json({ error: "Unauthorized - No identifier" }, { status: 401 });
      }
      console.log("POST /api/admin/permissions - Using fallback username:", username);
    }
    
    const body = await request.json();
    const { githubUsername, allowedSubjects, name } = body;
    
    console.log("POST /api/admin/permissions - Body:", { githubUsername, allowedSubjectsCount: allowedSubjects?.length, name });
    
    if (!githubUsername || !Array.isArray(allowedSubjects)) {
      return NextResponse.json(
        { error: "Invalid request: githubUsername and allowedSubjects are required" },
        { status: 400 }
      );
    }
    
    const result = await setAdminPermissions(
      username,
      githubUsername,
      allowedSubjects,
      name
    );
    
    if (!result.success) {
      console.log("POST /api/admin/permissions - Failed:", result.error);
      return NextResponse.json({ error: result.error }, { status: 403 });
    }
    
    console.log("POST /api/admin/permissions - Success");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in POST /api/admin/permissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Remove admin permissions (super admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log("DELETE /api/admin/permissions - Session check:", {
      hasSession: !!session,
      hasUser: !!session?.user,
      username: session?.user?.githubUsername
    });
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }
    
    let username = session.user.githubUsername;
    if (!username) {
      username = (session.user.email?.split('@')[0] || session.user.name) as string | undefined;
      if (!username) {
        return NextResponse.json({ error: "Unauthorized - No identifier" }, { status: 401 });
      }
    }
    
    const { searchParams } = new URL(request.url);
    const githubUsername = searchParams.get("githubUsername");
    
    if (!githubUsername) {
      return NextResponse.json(
        { error: "Invalid request: githubUsername parameter is required" },
        { status: 400 }
      );
    }
    
    const result = await removeAdminPermissions(
      username,
      githubUsername
    );
    
    if (!result.success) {
      console.log("DELETE /api/admin/permissions - Failed:", result.error);
      return NextResponse.json({ error: result.error }, { status: 403 });
    }
    
    console.log("DELETE /api/admin/permissions - Success");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/admin/permissions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
