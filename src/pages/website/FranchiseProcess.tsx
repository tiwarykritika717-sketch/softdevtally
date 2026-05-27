/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WebsiteLayout } from '../../components/WebsiteLayout';
import { motion } from 'motion/react';
import { 
  FileText, 
  Search, 
  HelpCircle, 
  ShieldCheck, 
  Award, 
  Presentation, 
  TrendingUp, 
  Rss, 
  ArrowRight, 
  MapPin, 
  Mail, 
  Globe, 
  Building2, 
  Users2, 
  Laptop, 
  BookOpen, 
  Wallet,
  Play,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FranchiseProcess = () => {
  const steps = [
    {
      num: '01',
      title: 'Enquiry & Application',
      icon: FileText,
      desc: 'Interested individuals or institutions can fill out the Franchise Enquiry Form on our website or contact our Head Office. Our team will share detailed information about franchise eligibility, investment, and support structure.'
    },
    {
      num: '02',
      title: 'Evaluation & Discussion',
      icon: Search,
      desc: 'Our Franchise Development Team will connect with you for an online/offline discussion to evaluate:',
      bullets: [
        'Proposed location and area',
        'Local demand for computer & Tally education',
        'Experience and business profile of the applicant'
      ]
    },
    {
      num: '03',
      title: 'Proposal & Approval',
      icon: FileText,
      desc: 'Once shortlisted, a detailed Franchise Proposal will be shared, outlining:',
      bullets: [
        'Franchise fee and setup cost',
        'ROI and business model',
        'Terms of operation and branding guidelines'
      ],
      extra: 'After mutual agreement, the applicant will receive a Letter of Intent (LOI) for franchise approval.'
    },
    {
      num: '04',
      title: 'Agreement & Documentation',
      icon: ShieldCheck,
      desc: 'Upon approval, both parties will sign the Franchise Agreement under Softdev Tally Guru Prashikshan Sansthan Society (Reg. No. G-58913/1442).',
      bullets: [
        'ID & Address Proof',
        'Business Registration Certificate (if applicable)',
        'Passport-size photographs',
        'Address & layout of proposed center'
      ]
    },
    {
      num: '05',
      title: 'Infrastructure Setup',
      icon: Laptop,
      desc: 'Franchisee sets up the center as per Softdev Tally Guru Branding and Infrastructure Guidelines:',
      bullets: [
        'Classroom and Lab Setup',
        'Branding Material Installation',
        'Computer Systems and Internet Facility',
        'Faculty Recruitment'
      ],
      extra: 'Support is provided at every stage by our Central Franchise Support Team.'
    },
    {
      num: '06',
      title: 'Training & Certification',
      icon: Presentation,
      desc: 'Empowering your educators and systems:',
      bullets: [
        'Faculty Training on Tally, GST, and Computer Modules',
        'ERP Login & Online Portal Access',
        'Certificate Issuance Integration (Centralized System)'
      ]
    },
    {
      num: '07',
      title: 'Launch & Promotion',
      icon: Play,
      desc: 'Kickstarting your branch success:',
      bullets: [
        'Local Marketing & Promotion Material',
        'Student Admission Campaigns',
        'Online Portal Listing under “Find a Center”'
      ]
    },
    {
      num: '08',
      title: 'Operations & Support',
      icon: Settings,
      desc: 'Ensuring continuous growth and smooth execution:',
      bullets: [
        'Continuous academic and marketing support',
        'Regular training and audit visits',
        'Wallet-based financial transactions between Admin & Franchise',
        'Certificate issuance and verification through the Centralized ERP System'
      ]
    }
  ];

  const reasons = [
    { title: 'Recognized & Authorised Tally Partner', desc: 'Partner with a brand that has direct certification capability and immense industry authority.', icon: Award },
    { title: 'Centralized Certificate & Verification System', desc: 'Secure student portal with QR verification and instantly downloadable official certificates.', icon: ShieldCheck },
    { title: 'Transparent Wallet & Accounting Module', desc: 'Manage exam logs, student fee collections, and payouts via our centralized portal.', icon: Wallet },
    { title: 'Digital Learning Support', desc: 'Access study materials, e-contents, and centralized syllabus modules for diverse streams.', icon: BookOpen },
    { title: 'Branding and Advertising Assistance', desc: 'High-quality banners, flyers, social media kits, and regional marketing pushes.', icon: Rss }
  ];

  return (
    <WebsiteLayout>
      {/* Banner */}
      <section className="bg-gradient-to-br from-[#003366] via-[#004080] to-blue-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <p className="text-xs lg:text-sm font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1.5 rounded-full w-fit mx-auto">
            SOFTDEV TALLY GURU
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight leading-none uppercase">
            Franchise Process
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 font-medium max-w-3xl mx-auto">
            Join India’s Leading Computer & Tally Training Network. We invite passionate educators and entrepreneurs to build the future of technical skills.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-2xl lg:text-3xl font-black text-[#141414] uppercase tracking-tight">
            Welcome to SOFTDEV TALLY GURU
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-base leading-relaxed font-semibold max-w-4xl mx-auto">
            SOFTDEV TALLY GURU invites passionate educators and entrepreneurs to join our growing network of computer and Tally training centers across India. As an Authorised Tally Education Partner and a Certified Institute, we offer a transparent, profitable, and supportive franchise system.
          </p>
        </div>
      </section>

      {/* Steps Flow */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Eight Stage Operations
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 uppercase">
              Step-by-Step Franchise Process
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
              A carefully structured onboarding pathway to make your computer institute launching simple and automated.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div key={idx} className="bg-gray-50/50 hover:bg-white border hover:border-blue-200 transition-all duration-300 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group flex flex-col justify-between">
                  {/* Subtle water-marked background step number */}
                  <div className="absolute right-6 top-4 text-7xl font-black text-gray-100 select-none group-hover:text-blue-55 pointer-events-none group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3.5 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComp size={20} />
                      </div>
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-700 transition-colors">
                        Step {step.num}: {step.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {step.desc}
                    </p>

                    {step.bullets && (
                      <ul className="space-y-2 mt-4">
                        {step.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start space-x-2 text-xs font-semibold text-gray-700">
                            <span className="text-[#FF8282] mt-1 font-black">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.extra && (
                      <p className="text-xs font-bold text-blue-600 pt-2 border-t border-gray-100 mt-3">
                        💡 {step.extra}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
              Value Proposition
            </span>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-950 uppercase">
              Why Partner with SOFTDEV TALLY GURU
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium">
              We stand apart through our commitment to quality certificates, transparent finance trackers, and rich branding modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, i) => {
              const IconComp = reason.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-200/60 shadow-xs hover:shadow-md transition-all space-y-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-700 flex items-center justify-center rounded-2xl">
                    <IconComp size={22} />
                  </div>
                  <h4 className="text-base font-black text-gray-900 leading-snug uppercase">
                    {reason.title}
                  </h4>
                  <p className="text-xs font-medium text-gray-600 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Head Office & CTA */}
      <section className="py-20 bg-linear-to-br from-red-650 to-[#9A3324] text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl lg:text-4xl font-black tracking-tight leading-none uppercase">
              Head Office Contact
            </h3>
            <p className="text-white/80 font-medium">
              Come meet our corporate onboarding staff or reach us directly at the central operations hub:
            </p>

            <div className="space-y-4 text-sm font-semibold">
              <div className="flex items-start space-x-3">
                <MapPin className="text-amber-300 mt-1 flex-shrink-0" size={18} />
                <p>Near Mahila Degree College, Gandhi Nagar, Companybagh, Basti (U.P.) – 272001</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-amber-300 flex-shrink-0" size={18} />
                <p>info@softdevtallyguru.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="text-amber-300 flex-shrink-0" size={18} />
                <p>www.softdevtallyguru.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white text-[#141414] p-10 rounded-[3rem] text-center space-y-6 shadow-2xl">
            <h4 className="text-xl font-black uppercase text-[#9A3324]">
              Start Your Journey Today
            </h4>
            <p className="text-sm font-medium text-gray-600 leading-relaxed">
              Be a part of the No. 1 Computer Training Network in the Region.
              <br/>
              <span className="font-extrabold text-blue-600">Empower Education. Empower Employment.</span>
            </p>
            <div className="pt-2">
              <Link 
                to="/franchise-info" 
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-650 to-orange-500 text-white font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <span>Partner with Us</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};
