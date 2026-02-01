import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const companyInfo = {
    name: 'WarehouseHub',
    legalName: 'WarehouseHub Technologies Inc.',
    address: '123 Technology Park, Suite 450, San Francisco, CA 94107',
    email: 'privacy@warehousehub.com',
    website: 'https://www.warehousehub.com',
    supportEmail: 'support@warehousehub.com',
    dpoEmail: 'dpo@warehousehub.com'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Privacy Policy
            </h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-gray-600">
              <span className="font-medium">{companyInfo.name}</span>
              <span className="hidden md:block">•</span>
              <span>Effective: {currentDate}</span>
              <span className="hidden md:block">•</span>
              <span>Version: 3.1</span>
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

      {/* Quick Navigation */}
      <div className="mb-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-2 uppercase tracking-wide">
          Quick Navigation
        </h3>
        <div className="flex flex-wrap gap-3">
          {[
            'Introduction',
            'Data Collection',
            'Data Usage',
            'Data Sharing',
            'Data Security',
            'Your Rights',
            'Compliance',
            'Contact'
          ].map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase().replace(' ', '-')}`}
              className="px-3 py-1.5 text-sm bg-white border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors"
            >
              {section}
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Introduction */}
        <section id="introduction" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">1. Introduction & Scope</h2>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">{companyInfo.legalName}</span> ("we," "our," or "us") operates the WarehouseHub Warehouse Management Platform ("Platform" or "Service"). We are committed to protecting the privacy and security of your data in accordance with global privacy standards including GDPR, CCPA/CPRA, and other applicable regulations.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Scope of This Policy</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Data processed through the WarehouseHub platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Website visitors to warehousehub.com</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Business customer information and operational data</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section id="data-collection" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">2. Data We Collect</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Data */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold">A</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Business Customer Data</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Company information, billing details, and contact information</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>User account credentials and authentication data</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Payment and transaction information</span>
                </li>
              </ul>
            </div>

            {/* Operational Data */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">B</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Operational Data</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>Inventory records, SKUs, and product information</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>Supplier and customer contact details</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                  <span>Transaction logs and audit trails</span>
                </li>
              </ul>
            </div>

            {/* Technical Data */}
            <div className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 font-bold">C</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Technical & Usage Data</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Automatically Collected</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                      <span>IP addresses and device identifiers</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                      <span>Browser type and system configuration</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                      <span>Usage patterns and feature engagement</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Cookies & Tracking</h4>
                  <p className="text-gray-700 mb-2">
                    We use essential cookies for platform functionality and optional analytics cookies to improve user experience.
                  </p>
                  <button
                    onClick={() => navigate('/cookie-policy')}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    View Cookie Policy →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Usage */}
        <section id="data-usage" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Data</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Service Delivery',
                description: 'Providing core warehouse management functionality',
                icon: '🚚'
              },
              {
                title: 'Security & Compliance',
                description: 'Protecting against unauthorized access and fraud',
                icon: '🔒'
              },
              {
                title: 'Platform Improvement',
                description: 'Enhancing features and user experience',
                icon: '📈'
              },
              {
                title: 'Customer Support',
                description: 'Resolving issues and providing assistance',
                icon: '💬'
              },
              {
                title: 'Legal Obligations',
                description: 'Complying with regulatory requirements',
                icon: '⚖️'
              },
              {
                title: 'Communication',
                description: 'Sending important updates and notifications',
                icon: '📧'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sharing */}
        <section id="data-sharing" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">4. Data Sharing & Third Parties</h2>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-100 rounded-full">
                <span className="text-red-600 font-semibold text-sm">WE DO NOT SELL YOUR DATA</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Authorized Sharing</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Service Providers</h4>
                    <p className="text-sm text-gray-600">
                      Trusted partners for hosting, payment processing, and analytics under strict data protection agreements.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Business Transfers</h4>
                    <p className="text-sm text-gray-600">
                      In case of merger, acquisition, or sale, with appropriate privacy safeguards.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Disclosures</h3>
                <p className="text-gray-700">
                  We may disclose information when required by law, to protect our rights, or to prevent fraud or security threats.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section id="data-security" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">5. Data Security Measures</h2>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Safeguards</h3>
                <ul className="space-y-3">
                  {[
                    'AES-256 encryption for data at rest',
                    'TLS 1.3 encryption for data in transit',
                    'Multi-factor authentication',
                    'Regular security audits & penetration testing',
                    'Intrusion detection & prevention systems'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Organizational Measures</h3>
                <ul className="space-y-3">
                  {[
                    'Role-based access controls',
                    'Employee privacy training',
                    'Data protection officer oversight',
                    'Incident response plan',
                    'Regular compliance reviews'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> While we implement industry-standard security measures, no electronic transmission or storage method is 100% secure.
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section id="your-rights" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">6. Your Privacy Rights</h2>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[
                { right: 'Access', desc: 'Request access to your personal data' },
                { right: 'Correction', desc: 'Rectify inaccurate information' },
                { right: 'Deletion', desc: 'Request data erasure' },
                { right: 'Restriction', desc: 'Limit data processing' },
                { right: 'Portability', desc: 'Receive data in machine-readable format' },
                { right: 'Objection', desc: 'Object to certain processing' }
              ].map((item, index) => (
                <div key={index} className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <div className="text-blue-600 font-bold text-lg mb-1">{item.right}</div>
                  <div className="text-sm text-gray-700">{item.desc}</div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-5">
              <h3 className="font-semibold text-gray-900 mb-3">How to Exercise Your Rights</h3>
              <p className="text-gray-700 mb-4">
                Submit a request to our Data Protection Officer. We will respond within 30 days as required by applicable law.
              </p>
              <a
                href={`mailto:${companyInfo.dpoEmail}?subject=Privacy Rights Request`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact DPO
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section id="compliance" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">7. Compliance Framework</h2>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">GDPR Compliant</span>
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">CCPA/CPRA Ready</span>
              <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">SOC 2 Type II</span>
              <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">ISO 27001</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">International Data Transfers</h3>
                <p className="text-gray-700">
                  For cross-border data transfers, we implement Standard Contractual Clauses (SCCs) and other approved mechanisms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Retention Period</h3>
                <p className="text-gray-700">
                  We retain data only as long as necessary for service delivery, legal compliance, or legitimate business purposes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">8. Contact Information</h2>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Protection Officer</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <a href={`mailto:${companyInfo.dpoEmail}`} className="text-blue-600 hover:text-blue-700">
                      {companyInfo.dpoEmail}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="text-gray-700">+1 (555) 123-4567</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Corporate Headquarters</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-500">Address</div>
                    <div className="text-gray-700">{companyInfo.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Website</div>
                    <a href={companyInfo.website} className="text-blue-600 hover:text-blue-700">
                      {companyInfo.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Policy Updates</h3>
              <p className="text-gray-700">
                We may update this policy periodically. Significant changes will be notified via email or in-app notification.
                The "Last Updated" date at the top indicates the latest revision.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} {companyInfo.legalName}. All rights reserved.
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => navigate('/terms')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigate('/dpa')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Data Processing Agreement
              </button>
              <button
                onClick={() => navigate('/security')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Security Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;