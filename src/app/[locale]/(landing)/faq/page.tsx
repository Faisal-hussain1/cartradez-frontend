'use client';

import React, {useState} from 'react';
import {ChevronDown, Search} from 'lucide-react';
import {FAQCategory} from '@/shared/interfaces/faq';
import {FAQ_DATA} from '@/shared/constants/faqData';

const Faq: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQCategory[] = Object.values(FAQ_DATA);

  // Filter FAQs based on search
  const filteredFaqs = faqs.map((faq) => ({
    ...faq,
    questions: faq.questions.filter((q) =>
      q.question.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className='min-h-screen bg-[#f7f8fa] px-4 sm:px-6 lg:px-8 py-10 sm:py-12'>
      {/* Page Header */}
      <div className='max-w-4xl mx-auto mb-8 border-b border-[#0B3E77] pb-3 text-center sm:text-left'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B3E77] mb-2'>
          FAQs
        </h2>
        <p className='text-gray-600 text-sm sm:text-base'>
          Find answers to common questions about buying, selling, and trading
          vehicles on CarTradez.
        </p>
      </div>

      {/* Search Bar */}
      <div className='max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
        <div className='relative flex-1 w-full'>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search for answers'
            className='w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0B3E77] bg-white text-gray-800'
          />
          <span className='absolute left-3 top-3 text-gray-400'>
            <Search size={18} />
          </span>
        </div>

        {/* Search Button */}
        <button className='bg-[#0B3E77] text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#124b8c] transition w-full sm:w-auto text-sm sm:text-base'>
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>

      {/* FAQ Categories */}
      <div className='max-w-4xl mx-auto space-y-6'>
        {filteredFaqs.map((faq, categoryIndex) =>
          faq.questions.length > 0 ? (
            <div
              key={categoryIndex}
              className='bg-white rounded-2xl shadow-md p-4 sm:p-6'
            >
              <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2'>
                {faq.category}
              </h3>

              <div className='divide-y divide-gray-200'>
                {faq.questions.map((q, qIndex) => {
                  const globalIndex = categoryIndex * 10 + qIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={qIndex}>
                      <button
                        onClick={() =>
                          setOpenIndex(isOpen ? null : globalIndex)
                        }
                        className='w-full flex justify-between items-center py-3 text-left text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition'
                      >
                        <span className='text-sm sm:text-base'>
                          {q.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className='px-1 pb-3 text-gray-600 text-sm bg-gray-50 rounded-md leading-relaxed'>
                          {q.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* No Results */}
      {filteredFaqs.every((f) => f.questions.length === 0) && (
        <p className='text-center text-gray-500 mt-8 text-sm sm:text-base'>
          No results found for “{search}”.
        </p>
      )}
    </div>
  );
};

export default Faq;
