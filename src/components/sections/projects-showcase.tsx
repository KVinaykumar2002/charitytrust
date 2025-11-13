import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    category: "Health",
    title: "Mega Blood Donation Drives",
    description:
      "Organizing large-scale blood donation camps across Telangana and Andhra Pradesh to ensure timely availability of blood for those in need, saving countless lives every year.",
    imageUrl:
      "https://surgmedia.com/wp-content/uploads/2020/10/2171-blood-donation.jpg",
    href: "#",
  },
  {
    category: "Vision",
    title: "Eye Donation and Transplant Initiative",
    description:
      "Through the Chiranjeevi Eye Bank, thousands of visually impaired individuals have regained their sight. Join our mission to spread the light of vision and hope.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Ihk2nHBTSCGNUC8AtzWQaQmVDxpma2G8mQ&s",
    href: "#",
  },
  {
    category: "Relief",
    title: "Disaster Relief and Humanitarian Aid",
    description:
      "Providing rapid emergency assistance, food, shelter, and medical care to communities affected by natural disasters and unforeseen crises.",
    imageUrl:
      "https://images.firstpost.com/wp-content/uploads/2014/10/hudhud-PTI.jpg?im=FitAndFill=(596,336)",
    href: "#",
  },
];

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

interface Project {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      href={project.href}
      className="group block bg-card rounded-2xl border border-border-light shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col"
    >
      <div className="overflow-hidden rounded-t-2xl">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={400}
          height={300}
          className="w-full h-auto object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-300 ease-in-out"
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
            These projects showcase CCT’s commitment to addressing a diverse
            range of issues — including education, healthcare, economic
            empowerment, community development, emergency relief, and
            environmental sustainability.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

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
