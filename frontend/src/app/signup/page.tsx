"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import { saveAuthData } from "@/lib/auth-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const result = await register(name, email, password, 'user');

      if (result.success) {
        // Save token and user data
        saveAuthData(result.data.token, result.data.user);
        
        // Redirect based on role
        router.push(result.data.redirectPath);
      } else {
        setError(result.message || "Registration failed");
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
            Sign Up
          </CardTitle>
          <CardDescription className="text-base text-[#4a4a4a]">
            Create an account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1a1a1a] font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-[#d0d0d0] focus:border-[#244543] focus:ring-[#244543]"
              />
            </div>

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="border-[#d0d0d0] focus:border-[#244543] focus:ring-[#244543]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#1a1a1a] font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-[#d0d0d0] focus:border-[#244543] focus:ring-[#244543]"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a3a3a] hover:bg-[#244543] text-white font-medium py-6 text-base transition-all duration-300 hover:scale-[1.02]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-[#1a3a3a] hover:text-[#244543] flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
