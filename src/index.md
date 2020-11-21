---
title: 11ty Previous - Next Demo
layout: layouts/base.njk
---

This is the most basic demo of generating **Previous** and **Next** links for 11ty Collections.

No styles. No JS. Just the structures required to paginate through entries for two different Collections:

- Covers _(book covers)_
- Posts _(blog posts)_

---

## Covers

<ul>
{% for cover in collections.covers %}
  <li>Book Title: <a href="{{ cover.url }}">{{ cover.data.title}}</a></li>  
{% endfor %}
</ul>

## Blog Posts

<ul>
{% for post in collections.posts %}
  <li>Post: <a href="{{ post.url }}">{{ post.data.title}}</a></li>  
{% endfor %}
</ul>
