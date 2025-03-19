import React, { useContext, useState} from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaList } from 'react-icons/fa';
// import { Squares2X2Icon } from '@heroicons/react/20/solid';
import Item from '../components/item/Item';
import img from '../assets/images/BAN1.webp'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'Bags', href: '#' },
  { name: 'Footwear', href: '#' },
  { name: 'Beauty product', href: '#' },
  { name: 'Accessories', href: '#' },
  { name: 'Outdoors', href: '#' },
  { name: 'Womens', href: '#' },
  { name: 'Kids', href: '#' },
]
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
  {
    id: 'price',
    name: 'price',
    options: [
      { value: 'Under $100', label: 'Under $100', checked: false },
      { value: '$300 - $500', label: '$300 - $500', checked: false },
      { value: '$500 - $1000', label: '$500 - $1000', checked: false },
      { value: '$1000 - $1500', label: '$1000 - $1500', checked: false },
      { value: 'Above $1500', label: 'Above $1500', checked: true },
    ],
  },
  {
    id: 'brand',
    name: 'brand',
    options: [
      { value: 'H&M', label: 'H&M', checked: false },
      { value: 'Levis', label: 'Levis', checked: false },
      { value: 'Biba', label: 'Biba', checked: false },
      { value: 'Allen Solly', label: 'Allen Solly', checked: false },
      { value: 'Chanel', label: 'Chanel', checked: false },
      { value: 'Zara', label: 'Zara', checked: false },
      { value: 'Dior', label: 'Dior', checked: true },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ShopCategory = ({ banner, category }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { all_product } = useContext(ShopContext);
  // console.log("shopcat",all_product);

  // Filter products based on the provided category
  const filteredProducts = all_product.filter((item) => item.category?.name === category);
  // console.log("shopcatfilteredProducts",filteredProducts);
  

  return (


    <div className="bg-white">
       <div>
          {/* Mobile filter dialog */}
          <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 top-36 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>
          {/* sidebar close here--> mobile view sidebar */}
          {/* from here actual side bar shuru  */}
          <main className="mx-auto max-w-[90rem] px-1 sm:px-1 lg:px-1">
            {/* yeah navbar */}
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-2 pt-5 px-3">  
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{category}'s collection</h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <a
                            href={option.href}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                              'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                            )}
                          >
                            {option.name}
                          </a>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>
                {/* grid here */}

                <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
            {/* menu navbar close here */}
            {/* sidebar start here   */}

            <section aria-labelledby="products-heading" className="pb-0 pt-2 ">
              {/* <h2 id="products-heading" className="sr-only"> */}
              <h2 id="products-heading" className="text-lg sr-only pb-3 font-bold">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block shadow-lg px-3">
                  <h3 className="text-xl font-bold pb-3">Categories</h3>
                  <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>
                  <div className="posture space-y-4 border-b border-gray-200 pb-6 pt-4">
                    <img src={img} alt="" className=''/>
                  </div>

                  {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900 pl-2">{section.name}</span>
                          <span className="ml-6 flex items-center pr-2">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-[open]:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-[&:not([data-open])]:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    defaultValue={option.value}
                                    defaultChecked={option.checked}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:checked]:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  <div className="posture space-y-4 border-b border-gray-200 pb-6 pt-4">
                    <img src={img} alt="" className=''/>
                  </div>
                </form>





                <div className="lg:col-span-3">

      {/* Banner Section  main sec pb-20 px-4 pt-4*/}
      <div className="shop-category popular w-full pb-[80px] px-4 pt-[10px]">
        <img
          src={banner}
          alt={`${category} Banner`}
          className="shopcategory-banner mb-[10px] md:mx-[20px]  block w-full h-auto md:w-11/12  md:my-[10px]"
        />

        {/* Filter Options */}
        <div className="flex flex-col sm:flex-row justify-between mx-2 md:mx-0 mb-5 mt-4">
          <div className="flex">
            <button type="button" className="-m-2 ml-0 p-2 text-gray-400 hover:text-gray-500 xs:ml-0">
            <span className="sr-only">View grid</span>
             
              <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" className="-m-2 ml-3 p-2 text-gray-400 hover:text-gray-500 sm:ml-3">
            <span className="sr-only">list grid</span>

              <FaList aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-700 text-sm font-bold">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Section */}
        {filteredProducts.length > 0 ? (
          <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <Item
                key={index}
                id={product._id}
                name={product.name}
                image={product.images?.[0] || '/default-image.jpg'}
                price={product.price}
                old_price={product.old_price}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No products found for this category.</p>
        )}

        {/* Explore More Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-black transition duration-300">
            Explore More
          </button>
        </div>
      </div>
      </div>
      </div>
            </section>
          </main>
        </div>
    </div>
  );
};

export default ShopCategory;

