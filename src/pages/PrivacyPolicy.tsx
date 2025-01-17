import React from 'react';
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Create an account</li>
            <li>Use our services</li>
            <li>Contact us for support</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and maintain our services</li>
            <li>Improve our services</li>
            <li>Communicate with you</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Contact Us</h2>
          <p className="mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;