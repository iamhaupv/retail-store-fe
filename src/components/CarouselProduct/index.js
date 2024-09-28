import React from 'react'
import Guitar1Hover from "../../Image/WBguitar_9e5b1355-4050-4198-80f9-fb30bd23c806.jpg";
import Guitar1Hover1 from "../../Image/2_55cdb768-d2f3-4bb6-8c74-aa2f7d17ce52.jpg";
import Guitar1Hover2 from "../../Image/3_1650a47b-d6f2-4222-a587-2c35daa21176.jpg";
import Guitar1Hover3 from "../../Image/4_241ef2ab-6593-44df-984b-77d242c5a2ef.jpg";


export  function CarouselProduct() {
  return (
    <div className="carousel w-full">
      <div id="slideProduct1" className="carousel-item relative w-full">
        <img src={Guitar1Hover} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slideProduct4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slideProduct2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slideProduct2" className="carousel-item relative w-full">
        <img src={Guitar1Hover1} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slideProduct1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slideProduct3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slideProduct3" className="carousel-item relative w-full">
        <img src={Guitar1Hover2} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slideProduct2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slideProduct4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slideProduct4" className="carousel-item relative w-full">
        <img src={Guitar1Hover3} className="w-full" />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slideProduct3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slideProduct1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  )
}
