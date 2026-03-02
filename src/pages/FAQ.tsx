import React from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy for all unused items in their original packaging. Returns are free for all domestic orders."
  },
  {
    q: "Are the products genuine?",
    a: "Yes, 100%. We source our products directly from manufacturers and authorized distributors to ensure authenticity."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 50 countries worldwide. International shipping rates and times vary by location."
  },
  {
    q: "How can I track my order?",
    a: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 bg-white min-h-screen"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
          <p className="text-zinc-500 text-lg">Everything you need to know about our products and services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={cn(
                "rounded-[2rem] border transition-all duration-300",
                openIndex === i ? "bg-zinc-50 border-zinc-100 shadow-sm" : "bg-white border-zinc-100 hover:border-zinc-200"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="font-bold text-lg text-zinc-900">{faq.q}</span>
                <div className={cn(
                  "p-2 rounded-full transition-colors",
                  openIndex === i ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-400"
                )}>
                  {openIndex === i ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8 text-zinc-500 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-zinc-900 rounded-[3rem] text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-zinc-400 mb-8">Can't find the answer you're looking for? Please chat with our friendly team.</p>
          <button className="bg-white text-zinc-900 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;
