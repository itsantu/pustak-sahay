import ProductBox from "../Product/ProductBox";

const BookList = ({ category, books }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold p-2 mb-2">{category}</h1>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {books?.length > 0 ? (
          books.map((book, index) => (
            <ProductBox key={index} book={book}/>
          ))
        ) : (
          <h2 className="text-2xl font-semibold p-2">No books yet</h2>
        )}
      </div>
    </div>
  );
};

export default BookList;
