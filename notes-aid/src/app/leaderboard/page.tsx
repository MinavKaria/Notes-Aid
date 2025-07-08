import Leaderboard from "@/components/Leaderboard";
import { AuthProvider } from "@/context/AuthContext";

export default function LeaderboardPage() {
  return (
    <AuthProvider>
        <Leaderboard />
    </AuthProvider>
  )
}
