import React from "react";

const BookCondGuide = () => {
  const bookGuidelines = [
    {
      id: 1,
      title: "Acceptable Book Conditions",
      points: [
        "New: Completely unused, no marks, perfect condition.",
        "Like New: Minimal wear, no stains, folds, or damage.",
        "Good: Slightly used, minor highlights or notes allowed, but no torn pages.",
        "Readable: Old books with visible wear are okay, but no missing pages.",
        "Not Allowed: Books with missing pages, excessive damage, or unreadable content.",
      ],
    },
    {
      id: 2,
      title: "Cover & Binding Requirements",
      points: [
        "Hardcovers & Paperbacks must be intact and firmly attached.",
        "No loose, torn, or detached covers.",
        "Spiral-bound books should have all pages intact.",
      ],
    },
    {
      id: 3,
      title: "No Excessive Markings or Damage",
      points: [
        "Light highlighting or underlining is allowed (except for new books).",
        "No excessive writing, doodles, or ink spills.",
        "No torn, missing, or stuck-together pages.",
      ],
    },
    {
      id: 4,
      title: "Clean & Odor-Free Books",
      points: [
        "Books should be free from mold, bad odors, or stains.",
        "No water-damaged books will be accepted.",
        "Keep books dust-free and clean before listing.",
      ],
    },
    {
      id: 5,
      title: "Originality & No Pirated Copies",
      points: [
        "Photocopied, pirated, or fake books are strictly prohibited.",
        "Only authentic, legally owned books can be listed.",
      ],
    },
    {
      id: 6,
      title: "Important Notes",
      points: [
        "Proper packaging is a must when shipping books. Use bubble wrap or a box to prevent damage.",
        "Upload clear images of the book when listing it for sale.",
        "If a book does not meet these conditions, it may be rejected or removed from the platform.",
      ],
    },
  ];
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl text-center font-bold mb-4 pb-2 border-b border-gray-600">Guidelines for Sellers</h2>
      {bookGuidelines.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
          <ul className="list-disc pl-6">
            {section.points.map((point, index) => (
              <li key={index} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BookCondGuide;
