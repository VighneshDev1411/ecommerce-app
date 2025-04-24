"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface UserData {
  email: string;
  name: string;
  profileComplete: boolean;
  createdAt: string;
  updatedAt: string;
  gender: string;
  weight: string;
  weightGoal: string;
  allergen: string;
  dietaryPreference: string;
  height: string;
  fitnessGoal: string;
  avatarUrl: string;
  [key: string]: string | boolean; // Index signature for dynamic access
}

export default function ProfileDisplayPage() {
  const [userData, setUserData] = useState<UserData>({
    email: "vigneshpathak100@gmail.com",
    name: "Vignesh Pathak",
    profileComplete: false,
    createdAt: "",
    updatedAt: "",
    gender: "",
    weight: "",
    weightGoal: "",
    allergen: "",
    dietaryPreference: "",
    height: "",
    fitnessGoal: "",
    avatarUrl: "",
  });

  const handleFieldUpdate = async (field: string, value: string) => {
    try {
      // Update local state immediately for better UX
      setUserData((prev) => ({ ...prev, [field]: value }));

      // Make API call to update the field
      const response = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // You might want to show a success toast here
    } catch (error) {
      // Revert the change if the API call fails
      setUserData((prev) => ({ ...prev, [field]: userData[field] }));
      // You might want to show an error toast here
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <Image
                src={userData.avatarUrl}
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                onBlur={(e) => handleFieldUpdate("name", e.target.value)}
                className="text-xl font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1"
              />
              <p className="text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="text"
                value={userData.weight}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, weight: e.target.value }))
                }
                onBlur={(e) => handleFieldUpdate("weight", e.target.value)}
                placeholder="Enter your weight"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight Goal
              </label>
              <input
                type="text"
                value={userData.weightGoal}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    weightGoal: e.target.value,
                  }))
                }
                onBlur={(e) => handleFieldUpdate("weightGoal", e.target.value)}
                placeholder="Enter your weight goal"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="text"
                value={userData.height}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, height: e.target.value }))
                }
                onBlur={(e) => handleFieldUpdate("height", e.target.value)}
                placeholder="Enter your height"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                value={userData.gender}
                onChange={(e) => {
                  setUserData((prev) => ({ ...prev, gender: e.target.value }));
                  handleFieldUpdate("gender", e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allergen
              </label>
              <select
                value={userData.allergen}
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    allergen: e.target.value,
                  }));
                  handleFieldUpdate("allergen", e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Allergen</option>
                <option value="gluten">Gluten</option>
                <option value="dairy">Dairy</option>
                <option value="nuts">Nuts</option>
                <option value="eggs">Eggs</option>
                <option value="soy">Soy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dietary Preference
              </label>
              <select
                value={userData.dietaryPreference}
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    dietaryPreference: e.target.value,
                  }));
                  handleFieldUpdate("dietaryPreference", e.target.value);
                }}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fitness Goal Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Fitness Goal</h2>
          <select
            value={userData.fitnessGoal}
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, fitnessGoal: e.target.value }));
              handleFieldUpdate("fitnessGoal", e.target.value);
            }}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Fitness Goal</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
            <option value="general-fitness">General Fitness</option>
          </select>
        </div>

        {/* Profile Completion Status */}
        {!userData.profileComplete && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-700">
              Please complete your profile to get personalized recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
