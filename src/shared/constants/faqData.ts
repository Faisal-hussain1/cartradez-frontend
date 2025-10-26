// faqData.ts

import {FAQCategory} from '../interfaces/faq';

export const FAQ_DATA: Record<string, FAQCategory> = {
  general: {
    category: 'General',
    questions: [
      {
        value: 'whatIsCarTradez',
        question: 'What is CarTradez?',
        answer:
          'CarTradez is an online marketplace for buying, selling, and trading vehicles.',
      },
      {
        value: 'howCreateAccount',
        question: 'How can I create an account?',
        answer:
          'You can create an account by clicking the “Sign Up” button and providing your details.',
      },
      {
        value: 'availableInArea',
        question: 'Is CarTradez available in my area?',
        answer:
          'Yes, CarTradez operates in most major cities. You can filter listings by your location.',
      },
    ],
  },

  payments: {
    category: 'Payments',
    questions: [
      {
        value: 'acceptedPayments',
        question: 'What payment methods are accepted?',
        answer:
          'We accept all major credit cards, debit cards, and online bank transfers.',
      },
      {
        value: 'refundPolicy',
        question: 'Do you have a refund policy?',
        answer:
          'Yes, refunds are available within 7 days of purchase, subject to terms and conditions.',
      },
    ],
  },
};
