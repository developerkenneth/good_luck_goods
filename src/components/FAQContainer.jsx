import React, { useEffect, useState } from "react";
import FAQItem from "./FAQItem";

const FAQContainer = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch("https://admin.shop.goodlucks.co/api/faq");
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        const data = await res.json();

        // Filter only active FAQs
        const activeFaqs = data.data || [];
        setFaqs(activeFaqs);
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <section className=" mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Got questions? We’ve got answers!
      </p>

      {loading ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          Loading FAQs...
        </div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No FAQs available at the moment.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 divide-y divide-gray-200 dark:divide-gray-700">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FAQContainer;
