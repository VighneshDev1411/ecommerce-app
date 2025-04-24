import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    weight: "",
    weightGoal: "",
    allergen: "",
    dietaryPreference: "",
    height: "",
    fitnessGoal: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/profile/get?userId=${session.user.id}`);
          if (response.ok) {
            const data = await response.json();
            if (data) {
              setFormData({
                gender: data.gender || "",
                weight: data.weight || "",
                weightGoal: data.weightGoal || "",
                allergen: data.allergen || "",
                dietaryPreference: data.dietaryPreference || "",
                height: data.height || "",
                fitnessGoal: data.fitnessGoal || "",
              });
            }
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    if (isOpen) {
      fetchProfileData();
    }
  }, [isOpen, session?.user?.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/profile/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: session?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
      <div className="bg-white w-[80vw] h-[80vh] rounded-2xl shadow-xl p-6 relative overflow-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/assets/images/vignesh_giblee.jpg"
                alt="Profile Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-lg">{session?.user?.name || "User"}</span>
              <span className="text-gray-600">{session?.user?.email}</span>
            </div>
          </div>
          <button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-[#222222] text-white px-4 py-2 rounded-md hover:bg-[#333333] transition-colors"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            {isEditing ? (
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                placeholder="Enter your gender"
              />
            ) : (
              <p className="text-gray-900">{formData.gender || "Not specified"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            {isEditing ? (
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                placeholder="Enter your weight"
              />
            ) : (
              <p className="text-gray-900">{formData.weight || "Not specified"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Weight Goal</label>
            {isEditing ? (
              <input
                type="text"
                name="weightGoal"
                value={formData.weightGoal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                placeholder="e.g., Lose 5kg"
              />
            ) : (
              <p className="text-gray-900">{formData.weightGoal || "Not specified"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Allergen</label>
            {isEditing ? (
              <select
                name="allergen"
                value={formData.allergen}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF] appearance-none bg-no-repeat bg-[right_1rem_center] pr-12"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}
              >
                <option value="" className="text-gray-400">Select Allergen</option>
                <option value="Gluten" className="text-gray-700">Gluten</option>
                <option value="Eggs" className="text-gray-700">Eggs</option>
                <option value="Lactose" className="text-gray-700">Lactose</option>
              </select>
            ) : (
              <p className="text-gray-900">{formData.allergen || "Not specified"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Dietary Preference</label>
            {isEditing ? (
              <select
                name="dietaryPreference"
                value={formData.dietaryPreference}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF] appearance-none bg-no-repeat bg-[right_1rem_center] pr-12"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}
              >
                <option value="" className="text-gray-400">Select Preference</option>
                <option value="Vegetarian" className="text-gray-700">Vegetarian</option>
                <option value="Vegan" className="text-gray-700">Vegan</option>
                <option value="Non-Vegetarian" className="text-gray-700">Non-Vegetarian</option>
              </select>
            ) : (
              <p className="text-gray-900">{formData.dietaryPreference || "Not specified"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            {isEditing ? (
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF]"
                placeholder="Enter your height"
              />
            ) : (
              <p className="text-gray-900">{formData.height || "Not specified"}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Fitness Goal</label>
            {isEditing ? (
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#F9F9F9] text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0066FF] appearance-none bg-no-repeat bg-[right_1rem_center] pr-12"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")" }}
              >
                <option value="" className="text-gray-400">Select Goal</option>
                <option value="Muscle Gain" className="text-gray-700">Muscle Gain</option>
                <option value="Fat Loss" className="text-gray-700">Fat Loss</option>
                <option value="Maintenance" className="text-gray-700">Maintenance</option>
              </select>
            ) : (
              <p className="text-gray-900">{formData.fitnessGoal || "Not specified"}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProfileModal;
