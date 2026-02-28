'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { getProfileAPI, updateProfileAPI, type UserProfile } from '@/services/api/profileApi';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/store/uiStore';

export default function OwnerProfilePage() {
  const { user, token, updateUser } = useAuthStore();
  const router = useRouter();
  const { showToast } = useUiStore();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license_number: '',
    password: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user || !token) {
      router.push('/auth/login');
      return;
    }
    
    // Ensure user is owner
    if (user.role !== 'owner') {
      router.push('/');
      return;
    }
  }, [user, token, router]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id || !token) return;

      try {
        setIsLoading(true);
        const profileData = await getProfileAPI(user.id, token);
        setProfile(profileData);
        setFormData({
          name: profileData.name || '',
          email: profileData.email || '',
          phone: profileData.phone || '',
          license_number: profileData.license_number || '',
          password: '',
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load profile';
        showToast({ type: 'error', message });
        console.error('Error fetching profile:', error);
        if (error instanceof Error && message.includes('401')) {
          console.warn('Profile API returned 401, but keeping user logged in');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user?.id, token, showToast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user?.id || !token) return;

    try {
      setIsSaving(true);
      
      const updateData: {
        name?: string;
        email?: string | null;
        phone?: string | null;
        license_number?: string | null;
        password?: string;
      } = {
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        license_number: formData.license_number || null,
      };

      // Only include password if it's provided
      if (formData.password && formData.password.length > 0) {
        if (formData.password.length < 6) {
          showToast({ type: 'error', message: 'Password must be at least 6 characters' });
          setIsSaving(false);
          return;
        }
        updateData.password = formData.password;
      }

      const updatedProfile = await updateProfileAPI(user.id, updateData, token);
      setProfile(updatedProfile);
      setFormData({
        name: updatedProfile.name,
        email: updatedProfile.email || '',
        phone: updatedProfile.phone || '',
        license_number: updatedProfile.license_number || '',
        password: '',
      });

      // Update auth store with new user data
      if (updateUser) {
        updateUser({
          ...user,
          name: updatedProfile.name,
          email: updatedProfile.email || user.email,
          phone: updatedProfile.phone || user.phone,
        });
      }

      setIsEditing(false);
      showToast({ type: 'success', message: 'Profile updated successfully' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      showToast({ type: 'error', message });
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        license_number: profile.license_number || '',
        password: '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
        <div className="text-gray-600">Profile not found</div>
      </div>
    );
  }

  const joinedDate = profile.created_at 
    ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'N/A';

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your business profile</p>
      </div>
      
      <Card className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <UserIcon className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate">
              {profile.name}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">Bus Owner since {joinedDate}</p>
            {profile.email && (
              <p className="text-gray-500 text-xs sm:text-sm mt-1 flex items-center">
                <EnvelopeIcon className="h-4 w-4 mr-1" />
                {profile.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Company Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter company name"
              />
            ) : (
              <input
                type="text"
                value={profile.name || 'Not set'}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              License Number
            </label>
            {isEditing ? (
              <input
                type="text"
                name="license_number"
                value={formData.license_number}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter business license number"
              />
            ) : (
              <input
                type="text"
                value={profile.license_number || 'Not set'}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            ) : (
              <input
                type="email"
                value={profile.email || 'Not set'}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            )}
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter phone number"
              />
            ) : (
              <input
                type="tel"
                value={profile.phone || 'Not set'}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            )}
          </div>

          {isEditing && (
            <div className="sm:col-span-2">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter new password (min 6 characters)"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 sm:mt-8">
          {isEditing ? (
            <>
              <Button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}