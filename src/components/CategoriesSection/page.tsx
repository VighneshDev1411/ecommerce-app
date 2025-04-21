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

const CategoriesSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Categories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Protein Supplements */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <RiHeartPulseFill className="text-2xl text-blue-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Protein Supplements
          </h3>
          <p className="text-gray-600 mb-4">
            Whey, Casein, Plant-based proteins for muscle growth and recovery
          </p>
          <Link
            href="/protein-supplements"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Vitamins & Minerals */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <RiSeedlingFill className="text-2xl text-green-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Vitamins & Minerals
          </h3>
          <p className="text-gray-600 mb-4">
            Essential nutrients to support overall health and wellbeing
          </p>
          <Link
            href="/vitamins-minerals"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Pre-Workout & Energy */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <RiFireFill className="text-2xl text-red-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Pre-Workout & Energy
          </h3>
          <p className="text-gray-600 mb-4">
            Boost performance and energy for intense workout sessions
          </p>
          <Link
            href="/pre-workout-energy"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Weight Management */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
            <RiScales3Fill className="text-2xl text-purple-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Weight Management
          </h3>
          <p className="text-gray-600 mb-4">
            Products to support weight loss, gain, or maintenance goals
          </p>
          <Link
            href="/weight-management"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Amino Acids & BCAAs */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mb-4">
            <RiCapsuleFill className="text-2xl text-yellow-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Amino Acids & BCAAs
          </h3>
          <p className="text-gray-600 mb-4">
            Essential amino acids for muscle recovery and growth
          </p>
          <Link
            href="/amino-acids-bcaas"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Sleep & Recovery */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <RiMoonFill className="text-2xl text-indigo-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Sleep & Recovery
          </h3>
          <p className="text-gray-600 mb-4">
            Products to enhance sleep quality and muscle recovery
          </p>
          <Link
            href="/sleep-recovery"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Women's Health */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4">
            <RiWomenFill className="text-2xl text-pink-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Women's Health
          </h3>
          <p className="text-gray-600 mb-4">
            Specialized supplements for women's wellness and fitness
          </p>
          <Link
            href="/womens-health"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>

        {/* Wellness & Immunity */}
        <div className="bg-white rounded shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
            <RiMentalHealthFill className="text-2xl text-teal-600" />
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Wellness & Immunity
          </h3>
          <p className="text-gray-600 mb-4">
            Products to support immune system and overall wellness
          </p>
          <Link
            href="/wellness-immunity"
            className="text-primary font-medium flex items-center"
          >
            View Products
            <RiArrowRightLine className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
