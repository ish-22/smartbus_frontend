'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { UserIcon, StarIcon, TruckIcon, ClockIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/authStore';
import { getProfileAPI, updateProfileAPI, type UserProfile } from '@/services/api/profileApi';
import { getDriverStats, type DriverStats } from '@/services/api/driverStatsApi';
import { useRouter } from 'next/navigation';
import { useUiStore } from '@/store/uiStore';

export default function DriverProfilePage() {
  const { user, token, updateUser } = useAuthStore();
  const router = useRouter();
  const { showToast } = useUiStore();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState<DriverStats | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user || !token) {
      router.push('/auth/login');
      return;
    }
    
    // Ensure user is driver
    if (user.role !== 'driver') {
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
          password: '',
        });
        
        // Load stats (don't fail if this errors)
        try {
          const driverStats = await getDriverStats(token);
          setStats(driverStats);
        } catch (statsError) {
          // Silently set default stats
          setStats({
            total_trips: 0,
            on_time_rate: 0,
            passengers_served: 0,
            average_rating: 0,
            total_reviews: 0
          });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load profile';
        showToast({ type: 'error', message });
        console.error('Error fetching profile:', error);
        // Don't redirect on error - let user stay on page and try again
        // Only redirect if it's a 401 (unauthorized) which means token is invalid
        if (error instanceof Error && message.includes('401')) {
          // Token might be invalid, but don't auto-logout - let the auth guard handle it
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
        password?: string;
      } = {
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
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
      
      // Update auth store with new user data
      updateUser({
        name: updatedProfile.name,
        email: updatedProfile.email || '',
        phone: updatedProfile.phone || undefined,
      });

      setProfile(updatedProfile);
      setFormData(prev => ({ ...prev, password: '' })); // Clear password field
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
        password: '',
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 overflow-x-hidden">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Your driver information and statistics</p>
      </div>

      <Card className="p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <UserIcon className="h-12 w-12 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              {profile.name}
            </h2>
            <p className="text-gray-600">Driver ID: DR-{String(profile.id).padStart(3, '0')}</p>
            <div className="flex items-center mt-2">
              <StarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-1" />
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">4.8</span>
              <span className="text-gray-600 ml-2">(234 reviews)</span>
            </div>
            {!isEditing && (
              <Button 
                size="sm" 
                className="mt-2 bg-green-600 hover:bg-green-700"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              <UserIcon className="h-4 w-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing 
                  ? 'focus:ring-2 focus:ring-green-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              <EnvelopeIcon className="h-4 w-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing 
                  ? 'focus:ring-2 focus:ring-green-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
              <PhoneIcon className="h-4 w-4 inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg ${
                isEditing 
                  ? 'focus:ring-2 focus:ring-green-500' 
                  : 'bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>
          {isEditing && (
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                New Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-4 mt-8">
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Update Profile'}
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-3 sm:p-4 lg:p-6">
        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Performance Statistics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-2">
              <TruckIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats?.total_trips ?? 0}</div>
            <div className="text-sm sm:text-base text-gray-600">Total Trips</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-2">
              <ClockIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-green-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats?.on_time_rate ?? 0}%</div>
            <div className="text-sm sm:text-base text-gray-600">On-Time Rate</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-2">
              <UserIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats?.passengers_served ?? 0}</div>
            <div className="text-sm sm:text-base text-gray-600">Passengers Served</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-2">
              <StarIcon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-yellow-600" />
            </div>
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stats?.average_rating ?? 0}</div>
            <div className="text-sm sm:text-base text-gray-600">Average Rating</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
