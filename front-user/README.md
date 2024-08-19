# Banter Next.js

A modern multipurpose blog theme built with Tailwind CSS & [Next.js](https://nextjs.org/).

This template is built with **Next.js v13.5** and **Tailwind CSS v3.3**, leveraging the latest [App Router](https://nextjs.org/docs/app) and server component functionalities. It's Powered by [MDX](https://mdxjs.com/), with [Contentlayer](https://www.contentlayer.dev/) integration.

## Getting Started

First, install the dependencies. Navigate to the project directory in your terminal and run:

```bash
npm install
# or
yarn install  # if you have Yarn installed
```

This will install all required dependencies and place them in a folder called `node_modules` in the root directory.

Once the dependencies are installed, you can run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

## File Structure

- `src` Contains all of the source code for the website
  - `app` - Contains the site route components and layouts
  - `components` - Directory of reusable components
  - `config` - Directory of configuration files that contain site-wide data
  - `content` - Contains all the `mdx` content files for the blog powered by `contentlayer`.
  - `libs` - Directory of resuable code used across the site
  - `styles` - Contains the entry-level stylesheet for Tailwind CSS

## Social Media Links

You can add or modify your social media links in the `config/social.js` file:

```javascript
export default [
  {
    name: 'facebook',
    href: '#',
  },
  {
    name: 'instagram',
    href: '#',
  },
  {
    name: 'twitter',
    href: '#',
  },
  {
    name: 'linkedin',
    href: '#',
  },
]
```

Remember, if you add a social media link, make sure to add its corresponding icon in the components/social/SocialIcons component.

## MDX Content

All of the content for the site is stored in mdx files in the `src/content` directory. Banter uses [contentlayer](https://www.contentlayer.dev/docs), to access, model and transform this content into data throughout the blog.

In order to model your data correctly, `contentlayer` needs to know the shape of your content — your content schema. This content schema is stored and defined in the root of the project in the `contentlayer.config.js` file.

We content is divided and structured into 4 different content collections: `articles`, `authors`, `categories`, and `pages`. To add a new item to a collection, simply add the data to its corresponding directory inside `src/content`. Make sure that the data structure is the same as the content schema defined in the `contentlayer.config.js` file for that corresponding collection.

### Adding new authors

You can add new or customize existing authors in the `src/content/authors` directory. Each author's file name is the slug for that particular author's page. For example, the author Mark Jack has a corresponding markdown file named `mark-jack.mdx` and an author page at `/authors/mark-jack`.

Every author has data in the following format:

```markdown
---
name: 'Mark Jack'
avatar: '/images/authors/mark-jack.jpg'
role: 'Staff Writer'
social_links:
  - name: 'twitter'
    url: '#'
  - name: 'facebook'
    url: '#'
  - name: 'instagram'
    url: '#'
  - name: 'linkedin'
    url: '#'
---

Lorem ipsum dolor sit amet mauris quis phasellus ornare dui lectus. Laoreet habitasse eiusmod nulla odio tortor neque diam convallis morbi dolore molestie tellus faucibus pharetra.
```

All of the author images are stored in the `public/images/authors` directory. The markdown content below the frontmatter is the author's bio.

Similar to the site's social links, if you add a social media link make sure to add its corresponding icon in the `src/components/social/SocialIcon` component.

### Adding new articles

All of the articles are located in the `src/content/articles` directory. All of the posts have data in the following format:

```javascript
---
title: "7 Things You Can Do To Be More Productive in the Morning (That Don't Involve Coffee)"
description: "Lorem ipsum dolor sit amet tempus bendum labore laoreet.Hendrerit lobortis a leo curabitur faucibus sapien ullamcorper do labore odio."
image: "/images/posts/archive-41.jpeg"
date: "2022-02-05T16:56:47+06:00"
author: "authors/veronica-mars.mdx"
time_to_read_in_minutes: 12
views: 2620
category: "categories/productivity.mdx"
tags: ["Growth", "Tips", "Self-improvement", "Morning Routine"]
---

Aliqua venenatis gravida et urna molestie leo adipiscing dolore leo euismod quam. Aenean porta curabitur convallis pellentesque velit platea at neque phasellus...
```

All of the post images are stored in the `public/images/posts` directory. The markdown content below the frontmatter is the post content.

Note that every article `category` and `author` value is a path to the corresponding `category` or `author` document file. This allows `contentlayer` to model our data and define references between our content to easily fetch and access this data throughout the blog.

If you add a new author or category, make sure to create their corresponding markdown files in the `src/content/authors` and `src/content/categories` directories respectively.

### Pages Content

The `src/content/pages` directory stores data for simple content pages such as the privacy and terms pages.

This content has the following data structure:

```
---
title: "Privacy Policy"
description: "Privacy & policy"
date: 2023-07-08
---

My Website one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by My Website and how we use it...
```

Each page content file is mapped to a corresponding site page at the root of the website: `/page`. You can find the corresponding route component in the `src/app/[slug]/page.jsx`

### MDX Rendering with MdxContent

The template provides a specialized component called `MdxContent` which renders your MDX content with the help of the `useMDXComponent` hook from `next-contentlayer/hooks`. This component is situated in the `src/components/mdx` directory.

The MdxContent component defines Image and Link mdx components that are wrapper components for the Next.js Link and Image components respectively.

Both of these helper components, along with any future ones you might add, are also housed in the `src/components/mdx` directory. This modular approach allows you to easily extend or customize the behavior of MDX elements as your project grows.

## Tailwind CSS

This theme uses the latest version of Tailwind CSS: v3.3.

Tailwind CSS and its dependencies were installed via npm as recommended by the official [Tailwind installation docs for next.js](https://tailwindcss.com/docs/guides/nextjs). If you are not familiar with the Tailwind CSS framework, I would recommend checking out the [Tailwind documentation](https://tailwindcss.com/docs).

You can find the `tailwind.config.js` and `postcss.config.js` files at the root of the directory. The entry point CSS file is located at `src/styles/globals.css`. This file only contains the `@tailwind` directives.

Tailwind allows you to customize what it generates using the `tailwind.config.js` file at the root of the project directory. We have defined a few extra utility classes along with 2 official Tailwind CSS plugins (`@tailwindcss/aspect-ratio`, `@tailwindcss/typography`).

## Font

This template uses the `Roboto Flex` Font family from the [Google Fonts Library](https://fonts.google.com/specimen/Roboto+Flex). Banter uses the new Next.js font system with `next/font` which allows you to conveniently use all Google Fonts with performance and privacy in mind.

## Icons

The icons used for this theme are part of the [Hero Icons](https://heroicons.com/) set that is free to use and published under the [MIT License](https://github.com/tailwindlabs/heroicons/blob/master/LICENSE).

Some of the examples in Banter use [Nucleo App](https://nucleoapp.com/premium-icons) icons which we have acquired a license for. You are free to use the Nucleo icons included in this template on your projects, but if you are interested in using the rest of their premium icons you can buy a license on their [website](https://nucleoapp.com/).

## Images

All of the images for posts, categories, authors and website components are from [Unsplash](https://unsplash.com/) or [Pexels](https://www.pexels.com/).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) made by the same creators of Next.js.

Check out their [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

This site template is a commercial product and is licensed under the [Tailwind Awesome license](https://www.tailwindawesome.com/license).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Additional Help

If you need additional help setting up the template or have any questions, feel free to contact me at <rodrigo@tailwindawesome.com>.
