"use client"

import debounce from "debounce"

import Link from "next/link"
import { useState } from "react"
import { BiLoaderCircle } from 'react-icons/bi'
import { AiOutlineSearch } from 'react-icons/ai'


export default function MainHeader() {
  const [items, setItems] = useState([])
  const [isSearching, setIsSearching] = useState(null)

  const handleSearchName = debounce(async (event) => {
    if (event.target.value === "") {
      setItems([])
      return
    }
    setIsSearching(true)

    try {
      const response = await fetch(`/api/products/search-by-name/${event.target.value}`)
      const result = await response.json()

      if (result) {
        setItems(result)
        setIsSearching(false)
        return
      }

      setItems([])
      setIsSearching(false)
    } catch (error) {
      console.log('error', error)
    }
  }, 500)

  return (
    <>
      <div
        id="MainHeader"
        className="border-b"
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
          <div className="flex items-center w-full bg-white">
            <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
              <Link href="/">
                <img
                  width="120"
                  src="/images/logo.svg"
                />
              </Link>
              <div className="w-full">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="relative flex items-center border-2 border-gray-900 w-full p-2">
                      <button className="flex items-center">
                        <AiOutlineSearch size={22} />
                      </button>
                      <input
                        type="text"
                        className="w-full placeholder-gray-400 text-sm focus:outline-none"
                        placeholder="Search for anything"
                        onChange={handleSearchName}
                      />

                      {isSearching
                        ? <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                        : ''
                      }

                      {
                        items.length > 0
                          ? <div className='absolute bg-white max-w-[910px] h-auto w-full left-0 top-12 border p-1'>
                            {items.map((item) => (
                              <div className='pr-1' key={item.id}>
                                <Link
                                  href={`/product/${item?.id}`}
                                  className='flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 p-1 px-2'
                                >
                                  <div className='flex items-center'>
                                    <img
                                      src={item.url + '/40'}
                                      width='40'
                                      className='rounded-md'
                                    />
                                    <div className='truncate ml-2'>{item?.title}</div>
                                  </div>
                                  <div className='truncate'>${(item?.price / 100).toFixed(2)}</div>
                                </Link>
                              </div>
                            ))}
                          </div>
                          : null
                      }
                    </div>
                    <button className="flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-14">
                      Search
                    </button>
                    <div className="text-xs px-2 hover:text-blue-500 cursor-pointer">
                      Advanced
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}