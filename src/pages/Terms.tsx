import React from 'react';
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="prose">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">1. Acceptance of Terms</h2>
          <p className="mb-4">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Use License</h2>
          <p className="mb-4">Permission is granted to temporarily access the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Disclaimer</h2>
          <p className="mb-4">The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Contact Us</h2>
          <p className="mb-4">If you have any questions about these Terms, please contact us.</p>
        </div>
      </Card>
    </div>
  );
};

export default Terms;