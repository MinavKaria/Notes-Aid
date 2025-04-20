import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function POST(req: Request) {
  try {
    const { 
      owner, 
      repo, 
      branch = `update-${new Date().toISOString().replace(/[:.]/g, '-')}`, 
      filePath, 
      content, 
      accessToken,
      commitMessage,
      prTitle,
      prBody 
    } = await req.json();

    if (!accessToken) {
      return NextResponse.json({ error: "Missing GitHub Access Token" }, { status: 401 });
    }

    if (!owner || !repo || !filePath || !content) {
      return NextResponse.json(
        { error: "Missing required fields: owner, repo, filePath, or content" }, 
        { status: 400 }
      );
    }

    const octokit = new Octokit({
      auth: accessToken,
    });

    const { data: authenticatedUser } = await octokit.users.getAuthenticated();
    console.log(`Authenticated as: ${authenticatedUser.login}`);

    const { data: repoData } = await octokit.repos.get({
      owner,
      repo,
    });
    const defaultBranch = repoData.default_branch;

    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${defaultBranch}`
    });
    
    const baseSha = refData.object.sha;
    console.log(`Base SHA: ${baseSha} from branch: ${defaultBranch}`);

  

    let fileSha = undefined;
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
        ref: defaultBranch,
      });
      
      if (!Array.isArray(fileData)) {
        fileSha = fileData.sha;
        console.log(`Existing file SHA: ${fileSha}`);
      }
    } catch (error) {
      // if (error.status !== 404) {
      //   console.warn("Error getting file SHA:", error.message);
      // }

      console.log(`File not found: ${error}`);
      
    }


    try {
      console.log(`Creating/updating file in branch: ${branch}`);
      const { data: fileUpdateResult } = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        message: commitMessage || `Update ${filePath}`,
        content: Buffer.from(content).toString("base64"),
        branch,
        committer: {
          name: authenticatedUser.name || authenticatedUser.login,
          email: authenticatedUser.email || `${authenticatedUser.login}@users.noreply.github.com`
        },
        sha: fileSha
      });
      
      console.log(`Updated file: ${filePath} with commit: ${fileUpdateResult.commit.sha}`);

      const { data: pullRequest } = await octokit.pulls.create({
        owner,
        repo,
        title: prTitle || `Update ${filePath}`,
        head: branch,
        base: defaultBranch,
        body: prBody || "This PR was created automatically via Notes-Aid.",
      });

      console.log(`Created PR #${pullRequest.number}: ${pullRequest.html_url}`);

      return NextResponse.json({ 
        success: true,
        pullRequest: {
          number: pullRequest.number,
          url: pullRequest.html_url,
          title: pullRequest.title
        },
        commit: fileUpdateResult.commit.sha
      }, { status: 201 });
    } catch (fileError) {
      console.error("File update error:", fileError);
      return NextResponse.json({ 
        success: false,
        // error: `Failed to update file: ${fileError.message}` 
      }, { 
        // status: fileError.status || 500
      });
    }
  } catch (error) {
    console.error("GitHub PR creation error:", error);
    return NextResponse.json({ 
      success: false,
      // error: error.message 
    }, { 
      // status: error.status || 500 
    });
  }
}