# Personal Website & Blog

This is my personal portfolio website and blog, built with Jekyll and hosted on GitHub Pages.

## Structure

- `_posts/` - Blog posts in Markdown format
- `_layouts/` - HTML templates for pages and posts
- `_includes/` - Reusable components like navigation
- `pages/` - Static pages (About, Skills, Projects, Blog)
- `assets/` - Images, certificates, and other static files
- `scripts/` - JavaScript files for interactivity
- `styles/` - CSS stylesheets

## Adding a New Blog Post

To add a new blog post:

1. Create a new Markdown file in `_posts/` with the naming format: `YYYY-MM-DD-title.md`
2. Add front matter at the top of the file:
   ```yaml
   ---
   layout: post
   title: Your Post Title
   date: YYYY-MM-DD HH:MM:SS +/-TTTT
   tags: [tag1, tag2]
   ---
   ```
3. Write your post content in Markdown below the front matter
4. Commit and push to GitHub - the site will automatically rebuild

## Local Development

To run the site locally:

1. Install Ruby and Bundler
2. Run `bundle install` to install dependencies
3. Run `bundle exec jekyll serve` to start the development server
4. Visit `http://localhost:4000` in your browser

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch.