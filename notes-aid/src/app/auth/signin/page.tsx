"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Github, Mail } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  type: string;
}

export default function SignIn() {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  }, []);

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'google':
        return <Mail className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center p-4">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">Welcome to Notes-Aid</h1>
          <p className="text-base-content/70">Sign in to save your progress and preferences</p>
        </div>

        <div className="space-y-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="w-full btn btn-outline flex items-center gap-3 justify-center"
              >
                {getProviderIcon(provider.id)}
                Sign in with {provider.name}
              </button>
            ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-base-content/60">
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}