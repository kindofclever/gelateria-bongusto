import { groq } from "next-sanity";

export const flavorsQuery = groq`
  *[_type == "flavor"] | order(sortOrder asc) {
    _id,
    "name": name[_key == $locale][0].value,
    "description": description[_key == $locale][0].value,
    "slug": slug.current,
    image,
    category,
    allergens,
    isVegan,
    isLactoseFree,
    isFeatured,
    sortOrder
  }
`;

export const featuredFlavorsQuery = groq`
  *[_type == "flavor" && isFeatured == true] | order(sortOrder asc) {
    _id,
    "name": name[_key == $locale][0].value,
    "description": description[_key == $locale][0].value,
    "slug": slug.current,
    image,
    category,
    isVegan,
    isLactoseFree
  }
`;

export const toppingsQuery = groq`
  *[_type == "topping"] | order(sortOrder asc) {
    _id,
    "name": name[_key == $locale][0].value,
    image,
    price,
    sortOrder
  }
`;

export const containerSizesQuery = groq`
  *[_type == "containerSize"] | order(sortOrder asc) {
    _id,
    "name": name[_key == $locale][0].value,
    volume,
    price,
    maxFlavors,
    image,
    sortOrder
  }
`;

export const locationsQuery = groq`
  *[_type == "location" && isActive == true] {
    _id,
    name,
    address,
    phone,
    email,
    coordinates,
    "openingHours": openingHours[_key == $locale][0].value,
    image
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    "heroTitle": heroTitle[_key == $locale][0].value,
    "heroSubtitle": heroSubtitle[_key == $locale][0].value,
    heroImage,
    "aboutTeaser": aboutTeaser[_key == $locale][0].value,
    einweggebindePrice
  }
`;

export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(sortOrder asc) {
    _id,
    "title": title[_key == $locale][0].value,
    image,
    category
  }
`;

export const flavorRatingsQuery = groq`
  *[_type == "rating" && flavor._ref == $flavorId && approved == true] | order(createdAt desc) {
    _id,
    score,
    name,
    comment,
    createdAt
  }
`;

export const flavorAverageRatingQuery = groq`
  {
    "average": math::avg(*[_type == "rating" && flavor._ref == $flavorId && approved == true].score),
    "count": count(*[_type == "rating" && flavor._ref == $flavorId && approved == true])
  }
`;
