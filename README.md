# Demo 11ty Previous and Next Links

_(Thanks to @khoivan88 for the challenge in how to explain how all this works for those new to 11ty)_

Simple demo for Previous &amp; Next links in 11ty to help several posters in the 11ty Discord community.

Demo site: https://demo-11ty-prev-next.netlify.app/

## Install Using Template

1. Click the <kbd>Use this template</kbd> button above to create a clean copy of this repo in your Github account.
2. Clone your clean copy to your local dev environment.
3. `cd` into your new directory
4. `npm install`
5. `npm run dev` to fire up the 11ty dev server
6. Open your browser to `http://localhost:8080`

## Important Parts to Understand

### Running Nunjucks code in Markdown (.md) files

```js
.eleventy.js

markdownTemplateEngine : "njk"
```

Setting the Template Engine for markdown (.md) files allows us to run Nunjucks code in our `/src/index.md` file so we can loop through the **Covers & Posts Collections** to create the links to those entries.

---

### Automatic Collections

We don't have to specify Collections in the `.eleventy.js` file for something as simple as this demo.

`/src/covers/covers.json` setting `tags: covers` automatically creates the "covers" Collections.  
And tells 11ty to use the `/src/_includes/layouts/cover.njk` template for every Entry so we don't have to set that Frontmatter in each content .md file.

`/src/posts/posts.json` setting `tags: posts` automatically creates the "posts" Collections.  
And tells 11ty to use the `/src/_includes/layouts/post.njk` template for every Entry so we don't have to set that Frontmatter in each content .md file.

We can then loop through the "covers" and "posts" Collections in `/src/index.md` and generate links to the Covers and Posts entries.

---

### Generating Previous and Next links in the Entry Details

Now in `/src/_includes/layouts/cover.njk` and `/src/_includes/layouts/post.njk` we can set `previousPost` and `nextPost` variables using 11ty's built in Filters: https://www.11ty.dev/docs/filters/collection-items/

- getPreviousCollectionItem(page)
- getNextCollectionItem(page)

```liquid
/src/_includes/layouts/cover.njk

{% set previousPost = collections.covers | getPreviousCollectionItem(page) %}
{% set nextPost = collections.covers | getNextCollectionItem(page) %}
```

```liquid
/src/_includes/layouts/post.njk

{% set previousPost = collections.posts | getPreviousCollectionItem(page) %}
{% set nextPost = collections.posts | getNextCollectionItem(page) %}
```

Then use simple conditionals to display (or not) the Previous and Next links:

```liquid
/src/_includes/layouts/cover.njk & post.njk

    <div>
      {% if previousPost %}
        <p><a href="{{ previousPost.url }}">← {{ previousPost.data.title }}</a></p>
      {% endif %}
    </div>

    <div>
      {% if nextPost %}
        <a href="{{ nextPost.url }}">{{ nextPost.data.title }} →</a>
      {% endif %}
    </div>
```

---

### UPDATE: Generating Previous and Next links within 11ty Navigation

In the **Covers and Posts** markdown files you'll notice there is no `date:` Frontmatter. Because I created each of the files in order, pagination simply works based on the file creation date.

In the new **Chapters** section, where 11ty Navigation is used (https://www.11ty.dev/docs/plugins/navigation/) we naturally want to link from one Chapter to it's Sections and to the next Chapter. In order to do this automatically, we just need to add `date:` values to the Frontmatter on those markdown files, with the timestamp incremented.

So you can see I simply incremented the timestamps by 1 minute in each of the Chapter & Section pages.

11ty Navigation will then properly construct Previous and Next links without any special code.

_NOTE: You'll just have to remember to manually adjust the timestamp if you ever want to insert Sub-Section pages or re-order the Sections. Would be every easy if you just increment each file by Hour or even Day._
