import { motion } from "framer-motion";
import Link from "next/link";

import Image from "next/image";
export default function Footer() {
  return (
    <footer className="pb-4 text-gray-200">
      <div className="max-w-5xl xl:max-w-5xl mx-auto divide-y divide-gray-900 px-4 sm:px-6 md:px-8"></div>
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full py-16 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 bg-black"
        style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
      >
        <div className="text-lg  text-white uppercase tracking-widest">
          3MVisual -{" "}
          <div className="flex justify-center rounded">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/SEC_Philippines_Logo_Official.png"
              alt="Securities and Exchange Commission Philippines"
              width={60}
              height={60}
              priority
            />
            <p className="text-xs mt-2"> RN: 2026010232133</p>
          </div>
        </div>
        <div className="text-xs">
          G/F Hermoso Building, Mariano Badelles Street, Front of Trendline,
          Mahayahay, Iligan City 9200, Philippines
        </div>
        <div className="flex gap-8">
          {[
            {
              title: "Privacy Policy",
              link: "http://www.3mvisual.com/privacy",
            },
            {
              title: "Terms and Conditions",
              link: "http://www.3mvisual.com/terms",
            },
            {
              title: "Dispute resolution",
              link: "http://www.3mvisual.com/dispute",
            },
            { title: "Refund Policy", link: "http://www.3mvisual.com/refund" },

            { title: "Contact", link: "http://www.3mvisual.com/contactus" },
            { title: "", link: "/" },
          ].map((item) => (
            <Link
              key={item.link}
              href={item.link}
              className=" text-xs tracking-widest uppercase text-white/40 hover:text-white transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className=" text-xs tracking-widest uppercase text-white/40">
          © 2024 3MVisual. All rights reserved.
        </div>
      </motion.footer>

      {/* ── Floating Scroll Label ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="fixed bottom-12 right-12 z-40 hidden md:block"
      >
        <div className="flex items-center gap-4 rotate-90 origin-right translate-x-1/2">
          <span className="font-sans text-[11px] text-white/30 tracking-[0.3em] uppercase whitespace-nowrap">
            Scroll to explore our services
          </span>
          <div
            className="h-[100px] w-[1px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
            }}
          />
        </div>
      </motion.div>
    </footer>
  );
}
