import React from "react";

export function CarouselProduct({ product }) {
  return (
    <>
      <div className="carousel w-full hfull">
        {product.images.map((image, index) => (
          <div
            key={index}
            id={`slideProduct${index + 1}`}
            className="carousel-item relative w-full"
          >
            <img
              src={image}
              className="w-full"
              alt={`Product image ${index + 1}`}
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#slideProduct${
                  index === 0 ? product.images.length : index
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slideProduct${
                  index + 2 > product.images.length ? 1 : index + 2
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
