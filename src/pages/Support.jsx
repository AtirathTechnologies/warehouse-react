import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'normal'
  });

  const supportInfo = {
    email: 'support@warehousehub.com',
    phone: '+1 (800) 555-1234',
    hours: 'Monday-Friday, 9AM-6PM PST',
    emergency: '+1 (800) 555-5678 (24/7)',
    address: '123 Technology Park, Suite 450, San Francisco, CA 94107'
  };

  const faqItems = [
    {
      question: 'How do I set up my first warehouse?',
      answer: 'Navigate to Settings → Warehouses → Add New Warehouse. Follow the setup wizard to configure zones, storage types, and access permissions.',
      category: 'Setup'
    },
    {
      question: 'Can I integrate with my existing ERP system?',
      answer: 'Yes, we offer API integration and pre-built connectors for major ERP systems including SAP, Oracle, and Microsoft Dynamics.',
      category: 'Integration'
    },
    {
      question: 'How do I handle inventory discrepancies?',
      answer: 'Use the Inventory Audit feature to perform cycle counts and reconcile differences. Discrepancy reports can be generated for review.',
      category: 'Inventory'
    },
    {
      question: 'What security measures protect my data?',
      answer: 'We implement AES-256 encryption, multi-factor authentication, regular security audits, and comply with SOC 2 Type II standards.',
      category: 'Security'
    },
    {
      question: 'How do I add new users to my account?',
      answer: 'Account administrators can add users via Settings → Users → Invite User. Role-based permissions can be configured for each user.',
      category: 'Account'
    },
    {
      question: 'What happens if I exceed my storage limit?',
      answer: 'You will receive notifications when approaching your limit. Contact support to upgrade your plan or purchase additional storage.',
      category: 'Billing'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Support request submitted:', formData);
    alert('Support request submitted successfully! We will contact you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      priority: 'normal'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Support Center
            </h1>
            <p className="text-gray-600">
              Get help with WarehouseHub, submit tickets, and access resources
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Status Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <span className="font-medium text-green-800">All systems operational</span>
              <span className="text-green-600 mx-2">•</span>
              <span className="text-green-600 text-sm">Last updated: Today, 10:30 AM</span>
            </div>
            <Link to="/status" className="text-green-700 hover:text-green-800 text-sm font-medium">
              View Status Page →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Contact Info & Quick Actions */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email Support</div>
                    <a href={`mailto:${supportInfo.email}`} className="text-blue-600 hover:text-blue-700 font-medium">
                      {supportInfo.email}
                    </a>
                    <div className="text-xs text-gray-500 mt-1">Response time: 4-6 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone Support</div>
                    <div className="text-gray-900 font-medium">{supportInfo.phone}</div>
                    <div className="text-xs text-gray-500 mt-1">{supportInfo.hours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Emergency Support</div>
                    <div className="text-gray-900 font-medium">{supportInfo.emergency}</div>
                    <div className="text-xs text-gray-500 mt-1">Critical issues only</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { title: 'Documentation', icon: '📚', link: '/docs' },
                  { title: 'API Reference', icon: '🔌', link: '/api' },
                  { title: 'Video Tutorials', icon: '🎬', link: '/tutorials' },
                  { title: 'System Status', icon: '📊', link: '/status' },
                  { title: 'Release Notes', icon: '📝', link: '/releases' },
                  { title: 'Community Forum', icon: '💬', link: '/community' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium group-hover:text-blue-600">{item.title}</span>
                    <span className="ml-auto text-gray-400 group-hover:text-blue-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Support Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-800">Monday - Friday</span>
                  <span className="font-medium text-blue-900">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Saturday</span>
                  <span className="font-medium text-blue-900">10:00 AM - 4:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Sunday</span>
                  <span className="font-medium text-blue-900">Emergency Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Tabs Content */}
        <div className="lg:col-span-2">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {[
                { id: 'contact', label: 'Contact Support' },
                { id: 'faq', label: 'FAQ' },
                { id: 'guides', label: 'Guides' },
                { id: 'tickets', label: 'My Tickets' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[500px]">
            {/* Contact Support Tab */}
            {activeTab === 'contact' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit a Support Request</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority *
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="low">Low - General Inquiry</option>
                        <option value="normal">Normal - Feature Request</option>
                        <option value="high">High - Bug Report</option>
                        <option value="urgent">Urgent - System Down</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief description of your issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Please provide detailed information about your issue..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Submit Support Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({
                        name: '',
                        email: '',
                        company: '',
                        subject: '',
                        message: '',
                        priority: 'normal'
                      })}
                      className="px-6 py-3 text-gray-700 bg-gray-100 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Clear Form
                    </button>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>By submitting this form, you agree to our <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>. We typically respond within 4-6 business hours.</p>
                  </div>
                </form>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div>
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-gray-700">{item.answer}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Was this helpful? 👍 👎
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guides Tab */}
            {activeTab === 'guides' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Getting Started Guides</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Quick Start Guide', duration: '15 min', icon: '🚀' },
                    { title: 'Inventory Setup', duration: '30 min', icon: '📦' },
                    { title: 'User Management', duration: '20 min', icon: '👥' },
                    { title: 'Reporting Dashboard', duration: '25 min', icon: '📊' },
                    { title: 'API Integration', duration: '45 min', icon: '🔌' },
                    { title: 'Mobile App Setup', duration: '20 min', icon: '📱' }
                  ].map((guide, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{guide.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">{guide.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>⏱️ {guide.duration} read</span>
                            <span>•</span>
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                              Read Guide →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tickets Tab */}
            {activeTab === 'tickets' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">My Support Tickets</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    + New Ticket
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
                      <div className="col-span-5">Ticket</div>
                      <div className="col-span-3">Status</div>
                      <div className="col-span-2">Priority</div>
                      <div className="col-span-2">Last Updated</div>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[
                      { id: 'TKT-1234', subject: 'Inventory sync issue', status: 'Open', priority: 'High', date: 'Today, 10:30 AM' },
                      { id: 'TKT-1233', subject: 'User permission question', status: 'In Progress', priority: 'Normal', date: 'Yesterday, 3:45 PM' },
                      { id: 'TKT-1232', subject: 'Billing inquiry', status: 'Resolved', priority: 'Low', date: 'Jan 25, 2024' },
                      { id: 'TKT-1231', subject: 'API integration support', status: 'Resolved', priority: 'Normal', date: 'Jan 24, 2024' }
                    ].map((ticket) => (
                      <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-5">
                            <div className="font-medium text-gray-900">{ticket.subject}</div>
                            <div className="text-sm text-gray-500">{ticket.id}</div>
                          </div>
                          <div className="col-span-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                              ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {ticket.status}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                              ticket.priority === 'Normal' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <div className="col-span-2 text-sm text-gray-600">{ticket.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="mb-2">Need immediate assistance? Call our emergency line: {supportInfo.emergency}</p>
          <p className="text-sm">© {new Date().getFullYear()} WarehouseHub. All support interactions are governed by our <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>.</p>
        </div>
      </div>
    </div>
  );
};

export default Support;