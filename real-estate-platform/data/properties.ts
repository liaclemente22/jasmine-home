export type Property = {
    id: string;
    title: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    area: number;
    location: string;
    type: "rent" | "sale";
    status: "available" | "sold" | "reserved";
    featured?: boolean;
    description: string;
    images: string[];
};

export const properties: Property[] = [
    {
        id: "1",
        title: "Modern Makati Condo",
        price: 35000,
        bedrooms: 2,
        bathrooms: 1,
        area: 45,
        location: "Makati",
        type: "rent",
        status: "available",
        featured: true,
        description:
            "A calm and thoughtfully designed condo in Makati, perfect for modern city living.",
        images: ["/property1.jpg"],
    },
    {
        id: "2",
        title: "BGC Studio",
        price: 28000,
        bedrooms: 1,
        bathrooms: 1,
        area: 30,
        location: "BGC",
        type: "rent",
        status: "available",
        featured: true,
        description:
            "Minimalist studio in BGC with soft natural light and curated interiors.",
        images: ["/property2.jpg"],
    },
    {
        id: "3",
        title: "Ortigas Investment Condo",
        price: 6200000,
        bedrooms: 1,
        bathrooms: 1,
        area: 38,
        location: "Ortigas",
        type: "sale",
        status: "available",
        featured: true,
        description:
            "A well-positioned investment condo with strong appreciation potential.",
        images: ["/pexels-curtis-adams-1694007-4119832.jpg"],
    },
    {
        id: "4",
        title: "Luxury Makati Residence",
        price: 8500000,
        bedrooms: 2,
        bathrooms: 2,
        area: 65,
        location: "Makati",
        type: "sale",
        status: "sold",
        featured: false,
        description:
            "A refined residence in Makati designed for long-term value and comfort.",
        images: ["/pexels-jonathanborba-9976124.jpg"],
    },
];
