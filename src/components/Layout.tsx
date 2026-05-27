/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  UserCheck,
  Wallet, 
  FileCheck, 
  Award, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Search,
  CheckCircle,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  QrCode,
  CreditCard,
  GraduationCap,
  Calendar,
  ChevronRight,
  Layers,
  ShieldCheck,
  Megaphone,
  UserPlus,
  BookOpen,
  DollarSign,
  Clock,
  Globe
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarContentProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const SidebarContent = ({ isCollapsed, onToggleCollapse, showCloseButton, onClose }: SidebarContentProps) => {
  const { currentUser, franchises, logout, businessProfile } = useApp();
  const navigate = useNavigate();

  if (!currentUser) return null;

  const adminMenu = [
    { type: 'header', name: 'System Menu' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { 
      name: 'Franchise Nodes', 
      icon: Users, 
      path: '/admin/franchises',
      subItems: [
        { name: 'Franchise List', path: '/admin/franchises' },
        { name: 'Franchise Fees', path: '/admin/franchise-fees' },
        { name: 'Fee Accounts', path: '/admin/accounts' },
        { name: 'Exam Portal', path: '/admin/exams' },
        { name: 'Course Management', path: '/admin/courses' },
      ]
    },
    { name: 'Academic Master', icon: BookOpen, path: '/admin/academic' },
    { name: 'Fee Master', icon: Wallet, path: '/admin/fees' },
    { name: 'Fee Collection', icon: CreditCard, path: '/admin/collection' },
    { name: 'Student Ledger', icon: BarChart3, path: '/admin/ledger' },
    { name: 'Student Registration', icon: UserPlus, path: '/admin/registration' },
    { name: 'Student Directory', icon: UserCircle, path: '/admin/students' },
    { name: 'Admission Inquiry', icon: Megaphone, path: '/admin/enquiries' },
    { name: 'Announcement', icon: Bell, path: '/admin/announcements' },
    { name: 'Documents', icon: FileText, path: '/admin/documents' },
    { 
      name: 'Certificates', 
      icon: Award, 
      path: '/admin/certificates',
      subItems: [
        { name: 'Saved templates', path: '/admin/certificates/templates' },
        { name: 'Create Template', path: '/admin/certificates/create' },
      ]
    },
    { name: 'Business Settings', icon: Settings, path: '/admin/business' },
  ];

  const franchiseMenu = [
    { type: 'header', name: 'Dash menu' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/franchise' },
    { name: 'Employee', icon: UserCheck, path: '/franchise/employees' },
    { name: 'Exam Master', icon: FileCheck, path: '/franchise/exams' },
    { name: 'Academic Setup', icon: BookOpen, path: '/franchise/academic' },
    { name: 'Franchise Fee', icon: DollarSign, path: '/franchise/franchise-fees' },
    { name: 'Student Registration', icon: UserPlus, path: '/franchise/registration' },
    { 
      name: 'Fee Collection', 
      icon: CreditCard, 
      path: '/franchise/collection',
      subItems: [
        { name: 'Collect Fee', path: '/franchise/collection' },
        { name: 'Student Ledger', path: '/franchise/ledger' },
        { name: 'Deposited Fees', path: '/franchise/account' },
        { name: 'Fee Master', path: '/franchise/fees' },
      ]
    },
    { name: 'Student List', icon: GraduationCap, path: '/franchise/students' },
    { name: 'Wallet Accounts', icon: Wallet, path: '/franchise/wallet' },
    { name: 'Announcement', icon: Megaphone, path: '/franchise/announcements' },
    
    { type: 'header', name: 'CENTER MENU' },
    { name: 'Attendance', icon: Calendar, path: '/franchise/attendance' },
    { name: 'E-Content', icon: BookOpen, path: '/franchise/e-content' },
    { name: 'TimeTable', icon: Clock, path: '/franchise/timetable' },
  ];

  const studentMenu = [
    { type: 'header', name: 'Main' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/student' },
    { name: 'My Profile', icon: UserCircle, path: '/student/profile' },
    { name: 'Certificates', icon: Award, path: '/student/certificates' },
    { name: 'My Documents', icon: FileText, path: '/student/documents' },
    { name: 'My Accounts', icon: DollarSign, path: '/student/accounts' },
    { name: 'Verification', icon: QrCode, path: '/verify' },
  ];

  const teacherMenu = [
    { type: 'header', name: 'TEACHER MENU' },
    { name: 'Dashboard', icon: LayoutDashboard, path: '/teacher' },
    { name: 'My Classes', icon: BookOpen, path: '/teacher/classes' },
    { name: 'Students', icon: Users, path: '/teacher/students' },
    { name: 'Attendance', icon: Calendar, path: '/teacher/attendance' },
    { name: 'Exams', icon: FileCheck, path: '/teacher/exams' },
  ];

  const currentFranchise = franchises.find(f => f.id === currentUser.franchiseId);
  const isBlocked = currentUser.role === 'FRANCHISE' && currentFranchise?.status === 'BLOCKED';

  const menu = (currentUser.role === 'ADMINISTRATOR' || currentUser.role === 'ADMIN')
    ? adminMenu 
    : currentUser.role === 'FRANCHISE' 
      ? (isBlocked ? [{ name: 'Dashboard', icon: LayoutDashboard, path: '/franchise' }] : franchiseMenu)
      : currentUser.role === 'TEACHER' 
        ? teacherMenu 
        : studentMenu;

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/');
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full bg-[#059669] text-white">
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between border-b border-white/10 bg-black/5">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3 min-w-0"
          >
            {businessProfile.logoUrl ? (
              <img 
                src={businessProfile.logoUrl} 
                alt="Logo" 
                className="w-10 h-10 object-contain p-1 bg-white rounded-lg shadow-sm flex-shrink-0" 
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center p-1 shadow-lg flex-shrink-0">
                <ShieldCheck className="text-white" size={20} />
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm md:text-base font-black tracking-tighter text-white leading-none uppercase truncate max-w-[120px]">
                {businessProfile.name.split(' ')[0]}
              </h1>
              <span className="text-[8px] font-black tracking-[0.2em] text-emerald-100 uppercase truncate max-w-[120px]">
                {businessProfile.name.split(' ').slice(1).join(' ') || 'WORKSPACE'}
              </span>
            </div>
          </motion.div>
        )}
        <button 
          onClick={showCloseButton ? onClose : onToggleCollapse} 
          className="p-1 hover:bg-white/10 text-white rounded transition-colors"
          aria-label={showCloseButton ? "Close navigation" : "Toggle navigation panel"}
        >
          {showCloseButton ? <X size={20} /> : (isCollapsed ? <Menu size={20} /> : <X size={20} />)}
        </button>
      </div>

      {/* Nav Menu Items */}
      <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menu.map((item, idx) => {
          if (item.type === 'header') {
            return !isCollapsed ? (
              <p key={idx} className="px-3 py-4 text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/10 mt-4 first:mt-0 mb-2">
                {item.name}
              </p>
            ) : <div key={idx} className="h-px bg-white/10 my-4" />;
          }

          const Icon = item.icon;
          return (
            <React.Fragment key={idx}>
              <NavLink
                to={item.path as string}
                onClick={handleLinkClick}
                className={({ isActive }) => cn(
                  "flex items-center p-3 rounded-xl transition-all duration-200 group relative mx-2",
                  isActive 
                    ? "bg-white text-emerald-700 shadow-xl" 
                    : "hover:bg-white/10 text-emerald-50 hover:text-white"
                )}
              >
                <Icon size={18} className={cn("min-w-[18px] transition-transform duration-200 group-hover:scale-110", isCollapsed && "mx-auto")} />
                {!isCollapsed && <span className="ml-3 font-black text-[10px] uppercase tracking-widest leading-none">{item.name}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-[#141414] text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none z-50 shadow-2xl transition-opacity">
                    {item.name}
                  </div>
                )}
              </NavLink>

              {/* Sub Items */}
              {!isCollapsed && (item as any).subItems && (
                <div className="ml-8 mt-1 space-y-1 mb-2">
                  {(item as any).subItems.map((sub: any) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) => cn(
                        "flex items-center p-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                        isActive ? "text-white bg-white/10" : "text-emerald-100/70 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <ChevronRight size={10} className="mr-2 flex-shrink-0" />
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      {/* Website CTA */}
      <div className="px-6 mb-4">
        <Link 
          to="/" 
          onClick={handleLinkClick}
          className={cn(
            "flex items-center p-3 rounded-xl transition-all duration-200 bg-black/10 text-white hover:bg-white hover:text-emerald-700 group border border-white/10",
            isCollapsed && "justify-center px-0"
          )}
        >
          <Globe size={18} className="min-w-[18px]" />
          {!isCollapsed && <span className="ml-3 font-black text-[10px] uppercase tracking-widest leading-none">Visit Website</span>}
        </Link>
      </div>

      {/* Profile summary footer */}
      <div className="p-4 mt-auto border-t border-white/10 bg-black/10">
        <div className={cn("flex items-center", !isCollapsed ? "px-2" : "justify-center")}>
           {!isCollapsed && (
             <div className="flex-1 flex items-center min-w-0 mr-2">
               <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-xl border border-white/20 bg-white/10 shadow-sm flex-shrink-0" />
               <div className="ml-3 overflow-hidden">
                 <p className="text-[11px] font-black truncate text-white uppercase tracking-tight">{currentUser.name}</p>
                 <p className="text-[8px] text-emerald-100/70 truncate font-black uppercase tracking-[0.1em]">{currentUser.role} DASHBOARD</p>
               </div>
             </div>
           )}
           <button 
             onClick={handleLogout}
             className="p-2 text-white/50 hover:text-red-300 transition-colors"
             title="Sign Out"
             aria-label="Logout"
           >
             <LogOut size={20} />
           </button>
        </div>
        {!isCollapsed && (
          <div className="mt-4 text-center">
            <p className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em] leading-normal">Developed by Digital Communique Private Limited</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const Sidebar = ({ 
  isCollapsed, 
  onToggleCollapse, 
  isMobileOpen, 
  onCloseMobile 
}: { 
  isCollapsed: boolean; 
  onToggleCollapse: () => void; 
  isMobileOpen: boolean; 
  onCloseMobile: () => void;
}) => {
  return (
    <>
      {/* Mobile Sidebar overlay/drawer using pure React state control */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Dark background backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 pointer-events-auto"
            />
            {/* Sliding navigation deck */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 w-64 bg-[#059669] text-white flex flex-col border-r border-[#047857] shadow-2xl z-50 overflow-hidden"
            >
              <SidebarContent 
                isCollapsed={false} 
                onToggleCollapse={onCloseMobile} 
                showCloseButton={true} 
                onClose={onCloseMobile} 
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop traditional block layout */}
      <aside className={cn(
        "hidden lg:flex h-screen bg-[#059669] text-white transition-all duration-300 flex-col border-r border-[#047857] sticky top-0 shadow-2xl print:hidden flex-shrink-0",
        isCollapsed ? "w-20" : "w-64"
      )}>
        <SidebarContent 
          isCollapsed={isCollapsed} 
          onToggleCollapse={onToggleCollapse} 
          showCloseButton={false} 
          onClose={() => {}} 
        />
      </aside>
    </>
  );
};

export const Header = ({ onOpenMobileMenu }: { onOpenMobileMenu: () => void }) => {
  const { currentUser } = useApp();
  if (!currentUser) return null;

  return (
    <header className="h-16 border-b border-black/5 bg-background/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between print:hidden">
      <div className="flex items-center space-x-4 flex-1">
        {/* Mobile Hamburger menu toggle */}
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 focus:outline-hidden rounded-xl hover:bg-black/5"
          aria-label="Open side navigation drawer"
        >
          <Menu size={22} />
        </button>

        {/* Global search input (responsive) */}
        <div className="hidden sm:flex items-center bg-[#F5F5F5] px-4 py-2 rounded-full w-full max-w-xs md:max-w-md">
          <Search size={16} className="text-[#888888]" />
          <input 
            type="text" 
            placeholder="Global Search..." 
            className="ml-3 bg-transparent border-none focus:ring-0 text-sm w-full outline-hidden text-[#141414]"
          />
        </div>
      </div>

      {/* User options & Action headers bar */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        <button className="relative p-2 text-[#666666] hover:text-[#141414] transition-colors rounded-full hover:bg-black/5">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 text-[#666666] hover:text-[#141414] transition-colors rounded-full hover:bg-black/5 hidden xs:inline-block">
          <Settings size={20} />
        </button>
        <div className="h-8 w-px bg-[#E5E5E5] hidden xs:block"></div>
        <div className="flex items-center space-x-3">
          <div className="text-right min-w-0">
            <p className="text-sm font-semibold text-[#141414] truncate max-w-[120px] md:max-w-[200px]">{currentUser.name}</p>
            <p className="text-[10px] text-[#888888] font-mono tracking-tighter truncate max-w-[120px] md:max-w-[200px] hidden sm:block">{currentUser.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[#E5E5E5] p-0.5 flex-shrink-0 bg-white">
            <img src={currentUser.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useApp();
  const [isDesktopCollapsed, setIsDesktopCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  if (!currentUser) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-background print:bg-white text-slate-800">
      <Sidebar 
        isCollapsed={isDesktopCollapsed} 
        onToggleCollapse={() => setIsDesktopCollapsed(!isDesktopCollapsed)} 
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenMobileMenu={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-8 overflow-auto print:p-0 print:overflow-visible transition-all">
          {children}
        </main>
      </div>
    </div>
  );
};

export const StatCard = ({ title, value, icon: Icon, trend, color = "blue" }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-xs"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-xl", colors[color])}>
          <Icon size={24} />
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded-full",
            trend > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          )}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="text-[#888888] text-sm font-medium">{title}</p>
      <p className="text-3xl font-bold text-[#141414] mt-1 tracking-tight">{value}</p>
    </motion.div>
  );
};
