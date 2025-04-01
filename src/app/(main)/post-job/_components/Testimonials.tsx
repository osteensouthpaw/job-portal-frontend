import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import ArcJetLogo from "@/public/arcjet.jpg";
import InngestLogo from "@/public/inngest-locale.png";

const companies = [
  { id: 0, name: "ArcJet", logo: ArcJetLogo },
  { id: 1, name: "Inngest", logo: InngestLogo },
  { id: 2, name: "ArcJet", logo: ArcJetLogo },
  { id: 3, name: "Inngest", logo: InngestLogo },
  { id: 4, name: "ArcJet", logo: ArcJetLogo },
  { id: 5, name: "Inngest", logo: InngestLogo },
];

const testimonials = [
  {
    quote:
      "We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!",
    author: "Sarah Chen",
    company: "TechCorp",
  },
  {
    quote:
      "The platform made hiring remote talent incredibly simple. Highly recommended!",
    author: "Mark Johnson",
    company: "StartupX",
  },
  {
    quote:
      "We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
    author: "Emily Rodriguez",
    company: "InnovateNow",
  },
];

const stats = [
  { value: "10k+", label: "Monthly active job seekers" },
  { value: "48h", label: "Average time to hire" },
  { value: "95%", label: "Employer satisfaction rate" },
  { value: "500+", label: "Companies hiring monthly" },
];

const Testimonials = () => {
  return (
    <Card className="lg:sticky lg:top-4">
      <CardHeader>
        <CardTitle className="text-xl">Trusted by Industry Leaders</CardTitle>
        <CardDescription>
          Join thousands of companies hiring top talent
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Logos */}
        <div className="grid grid-cols-3 gap-4">
          {companies.map((company) => (
            <div key={company.id} className="flex items-center justify-center">
              <Image
                src={company.logo}
                alt={company.name}
                height={80}
                width={80}
                className="opacity-75 transition-opacity hover:opacity-100 rounded-lg"
              />{" "}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <blockquote key={index} className="border-l-2 border-primary pl-4">
              <p className="text-sm italic text-muted-foreground">
                "{testimonial.quote}"
              </p>
              <footer className="mt-2 text-sm font-medium">
                - {testimonial.author}, {testimonial.company}
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-lg bg-muted p-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonials;
