"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [repoInfo, setRepoInfo] = useState({
    owner: "MinavKaria",
    repo: "Notes-Aid",
    filePath: ""
  });
  const [prInfo, setPrInfo] = useState({
    title: "",
    body: "This PR was created automatically via Notes-Aid."
  });

  const handleSave = async () => {
    if (!session?.accessToken) return alert("Please log in first!");
    
    if (!repoInfo.owner || !repoInfo.repo || !repoInfo.filePath) {
      return alert("Please provide repository information!");
    }
    
    if (!content) {
      return alert("Please provide some content to update!");
    }
    
    try {
      const response = await axios.post("/api/github/create-pr", {
        owner: repoInfo.owner,
        repo: repoInfo.repo,
        filePath: repoInfo.filePath,
        content: content,
        accessToken: session.accessToken,
        prTitle: prInfo.title || `Update ${repoInfo.filePath}`,
        prBody: prInfo.body,
        commitMessage: `Update ${repoInfo.filePath} via Notes-Aid`
      });

      if (response.data.success) {
        alert(`Pull Request Created: ${response.data.pullRequest.url}`);
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error creating PR:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">GitHub Note Editor</h1>
      
      {session ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p>Welcome, <span className="font-medium">{session.user?.name}</span>!</p>
            <button 
              onClick={() => signOut()}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-sm hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
          
          <div className="border p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold">Repository Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Owner/Organization</label>
                <input
                  type="text"
                  value={repoInfo.owner}
                  onChange={(e) => setRepoInfo({...repoInfo, owner: e.target.value})}
                  className="w-full border rounded-sm p-2"
                  placeholder="e.g., octocat"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Repository Name</label>
                <input
                  type="text"
                  value={repoInfo.repo}
                  onChange={(e) => setRepoInfo({...repoInfo, repo: e.target.value})}
                  className="w-full border rounded-sm p-2"
                  placeholder="e.g., hello-world"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">File Path</label>
              <input
                type="text"
                value={repoInfo.filePath}
                onChange={(e) => setRepoInfo({...repoInfo, filePath: e.target.value})}
                className="w-full border rounded-sm p-2"
                placeholder="e.g., docs/notes.md"
              />
            </div>
          </div>
          
          <div className="border p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold">File Content</h2>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your content here..."
              className="w-full h-64 border rounded-sm p-2 font-mono"
            />
          </div>
          
          <div className="border p-4 rounded-md space-y-4">
            <h2 className="text-xl font-semibold">Pull Request Information</h2>
            <div>
              <label className="block text-sm font-medium">PR Title (optional)</label>
              <input
                type="text"
                value={prInfo.title}
                onChange={(e) => setPrInfo({...prInfo, title: e.target.value})}
                className="w-full border rounded-sm p-2"
                placeholder="Leave blank for default title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">PR Description</label>
              <textarea
                value={prInfo.body}
                onChange={(e) => setPrInfo({...prInfo, body: e.target.value})}
                className="w-full h-24 border rounded-sm p-2"
                placeholder="Description of the changes"
              />
            </div>
          </div>
          
          <button 
            onClick={handleSave}
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Submit Pull Request
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <p className="text-lg">Please login to create or edit GitHub notes</p>
          <button 
            onClick={() => signIn("github")}
            className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" className="mr-2">
              <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Login with GitHub
          </button>
        </div>
      )}
    </div>
  );
}