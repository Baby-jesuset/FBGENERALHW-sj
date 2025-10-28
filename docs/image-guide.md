# Image Upload Guide for FB Hardware

This guide explains how to add and manage images for products and categories on the FB Hardware website.

## Image Requirements

- **Format**: Use JPG or PNG format for best compatibility
- **Size**: Recommended size is 800x800 pixels for product images
- **File size**: Keep images under 500KB for fast loading
- **Naming**: Use descriptive names without spaces (e.g., `red-toolbox.jpg`)

## Adding Images to the Site

### Step 1: Prepare Your Images

1. Resize your images to the recommended dimensions
2. Optimize images for web using tools like TinyPNG or ImageOptim
3. Use descriptive filenames without spaces (use hyphens instead)

### Step 2: Upload Images to the Public Folder

1. Place your image files in the `/public` directory of the project
2. For organization, you can create subdirectories like `/public/products/` or `/public/categories/`

### Step 3: Reference Images in Products/Categories

When adding or editing products/categories, use the correct path to your image:

- For images in the root of the public folder: just use the filename (e.g., `product-name.jpg`)
- For images in subdirectories: include the subdirectory (e.g., `products/product-name.jpg`)

Do NOT include `/public` in the path - the public directory is automatically used as the root for static assets.

## Examples

### Correct Image Paths

```
// For an image at /public/product-name.jpg
image: "product-name.jpg"

// For an image at /public/products/product-name.jpg
image: "products/product-name.jpg"
```

### Incorrect Image Paths

```
// WRONG - don't include /public
image: "/public/product-name.jpg"

// WRONG - don't use absolute URLs to local files
image: "C:/Users/Username/project/public/product-name.jpg"
```

## Troubleshooting Common Image Issues

### Images Not Displaying

1. Check that the image file exists in the public directory
2. Verify the path is correct (no `/public` prefix)
3. Ensure the filename in the database matches the actual file (case-sensitive)
4. Check for typos in the file extension (e.g., `.jpg` vs `.jpeg`)

### Image Quality Issues

1. Use higher resolution source images
2. Don't over-compress images
3. Use proper image dimensions (800x800px recommended)

### Slow Loading Images

1. Optimize images with compression tools
2. Resize large images to appropriate dimensions
3. Consider using WebP format for better compression

## Best Practices

1. Use consistent image dimensions for all products
2. Take photos with neutral backgrounds for product images
3. Ensure good lighting to showcase product details
4. Use multiple images for important products (main image + detail shots)
5. Always add descriptive alt text for accessibility

For additional help with images, contact the site administrator.
