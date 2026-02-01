import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();
  const [accepted, setAccepted] = useState(false);

  const companyInfo = {
    name: 'WarehouseHub',
    legalName: 'WarehouseHub Technologies Inc.',
    website: 'https://www.warehousehub.com',
    supportEmail: 'legal@warehousehub.com',
    address: '123 Technology Park, Suite 450, San Francisco, CA 94107',
    effectiveDate: 'January 1, 2024'
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Terms of Service
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span>{companyInfo.name}</span>
              <span className="hidden md:block">•</span>
              <span>Effective: {companyInfo.effectiveDate}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Acceptance Notice */}
      <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notice</h3>
            <p className="text-blue-800">
              By accessing or using WarehouseHub services, you agree to be bound by these Terms of Service. 
              Please read them carefully before using our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Table of Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { num: '1', title: 'Agreement & Acceptance' },
            { num: '2', title: 'Service Description' },
            { num: '3', title: 'Account Registration' },
            { num: '4', title: 'Subscription & Payment' },
            { num: '5', title: 'Intellectual Property' },
            { num: '6', title: 'User Responsibilities' },
            { num: '7', title: 'Data Protection' },
            { num: '8', title: 'Limitation of Liability' },
            { num: '9', title: 'Termination' },
            { num: '10', title: 'Governing Law' },
            { num: '11', title: 'Modifications' },
            { num: '12', title: 'Contact' }
          ].map((item) => (
            <a
              key={item.num}
              href={`#section-${item.num}`}
              className="group flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-md flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">
                  {item.num}
                </span>
              </div>
              <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                {item.title}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Terms Content */}
      <div className="space-y-10">
        {/* Section 1 */}
        <section id="section-1" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">1</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Agreement & Acceptance</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer," "you," or "your") and {companyInfo.legalName} ("WarehouseHub," "we," "us," or "our") governing your access to and use of the WarehouseHub warehouse management platform ("Service").
              </p>
              <div className="bg-gray-50 border-l-4 border-blue-500 p-4 my-4">
                <p className="text-gray-700 italic">
                  By registering for, accessing, or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="section-2" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">2</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Service Description</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Features</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {[
                'Real-time inventory tracking',
                'Warehouse zone management',
                'Order processing & fulfillment',
                'Supplier & vendor management',
                'Reporting & analytics dashboard',
                'Mobile scanning integration',
                'API access for integrations',
                'Multi-warehouse support'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Service Level Agreement</h4>
              <p className="text-yellow-700 text-sm">
                We guarantee 99.9% uptime for our core services. Detailed SLA terms are available in your subscription agreement.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="section-3" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Account Registration</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Eligibility Requirements</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Must be 18 years or older</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Valid business entity registration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Authorized representative of the business</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>Valid payment method for paid plans</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2">Prohibited Activities</h4>
                <ul className="space-y-2 text-red-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Sharing account credentials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Unauthorized access attempts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Reverse engineering the platform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">•</span>
                    <span>Using service for illegal activities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section id="section-4" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">4</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Subscription & Payment</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-semibold text-gray-700">Plan</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Billing</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Payment Terms</th>
                    <th className="text-left p-3 font-semibold text-gray-700">Cancellation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3">Monthly</td>
                    <td className="p-3">Recurring monthly</td>
                    <td className="p-3">Credit card required</td>
                    <td className="p-3">30 days notice</td>
                  </tr>
                  <tr>
                    <td className="p-3">Annual</td>
                    <td className="p-3">Annual upfront</td>
                    <td className="p-3">Invoice or credit card</td>
                    <td className="p-3">60 days notice</td>
                  </tr>
                  <tr>
                    <td className="p-3">Enterprise</td>
                    <td className="p-3">Custom terms</td>
                    <td className="p-3">Net 30 invoicing</td>
                    <td className="p-3">Contract terms apply</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> All prices are exclusive of taxes. You are responsible for all applicable sales, use, and other taxes.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section id="section-5" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">5</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WarehouseHub Property</h3>
                <p className="text-gray-700">
                  All rights, title, and interest in the Service, including all software, algorithms, interfaces, technology, documentation, and content, are owned by {companyInfo.legalName} and protected by intellectual property laws.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Data</h3>
                <p className="text-gray-700">
                  You retain all rights to your business data, inventory information, and operational data uploaded to the Service. We only process this data as described in our Privacy Policy and Data Processing Agreement.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">License Grant</h3>
                <p className="text-gray-700">
                  We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your internal business operations during the subscription term.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Remaining sections would follow similar pattern... */}

        {/* Acceptance Section */}
        <section className="mt-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center h-5">
                <input
                  id="terms-acceptance"
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="terms-acceptance" className="text-gray-900 font-medium">
                  I have read and agree to the Terms of Service
                </label>
                <p className="text-gray-600 text-sm mt-1">
                  By checking this box, you acknowledge that you have read, understood, and agree to be bound by these Terms.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => navigate('/privacy-policy')}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Privacy Policy
              </button>
              <button
                onClick={() => accepted && navigate('/')}
                disabled={!accepted}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  accepted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Platform
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
          </div>
          <div className="flex gap-6">
            <button
              onClick={() => navigate('/support')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Support
            </button>
            <a
              href={`mailto:${companyInfo.supportEmail}`}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Legal Inquiries
            </a>
            <button
              onClick={() => window.print()}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Print Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;