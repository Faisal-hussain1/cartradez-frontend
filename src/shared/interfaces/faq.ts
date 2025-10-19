export interface FAQItem {
  value: string;
  question: string;
  answer: string;
}

// Represents a category containing multiple FAQs
export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}
