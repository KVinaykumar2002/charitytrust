"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, Heart, CheckCircle2, Loader2, ArrowRight, User, Phone, MapPin, Users, Stethoscope, FileText } from "lucide-react";
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
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { submitEyeDonationPledge } from "@/lib/api";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender",
  }),
  bloodGroup: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  alternatePhone: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(6, "Pincode must be 6 digits"),
  nextOfKinName: z.string().min(2, "Next of kin name is required"),
  nextOfKinRelationship: z.string().min(1, "Relationship is required"),
  nextOfKinPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  wearingSpectacles: z.boolean().default(false),
  hadEyeSurgery: z.boolean().default(false),
  eyeSurgeryDetails: z.string().optional(),
  hasEyeDisease: z.boolean().default(false),
  eyeDiseaseDetails: z.string().optional(),
  hasConsented: z.boolean().refine((val) => val === true, {
    message: "You must consent to pledge your eyes",
  }),
  familyAware: z.boolean().refine((val) => val === true, {
    message: "Your family must be aware of your pledge",
  }),
  howDidYouHear: z.string().optional(),
  additionalNotes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Contact Details", icon: Phone },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Next of Kin", icon: Users },
  { id: 5, title: "Medical Info", icon: Stethoscope },
  { id: 6, title: "Declaration", icon: FileText },
];

export default function EyeDonationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pledgeNumber, setPledgeNumber] = useState("");
  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
      nextOfKinName: "",
      nextOfKinRelationship: "",
      nextOfKinPhone: "",
      wearingSpectacles: false,
      hadEyeSurgery: false,
      eyeSurgeryDetails: "",
      hasEyeDisease: false,
      eyeDiseaseDetails: "",
      hasConsented: false,
      familyAware: false,
      howDidYouHear: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
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
        nextOfKin: {
          name: values.nextOfKinName,
          relationship: values.nextOfKinRelationship,
          phone: values.nextOfKinPhone,
        },
        wearingSpectacles: values.wearingSpectacles,
        hadEyeSurgery: values.hadEyeSurgery,
        eyeSurgeryDetails: values.eyeSurgeryDetails,
        hasEyeDisease: values.hasEyeDisease,
        eyeDiseaseDetails: values.eyeDiseaseDetails,
        hasConsented: values.hasConsented,
        familyAware: values.familyAware,
        howDidYouHear: values.howDidYouHear,
        additionalNotes: values.additionalNotes,
      };

      const result = await submitEyeDonationPledge(data);
      setPledgeNumber(result.data.pledgeNumber);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid && currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["fullName", "dateOfBirth", "gender", "bloodGroup"];
      case 2:
        return ["email", "phone"];
      case 3:
        return ["street", "city", "state", "pincode"];
      case 4:
        return ["nextOfKinName", "nextOfKinRelationship", "nextOfKinPhone"];
      case 5:
        return [];
      case 6:
        return ["hasConsented", "familyAware"];
      default:
        return [];
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        <NavigationHeader />
        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-20">
          <div className="max-w-lg w-full text-center">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-teal-100 dark:border-neutral-800">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Thank You for Your Pledge!
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6">
                Your generous decision to pledge your eyes will give the gift of sight to someone in need.
              </p>
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-teal-700 dark:text-teal-300 mb-1">Your Pledge Number</p>
                <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{pledgeNumber}</p>
              </div>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
                Please save this pledge number for your records. You will receive a confirmation email shortly.
              </p>
              <Button
                onClick={() => window.location.href = "/"}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full"
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full mb-6 shadow-lg shadow-teal-500/30">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              Eye Donation Pledge
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Give the precious gift of sight. Your pledge today can help restore vision and transform lives.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-teal-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Why Pledge?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                One pair of eyes can help two people see. Your pledge ensures your wish to donate is honored.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-teal-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Who Can Pledge?</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Anyone can pledge regardless of age, sex, or blood group. Even spectacle wearers can donate.
              </p>
            </div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-lg border border-teal-100 dark:border-neutral-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">After Pledging</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                You'll receive a pledge card. Inform your family so they can honor your wish.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-teal-100 dark:border-neutral-800 overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-8">
              <div className="flex justify-between items-center overflow-x-auto">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-shrink-0">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          currentStep >= step.id
                            ? "bg-white text-teal-600"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <span className={`text-xs mt-2 whitespace-nowrap ${
                        currentStep >= step.id ? "text-white font-medium" : "text-white/60"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 md:w-20 h-0.5 mx-2 ${
                        currentStep > step.id ? "bg-white" : "bg-white/20"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-10">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Personal Information</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                                  <RadioGroupItem value="male" id="male" />
                                  <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="female" id="female" />
                                  <Label htmlFor="female">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="other" id="other" />
                                  <Label htmlFor="other">Other</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="bloodGroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Blood Group</FormLabel>
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
                                <SelectItem value="unknown">Don't Know</SelectItem>
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
                {currentStep === 2 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Contact Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
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
                        control={form.control}
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
                      control={form.control}
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
                {currentStep === 3 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Address</h2>
                    <FormField
                      control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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

                {/* Step 4: Next of Kin */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Next of Kin Details</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                      This person will be contacted to honor your pledge after your demise.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="nextOfKinName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Next of kin's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="nextOfKinRelationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="child">Child</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="relative">Other Relative</SelectItem>
                                <SelectItem value="friend">Friend</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="nextOfKinPhone"
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
                )}

                {/* Step 5: Medical Information */}
                {currentStep === 5 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Medical Information</h2>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="wearingSpectacles"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I wear spectacles/contact lenses</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hadEyeSurgery"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I have had eye surgery in the past</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("hadEyeSurgery") && (
                        <FormField
                          control={form.control}
                          name="eyeSurgeryDetails"
                          render={({ field }) => (
                            <FormItem className="ml-8">
                              <FormLabel>Please provide details</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Type of surgery, date, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      <FormField
                        control={form.control}
                        name="hasEyeDisease"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I have/had any eye disease</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      {form.watch("hasEyeDisease") && (
                        <FormField
                          control={form.control}
                          name="eyeDiseaseDetails"
                          render={({ field }) => (
                            <FormItem className="ml-8">
                              <FormLabel>Please provide details</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Name of disease, treatment, etc." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name="howDidYouHear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>How did you hear about us?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="social_media">Social Media</SelectItem>
                              <SelectItem value="friend_family">Friend/Family</SelectItem>
                              <SelectItem value="newspaper">Newspaper</SelectItem>
                              <SelectItem value="event">Event</SelectItem>
                              <SelectItem value="hospital">Hospital</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 6: Declaration */}
                {currentStep === 6 && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Declaration & Consent</h2>
                    <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 mb-6">
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                        I hereby pledge to donate my eyes after my death. I understand that this is a noble act that can restore sight to the blind. I have informed my family members about my decision, and they are supportive of my pledge.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="familyAware"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-teal-200 dark:border-teal-800 p-4 bg-white dark:bg-neutral-800">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>My family is aware of my decision to pledge my eyes *</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="hasConsented"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-teal-200 dark:border-teal-800 p-4 bg-white dark:bg-neutral-800">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>I voluntarily pledge to donate my eyes after my death *</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any additional information you'd like to share..." {...field} />
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
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    Previous
                  </Button>
                  {currentStep < 6 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-6"
                    >
                      Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Pledge <Heart className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}

