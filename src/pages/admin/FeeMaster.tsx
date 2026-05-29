/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  CreditCard,
  Building2,
  Calendar,
  Clock,
  CheckCircle,
  MoreVertical,
  ChevronRight,
  X,
  Save,
  Trash2,
  Edit2,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { FeeStructure } from '../../types';

export const FeeMaster = () => {
  const { feeStructures, courses, addFeeStructure, updateFeeStructure, deleteFeeStructure, courseCategories } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sessionFilter, setSessionFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  
  const [formData, setFormData] = useState<Partial<FeeStructure>>({
    head: 'Course Fee',
    courseId: '',
    courseName: '',
    frequency: 'Monthly',
    amount: 0,
    discount: 0,
    latePenalty: 0,
    session: '2025-26',
    type: 'Academic',
    status: 'ACTIVE'
  });

  const sessions = ['All', ...Array.from(new Set(feeStructures.map(f => f.session)))];
  const types = ['All', ...Array.from(new Set(feeStructures.map(f => f.type)))];

  const handleOpenModal = (fee?: FeeStructure | any) => {
    if (fee) {
      if (fee.id && fee.id.startsWith('placeholder-')) {
        setEditingFee(null);
        setFormData({
          head: 'Course Fee',
          courseId: fee.courseId,
          courseName: fee.courseName,
          frequency: 'One-time',
          amount: 0,
          discount: 0,
          latePenalty: 0,
          session: fee.session || '2026-27',
          type: 'Academic',
          status: 'ACTIVE'
        });
      } else {
        setEditingFee(fee);
        setFormData(fee);
      }
    } else {
      setEditingFee(null);
      setFormData({
        head: 'Course Fee',
        courseId: '',
        courseName: '',
        frequency: 'Monthly',
        amount: 0,
        discount: 0,
        latePenalty: 0,
        session: '2025-26',
        type: 'Academic',
        status: 'ACTIVE'
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const course = courses.find(c => c.id === formData.courseId);
    const finalData = {
      ...formData,
      courseName: formData.courseId === 'all' ? 'All IT Courses' : (course?.title || ''),
    } as FeeStructure;

    if (editingFee) {
      updateFeeStructure(editingFee.id, finalData);
    } else {
      addFeeStructure({
        ...finalData,
        id: `fs${Date.now()}`
      });
    }
    setIsModalOpen(false);
  };

  const filtered = feeStructures.filter(f => {
    const course = courses.find(c => c.id === f.courseId || c.title === f.courseName);
    const matchesSearch = f.head.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          f.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || f.type === typeFilter;
    const matchesSession = sessionFilter === 'All' || f.session === sessionFilter;
    const matchesCategory = categoryFilter === 'All' || 
                           (f.courseId === 'all') ||
                           (course && course.category.trim() === categoryFilter.trim());
    
    return matchesSearch && matchesType && matchesSession && matchesCategory;
  });

  // Get all real courses (excluding system stubs)
  const realCourses = courses.filter(c => c.category !== 'SYSTEM_STUB');

  // Find any real course that is NOT configured in any fee structure, and add placeholders for them
  const extraRows: any[] = [];
  realCourses.forEach(course => {
    const hasStructure = feeStructures.some(f => f.courseId === course.id);
    if (!hasStructure) {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || course.category.trim() === categoryFilter.trim();
      
      if (matchesSearch && matchesCategory) {
        extraRows.push({
          id: `placeholder-${course.id}`,
          head: 'Not Configured',
          courseId: course.id,
          courseName: course.title,
          frequency: '--',
          amount: 0,
          discount: 0,
          latePenalty: 0,
          session: sessionFilter === 'All' ? '2026-27' : sessionFilter,
          type: 'Academic',
          status: 'INACTIVE',
          isPlaceholder: true
        });
      }
    }
  });

  const displayList = [...filtered, ...extraRows];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-[#141414] tracking-tight uppercase">Fee Master</h1>
          <p className="text-sm text-[#888888] font-mono">Structure your institute revenue and course pricing models.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-8 py-4 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Define Fee Structure</span>
        </button>
      </div>



      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" size={18} />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by fee head or course..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#F0F0F0] rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-blue-500/5 shadow-sm transition-all text-sm font-medium"
          />
        </div>
        <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-white border border-[#F0F0F0] rounded-2xl px-4 py-2">
               <Filter size={14} className="text-blue-600 mr-2" />
               <select 
                 value={typeFilter}
                 onChange={(e) => setTypeFilter(e.target.value)}
                 className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest cursor-pointer"
               >
                 {types.map(t => <option key={t} value={t}>{t} Type</option>)}
               </select>
            </div>
            <div className="flex items-center bg-white border border-[#F0F0F0] rounded-2xl px-4 py-2">
               <Layers size={14} className="text-emerald-600 mr-2" />
               <select 
                 value={categoryFilter}
                 onChange={(e) => setCategoryFilter(e.target.value)}
                 className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest cursor-pointer"
               >
                 <option value="All">All Categories</option>
                 {courseCategories.map(cat => (
                   <option key={cat.id} value={cat.name}>{cat.name}</option>
                 ))}
               </select>
            </div>
            <div className="flex items-center bg-white border border-[#F0F0F0] rounded-2xl px-4 py-2">
               <Calendar size={14} className="text-purple-600 mr-2" />
               <select 
                 value={sessionFilter}
                 onChange={(e) => setSessionFilter(e.target.value)}
                 className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest cursor-pointer"
               >
                 {sessions.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sessions' : s}</option>)}
               </select>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#F0F0F0] shadow-xl overflow-hidden">
        <div className="p-8 border-b border-[#F5F5F5] flex items-center justify-between">
           <h3 className="text-xs font-black text-[#141414] uppercase tracking-widest">Configured Fee Structures</h3>
           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter">{displayList.length} Results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-[#F0F0F0]">
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest">Fee Head</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest">Category</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest">Course</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest">Amount</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest">Discount</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest text-red-500">Late Penalty</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest">Type</th>
                 <th className="px-8 py-6 text-[9px] font-black text-[#888888] uppercase tracking-widest text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {displayList.map((fee) => (
                <tr key={fee.id} className={clsx(
                  "hover:bg-blue-50/20 transition-colors group",
                  fee.isPlaceholder && "bg-amber-50/5"
                )}>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                       <div className={clsx(
                         "w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-inner",
                         fee.isPlaceholder ? "bg-amber-50 text-amber-500" : "bg-gray-50 text-gray-400 group-hover:bg-white"
                       )}>
                         <CreditCard size={18} />
                       </div>
                       <div className="flex flex-col">
                          <span className={clsx(
                            "text-xs font-black uppercase tracking-tight",
                            fee.isPlaceholder ? "text-amber-600" : "text-[#141414]"
                          )}>{fee.head}</span>
                          <span className="text-[8px] font-black text-[#888888] uppercase tracking-widest">{fee.frequency}</span>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={clsx(
                      "text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter",
                      fee.isPlaceholder ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50"
                    )}>
                      {courses.find(c => c.id === fee.courseId || c.title === fee.courseName)?.category || 'General'}
                    </span>
                  </td>
                  <td className={clsx(
                    "px-8 py-6 font-bold text-[10px] uppercase tracking-tight",
                    fee.isPlaceholder ? "text-gray-500" : "text-blue-600"
                  )}>{fee.courseName}</td>
                  <td className={clsx(
                    "px-8 py-6 text-xs font-black",
                    fee.isPlaceholder ? "text-gray-400" : "text-[#141414]"
                  )}>{fee.isPlaceholder ? '--' : `₹${fee.amount.toLocaleString()}`}</td>
                  <td className="px-8 py-6 text-[10px] font-black text-emerald-600">
                    {fee.isPlaceholder ? '--' : (fee.discount > 0 ? `- ₹${fee.discount.toLocaleString()}` : '--')}
                  </td>
                  <td className={clsx(
                    "px-8 py-6 text-[10px] font-black",
                    fee.isPlaceholder ? "text-gray-400" : "text-red-500"
                  )}>{fee.isPlaceholder ? '--' : `₹${fee.latePenalty.toLocaleString()} / Day`}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-gray-50 text-[8px] font-black uppercase tracking-widest rounded-full text-gray-400">{fee.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center space-x-2">
                       {fee.isPlaceholder ? (
                         <button 
                           onClick={() => handleOpenModal(fee)}
                           className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center space-x-1"
                         >
                           <Plus size={10} />
                           <span>Configure Fee</span>
                         </button>
                       ) : (
                         <>
                           <button 
                             onClick={() => handleOpenModal(fee)}
                             className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                           >
                             <Edit2 size={16} />
                           </button>
                           <button 
                             onClick={() => deleteFeeStructure(fee.id)}
                             className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all"
                           >
                             <Trash2 size={16} />
                           </button>
                         </>
                       )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayList.length === 0 && (
             <div className="p-20 text-center space-y-4">
                <Search size={40} className="mx-auto text-gray-200" />
                <p className="text-sm font-black text-gray-400 uppercase tracking-widest">No matching fee structures found</p>
             </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
            >
               <div className="px-8 py-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#141414] uppercase tracking-tighter">
                      {editingFee ? 'Modify Fee Structure' : 'New Fee Definition'}
                    </h2>
                    <p className="text-[10px] font-black text-[#888888] uppercase tracking-widest">Sync pricing with global standards</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm">
                    <X size={20} />
                  </button>
               </div>

               <form onSubmit={handleSave} className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1">Fee Head / Name</label>
                        <div className="space-y-2">
                           <select 
                              required
                              value={['Course Fee', 'Admission Fee', 'Registration Fee', 'Exam Fee', 'Certificate Fee', 'Monthly Fee', 'Late Penalty', 'Prospectus Fee', 'Backpaper Fee'].includes(formData.head || '') ? formData.head : 'Other'}
                              onChange={(e) => {
                                 if (e.target.value === 'Other') {
                                    setFormData({...formData, head: ''});
                                 } else {
                                    setFormData({...formData, head: e.target.value});
                                 }
                              }}
                              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none"
                           >
                              <option value="Course Fee">Course Fee</option>
                              <option value="Admission Fee">Admission Fee</option>
                              <option value="Registration Fee">Registration Fee</option>
                              <option value="Exam Fee">Exam Fee</option>
                              <option value="Certificate Fee">Certificate Fee</option>
                              <option value="Monthly Fee">Monthly Fee</option>
                              <option value="Late Penalty">Late Penalty</option>
                              <option value="Prospectus Fee">Prospectus Fee</option>
                              <option value="Backpaper Fee">Backpaper Fee</option>
                              <option value="Other">Other (Custom)</option>
                           </select>
                           {!['Course Fee', 'Admission Fee', 'Registration Fee', 'Exam Fee', 'Certificate Fee', 'Monthly Fee', 'Late Penalty', 'Prospectus Fee', 'Backpaper Fee'].includes(formData.head || '') && (
                              <input 
                                 type="text"
                                 required
                                 value={formData.head}
                                 onChange={(e) => setFormData({...formData, head: e.target.value})}
                                 placeholder="Enter custom fee head name..."
                                 className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold animate-in slide-in-from-top-2"
                              />
                           )}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1">Session</label>
                        <select 
                           value={formData.session}
                           onChange={(e) => setFormData({...formData, session: e.target.value})}
                           className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none"
                        >
                           <option>2024-25</option>
                           <option>2025-26</option>
                           <option>2026-27</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1">Apply To Course</label>
                        <select 
                           required
                           value={formData.courseId}
                           onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                           className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none"
                        >
                           <option value="">Select Course</option>
                           <option value="all">Global (All Courses)</option>
                           {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1">Frequency</label>
                        <select 
                           value={formData.frequency}
                           onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                           className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none"
                        >
                           <option>One-time</option>
                           <option>Monthly</option>
                           <option>Quarterly</option>
                           <option>Annually</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1">Base Amount (₹)</label>
                        <input 
                           type="number"
                           value={formData.amount || ''}
                           onFocus={(e) => e.target.select()}
                           onChange={(e) => setFormData({...formData, amount: e.target.value === '' ? 0 : Number(e.target.value)})}
                           className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1 text-emerald-600">Discount Amount *</label>
                        <div className="flex gap-2">
                           <select 
                              value={[0, 50, 105, 200, 500, 1000, 1500, 2000, 3000, 5000].includes(formData.discount ?? 0) ? (formData.discount ?? 0) : 'custom'}
                              onChange={(e) => {
                                 const val = e.target.value;
                                 if (val === 'custom') {
                                    if ([0, 50, 105, 200, 500, 1000, 1500, 2000, 3000, 5000].includes(formData.discount ?? 0)) {
                                       setFormData({...formData, discount: 0});
                                    }
                                 } else {
                                    setFormData({...formData, discount: Number(val)});
                                 }
                              }}
                              className="w-1/2 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none font-bold text-emerald-700"
                           >
                              <option value={0}>0 (Zero)</option>
                              <option value={50}>₹50</option>
                              <option value={100}>₹100</option>
                              <option value={150}>₹150</option>
                              <option value={200}>₹200</option>
                              <option value={500}>₹500</option>
                              <option value={1000}>₹1000</option>
                              <option value={1500}>₹1500</option>
                              <option value={2000}>₹2000</option>
                              <option value={3000}>₹3000</option>
                              <option value={5000}>₹5000</option>
                              <option value="custom">Custom...</option>
                           </select>
                           {![0, 50, 150, 200, 500, 1000, 1500, 2000, 3000, 5000].includes(formData.discount ?? 0) && (
                              <input 
                                 type="number"
                                 value={formData.discount ?? ''}
                                 onFocus={(e) => e.target.select()}
                                 onChange={(e) => setFormData({...formData, discount: e.target.value === '' ? 0 : Number(e.target.value)})}
                                 className="w-1/2 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl focus:ring-2 focus:ring-emerald-600 outline-none font-bold text-emerald-700 animate-in slide-in-from-left-2"
                                 placeholder="Amount"
                              />
                           )}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1 text-red-500">Late Penalty (₹ / Day) *</label>
                        <div className="flex gap-2">
                           <select 
                              value={[0, 5, 10, 20, 30, 50, 100, 150, 200].includes(formData.latePenalty ?? 0) ? (formData.latePenalty ?? 0) : 'custom'}
                              onChange={(e) => {
                                 const val = e.target.value;
                                 if (val === 'custom') {
                                    if ([0, 5, 10, 20, 30, 50, 100, 150, 200].includes(formData.latePenalty ?? 0)) {
                                       setFormData({...formData, latePenalty: 0});
                                    }
                                 } else {
                                    setFormData({...formData, latePenalty: Number(val)});
                                 }
                              }}
                              className="w-1/2 p-4 bg-red-50 border border-red-100 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none font-bold text-red-700"
                           >
                              <option value={0}>0 (Zero)</option>
                              <option value={5}>₹5 / day</option>
                              <option value={10}>₹10 / day</option>
                              <option value={20}>₹20 / day</option>
                              <option value={30}>₹30 / day</option>
                              <option value={50}>₹50 / day</option>
                              <option value={100}>₹100 / day</option>
                              <option value={150}>₹150 / day</option>
                              <option value={200}>₹200 / day</option>
                              <option value="custom">Custom...</option>
                           </select>
                           {![0, 5, 10, 20, 30, 50, 100, 150, 200].includes(formData.latePenalty ?? 0) && (
                              <input 
                                 type="number"
                                 value={formData.latePenalty ?? ''}
                                 onFocus={(e) => e.target.select()}
                                 onChange={(e) => setFormData({...formData, latePenalty: e.target.value === '' ? 0 : Number(e.target.value)})}
                                 className="w-1/2 p-4 bg-red-50 border border-red-100 rounded-2xl focus:ring-2 focus:ring-red-600 outline-none font-bold text-red-700 animate-in slide-in-from-left-2"
                                 placeholder="Rate"
                              />
                           )}
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[9px] font-black text-[#888888] uppercase tracking-widest ml-1">Category / Type</label>
                        <select 
                           value={formData.type}
                           onChange={(e) => setFormData({...formData, type: e.target.value})}
                           className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold appearance-none"
                        >
                           <option>Academic</option>
                           <option>Administrative</option>
                           <option>Infrastructure</option>
                           <option>Material</option>
                           <option>Service</option>
                        </select>
                     </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                     <button 
                       type="button" 
                       onClick={() => setIsModalOpen(false)}
                       className="flex-1 py-4 bg-gray-100 text-[#141414] text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-all"
                     >
                       Discard
                     </button>
                     <button 
                       type="submit" 
                       className="flex-[2] py-4 bg-[#141414] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-black/20 flex items-center justify-center space-x-3"
                     >
                        <Save size={18} />
                        <span>{editingFee ? 'Confirm Update' : 'Finalize Structure'}</span>
                     </button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
