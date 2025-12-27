"use client";

import { motion } from "framer-motion";
import { Award, Users, Globe, Heart, Building2, MapPin, TrendingUp, Shield } from "lucide-react";

interface StatesmanAchievement {
  title: string;
  description: string;
  icon: React.ReactNode;
  year?: string;
}

const achievements: StatesmanAchievement[] = [
  {
    title: "LAUNCHED POLITICAL OUTFIT",
    description: "In order to serve the people of Andhra Pradesh in a larger way and to bring about a positive change and ensure social justice, Sri.Chiranjeevi had launched his Political outfit the 'Praja Rajyam Party'(PRP) on the 26th August 2008 at Tirupathi.",
    icon: <Building2 className="w-8 h-8" />,
    year: "2008"
  },
  {
    title: "FIRST EVER GENERAL ELECTIONS",
    description: "Within a span of nine months, PRP had contested its first ever General elections in 2009 and garnered over 70 lakh votes and 18 MLA seats.",
    icon: <Users className="w-8 h-8" />,
    year: "2009"
  },
  {
    title: "IDEALS OF SOCIAL JUSTICE",
    description: "In February 2011, Sri.Chiranjeevi unconditionally merged PRP with the Indian National Congress Party, with the intention of achieving the ideals of Social Justice from a larger platform.",
    icon: <Heart className="w-8 h-8" />,
    year: "2011"
  },
  {
    title: "NOMINATED AS A MP RAJYA SABHA",
    description: "In April 2012, Sri.Chiranjeevi was nominated as a Member of Parliament Rajya Sabha.",
    icon: <Award className="w-8 h-8" />,
    year: "2012"
  },
  {
    title: "MINISTER OF STATE FOR TOURISM",
    description: "On 28th October'2012, Sri Chiranjeevi had been inducted into the Central Cabinet as the Minister of State for Tourism with Independent Charge.",
    icon: <Globe className="w-8 h-8" />,
    year: "2012"
  },
  {
    title: "INITIATIVES TO PROMOTE TOURISM",
    description: "As Tourism Minister, Sri Chiranjeevi has taken several breakthrough initiatives to promote tourism and leverage India's soft power.",
    icon: <TrendingUp className="w-8 h-8" />,
    year: "2012"
  },
  {
    title: "RESPECT WOMEN",
    description: "In the wake of growing violence against women in the country, Sri Chiranjeevi spearheaded 'Respect Women' Campaign. Multilingual badges were worn at Apex Tourism Meet at his behest to spread awareness.",
    icon: <Shield className="w-8 h-8" />,
    year: "2012"
  },
  {
    title: "UTTARAKHAND TOURISM",
    description: "Sri Chiranjeevi has endeavored to rebuild Uttarakhand Tourism by sanctioning 195 crores and coordinating with tourism associations and through the donations to PM relief Fund.",
    icon: <MapPin className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "INCREDIBLE INDIA",
    description: "Sri Chiranjeevi had roped in several celebs from Cine World for the Promotion of \"Incredible India\"",
    icon: <Globe className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "EARN WHILE YOU LEARN",
    description: "As a Parliamentarian, Sri.Chiranjeevi actively promoted the 'Earn While you Learn' Scheme that lets thousands of students to earn while studying.",
    icon: <Award className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "FOR SPECIALLY ABLED",
    description: "Sri Chiranjeevi persistently urged Departments of Tourism of all States and UTs to make various tourism destinations accessible to differently-abled tourists.",
    icon: <Heart className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "MEDICAL TOURISM",
    description: "To promote Medical Tourism Sri Chiranjeevi has extended Marketing Development Assistance to also cover Medical Tourism.",
    icon: <Heart className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "BUDDHIST TOURISM",
    description: "Shri. Chiranjeevi had appointed a National Level Consultant (NLC) for evolving a detailed action plan to promote Buddhist Tourism and other Spiritual Tourism Circuits.",
    icon: <Globe className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "FOREIGN EXCHANGE",
    description: "Foreign Exchange through Tourism in India reached ₹ 77591 crore under the Tourism Minister Sri. Chiranjeevi.",
    icon: <TrendingUp className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "SOUTHERN ZONAL TOURISM",
    description: "Sri Chiranjeevi had enabled setting up of the Southern Zonal Tourism Council (SZTC) comprising the States of Andhra Pradesh, Kerala, Karnataka, Tamil Nadu and the Union Territory of Puducherry.",
    icon: <MapPin className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "TOURISM SECTOR",
    description: "As the Union Tourism Minister Sri K Chiranjeevi held talks with Mr. Maxime Bernier, Minister of Tourism, Canada to strengthen cooperation in tourism sector especially in the field of human resource development, exchange of tour operators, investment in the tourism sector and exchange of information related to tourism sector.",
    icon: <Globe className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "INDIA TOURISM",
    description: "Fourth meeting of Asean and India Tourism Ministers at Vientiane was jointly co-chaired by Union Tourism Minister Shri Chiranjeevi and Prof. Dr. Bosengkham Vongdara",
    icon: <Globe className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "AT LUANG PRABANG",
    description: "As the Union Minister for Tourism Shri Chiranjeevi called on Dr. Khampheng Saysompheng, Governor of Luang Prabang province of Lao PDR at Luang Prabang city to increase tourism cooperation.",
    icon: <MapPin className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "INDIA AND JAPAN",
    description: "Sri Chiranjeevi had initiated discussions with Japanese Senior Vice-Minister of Tourism, Mr. Hiroshi Kajiyama for possibility of signing an agreement/MoU between India and Japan to mutually develop tourism.",
    icon: <Globe className="w-8 h-8" />,
    year: "2013"
  },
  {
    title: "INDIA PAVILION",
    description: "Sri. Chiranjeevi Inaugurated India Pavilion at ITB Berlin and has expressed satisfaction that India has evolved itself as a round the year destination.",
    icon: <Building2 className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "CLEAN INDIA",
    description: "As Union Tourism Minister Sri Chiranjeevi had urged the corporate world to join hands with Ministry of Tourism to promote Campaign Clean India. This campaign was the pre-cursor to Mission Swachh Bharat",
    icon: <Shield className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "TOURISM PROMOTION",
    description: "Union Minister for Tourism Sri Chiranjeevi has increased Indian Tourism Promotion through print, electronic, online and outdoor media campaigns in the international and domestic markets",
    icon: <TrendingUp className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "VISA ON ARRIVAL",
    description: "Sri Chiranjeevi announced that Visa on Arrival Scheme Registered a Growth of 54 Percent.",
    icon: <Globe className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "SAFE & HONOURABLE",
    description: "The Union Ministry of Tourism under Sri.Chiranjeevi, along with stakeholders has formally adopted the Code of Conduct for 'Safe & Honourable Tourism'",
    icon: <Shield className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "ASIA PACIFIC",
    description: "Union Tourism Minister Sri Chiranjeevi inaugurated the 25th Joint Meeting of UNWTO Commissions for South Asia, East Asia and the Pacific at Hyderabad",
    icon: <Globe className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "AMENITIES AT TAJ",
    description: "Union Tourism Minister Sri Chiranjeevi regularly reviewed the various initiatives taken up to improve visitor experience at Taj Mahal, Agra.",
    icon: <MapPin className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "DREAM LINER FLIGHT",
    description: "Sri Chiranjeevi had visited Australia to Promote Bilateral Tourism in the run up to the launch of the Air India's maiden Dream liner flight from Delhi to Sydney and Melbourne.",
    icon: <Globe className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "CANNES FILM FESTIVAL",
    description: "Sri Chiranjeevi had Offered Wide Opportunities to Foreign Film Producers in India during his Address at the Cannes Film Festival.",
    icon: <Award className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "FILMING DESTINATION",
    description: "Sri Chiranjeevi Inaugurated Incredible India Exhibition at Cannes to promote India as a \"Filming Destination\".",
    icon: <Globe className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "JOINT EFFORTS",
    description: "To ensure greater synergy between ministries, Sri Chiranjeevi promoted joint efforts of the Ministry of Tourism and Ministry of Information and Broadcasting is consequent to their entering into a Memorandum of Understanding to promote Cinema of India as a sub brand of \"Incredible India\" at various international film festivals",
    icon: <Building2 className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "TOURISM GROWTH",
    description: "National Conference of State Tourism Ministers inaugurated by Sri Chiranjeevi to jointly plan tourism growth.",
    icon: <TrendingUp className="w-8 h-8" />,
    year: "2014"
  },
  {
    title: "PILGRIMAGE CENTRES",
    description: "Sri Chiranjeevi stressed on the need to Enhance Amenities and Facilities at Major Pilgrimage Centres.",
    icon: <MapPin className="w-8 h-8" />,
    year: "2014"
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const StatesmanSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-24 md:py-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6 leading-tight">
            Statesman
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            A journey of service, leadership, and transformation in public life
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {achievement.icon}
                </div>
                {achievement.year && (
                  <span className="text-sm font-semibold text-muted-foreground">
                    {achievement.year}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                {achievement.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>

              {/* Decorative bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatesmanSection;

