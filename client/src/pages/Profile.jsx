import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  UserCircleIcon, 
  PencilIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CalendarIcon,
  Cog6ToothIcon,
  HeartIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically dispatch an action to update the user profile
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'settings', name: 'Settings', icon: Cog6ToothIcon },
  ];

  const renderProfileContent = () => {
    if (activeTab === 'profile') {
      return (
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircleIcon className="h-20 w-20 text-neutral-400" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors duration-200">
                <PencilIcon className="h-4 w-4 text-neutral-600" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">{user?.name || 'User'}</h2>
            <p className="text-neutral-600">{user?.email}</p>
          </div>

          {/* Profile Form */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-neutral-900">Personal Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary text-sm"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeTab === 'orders') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-neutral-900">Order History</h3>
          <div className="space-y-4">
            {/* Sample Order */}
            <div className="card-minimal">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900">Order #12345</div>
                  <div className="text-sm text-neutral-600">Placed on March 15, 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-neutral-900">$129.99</div>
                  <div className="text-sm text-green-600">Delivered</div>
                </div>
              </div>
            </div>
            
            <div className="card-minimal">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-neutral-900">Order #12344</div>
                  <div className="text-sm text-neutral-600">Placed on March 10, 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-neutral-900">$89.99</div>
                  <div className="text-sm text-blue-600">Shipped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'wishlist') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-neutral-900">Wishlist</h3>
          <div className="text-center py-12">
            <HeartIcon className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600">No items in your wishlist yet</p>
            <button className="btn-primary mt-4">Start Shopping</button>
          </div>
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-neutral-900">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="card-minimal">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-neutral-600" />
                  <div>
                    <div className="font-medium text-neutral-900">Password</div>
                    <div className="text-sm text-neutral-600">Last updated 3 months ago</div>
                  </div>
                </div>
                <button className="btn-secondary text-sm">Change</button>
              </div>
            </div>

            <div className="card-minimal">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CreditCardIcon className="h-5 w-5 text-neutral-600" />
                  <div>
                    <div className="font-medium text-neutral-900">Payment Methods</div>
                    <div className="text-sm text-neutral-600">Manage your payment options</div>
                  </div>
                </div>
                <button className="btn-secondary text-sm">Manage</button>
              </div>
            </div>

            <div className="card-minimal">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-neutral-600" />
                  <div>
                    <div className="font-medium text-neutral-900">Email Notifications</div>
                    <div className="text-sm text-neutral-600">Order updates and promotions</div>
                  </div>
                </div>
                <button className="btn-secondary text-sm">Configure</button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">My Account</h1>
            <p className="text-neutral-600">Manage your account settings and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-neutral-900 text-white'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="card">
                {renderProfileContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
