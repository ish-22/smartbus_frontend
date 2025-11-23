'use client';

import { useTranslate, useTranslateArray } from '@/hooks/useTranslate';
import { useTranslation } from '@/context/TranslationContext';
import { TButton, THeading, T } from '@/components/ui/TranslatedText';
import { useState } from 'react';

export default function TranslationDemoPage() {
  const { currentLanguage, isTranslating, translateText } = useTranslation();
  const [customText, setCustomText] = useState('');
  const [translatedCustomText, setTranslatedCustomText] = useState('');
  
  // Auto-translated texts (used in UI)
  const welcomeText = useTranslate('Welcome to SmartBus Translation Demo');
  console.log('Welcome text:', welcomeText); // Use the variable
  
  // Batch translated menu items
  const menuItems = ['Dashboard', 'Bookings', 'Routes', 'Passengers', 'Drivers', 'Reports', 'Settings'];
  const translatedMenuItems = useTranslateArray(menuItems);
  
  const handleCustomTranslate = async () => {
    if (customText.trim()) {
      const result = await translateText(customText);
      setTranslatedCustomText(result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
        <THeading text="SmartBus Global Translation System" level={1} className="text-3xl font-bold mb-4" />
        <T className="text-lg opacity-90">Complete project translation using FREE Google Translate API</T>
        <div className="mt-4 flex justify-center items-center gap-4">
          <span className="text-sm">Current Language:</span>
          <span className="bg-white text-blue-600 px-3 py-1 rounded-full font-semibold">
            {currentLanguage.toUpperCase()}
          </span>
          {isTranslating && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm">
              Translating...
            </span>
          )}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <THeading text="Real-time Translation" level={3} className="text-xl font-semibold mb-3 text-blue-600" />
          <T className="text-gray-600">Instant translation without page reloads using free Google Translate API.</T>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <THeading text="Smart Caching" level={3} className="text-xl font-semibold mb-3 text-green-600" />
          <T className="text-gray-600">Translations are cached in localStorage for better performance and offline access.</T>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <THeading text="Multi-language Support" level={3} className="text-xl font-semibold mb-3 text-purple-600" />
          <T className="text-gray-600">Support for Sinhala, Tamil, English and 7+ other languages.</T>
        </div>
      </div>

      {/* Navigation Menu Demo */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <THeading text="Navigation Menu Translation" level={2} className="text-2xl font-semibold mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {translatedMenuItems.map((item, index) => (
            <div key={index} className="bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-center cursor-pointer transition-colors">
              <span className="text-blue-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Translation Test */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <THeading text="Custom Text Translation" level={2} className="text-2xl font-semibold mb-4" />
        <div className="space-y-4">
          <div>
            <T as="label" className="block text-sm font-medium text-gray-700 mb-2">Enter text to translate:</T>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type something in English..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <TButton
            text="Translate Now"
            onClick={handleCustomTranslate}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
            disabled={!customText.trim()}
          />
          {translatedCustomText && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-md">
              <T className="text-sm font-medium text-green-800">Translation Result:</T>
              <p className="text-green-700 mt-1">{translatedCustomText}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <THeading text="Quick Actions" level={2} className="text-xl font-semibold mb-4" />
        <div className="flex flex-wrap gap-3">
          <TButton text="Book a Ticket" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" />
          <TButton text="Track Bus" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700" />
          <TButton text="View Schedule" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700" />
          <TButton text="Contact Support" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700" />
        </div>
      </div>
    </div>
  );
}