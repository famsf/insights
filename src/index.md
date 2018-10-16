---
layout: "templates/pages/digital-story.html.twig"
title: Hub
tagline: From the de Young and Legion of Honor
twitter_url: 'https://twitter.com/legionofhonor'
facebook_url: 'https://www.facebook.com/LegionofHonor/'
tickets_url: 'https://tickets.famsf.org/events/283/list'
bodyId: "hub"
chapters:

################################################################################
## Introduction ################################################################
################################################################################

- title: Introduction
  numeral: A
  pages:

  # i
  - components:
    - template: "@molecules/hub/hub.html.twig"
      featured_img_src: "https://www.fillmurray.com/1500/1200"
      featured_img_alt: "Fubar"
      is_on_view: true
      featured_title: "This is a featured title"
      featured_subtitle: "This is a featured subtitle"
      read_cta: <a href="http://google.ca" target="_blank">Read More</a>
      tickets_cta: <a href="http://google.ca" target="_blank">Buy Tickets</a>
      stories:
      - template: "@molecules/hub/hub--story.html.twig"
        is_on_view: true
        image_src: "https://insights.famsf.org/assets/images/delaunay.jpg"
        image_alt: "Fubar"
        title: "This is a story"
        subtitle: "This is a story subtitle"
        read_link: <a href="http://google.ca" target="_blank">Ready</a>
        tags: "hello,world,fubar"
      - template: "@molecules/hub/hub--story.html.twig"
        is_on_view: true
        image_src: "https://insights.famsf.org/assets/images/delaunay.jpg"
        image_alt: "Fubar"
        title: "This is a story"
        subtitle: "This is a story subtitle"
        read_link: <a href="http://google.ca" target="_blank">Read</a>
        tags: "hello,world,flubber"
      - template: "@molecules/hub/hub--story.html.twig"
        is_on_view: true
        image_src: "https://insights.famsf.org/assets/images/delaunay.jpg"
        image_alt: "Fubar"
        title: "This is a story"
        subtitle: "This is a story subtitle"
        read_link: <a href="http://google.ca" target="_blank">Read</a>
        tags: "hello,world,flubber"
      - template: "@molecules/hub/hub--story.html.twig"
        is_on_view: true
        image_src: "https://insights.famsf.org/assets/images/delaunay.jpg"
        image_alt: "Fubar"
        title: "This is a story"
        subtitle: "This is a story subtitle"
        read_link: <a href="http://google.ca" target="_blank">Read</a>
        tags: "hello,world,flubber"
      - template: "@molecules/hub/hub--story.html.twig"
        is_on_view: true
        image_src: "https://insights.famsf.org/assets/images/delaunay.jpg"
        image_alt: "Fubar"
        title: "This is a story"
        subtitle: "This is a story subtitle"
        read_link: <a href="http://google.ca" target="_blank">Read</a>
        tags: "hello,world,flubber"
