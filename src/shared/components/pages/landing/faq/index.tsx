'use client';

import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import faqData from '@/locales/en/faq.json';

const Faq: React.FC = () => {
    const [search, setSearch] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const { faq } = faqData;

    const filteredFaqs = faq.categories.map((cat) => ({
        ...cat,
        questions: cat.questions.filter((q) =>
            q.question.toLowerCase().includes(search.toLowerCase())
        ),
    }));

    return (
        <div className="min-h-screen bg-background px-4 sm:px-6 md:px-8 py-10 sm:py-12">
            <div className="max-w-4xl mx-auto mb-8 border-b border-primary pb-3 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    {faq.title}
                </h2>
                <p className="text-gray60 text-sm sm:text-base">{faq.subtitle}</p>
            </div>

            <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={faq.searchPlaceholder}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary bg-white text-gray-800"
                    />
                    <span className="absolute left-3 top-3 text-gray-400">
                        <Search size={18} />
                    </span>
                </div>

                <button className="bg-primary hover:bg-primary2 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition w-full sm:w-auto text-sm sm:text-base">
                    <Search size={18} />
                    <span>{faq.searchButton}</span>
                </button>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
                {filteredFaqs.map((cat, categoryIndex) =>
                    cat.questions.length > 0 ? (
                        <div key={categoryIndex} className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-3xl mb-4 border-b border-gray-200 pb-2">
                                {cat.category}
                            </h3>

                            <div className="divide-y divide-gray-200">
                                {cat.questions.map((q, qIndex) => {
                                    const globalIndex = categoryIndex * 10 + qIndex;
                                    const isOpen = openIndex === globalIndex;

                                    return (
                                        <div key={qIndex}>
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                                                className="w-full flex justify-between items-center py-3 text-left text-gray-700 font-medium  rounded-lg transition"
                                            >
                                                <span className="text-sm sm:text-base">{q.question}</span>
                                                <ChevronDown
                                                    size={18}
                                                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>

                                            {isOpen && (
                                                <div className="px-1 pb-3 text-gray70 text-sm  rounded-md leading-relaxed">
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

            {filteredFaqs.every((f) => f.questions.length === 0) && (
                <p className="text-center text-gray-500 mt-8 text-sm sm:text-base">
                    {faq.noResults} “{search}”.
                </p>
            )}
        </div>
    );
};

export default Faq;
