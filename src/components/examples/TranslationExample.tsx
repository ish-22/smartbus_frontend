'use client';

import { useState } from 'react';
import { useTranslation, useTranslatedText, useTranslatedTexts } from '@/hooks/useTranslation';
import TranslatedText, { TranslatedHeading, TranslatedButton } from '@/components/common/TranslatedText';

export default function TranslationExample() {
  const { translate, currentLanguage, isTranslating } = useTranslation();
  const [customText, setCustomText] = useState('');
  const [translatedCustomText, setTranslatedCustomText] = useState('');

  // Example 1: Auto-translated text
  const welcomeText = useTranslatedText('Welcome to SmartBus');
  
  // Example 2: Batch translation
  const menuItems = ['Dashboard', 'Bookings', 'Routes', 'Settings', 'Profile'];
  const translatedMenuItems = useTranslatedTexts(menuItems);

  // Example 3: Manual translation
  const handleTranslateCustomText = async () => {
    if (customText.trim()) {
      const result = await translate(customText);
      setTranslatedCustomText(result);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <TranslatedHeading 
          text="Translation Demo" 
          level={1}
          className="text-3xl font-bold text-gray-900 mb-2"
        />
        <TranslatedText 
          text="Current language" 
          className="text-gray-600"
        />
        <span className="ml-2 font-semibold text-blue-600">{currentLanguage.toUpperCase()}</span>
      </div>

      {/* Example 1: Simple translated text */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Example 1: Auto-translated Text</h3>
        <div className="space-y-2">
          <p><strong>Original:</strong> Welcome to SmartBus</p>
          <p><strong>Translated:</strong> {welcomeText}</p>
        </div>
      </div>

      {/* Example 2: Translated components */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Example 2: Translated Components</h3>
        <div className="space-y-4">
          <TranslatedHeading 
            text="Bus Booking System" 
            level={2}
            className="text-xl font-semibold text-blue-600"
          />
          <TranslatedText 
            text="Book your bus tickets easily and track your journey in real-time."
            className="text-gray-700"
          />
          <div className="flex gap-2">
            <TranslatedButton
              text="Book Now"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            />
            <TranslatedButton
              text="View Routes"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Example 3: Menu items */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Example 3: Menu Items</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {translatedMenuItems.map((item, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded text-center">
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Example 4: Manual translation */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Example 4: Manual Translation</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to translate:
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type something..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleTranslateCustomText}
            disabled={isTranslating || !customText.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isTranslating ? 'Translating...' : 'Translate'}
          </button>
          {translatedCustomText && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p><strong>Translation:</strong> {translatedCustomText}</p>
            </div>
          )}
        </div>
      </div>

      {/* Common UI Elements */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Example 5: Common UI Elements</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <TranslatedButton
              text="Save"
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            />
            <TranslatedButton
              text="Cancel"
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            />
            <TranslatedButton
              text="Delete"
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            />
            <TranslatedButton
              text="Edit"
              className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <TranslatedText text="Name" className="block text-sm font-medium text-gray-700" />
            <TranslatedText text="Email Address" className="block text-sm font-medium text-gray-700" />
            <TranslatedText text="Phone Number" className="block text-sm font-medium text-gray-700" />
            <TranslatedText text="Date of Birth" className="block text-sm font-medium text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}