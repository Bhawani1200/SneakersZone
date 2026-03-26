import React from "react";
import ProductCard from "./shared/ProductCard";
const products = [
  {
    productId: "mock-1",
    image:
      "https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/484758280_976307208041012_4262915553937587233_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=IR9-RNWAA1wQ7kNvwHFoX3O&_nc_oc=AdnCe43uEfyd_Fui4nqsnvxFSi0PO9EtpA0VnAm4eopVApzk-GcvpwE6m71uzuNyj-Nv6ldJ6gNR1krEluq15sWi&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=VyyZvl0VNXRDsNMG-Rjh0A&oh=00_AfgfTqx-15B2chXfY4wCMpbNR1ZrgSYQBf_6D0F5vNsjlA&oe=69163DD3",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    productId: "mock-2",
    image:
      "https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/484512253_975996521405414_2383339746707707528_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=f727a1&_nc_ohc=zkVkDw57qKUQ7kNvwHhdrHN&_nc_oc=AdkQOeYkXueTPR3FvoAhkR_Z3c05PyG35RJnZ-_--21fwjW2zg4g6RawRWvZk7zEvqFJT_Xk2KfNfbN_aAC7R8EN&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=dnZ3zqc0Tw2Y4pp5xRo2QA&oh=00_AfjgfzaUJZsAuBbh-HESyWjc6ikr8YgCaseYZZ7Fy7C8iQ&oe=691626FF",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    productId: "mock-3",
    image:
      "https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/484040027_975992774739122_7318357333471617586_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=QB-Ni1dQf7QQ7kNvwEe4FYo&_nc_oc=AdlyZRz1mr0coxU2kvF5wnN9ckvPnt3O0-ZrXPy_j78eztQ3tVBJ3zx7WXy4gUVCZvhy28Lc_5dAz5kScBdQ2Kt3&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=63DAvnY_iZi4hNv8QYanZA&oh=00_AfiZUzKycxxYFw1-gRjCqwoo995w6T65ugq9fzNa6xDi7A&oe=691649B1",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
  {
    productId: "mock-4",
    image:
      "https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/484317562_975271841477882_5667679660597536821_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=FXwlswewtnYQ7kNvwG0a1JE&_nc_oc=Adm0muHZmLgNl-3UujBvCrRylfTTMv8ttxOsSbFXqUIVYqVPkyMe79Y1uUg6vmrtexGx0XTcnfV6f5MztVS2saYq&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=bFGJalT_5w8dkYbyLsAmNQ&oh=00_AfhzRps_-eRMd3JEnqGqA2NbTbWyfYYB7OhH67iIrtAK8w&oe=69162DD0",
    productName: "Google Pixel9",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  },
];
const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 font-bold text-4xl text-center mb-12">
        About page
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="flex items-center text-1xl italic font-serif justify-center text-red-600 text-italic">
            "Our store celebrates the beauty of heritage."
          </h3>
          <p className="text-gray-700 leading-7 font-light mb-4 text-2xl mt-2">
            We bring you traditional clothing that reflects culture, identity,
            and timeless craftsmanship. Each piece is made with care, honoring
            the artistry passed down through generations. Our goal is to
            preserve tradition while offering elegant styles that feel
            meaningful and unique.
          </p>
          <h4 className="flex items-center text-1xl italic font-serif justify-center text-red-600 text-italic">
            "Authenticity in Every Detail."
          </h4>
          <p className="text-gray-700 leading-7 font-light text-2xl mt-2">
            We work closely with skilled local artisans who use fine materials,
            thoughtful stitching, and classic patterns. Every outfit tells a
            story of pride, community, and culture. By choosing our store, you
            are not just purchasing clothing — you are supporting tradition,
            creativity, and positive cultural expression.
          </p>
          .
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            src="https://scontent.fbir1-1.fna.fbcdn.net/v/t39.30808-6/485002821_979134491091617_1294853307517103524_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=hsGRC_-O2bkQ7kNvwGQ4TdK&_nc_oc=AdmfdDSFB1h4c1buPSq8iApDnzDjEoohuIX_yRqEiukqUunH0B8zBdC_ihCErp6RjPFTVFOJZ-ZBkxm4FQJUCZjQ&_nc_zt=23&_nc_ht=scontent.fbir1-1.fna&_nc_gid=i-6y823qiMyCxGW6nsyh4Q&oh=00_AfhEES0_-U6AQWeqJqVRaNp_-DP_MxB5iuAvdt15Dgqj3w&oe=6916442F"
          />
        </div>
      </div>
      <div className="text-slate-800 font-bold text-4xl text-center mb-12 space-y-8 py-7">
        <h1>Our Products</h1>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            productName={product.productName}
            description={product.description}
            specialPrice={product.specialPrice}
            price={product.price}
            about
          />
        ))}
      </div>
    </div>
  );
};

export default About;
