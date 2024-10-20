import React from 'react'




export  function CarouselProduct({product}) {
  return (
    // <>
    // {products.map((product)=> (<div className="carousel w-full">
    //   <div key={product._id} id="slideProduct1" className="carousel-item relative w-full">
    //     <img src={product.images[0]} className="w-full" />
    //     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    //       <a href="#slideProduct4" className="btn btn-circle">
    //         ❮
    //       </a>
    //       <a href="#slideProduct2" className="btn btn-circle">
    //         ❯
    //       </a>
    //     </div>
    //   </div>
    //   <div id="slideProduct2" className="carousel-item relative w-full">
    //     <img src={product.images[1]} className="w-full" />
    //     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    //       <a href="#slideProduct1" className="btn btn-circle">
    //         ❮
    //       </a>
    //       <a href="#slideProduct3" className="btn btn-circle">
    //         ❯
    //       </a>
    //     </div>
    //   </div>
    //   <div id="slideProduct3" className="carousel-item relative w-full">
    //     <img src={product.images[2]} className="w-full" />
    //     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    //       <a href="#slideProduct2" className="btn btn-circle">
    //         ❮
    //       </a>
    //       <a href="#slideProduct4" className="btn btn-circle">
    //         ❯
    //       </a>
    //     </div>
    //   </div>
    //   <div id="slideProduct4" className="carousel-item relative w-full">
    //     <img src={product.images[3]} className="w-full" />
    //     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
    //       <a href="#slideProduct3" className="btn btn-circle">
    //         ❮
    //       </a>
    //       <a href="#slideProduct1" className="btn btn-circle">
    //         ❯
    //       </a>
    //     </div>
    //   </div>
    // </div>))}
    // </>
    <>
        <div className="carousel w-full">
      {product.images.map((image, index) => (
        <div key={index} id={`slideProduct${index + 1}`} className="carousel-item relative w-full">
          <img src={image} className="w-full" alt={`Product image ${index + 1}`} />
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href={`#slideProduct${index === 0 ? product.images.length : index}`} className="btn btn-circle">
              ❮
            </a>
            <a href={`#slideProduct${index + 2 > product.images.length ? 1 : index + 2}`} className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}
