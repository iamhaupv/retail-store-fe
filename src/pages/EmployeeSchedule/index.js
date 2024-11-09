import React, { useEffect, useState } from "react";
export default function EmployeeSchedule() {
  return (
    <>
      <div
        className="w-11/12 h-sceen justify-center flex "
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div class="w-full ml-2 mr-2 lg:flex lg:h-[calc(100vh-50px)] lg:flex-col animate__animated animate__fadeInRight ">
          <header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
            <h1 class="text-base font-semibold leading-6 text-gray-900">
              <time datetime="2022-01">January 2022</time>
            </h1>
            <div class="flex items-center">
              <button
                type="button"
                className="btn w-28 justify-items-center border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 "
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
                Trở về
              </button>
              <button
                type="button"
                className="btn w-28 ml-4 justify-items-center  border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 "
              >
                Tiếp
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <div class="hidden md:ml-4 md:flex md:items-center">
                <div class="relative">
                  <input type="date" className="input border-2  rounded-md" />
                </div>
                <div class="ml-6 h-6 w-px bg-gray-300"></div>
                <button
                  type="button"
                  class="btn ml-6 rounded-md btn-success px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
                >
                  Thêm lịch
                </button>
              </div>
              <div class="relative ml-6 md:hidden">
                <button
                  type="button"
                  class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
                  id="menu-0-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span class="sr-only">Open menu</span>
                  <svg
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                </button>

                {/*
                    Dropdown menu, show/hide based on menu state.

                    Entering: "transition ease-out duration-100"
                        From: "transform opacity-0 scale-95"
                        To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                        From: "transform opacity-100 scale-100"
                        To: "transform opacity-0 scale-95"
                    */}
                <div
                  class="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-0-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    {/* Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" */}
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-0-item-0"
                    >
                      Create event
                    </a>
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-0-item-1"
                    >
                      Go to today
                    </a>
                  </div>
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-0-item-2"
                    >
                      Day view
                    </a>
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-0-item-3"
                    >
                      Week view
                    </a>
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-0-item-4"
                    >
                      Month view
                    </a>
                    <a
                      href="#"
                      class="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabindex="-1"
                      id="menu-0-item-5"
                    >
                      Year view
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Thứ hai</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Thứ ba</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Thứ tư</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Thứ năm</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Thứ sau</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Thứ bảy</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
              <div class="justify-center bg-white py-2">
                <div class="sr-only sm:not-sr-only">Chủ nhật</div>
                <div class="sr-only sm:not-sr-only">22/21/2024</div>
              </div>
            </div>
            <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
              <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                {/*
                    Always include: "relative py-2 px-3"
                    Is current month, include: "bg-white"
                    Is not current month, include: "bg-gray-50 text-gray-500"
                    */}
                <div class="relative bg-gray-50 px-3 py-2 text-gray-500 "
                style={{
                    height: "calc(100vh - 564px)",
                  }}>
                  {/*
                        Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                    */}
                  <time datetime="2021-12-27">27</time>
                </div>
                <div class="relative bg-gray-50 px-3 py-2 text-gray-500 h-11/12">
                  <time datetime="2021-12-28">28</time>
                </div>
                <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                  <time datetime="2021-12-29">29</time>
                </div>
                <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                  <time datetime="2021-12-30">30</time>
                </div>
                <div class="relative bg-gray-50 px-3 py-2 text-gray-500">
                  <time datetime="2021-12-31">31</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-01">1</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-01">2</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-03">3</time>
                  <ol class="mt-2">
                    <li>
                      <a href="#" class="group flex">
                        <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                          Design review
                        </p>
                        <time
                          datetime="2022-01-03T10:00"
                          class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                        >
                          10AM
                        </time>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="group flex">
                        <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                          Sales meeting
                        </p>
                        <time
                          datetime="2022-01-03T14:00"
                          class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                        >
                          2PM
                        </time>
                      </a>
                    </li>
                  </ol>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-04">4</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-05">5</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-06">6</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-07">7</time>
                  <ol class="mt-2">
                    <li>
                      <a href="#" class="group flex">
                        <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                          Date night
                        </p>
                        <time
                          datetime="2022-01-08T18:00"
                          class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                        >
                          6PM
                        </time>
                      </a>
                    </li>
                  </ol>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-08">8</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-09">9</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-10">10</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-11">11</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time
                    datetime="2022-01-12"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                  >
                    12
                  </time>
                  <ol class="mt-2">
                    <li>
                      <a href="#" class="group flex">
                        <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                          Sam's birthday party
                        </p>
                        <time
                          datetime="2022-01-25T14:00"
                          class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                        >
                          2PM
                        </time>
                      </a>
                    </li>
                  </ol>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-13">13</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-14">14</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-15">15</time>
                </div>
                <div class="relative bg-white px-3 py-2">
                  <time datetime="2022-01-16">16</time>
                </div>
              </div>
              <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
                {/*
                    Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
                    Is current month, include: "bg-white"
                    Is not current month, include: "bg-gray-50"
                    Is selected or is today, include: "font-semibold"
                    Is selected, include: "text-white"
                    Is not selected and is today, include: "text-indigo-600"
                    Is not selected and is current month, and is not today, include: "text-gray-900"
                    Is not selected, is not current month, and is not today: "text-gray-500"
                    */}
                <button
                  type="button"
                  class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                >
                  {/*
                        Always include: "ml-auto"
                        Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
                        Is selected and is today, include: "bg-indigo-600"
                        Is selected and is not today, include: "bg-gray-900"
                    */}
                  <time datetime="2021-12-27" class="ml-auto">
                    27
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2021-12-28" class="ml-auto">
                    28
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2021-12-29" class="ml-auto">
                    29
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2021-12-30" class="ml-auto">
                    30
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2021-12-31" class="ml-auto">
                    31
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-01" class="ml-auto">
                    1
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-02" class="ml-auto">
                    2
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-03" class="ml-auto">
                    3
                  </time>
                  <span class="sr-only">2 events</span>
                  <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                    <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  </span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-04" class="ml-auto">
                    4
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-05" class="ml-auto">
                    5
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-06" class="ml-auto">
                    6
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-07" class="ml-auto">
                    7
                  </time>
                  <span class="sr-only">1 event</span>
                  <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  </span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-08" class="ml-auto">
                    8
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-09" class="ml-auto">
                    9
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-10" class="ml-auto">
                    10
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-11" class="ml-auto">
                    11
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-12" class="ml-auto">
                    12
                  </time>
                  <span class="sr-only">1 event</span>
                  <span class="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    <span class="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  </span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-13" class="ml-auto">
                    13
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-14" class="ml-auto">
                    14
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-15" class="ml-auto">
                    15
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
                <button
                  type="button"
                  class="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
                >
                  <time datetime="2022-01-16" class="ml-auto">
                    16
                  </time>
                  <span class="sr-only">0 events</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}