import React from "react";
import {
  RiHeartPulseFill,
  RiSeedlingFill,
  RiFireFill,
  RiScales3Fill,
  RiCapsuleFill,
  RiMoonFill,
  RiWomenFill,
  RiMentalHealthFill,
  RiArrowRightLine,
} from "react-icons/ri";
import Link from "next/link";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  bgColor: string;
  iconColor: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  icon,
  title,
  description,
  link,
  bgColor,
  iconColor,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 md:p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
    <div className={`w-12 h-12 md:w-16 md:h-16 ${bgColor} rounded-full flex items-center justify-center mb-4`}>
      <div className={`text-xl md:text-2xl ${iconColor}`}>{icon}</div>
    </div>
    <h3 className="font-medium text-base md:text-lg text-gray-800 mb-2">
      {title}
    </h3>
    <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-2">
      {description}
    </p>
    <Link
      href={link}
      className="text-primary font-medium flex items-center text-sm md:text-base hover:underline"
    >
      View Products
      <RiArrowRightLine className="ml-1" />
    </Link>
  </div>
);

const CategoriesSection: React.FC = () => {
  const categories = [
    {
      icon: <RiHeartPulseFill />,
      title: "Protein Supplements",
      description: "Whey, Casein, Plant-based proteins for muscle growth and recovery",
      link: "/protein-supplements",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: <RiSeedlingFill />,
      title: "Vitamins & Minerals",
      description: "Essential nutrients to support overall health and wellbeing",
      link: "/vitamins-minerals",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: <RiFireFill />,
      title: "Pre-Workout & Energy",
      description: "Boost performance and energy for intense workout sessions",
      link: "/pre-workout-energy",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      icon: <RiScales3Fill />,
      title: "Weight Management",
      description: "Products to support weight loss, gain, or maintenance goals",
      link: "/weight-management",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: <RiCapsuleFill />,
      title: "Amino Acids & BCAAs",
      description: "Essential amino acids for muscle recovery and growth",
      link: "/amino-acids-bcaas",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: <RiMoonFill />,
      title: "Sleep & Recovery",
      description: "Products to enhance sleep quality and muscle recovery",
      link: "/sleep-recovery",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: <RiWomenFill />,
      title: "Women's Health",
      description: "Specialized supplements for women's wellness and fitness",
      link: "/womens-health",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      icon: <RiMentalHealthFill />,
      title: "Wellness & Immunity",
      description: "Products to support immune system and overall wellness",
      link: "/wellness-immunity",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
    },
  ];

  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
