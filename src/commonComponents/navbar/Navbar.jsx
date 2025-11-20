// components/Navbar.jsx (or wherever it is)
'use client';

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/assets/logo.png";
import { useRouter } from "next/navigation";
import { useAuth0 } from '@auth0/auth0-react'; // ← Add this

const Navbar = () => {
  const [isPropFirm, setIsPropFirm] = useState(false);
  const [isGiveaways, setIsGiveaways] = useState(false);
  const propFirmRef = useRef(null);
  const giveawaysRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Auth0
  const { isAuthenticated, user, logout, loginWithRedirect } = useAuth0();
  const userType = user?.[`${process.env.NEXT_PUBLIC_CLIENT_URL}/userType`] ?? 'user';

  // Click-outside & ESC handlers (unchanged)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (propFirmRef.current && !propFirmRef.current.contains(e.target)) {
        setIsPropFirm(false);
      }
      if (giveawaysRef.current && !giveawaysRef.current.contains(e.target)) {
        setIsGiveaways(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setIsPropFirm(false);
        setIsGiveaways(false);
      }
    };
    if (mobileOpen) document.addEventListener("keydown", escHandler);
    return () => document.removeEventListener("keydown", escHandler);
  }, [mobileOpen]);

  // CTA Buttons (Conditional)
  const AuthButtons = () => {
    if (!isAuthenticated) {
      return (
        <>
          <button
            onClick={() => loginWithRedirect()}
            className="hover:bg-slate-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            Sign In
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200">
            Sign Up
          </button>
        </>
      );
    }

    return (
      <>
        {userType === 'admin' ? (
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-lg"
          >
            Admin Panel
          </button>
        ) : (
          <button
            onClick={() => router.push('/user/dashboard')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all shadow-lg"
          >
            My Dashboard
          </button>
        )}
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all"
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-slate-700/50 bg-gradient-to-b from-slate-950 via-[#020617] to-slate-900 py-4 backdrop-blur-sm md:py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="shrink-0" onClick={() => router.push("/")}>
          <Image
            src={logo}
            alt="PropFirmFlow Logo"
            width={160}
            height={77}
            className="h-auto w-32 sm:w-40 md:w-48"
            priority
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {/* Prop Firms */}
          <div className="relative" ref={propFirmRef}>
            <button
              className="flex items-center gap-1.5 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/50"
              onClick={() => {
                setIsPropFirm(!isPropFirm);
                setIsGiveaways(false);
              }}
            >
              Prop Firms
              <ChevronDown className={`w-4 h-4 transition-transform ${isPropFirm ? "rotate-180" : ""}`} />
            </button>
            {isPropFirm && (
              <div className="absolute left-0 top-14 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-2xl">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-semibold py-2.5 px-4 rounded-md transition-all text-left">
                  All Prop Firms
                </button>
                <button className="mt-1 w-full hover:bg-slate-800 text-sm font-medium py-2.5 px-4 rounded-md transition-all text-left">
                  Start A Firm
                </button>
              </div>
            )}
          </div>

          {/* Giveaways */}
          <div className="relative" ref={giveawaysRef}>
            <button
              className="flex items-center gap-1.5 hover:bg-slate-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200"
              onClick={() => {
                setIsGiveaways(!isGiveaways);
                setIsPropFirm(false);
              }}
            >
              Giveaways
              <ChevronDown className={`w-4 h-4 transition-transform ${isGiveaways ? "rotate-180" : ""}`} />
            </button>
            {isGiveaways && (
              <div className="absolute left-0 top-14 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-2xl">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-semibold py-2.5 px-4 rounded-md transition-all text-left">
                  All Giveaways
                </button>
                <button className="mt-1 w-full hover:bg-slate-800 text-sm font-medium py-2.5 px-4 rounded-md transition-all text-left">
                  Active Giveaways
                </button>
                <button className="mt-1 w-full hover:bg-slate-800 text-sm font-medium py-2.5 px-4 rounded-md transition-all text-left">
                  My Entries
                </button>
              </div>
            )}
          </div>

          {/* Static Links */}
          {["Trading Tools", "Reviews", "Blog"].map((txt) => (
            <button key={txt} className="hover:bg-slate-800 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-all duration-200">
              {txt}
            </button>
          ))}

          {/* Auth Buttons */}
          <div className="ml-4 flex items-center gap-2">
            <AuthButtons />
            <button className="bg-gradient-to-tl from-yellow-800 to-yellow-500 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/50">
              Join as Firm
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden" onClick={() => setMobileOpen(true)}>
          <Menu className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-full bg-slate-900 p-6 shadow-2xl transition-transform ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between pb-6">
          <Image src={logo} alt="Logo" width={140} height={68} className="h-auto w-32" />
          <button onClick={() => setMobileOpen(false)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          {/* Mobile Dropdowns */}
          <div>
            <button
              className="flex w-full items-center justify-between bg-gradient-to-tl from-yellow-800 to-yellow-500 hover:from-green-500 hover:to-green-700 text-white font-semibold text-sm px-5 py-3 rounded-lg"
              onClick={() => setIsPropFirm(v => !v)}
            >
              Prop Firms
              <ChevronDown className={`w-4 h-4 transition-transform ${isPropFirm ? "rotate-180" : ""}`} />
            </button>
            {isPropFirm && (
              <div className="mt-2 space-y-1 rounded-lg border border-slate-700 bg-slate-900 p-2">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-semibold py-2.5 px-4 rounded-md text-left">
                  All Prop Firms
                </button>
                <button className="w-full hover:bg-slate-800 text-sm font-medium py-2.5 px-4 rounded-md text-left">
                  Start A Firm
                </button>
              </div>
            )}
          </div>

          {/* Giveaways */}
          <div>
            <button
              className="flex w-full items-center justify-between hover:bg-slate-800 text-white font-medium text-sm px-5 py-3 rounded-lg"
              onClick={() => setIsGiveaways(v => !v)}
            >
              Giveaways
              <ChevronDown className={`w-4 h-4 transition-transform ${isGiveaways ? "rotate-180" : ""}`} />
            </button>
            {isGiveaways && (
              <div className="mt-2 space-y-1 rounded-lg border border-slate-700 bg-slate-900 p-2">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-sm font-semibold py-2.5 px-4 rounded-md text-left">
                  All Giveaways
                </button>
                <button className="mt-1 w-full hover:bg-slate-800 text-sm font-medium py-2.5 px-4 rounded-md text-left">
                  Active Giveaways
                </button>
                <button className="mt-1 w-full hover:bg-slate-800 text-sm font-medium py-2.5 px-4 rounded-md text-left">
                  My Entries
                </button>
              </div>
            )}
          </div>

          {["Trading Tools", "Reviews", "Blog"].map((txt) => (
            <button key={txt} className="w-full text-left hover:bg-slate-800 text-white font-medium text-sm px-5 py-3 rounded-lg">
              {txt}
            </button>
          ))}

          {/* Mobile Auth */}
          <div className="mt-6 flex flex-col gap-3">
            <AuthButtons />
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-lg">
              Join as Firm
            </button>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;