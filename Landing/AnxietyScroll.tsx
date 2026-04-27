"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const cards = [
  { text: "Just a quick Swiggy order... 🍔", cost: "+ ₹450", color: "border-red-500/50" },
  { text: "Netflix, Spotify, AND SonyLIV hit today? 📺", cost: "+ ₹1,200", color: "border-yellow-500/50" },
  { text: "Bank balance is ₹800 with 5 days left... 📉", cost: "CRITICAL", color: "border-red-900" },
];

export const AnxietyScroll = () => {
  return (
    <section className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h2 className="text-4xl font-bold mb-20 glow-orange">Where Did All The Money Go? 🤔</h2>
        <div className="relative w-full max-w-lg">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: i * -40 }} // Creates the overlap
              viewport={{ margin: "-100px" }}
              className={`p-8 bg-white/5 backdrop-blur-xl border ${card.color} rounded-2xl mb-4 shadow-2xl`}
            >
              <p className="text-gray-400">{card.text}</p>
              <p className="text-2xl font-black mt-2">{card.cost}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};