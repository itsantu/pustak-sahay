import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Home/Banner";
import CategoryList from "../components/Home/CategoryList";
import Footer from "../components/Footer/Footer";
import BookList from "../components/Home/BookList";
import DonateBanner from "../components/Home/DonateBanner";
import WhyUs from "../components/Home/Whyus";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import DiscountBanner from "../components/Home/DiscountBanner";

const Home = () => {
  const medicalBooks = [
    {
      title: "Anatomy Essentials",
      author: "Dr. John Doe",
      price: 250,
      image: "https://example.com/anatomy.jpg",
    },
    {
      title: "Pharmacology Guide",
      author: "Dr. Smith",
      price: 300,
      image: "https://example.com/pharma.jpg",
    },
    {
      title: "Surgery Basics",
      author: "Dr. William",
      price: 450,
      image: "https://example.com/surgery.jpg",
    },
    {
      title: "Neurology Simplified",
      author: "Dr. Alice",
      price: 400,
      image: "https://example.com/neurology.jpg",
    },
    {
      title: "Cardiology Handbook",
      author: "Dr. Robert",
      price: 500,
      image: "https://example.com/cardiology.jpg",
    },
  ];

  const programmingBooks = [
    {
      title: "Java Programming",
      author: "John Smith",
      price: 200,
      image: "https://example.com/java.jpg",
    },
    {
      title: "C Programming",
      author: "Dr. Saroj Kumar",
      price: 150,
      image: "https://example.com/c.jpg",
    },
    {
      title: "Python Crash Course",
      author: "Eric Matthes",
      price: 350,
      image: "https://example.com/python.jpg",
    },
    {
      title: "Web Development",
      author: "Jon Duckett",
      price: 400,
      image: "https://example.com/web.jpg",
    },
    {
      title: "Data Structures & Algorithms",
      author: "Mark Weiss",
      price: 500,
      image: "https://example.com/dsa.jpg",
    },
  ];


  const [categoryBooks, setCategoryBooks] = useState({
    Engineering: [],
    Medical: [],
    Science: [],
    "Self-Help": [],
  });
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/homepage-books`
        );
        setCategoryBooks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, );
  return (
    <div>
      <>
        <Navbar />
        <Banner />
        <CategoryList />
        <BookList category="Best Engineering Books" books={categoryBooks.Engineering} />
        <BookList category="Best Medical Books" books={categoryBooks.Medical} />
        <BookList category="Science" books={categoryBooks.Science} />
        <BookList category="Self-Help & Motivation" books={categoryBooks["Self-Help"]} />
        <DiscountBanner/>
        <WhyUs />
        <DonateBanner />
        <Footer />
      </>
    </div>
  );
};

export default Home;
