import React from "react";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox mx-auto my-10 w-full px-8 mt-12 2xl:max-w-[85rem]">
      {/* Navigation Tabs */}
      <div className="descriptionbox-navigator flex border-b border-gray-300">
        <div className="descriptionbox-nav-box flex-1 text-center py-4 text-lg font-semibold border border-gray-300 hover:bg-gray-100 cursor-pointer">
          Description
        </div>
        <div className="descriptionbox-nav-box flex-1 text-center py-4 text-lg font-semibold border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer">
          Reviews (122)
        </div>
      </div>

      {/* Content Section */}
      <div className="descriptionbox-description flex flex-col gap-6 border border-gray-300 p-6 md:p-12">
        <p className="text-gray-700">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ut
          numquam ipsa dicta explicabo nemo porro, quae sequi facere eaque.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          impedit cumque temporibus praesentium rerum! Doloribus commodi
          voluptatem molestias natus exercitationem, dignissimos animi fuga
          voluptatum asperiores ipsa ullam iste! Quisquam sint molestias
          asperiores? Beatae laboriosam aut eos commodi hic doloribus deleniti
          neque, atque sapiente. Eos ipsa deserunt rem sunt quas praesentium.
          Asperiores maxime molestiae odit aperiam dolore. Veniam, labore
          itaque. Quas quaerat aliquid rem dolor sequi.
        </p>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex modi
          dolorem debitis cupiditate doloribus iste tempora autem, voluptate ad
          assumenda quibusdam reiciendis consequatur magnam totam inventore
          quae, excepturi sequi! Aliquid magnam nam est sunt reprehenderit?
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;





// import React from 'react'
// import './descriptionBox.css'
// const DescriptionBox = () => {
//   return (
//     <div className='descriptionbox'>
// <div className="descriptionbox-navigator">
//     <div className="descriptionbox-nav-box">
//         Description
//     </div>
//     <div className="descriptionbox-nav-box fade">Reviews (122) </div>
// </div>
// <div className="descriptionbox-description">
//     <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio ut numquam ipsa dicta explicabo nemo porro, quae sequi facere eaque.
//          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum impedit cumque temporibus praesentium rerum! Doloribus 
//         commodi voluptatem molestias natus exercitationem, dignissimos animi fuga voluptatum asperiores ipsa ullam iste! Quisquam sint molestias asperiores? 
//         Beatae laboriosam aut eos commodi hic doloribus deleniti neque, atque sapiente.
//          Eos ipsa deserunt rem sunt quas praesentium. Asperiores maxime molestiae odit aperiam dolore. 
//          Veniam, labore itaque. Quas quaerat aliquid rem dolor sequi.lorem20 lorem20 </p>
//          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex modi dolorem debitis cupiditate doloribus iste tempora autem, voluptate ad assumenda
//              quibusdam reiciendis consequatur magnam totam inventore quae, excepturi sequi! Aliquid magnam nam est sunt reprehenderit?</p>
// </div>

//     </div>
//   )
// }

// export default DescriptionBox