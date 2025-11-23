"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api";
import { saveAuthData } from "@/lib/auth-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";

export default function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccess(message);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await login(email, password);
      console.log("Login successful, redirecting to:", result.data.redirectPath);

      if (result.success) {
        saveAuthData(result.data.token, result.data.user);

        setTimeout(() => {
          window.location.href = result.data.redirectPath;
        }, 100);
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a3a3a] via-[#244543] to-[#1a3a3a] p-4">
      <div className="absolute inset-0 bg-[url('/hero/heart.svg')] opacity-5 bg-repeat"></div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-[#1a3a3a] flex items-center justify-center">
              <Image
                src="/navbar_logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-[#1a3a3a]">
            Sign In
          </CardTitle>
          <CardDescription className="text-base text-[#4a4a4a]">
            Sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-[#d4f9e6] border-[#1a3a3a] text-[#1a3a3a]">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1a1a1a] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#d0d0d0] focus:border-[#244543] focus:ring-[#244543]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1a1a1a] font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#d0d0d0] focus:border-[#244543] focus:ring-[#244543]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a3a] hover:bg-[#244543] text-white font-medium py-6 text-base transition-all duration-300 hover:scale-[1.02]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <Link
                href="/signup"
                className="text-sm text-[#1a3a3a] hover:text-[#244543]"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
