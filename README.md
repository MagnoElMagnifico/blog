[![Netlify Status](https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status)](https://app.netlify.com/sites/magnoblog/deploys)

# Magno Blog
This is the code for [my personal website](https://magnoblog.netlify.com) hosted
in [Netlify](https://netlify.com) using the [Zola](https://www.getzola.org).
static site generator.

The HTML, CSS and JS were all created by me, I am not using a _theme_.

# TODOs
- Only show the recent blog posts, not all the content in the entry page (index.html)
  - Gather all the blog posts in a list, sort it by date and get the 5-10 first

- Crear una cabezera para moverme entre categorías.
  - Leer el nombre de las subcarpetas/subsections
  - Generarla desde base.html? Todas las páginas del blog deberían tener la cabecera, al igual que el footer

- Test if the description show up
- Review mobile styles
- Improve the footer in shorter pages
- Table scaling in small devices

- Is the changelog necessary?
- Improve descriptions
- Render `.odt` files to `.pdf` and then use the [converter](https://pdf2md.morethan.io)
  to pass it to `.md`.

## New features:
- Add Russian chars to the animation (?)
- CSS Transitions / Animations
  - Blog description: <https://codepen.io/kazed972/pen/bQOQGR>
  - Matrix: <https://codepen.io/syropian/pen/bLzAi>
  - Terminal: <https://codepen.io/Tbgse/pen/dYaJyJ>
  - Glitch: <https://codepen.io/elisabethdiang/pen/WNbBxXq>
- Diferent sized imgs
- Robots.txt
- Taxonomies -> Pagination -> Feed
- Sitemap
- Make multilingual (for now in Spanish)

# Links
- [Tera Lang docs](https://tera.netlify.app/docs/)
- [Zola docs](https://www.getzola.org/documentation/getting-started/overview/)
- [Icons from Google](https://fonts.google.com/icons)
- [CSS media sizes](https://stackoverflow.com/questions/25211090/how-to-auto-adjust-the-div-size-for-all-mobile-tablet-display-formats)
