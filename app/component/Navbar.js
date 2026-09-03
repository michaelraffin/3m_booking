"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-16 py-6"
        style={{
          background: "rgba(0,0,0,0.80)",
          backdropFilter: "blur(60px)",
          WebkitBackdropFilter: "blur(60px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Link
          href="/"
          className="text-2xl  font-bold text-white tracking-tighter"
        >
          3MVisual
        </Link>

        {/*<div className="hidden md:flex items-center gap-10">
    {NAV_LINKS.map((link) => (
      <Link
        key={link.label}
        href={link.href}
        className={` text-sm tracking-widest uppercase transition-all duration-500 ease-in-out ${
          link.active
            ? "text-white border-b border-white pb-1"
            : "text-white/50 hover:text-white"
        }`}
      >
        {link.label}
      </Link>
    ))}
  </div>*/}

        <motion.a
          href="tel:+639363673900"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
          transition={{ duration: 0.4 }}
          className="px-6 py-2 border border-white text-white font-sans text-sm uppercase tracking-widest cursor-pointer"
          style={{ backgroundColor: "transparent" }}
        >
          Connect
        </motion.a>
      </motion.nav>
    </>
  );
}
