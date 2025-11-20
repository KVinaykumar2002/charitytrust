"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, FileText } from "lucide-react";
import { format } from "date-fns";

interface Certificate {
  id: string;
  title: string;
  type: "donation" | "volunteer" | "achievement";
  date: string;
  programName: string;
  amount?: number;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      // Replace with actual API call
      const data: Certificate[] = [
        {
          id: "1",
          title: "Donation Certificate",
          type: "donation",
          date: "2024-01-15",
          programName: "Mega Blood Donation Drive",
          amount: 5000,
        },
        {
          id: "2",
          title: "Volunteer Certificate",
          type: "volunteer",
          date: "2024-01-10",
          programName: "Eye Donation Initiative",
        },
        {
          id: "3",
          title: "Achievement Certificate",
          type: "achievement",
          date: "2024-01-05",
          programName: "Top Donor of the Month",
        },
      ];
      setCertificates(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCertificateIcon = (type: string) => {
    switch (type) {
      case "donation":
        return <Award className="h-8 w-8 text-[#1a3a3a]" />;
      case "volunteer":
        return <FileText className="h-8 w-8 text-[#244543]" />;
      case "achievement":
        return <Award className="h-8 w-8 text-[#1a3a3a]" />;
      default:
        return <FileText className="h-8 w-8" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">My Certificates</h1>
        <p className="text-[#4a4a4a]">Download your certificates and achievements</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#4a4a4a]">Loading...</div>
      ) : certificates.length === 0 ? (
        <Card className="border-[#e5e5e5]">
          <CardContent className="py-12 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-[#d0d0d0]" />
            <p className="text-[#4a4a4a] mb-4">No certificates yet</p>
            <p className="text-sm text-[#4a4a4a]">
              Certificates will appear here after you make donations or volunteer
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="border-[#e5e5e5] hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="p-4 rounded-full bg-[#d4f9e6]">
                    {getCertificateIcon(certificate.type)}
                  </div>
                </div>
                <h3 className="font-semibold text-[#1a1a1a] mb-2 text-center">
                  {certificate.title}
                </h3>
                <p className="text-sm text-[#4a4a4a] text-center mb-2">
                  {certificate.programName}
                </p>
                {certificate.amount && (
                  <p className="text-sm font-semibold text-[#1a3a3a] text-center mb-2">
                    ₹{certificate.amount.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-[#4a4a4a] text-center mb-4">
                  {format(new Date(certificate.date), "MMM dd, yyyy")}
                </p>
                <Button
                  className="w-full bg-[#1a3a3a] hover:bg-[#244543] text-white"
                  onClick={() => {
                    // Handle download
                    console.log("Download certificate:", certificate.id);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

