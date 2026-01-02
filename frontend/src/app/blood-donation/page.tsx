"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Droplet, Heart, CheckCircle2, Loader2, ArrowRight, User, Phone, MapPin, Hospital, Stethoscope, FileText, AlertCircle } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { submitBloodDonorRegistration, submitBloodPatientRequest } from "@/lib/api";

// Donor Form Schema
const donorFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
  bloodGroup: z.string().min(1, "Blood group is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  weight: z.string().optional(),
  lastDonationDate: z.string().optional(),
  hasTattoo: z.boolean().default(false),
  tattooDate: z.string().optional(),
  hasRecentIllness: z.boolean().default(false),
  illnessDetails: z.string().optional(),
  takingMedication: z.boolean().default(false),
  medicationDetails: z.string().optional(),
  hasChronicDisease: z.boolean().default(false),
  chronicDiseaseDetails: z.string().optional(),
  availableForEmergency: z.boolean().default(false),
  preferredDonationCenter: z.string().optional(),
  howDidYouHear: z.string().optional(),
  additionalNotes: z.string().optional(),
  hasConsented: z.boolean().refine((val) => val === true, {
    message: "You must consent to register as a blood donor",
  }),
});

// Patient Form Schema
const patientFormSchema = z.object({
  fullName: z.string().min(2, "Patient's full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select gender",
  }),
  bloodGroup: z.string().min(1, "Blood group is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  hospitalName: z.string().min(1, "Hospital name is required"),
  hospitalAddress: z.string().optional(),
  doctorName: z.string().optional(),
  doctorPhone: z.string().optional(),
  patientCondition: z.string().optional(),
  surgeryDate: z.string().optional(),
  unitsRequired: z.string().min(1, "Units required is mandatory"),
  urgency: z.enum(["immediate", "within_24_hours", "within_week", "scheduled"]).default("within_week"),
  attendantName: z.string().optional(),
  attendantRelationship: z.string().optional(),
  attendantPhone: z.string().optional(),
  howDidYouHear: z.string().optional(),
  additionalNotes: z.string().optional(),
  hasConsented: z.boolean().refine((val) => val === true, {
    message: "You must consent to submit this request",
  }),
});

type DonorFormValues = z.infer<typeof donorFormSchema>;
type PatientFormValues = z.infer<typeof patientFormSchema>;

const donorSteps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Contact", icon: Phone },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Health", icon: Stethoscope },
  { id: 5, title: "Consent", icon: FileText },
];

const patientSteps = [
  { id: 1, title: "Patient Info", icon: User },
  { id: 2, title: "Contact", icon: Phone },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Hospital", icon: Hospital },
  { id: 5, title: "Request", icon: AlertCircle },
];

export default function BloodDonationPage() {
  const [activeTab, setActiveTab] = useState<"donor" | "patient">("donor");
  const [donorStep, setDonorStep] = useState(1);
  const [patientStep, setPatientStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [requestNumber, setRequestNumber] = useState("");
  const [successType, setSuccessType] = useState<"donor" | "patient">("donor");
  const [error, setError] = useState("");

  const donorForm = useForm<DonorFormValues>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: undefined,
      bloodGroup: "",
      email: "",
      phone: "",
      alternatePhone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      weight: "",
      lastDonationDate: "",
      hasTattoo: false,
      tattooDate: "",
      hasRecentIllness: false,
      illnessDetails: "",
      takingMedication: false,
      medicationDetails: "",
      hasChronicDisease: false,
      chronicDiseaseDetails: "",
      availableForEmergency: false,
      preferredDonationCenter: "",
      howDidYouHear: "",
      additionalNotes: "",
      hasConsented: false,
    },
  });

  const patientForm = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      gender: undefined,
      bloodGroup: "",
      email: "",
      phone: "",
      alternatePhone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      hospitalName: "",
      hospitalAddress: "",
      doctorName: "",
      doctorPhone: "",
      patientCondition: "",
      surgeryDate: "",
      unitsRequired: "",
      urgency: "within_week",
      attendantName: "",
      attendantRelationship: "",
      attendantPhone: "",
      howDidYouHear: "",
      additionalNotes: "",
      hasConsented: false,
    },
  });

  const onDonorSubmit = async (values: DonorFormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        bloodGroup: values.bloodGroup,
        email: values.email,
        phone: values.phone,
        alternatePhone: values.alternatePhone,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        },
        weight: values.weight ? parseInt(values.weight) : undefined,
        lastDonationDate: values.lastDonationDate || undefined,
        hasTattoo: values.hasTattoo,
        tattooDate: values.tattooDate || undefined,
        hasRecentIllness: values.hasRecentIllness,
        illnessDetails: values.illnessDetails,
        takingMedication: values.takingMedication,
        medicationDetails: values.medicationDetails,
        hasChronicDisease: values.hasChronicDisease,
        chronicDiseaseDetails: values.chronicDiseaseDetails,
        availableForEmergency: values.availableForEmergency,
        preferredDonationCenter: values.preferredDonationCenter,
        howDidYouHear: values.howDidYouHear,
        additionalNotes: values.additionalNotes,
        hasConsented: values.hasConsented,
      };

      const result = await submitBloodDonorRegistration(data);
      setRequestNumber(result.data.requestNumber);
      setSuccessType("donor");
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPatientSubmit = async (values: PatientFormValues) => {
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        fullName: values.fullName,
        dateOfBirth: values.dateOfBirth,
        gender: values.gender,
        bloodGroup: values.bloodGroup,
        email: values.email,
        phone: values.phone,
        alternatePhone: values.alternatePhone,
        address: {
          street: values.street,
          city: values.city,
          state: values.state,
          pincode: values.pincode,
        },
        hospitalName: values.hospitalName,
        hospitalAddress: values.hospitalAddress,
        doctorName: values.doctorName,
        doctorPhone: values.doctorPhone,
        patientCondition: values.patientCondition,
        surgeryDate: values.surgeryDate || undefined,
        unitsRequired: parseInt(values.unitsRequired),
        urgency: values.urgency,
        attendant: values.attendantName ? {
          name: values.attendantName,
          relationship: values.attendantRelationship || "",
          phone: values.attendantPhone || "",
        } : undefined,
        howDidYouHear: values.howDidYouHear,
        additionalNotes: values.additionalNotes,
        hasConsented: values.hasConsented,
      };

      const result = await submitBloodPatientRequest(data);
      setRequestNumber(result.data.requestNumber);
      setSuccessType("patient");
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDonorFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["fullName", "dateOfBirth", "gender", "bloodGroup"];
      case 2:
        return ["email", "phone"];
      case 3:
        return ["street", "city", "state", "pincode"];
      case 4:
        return [];
      case 5:
        return ["hasConsented"];
      default:
        return [];
    }
  };

  const getPatientFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["fullName", "dateOfBirth", "gender", "bloodGroup"];
      case 2:
        return ["email", "phone"];
      case 3:
        return ["street", "city", "state", "pincode"];
      case 4:
        return ["hospitalName"];
      case 5:
        return ["unitsRequired", "hasConsented"];
      default:
        return [];
    }
  };

  const nextDonorStep = async () => {
    const fieldsToValidate = getDonorFieldsForStep(donorStep);
    const isValid = await donorForm.trigger(fieldsToValidate as any);
    if (isValid && donorStep < 5) {
      setDonorStep(donorStep + 1);
    }
  };

  const nextPatientStep = async () => {
    const fieldsToValidate = getPatientFieldsForStep(patientStep);
    const isValid = await patientForm.trigger(fieldsToValidate as any);
    if (isValid && patientStep < 5) {
      setPatientStep(patientStep + 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <NavigationHeader />
        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-20">
          <div className="max-w-lg w-full text-center">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-red-100 dark:border-neutral-800">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                {successType === "donor" ? "Thank You for Registering!" : "Request Submitted!"}
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                {successType === "donor"
                  ? "Your registration as a blood donor has been submitted successfully. Together, we can save lives!"
                  : "Your blood request has been submitted. Our team will contact you shortly."}
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-700 dark:text-red-300 mb-1">
                  Your {successType === "donor" ? "Registration" : "Request"} Number
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{requestNumber}</p>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
                Please save this number for your records. You will receive a confirmation email shortly.
              </p>
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-8 py-3 rounded-full"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </main>
        <FlickeringFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-400 to-rose-500 rounded-full mb-6 shadow-lg shadow-red-500/30">
              <Droplet className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              Blood Donation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Every drop counts. Register as a donor or request blood for those in need.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-red-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Why Donate Blood?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                One donation can save up to 3 lives. Blood cannot be manufactured – only you can give this gift.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-red-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Who Can Donate?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Anyone aged 18-65, weighing at least 45kg, and in good health can donate blood every 3 months.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-red-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <Hospital className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Need Blood?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Submit a request and we'll help connect you with available donors in your area.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs & Form Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "donor" | "patient")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-white dark:bg-neutral-900 rounded-2xl p-1 shadow-lg border border-red-100 dark:border-neutral-800">
              <TabsTrigger
                value="donor"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white text-base font-medium transition-all"
              >
                <Heart className="w-5 h-5 mr-2" />
                I Want to Donate
              </TabsTrigger>
              <TabsTrigger
                value="patient"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white text-base font-medium transition-all"
              >
                <Hospital className="w-5 h-5 mr-2" />
                I Need Blood
              </TabsTrigger>
            </TabsList>

            {/* Donor Form */}
            <TabsContent value="donor">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-red-100 dark:border-neutral-800 overflow-hidden">
                {/* Progress Steps */}
                <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-8">
                  <div className="flex justify-between items-center overflow-x-auto">
                    {donorSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              donorStep >= step.id
                                ? "bg-white text-red-600"
                                : "bg-white/20 text-white"
                            }`}
                          >
                            <step.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs mt-2 whitespace-nowrap ${
                            donorStep >= step.id ? "text-white font-medium" : "text-white/60"
                          }`}>
                            {step.title}
                          </span>
                        </div>
                        {index < donorSteps.length - 1 && (
                          <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                            donorStep > step.id ? "bg-white" : "bg-white/20"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Form {...donorForm}>
                  <form onSubmit={donorForm.handleSubmit(onDonorSubmit)} className="p-6 md:p-10">
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Step 1: Personal Info */}
                    {donorStep === 1 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={donorForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth *</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>Must be 18-65 years old</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={donorForm.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender *</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="male" id="donor-male" />
                                      <Label htmlFor="donor-male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="female" id="donor-female" />
                                      <Label htmlFor="donor-female">Female</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="other" id="donor-other" />
                                      <Label htmlFor="donor-other">Other</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="bloodGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Group *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Contact Details */}
                    {donorStep === 2 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Contact Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={donorForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={donorForm.control}
                          name="alternatePhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alternate Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 3: Address */}
                    {donorStep === 3 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Address</h2>
                        <FormField
                          control={donorForm.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="House No., Street, Landmark" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid md:grid-cols-3 gap-6">
                          <FormField
                            control={donorForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State *</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="pincode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pincode *</FormLabel>
                                <FormControl>
                                  <Input placeholder="XXXXXX" maxLength={6} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Health Information */}
                    {donorStep === 4 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Health Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={donorForm.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (kg)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g., 60" {...field} />
                                </FormControl>
                                <FormDescription>Minimum 45 kg required</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="lastDonationDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Donation Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>If you've donated before</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-4">
                          <FormField
                            control={donorForm.control}
                            name="hasTattoo"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>I have a tattoo or piercing in the last 6 months</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="hasRecentIllness"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>I have had recent illness (cold, flu, fever)</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="takingMedication"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>I am currently taking medication</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="hasChronicDisease"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>I have a chronic disease (diabetes, hypertension, etc.)</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={donorForm.control}
                            name="availableForEmergency"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-red-200 dark:border-red-800 p-4 bg-red-50 dark:bg-red-900/10">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-red-700 dark:text-red-400">I am available for emergency donations</FormLabel>
                                  <FormDescription>You may be contacted for urgent blood requirements</FormDescription>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 5: Consent */}
                    {donorStep === 5 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Declaration & Consent</h2>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 mb-6">
                          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                            I hereby declare that I am willing to donate blood voluntarily. I confirm that all the information provided is true to the best of my knowledge. I understand that my details will be used to contact me for blood donation when needed.
                          </p>
                        </div>
                        <FormField
                          control={donorForm.control}
                          name="hasConsented"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-red-200 dark:border-red-800 p-4 bg-white dark:bg-neutral-800">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>I agree to register as a blood donor and consent to be contacted for donations *</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={donorForm.control}
                          name="additionalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Any additional information..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDonorStep(Math.max(1, donorStep - 1))}
                        disabled={donorStep === 1}
                        className="px-6"
                      >
                        Previous
                      </Button>
                      {donorStep < 5 ? (
                        <Button
                          type="button"
                          onClick={nextDonorStep}
                          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-6"
                        >
                          Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-8"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Registering...
                            </>
                          ) : (
                            <>
                              Register as Donor <Heart className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </TabsContent>

            {/* Patient Form */}
            <TabsContent value="patient">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-red-100 dark:border-neutral-800 overflow-hidden">
                {/* Progress Steps */}
                <div className="bg-gradient-to-r from-red-500 to-rose-500 px-6 py-8">
                  <div className="flex justify-between items-center overflow-x-auto">
                    {patientSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center flex-shrink-0">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                              patientStep >= step.id
                                ? "bg-white text-red-600"
                                : "bg-white/20 text-white"
                            }`}
                          >
                            <step.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs mt-2 whitespace-nowrap ${
                            patientStep >= step.id ? "text-white font-medium" : "text-white/60"
                          }`}>
                            {step.title}
                          </span>
                        </div>
                        {index < patientSteps.length - 1 && (
                          <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                            patientStep > step.id ? "bg-white" : "bg-white/20"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Form {...patientForm}>
                  <form onSubmit={patientForm.handleSubmit(onPatientSubmit)} className="p-6 md:p-10">
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Step 1: Patient Info */}
                    {patientStep === 1 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Patient Information</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Patient's Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter patient's full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth *</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="gender"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Gender *</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="male" id="patient-male" />
                                      <Label htmlFor="patient-male">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="female" id="patient-female" />
                                      <Label htmlFor="patient-female">Female</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="other" id="patient-other" />
                                      <Label htmlFor="patient-other">Other</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="bloodGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Group Required *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Contact Details */}
                    {patientStep === 2 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Contact Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="contact@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={patientForm.control}
                          name="alternatePhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alternate Phone Number</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white pt-4">Attendant Details (Optional)</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="attendantName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Attendant Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="attendantRelationship"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Relationship</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Son, Daughter" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="attendantPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Attendant Phone</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Address */}
                    {patientStep === 3 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Patient Address</h2>
                        <FormField
                          control={patientForm.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="House No., Street, Landmark" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid md:grid-cols-3 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State *</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="pincode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pincode *</FormLabel>
                                <FormControl>
                                  <Input placeholder="XXXXXX" maxLength={6} {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 4: Hospital Details */}
                    {patientStep === 4 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Hospital Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="hospitalName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hospital Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name of the hospital" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="hospitalAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hospital Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Hospital address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="doctorName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Doctor's Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Treating doctor's name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="doctorPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Doctor's Phone</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="+91 XXXXX XXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={patientForm.control}
                          name="patientCondition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Patient's Condition / Reason for Blood</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Briefly describe the medical condition or reason for blood requirement" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Step 5: Blood Request Details */}
                    {patientStep === 5 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Blood Request Details</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={patientForm.control}
                            name="unitsRequired"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Units Required *</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" placeholder="Number of units" {...field} />
                                </FormControl>
                                <FormDescription>1 unit = approximately 350-450 ml</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={patientForm.control}
                            name="surgeryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Surgery/Required By Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={patientForm.control}
                          name="urgency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Urgency Level *</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="grid grid-cols-2 md:grid-cols-4 gap-4"
                                >
                                  <div className="flex items-center space-x-2 border border-red-500 rounded-lg p-3 bg-red-50 dark:bg-red-900/20">
                                    <RadioGroupItem value="immediate" id="immediate" />
                                    <Label htmlFor="immediate" className="text-red-700 dark:text-red-400 font-medium">Immediate</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                                    <RadioGroupItem value="within_24_hours" id="within_24_hours" />
                                    <Label htmlFor="within_24_hours">Within 24 Hours</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                                    <RadioGroupItem value="within_week" id="within_week" />
                                    <Label htmlFor="within_week">Within a Week</Label>
                                  </div>
                                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                                    <RadioGroupItem value="scheduled" id="scheduled" />
                                    <Label htmlFor="scheduled">Scheduled</Label>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 mb-6">
                          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                            By submitting this request, I confirm that the information provided is accurate. I understand that Chiranjeevi Charitable Trust will try to connect us with available blood donors but cannot guarantee immediate availability.
                          </p>
                        </div>
                        <FormField
                          control={patientForm.control}
                          name="hasConsented"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-red-200 dark:border-red-800 p-4 bg-white dark:bg-neutral-800">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>I confirm that the above information is correct and consent to submit this blood request *</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={patientForm.control}
                          name="additionalNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Optional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Any additional information..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPatientStep(Math.max(1, patientStep - 1))}
                        disabled={patientStep === 1}
                        className="px-6"
                      >
                        Previous
                      </Button>
                      {patientStep < 5 ? (
                        <Button
                          type="button"
                          onClick={nextPatientStep}
                          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-6"
                        >
                          Next <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-8"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Request <Droplet className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}

