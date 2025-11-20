"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublicProjects } from "@/lib/api";

interface Project {
  _id?: string;
  id?: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  imageBase64?: string;
  image?: string;
  href?: string;
}

const galleryImages = [
  {
    src: "https://img1.wsimg.com/isteam/ip/3f9bf7ba-9991-425c-8ad7-3fa919af01f1/cct1.jpeg/:/cr=t:19.74%25,l:9.68%25,w:80.65%25,h:60.52%25/rs=w:600,h:300,cg:true,m",
    alt: "Volunteers packing food donations into boxes.",
  },
  {
    src: "https://pbs.twimg.com/media/GmfEqo3bkAAoMkx.jpg",
    alt: "Red and green gift bags filled with donations for a charity drive.",
  },
  {
    src: "https://assets.hmtvlive.com/h-upload/2023/07/09/357070-chiranjeevi-charitable-trust.webp",
    alt: "People attending an event in a modern art gallery.",
  },
  {
    src: "https://img.ap7am.com/froala-uploads/20240126fr65b342713b414.jpg",
    alt: "A group of people collaborating on a video conference call.",
  },
  {
    src: "https://content.tupaki.com/h-upload/2024/01/26/265287-whatsappimage2024-01-26at123158pm2.webp",
    alt: "A young girl in a yellow dress standing in a brightly lit room.",
  },
  {
    src: "https://th-i.thgim.com/public/incoming/13illa/article66364739.ece/alternates/FREE_1200/Chiranjeevi%202.JPG",
    alt: "A young girl in a yellow dress standing in a brightly lit room.",
  },
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgYhRlkIShPkvHfXid6E0WrfuY7wZrqaijZVek2aLI4IvS3jp6pmJ4nZp3wXq22r2zFFXYMigEPtAuPucKoV80EIsorbqOW2_tm5nqU0iXZLSVU4msc1ALbnaEtIpp1QyBUVOTEIb3pirU8/s320/image5.jpg",
    alt: "Athletes in wheelchairs playing a game of basketball in a gymnasium.",
  },
  {
    src: "https://www.cinejosh.com/newsimg/newsmainimg/chiranjeevi-on-world-blood-donation-day_b_1506220926.jpg",
    alt: "Blood donation day event image.",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWTXuPIxrjKC7Lt1lUqT63eBqGI1a-tGSA5w&s",
    alt: "Group event photo for charity.",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  // Handle base64 images
  const imageSrc = project.imageBase64?.startsWith('data:image')
    ? project.imageBase64
    : project.imageBase64 || project.image || project.imageUrl || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

  return (
    <Link
      href={project.href || "#"}
      className="group block bg-card rounded-2xl border border-border-light shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <img
          src={imageSrc}
          alt={project.title}
          className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300 ease-in-out"
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
      </div>
      <div className="p-8 flex flex-col items-start flex-grow">
        <span className="text-tag bg-tag-green text-text-inverted rounded-[6px] px-3 py-1.5 mb-4">
          {project.category}
        </span>
        <h3 className="h3 mb-2 text-card-foreground">{project.title}</h3>
        <p className="text-body-regular text-text-secondary mb-6 flex-grow">
          {project.description}
        </p>
        <div className="flex items-center text-button font-medium text-primary-dark-teal mt-auto">
          Read more <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

const ProjectsShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const result = await getPublicProjects();
      const projectsData = result.data || [];
      
      // Map projects data to include image handling
      const mappedProjects = projectsData.map((p: any) => ({
        id: p._id || p.id,
        category: p.category || "Other",
        title: p.title || "",
        description: p.description || "",
        imageUrl: p.imageBase64 || p.image || p.imageUrl || "",
        imageBase64: p.imageBase64 || p.image || p.imageUrl || "",
        image: p.imageBase64 || p.image || p.imageUrl || "",
        href: "#", // You can add a link field to the Project model if needed
      }));
      
      setProjects(mappedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-background-white py-[120px]">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <h2 className="h2 max-w-[600px] text-foreground">
            Projects for the Charity Donation Organization
          </h2>
          <p
            data-animation="fade-in"
            className="text-body-regular text-text-secondary max-w-[720px]"
          >
            These projects showcase CCT's commitment to addressing a diverse
            range of issues — including education, healthcare, economic
            empowerment, community development, emergency relief, and
            environmental sustainability.
          </p>
        </div>

        {/* Project Cards */}
        {loading ? (
          <div className="flex items-center justify-center py-20 mb-24">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading projects...</p>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex items-center justify-center py-20 mb-24">
            <p className="text-text-secondary">No projects available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {projects.map((project) => (
              <ProjectCard key={project.id || project._id} project={project} />
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="break-inside-avoid group overflow-hidden rounded-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
