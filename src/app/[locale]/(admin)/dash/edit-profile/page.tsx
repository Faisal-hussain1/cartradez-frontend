"use client";

import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";
import { useState } from "react";
import { useMutations } from "@/shared/reactQuery/users/mutations";

export default function EditProfile() {

  const user = useSelector(getCurrentUser);

  const { useUpdateProfileMutation } = useMutations();

  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  const [imagePreview, setImagePreview] = useState(user?.profileImage || "");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    country: user?.country || "",
    state: user?.state || "",
    city: user?.city || "",
    address: user?.address || "",
    profileImage: null as File | null
  });

  const handleChange = (e:any) => {
    const {name,value} = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:value
    }));
  };

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];

    if(file){
      setFormData(prev => ({
        ...prev,
        profileImage:file
      }));

      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const payload = new FormData();

    Object.keys(formData).forEach((key:any) => {
      if(formData[key] !== null){
        payload.append(key, formData[key]);
      }
    });

    updateProfile({
      payload
    });
  };

  return (
    <div className="p-6">

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Edit Profile
        </h2>

        {/* Profile Image */}
        <div className="flex items-center gap-5 mb-6">

          <img
            src={imagePreview || "/images/avatar-default.jpeg"}
            className="w-20 h-20 rounded-full object-cover border"
          />

          <label className="cursor-pointer bg-[#414279] text-white px-4 py-2 rounded-lg text-sm">
            Change Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="text-sm text-gray-600">First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">State</label>
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#414279]"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              disabled={isPending}
              type="submit"
              className="cursor-pointer bg-[#414279] text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}