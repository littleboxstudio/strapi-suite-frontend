import { Faq } from "@/app/core/types";

export default function BaseFaqsJsonLd(props: { faqs: Faq[] }) {
  const faqsList = props.faqs.map((faq: Faq) => ({
    "@type": "Question",
    name: faq.title,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.text,
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsList,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
