# Builder Portfolio

Simple static portfolio website.

## Folder structure

- `index.html` - page structure
- `css/style.css` - design and responsive layout
- `js/portfolio-data.js` - portfolio projects and image lists
- `js/services-data.js` - service categories
- `js/main.js` - page behavior
- `images/` - project photos

## Add a portfolio project

1. Put the image files into the `images` folder.
2. Open `js/portfolio-data.js`.
3. Add a new object:

```javascript
{
    title: "Apartment renovation",
    description: "Complete apartment renovation.",
    images: [
        "images/apartment-01.jpg",
        "images/apartment-02.jpg"
    ]
}
```

The first image is used as the portfolio card preview.

## Add or edit services

Edit `js/services-data.js`.

Each top-level object is a main category. Each main category can contain multiple nested categories and service items.

## Contact details

Edit the phone number, email address, company/name, and text directly in `index.html`.

## Run locally

For this version you can simply open `index.html` in a browser.

If you later use browser features that require a web server, you can serve the folder with any simple local HTTP server.
