/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WebsiteLayout } from '../../components/WebsiteLayout';
import { motion } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  CheckCircle, 
  LayoutDashboard, 
  GraduationCap, 
  FileCheck, 
  Calculator, 
  BadgeHelp,
  Monitor,
  Wifi,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PartnerWithUs = () => {
  const brandPillars = [
    'Strong Brand Value – 10+ years of trust',
    'ISO Certified & Govt. Registered',
    'Complete Academic & Technical Support',
    'Secure Centralized Certificate System',
    'Wallet-Based Transparent Payment System',
    '24×7 Franchise Support',
    'Wide Range of Professional Courses'
  ];

  const benefits = [
    {
      title: 'Online Franchise Panel',
      icon: LayoutDashboard,
      bgColor: 'bg-blue-50 text-blue-700 border-blue-100',
      points: [
        'Student & Admission Management',
        'Fee & Receipt Tracking',
        'Study Material Download',
        'Exam & Result System'
      ]
    },
    {
      title: 'Auto-Generated Collaboration Certificate',
      icon: FileCheck,
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      points: [
        'Franchise Name & Branch Code',
        'Validity & Renewal Tracking',
        'Secure Holographic Design'
      ]
    },
    {
      title: 'Certificate Verification System',
      icon: GraduationCap,
      bgColor: 'bg-orange-50 text-orange-700 border-orange-100',
      points: [
        'Certificate Number Verification',
        'Enrollment ID Check',
        'QR Code Scan'
      ]
    },
    {
      title: 'Complete Accounting Module',
      icon: Calculator,
      bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      points: [
        'Fee Collection',
        'Wallet Balance',
        'Commission & Payout Reports'
      ]
    },
    {
      title: 'Student Management Tools',
      icon: Users,
      bgColor: 'bg-purple-50 text-purple-700 border-purple-100',
      points: [
        'Attendance System',
        'Assignments & Materials',
        'Exam Management',
        'Result Generation'
      ]
    }
  ];

  const requirements = [
    { icon: Monitor, text: '1–2 Computers Minimum' },
    { icon: Building2, text: 'Basic Infrastructure' },
    { icon: Wifi, text: 'Internet Facility' },
    { icon: Compass, text: 'Passion for Teaching & Growth.' }
  ];

  return (
    <WebsiteLayout>
      {/* Breadcrumb row */}
      <div className="bg-gray-100 text-gray-500 py-3.5 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-[11px] font-black uppercase tracking-wider">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-[#FF8282]">Partner With Us</span>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-[#FF8282] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-6">
          <p className="text-xs font-black text-yellow-300 uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full w-fit mx-auto">
            Franchise & Collaboration Opportunity
          </p>
          <h1 className="text-4xl lg:text-7xl font-black tracking-tight uppercase leading-none">
            Partner With Us
          </h1>
          <p className="text-lg lg:text-xl text-yellow-100 font-bold max-w-3xl mx-auto uppercase tracking-wide">
            🌟 Grow With SoftDEV Tally Guru Computer Education
          </p>
          <div className="p-3.5 bg-white/10 rounded-2xl w-fit mx-auto border border-white/20">
             <p className="text-xs lg:text-sm font-extrabold max-w-2xl text-white">
               Partner With One of Basti’s Most Trusted Computer Education Brands
             </p>
          </div>
        </div>
      </section>

      {/* Intro Description */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-[3rem] space-y-4">
            <h2 className="text-xl lg:text-2xl font-black text-[#003366] uppercase leading-snug">
              Certified and U.P. Govt. Registered Institute
            </h2>
            <p className="text-gray-650 font-medium leading-relaxed text-sm lg:text-base">
              SoftDEV Tally Guru Computer Education Center, an ISO Certified and U.P. Govt. Registered Institute, invites passionate individuals, coaching owners, educational institutes, and entrepreneurs to join our Franchise & Collaboration Program.
            </p>
            <p className="text-gray-650 font-medium leading-relaxed text-sm lg:text-base">
              With 10+ years of trusted experience in delivering quality, concept-based computer education, we offer a powerful and profitable opportunity to start or upgrade your own computer training center.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars "Why Partner With Us" */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">
                Our Foundation
              </span>
              <h2 className="text-3xl lg:text-4.5xl font-black text-[#141414] uppercase tracking-tight">
                🤝 Why Partner With Us?
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">
                SoftDEV Tally Guru guarantees absolute operational transparency. Every exam scorecard, receipt, student admission log, and cert template is completely managed online. Here is what we offer to our collaborative networks:
              </p>
              
              <div className="space-y-3.5">
                {brandPillars.map((p, i) => (
                  <div key={i} className="flex items-center space-x-3.5 bg-white p-4 rounded-2xl border border-gray-200/65 shadow-xs">
                     <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />
                     <span className="text-xs font-black text-gray-700 tracking-wide">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[linear-gradient(to_bottom_right,rgba(0,51,102,0.95),rgba(0,102,204,0.95)),url('https://www.transparenttextures.com/patterns/cubes.png')] text-white p-12 rounded-[3.5rem] shadow-xl space-y-6">
               <h3 className="text-2xl font-black uppercase tracking-tight text-yellow-300">
                 A Golden Decade of Professional Trust
               </h3>
               <p className="text-sm font-medium leading-relaxed text-blue-100">
                 Over the past ten years, we have trained thousands of job-ready students specializing in real Tally ERP/Prime modules, advanced corporate accounts, taxation, GST, and standard web technologies. 
               </p>
               <p className="text-sm font-medium leading-relaxed text-blue-100">
                 Our centralized systems issue QR-enabled smart certificates that can be instantly verified from any device across India by prospective employers.
               </p>
               <div className="border-t border-white/10 pt-6">
                 <Link 
                   to="/franchise-info" 
                   className="inline-flex items-center space-x-2 bg-yellow-400 text-blue-950 font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-white hover:text-blue-900 transition-colors"
                 >
                   <span>Become a Partner</span>
                   <ArrowRight size={14} />
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Benefits "Bento Grid" */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-widest">
              Digital Platform Features
            </span>
            <h2 className="text-3xl lg:text-4.5xl font-black text-[#141414] uppercase">
              📝 Franchise Benefits
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
              We provide state-of-the-art backend panels. Check out the key core digital modules you get as an authorized affiliate:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => {
              const IconComp = b.icon;
              return (
                <div key={i} className="bg-white border rounded-[2.5rem] border-gray-200 p-8 hover:shadow-lg transition-shadow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className={`p-4 rounded-3xl border w-fit ${b.bgColor}`}>
                      <IconComp size={22} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 uppercase">
                      {b.title}
                    </h3>
                    <ul className="space-y-2 mt-4 border-t border-gray-100 pt-4">
                      {b.points.map((pt, ptIdx) => (
                        <li key={ptIdx} className="flex items-start space-x-2 text-xs font-semibold text-gray-600">
                          <span className="text-[#FF8282] mt-1">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* CTA Bento Box */}
            <div className="bg-linear-to-br from-blue-700 to-blue-900 text-white rounded-[2.5rem] p-8 flex flex-col justify-between border-none">
              <div className="space-y-4">
                <div className="p-3 bg-white/10 rounded-2xl w-fit">
                  <Sparkles size={18} className="text-yellow-300" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-white leading-tight">
                  Ready to upgrade your computer training hub?
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed font-semibold">
                  Get full documentation access, printable banners, course materials and digital wallets custom provisioned.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <Link to="/franchise-info" className="text-xs font-black text-yellow-300 uppercase tracking-widest hover:underline flex items-center space-x-1">
                  <span>Send Onboarding Request</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Requirements */}
      <section className="py-24 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
             <span className="text-xs font-black text-gray-400 bg-gray-200 px-3 py-1 rounded-full uppercase tracking-widest">
               Eligibility Guidelines
             </span>
             <h2 className="text-3xl font-black text-gray-950 uppercase">
               💼 Franchise Requirements
             </h2>
             <p className="text-gray-500 max-w-xl mx-auto font-medium">
               To ensure we maintain a standard of excellence, franchises are expected to fulfill these fundamental setup prerequisites:
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requirements.map((req, i) => {
              const IconComp = req.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-200 text-center space-y-4 shadow-xs">
                  <div className="w-12 h-12 bg-red-50 text-red-650 rounded-2xl flex items-center justify-center mx-auto">
                    <IconComp size={20} />
                  </div>
                  <h4 className="text-xs font-black text-gray-900 tracking-wide uppercase leading-snug">
                    {req.text}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
};
