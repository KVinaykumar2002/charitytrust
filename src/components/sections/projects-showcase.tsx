import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    category: "Education",
    title: "Healthcare Access Support Initiative",
    description: "Improve healthcare access in underserved communities, focusing on comprehensive preventive care and medical aid.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/7qo1ya4yjrBocI3ZuUUvPRLsFWs-9.jpg",
    href: "#",
  },
  {
    category: "Emergency",
    title: "Eco Conservation and Sustainability",
    description: "Promote environmental awareness and proactive local community-led conservation efforts for a sustainable future.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/laFwE8wBVlSejkBU6BrqwzoPI-13.jpg",
    href: "#",
  },
  {
    category: "Infrastructure",
    title: "Lambda Emergency Relief Response",
    description: "Establish a rapid response mechanism for urgent immediate assistance during natural disasters and humanitarian crises.",
    imageUrl: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/jkafBI68TLItAFi69YtT0jCzg-15.jpg",
    href: "#",
  },
];

const galleryImages = [
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/jkafBI68TLItAFi69YtT0jCzg-15.jpg",
    alt: "Volunteers packing food donations into boxes.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/4SokyC6i8XSvCydcdQFgqTvBY-10.jpg",
    alt: "Red and green gift bags filled with donations for a charity drive.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/am58INl4Jo26NM45Uzu7LZ3kyYY-11.jpg",
    alt: "People attending an event in a modern art gallery.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/bk0dK81EHQX6pWnhNsedv8eKlSw-12.jpg",
    alt: "A group of people collaborating on a video conference call.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/7qo1ya4yjrBocI3ZuUUvPRLsFWs-9.jpg",
    alt: "A young girl in a yellow dress standing in a brightly lit room.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/PmPxWocGOsqsKurQUgmnq2psnvM-14.jpg",
    alt: "Athletes in wheelchairs playing a game of basketball in a gymnasium.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/laFwE8wBVlSejkBU6BrqwzoPI-13.jpg",
    alt: "Discarded blue fishing nets tangled on a sandy surface.",
  },
  {
    src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/kvPziVIdfTn9dtTxOFciVp9bbQ-16.jpg",
    alt: "Two runners participating in a marathon charity event.",
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
    <Link href={project.href} className="group block bg-card rounded-2xl border border-border-light shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col">
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
          Read more
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};


const ProjectsShowcase = () => {
    return (
        <section className="bg-background-white py-[120px]">
            <div className="container">
                <div className="flex flex-col items-center text-center gap-4 mb-16">
                    <h2 className="h2 max-w-[600px] text-foreground">
                        Projects for the charity donation organization
                    </h2>
                    <p className="text-body-regular text-text-secondary max-w-[720px]">
                        These projects showcase Lambda commitment to addressing a diverse range of issues, including education, healthcare, economic empowerment, community development, emergency relief, and environmental sustainability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>

                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="break-inside-avoid group overflow-hidden rounded-2xl">
                             <Image
                                src={image.src}
                                alt={image.alt}
                                width={500}
                                height={500} // Height is adjusted by style but required by Next/Image
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                style={{ height: 'auto' }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsShowcase;