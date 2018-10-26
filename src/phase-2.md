---
layout: "templates/pages/digital-story.html.twig"
title: La Prose
tagline: From the de Young and Legion of Honor
twitter_url: 'https://twitter.com/legionofhonor'
facebook_url: 'https://www.facebook.com/LegionofHonor/'
tickets_url: 'https://tickets.famsf.org/events/283/list'
bodyId: "la-prose"
chapters:

################################################################################
## Introduction ################################################################
################################################################################

- title: Introduction
  numeral: A
  pages:

  # i
  - classes: invert-top-bar
    components:
    - template: "@molecules/CoverPage/CoverPage.html.twig"
      subtitle: du Transsibérien et de<br>la petite Jehanne de France
      info: "Reva and David Logan Collection of Illustrated Books<br />Legion of Honor Museum"
      image:
        url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/0_la-prose-title-card.jpg
        alt: "Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars"

  # ii
  - components:
    - template: "@layouts/one_up--primary/one_up--primary.html.twig"
      cols: medium-8
      offset: medium-offset-2
      dropcap: false
      classes: big_type theme--primary
      grid: align-middle
      components:
      - template: "@atoms/h2/h2.html.twig"
        text: Introduction
      - template: "@atoms/textarea/textarea.html.twig"
        text: "<p>By 1913, Paris had been for more than a decade the epicenter of artistic revolution in Europe. That year, artist Sonia Delaunay and poet Blaise Cendrars collaborated on <em>La prose du Transsibérien et de la petite Jehanne de France (Prose of the Trans-Siberian and of Little Jehanne of France)</em>. Hailed as the first “simultaneous book,” the artwork was conceived as a unified experience of text and image, indivisible and apprehended concurrently.</p>"

  # iii
  - classes: hide-chapter-nav theme--dark
    components:
    - template: "@organisms/video--embed/video--embed.html.twig"
      id: xt27-zrvHkk
      # see https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
      poster: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/intro-book-unfolding_thumbnail.jpg
      youtube:
        embed: xt27-zrvHkk
      overlay:
        heading: Full Width
        text: Embedded video rendered in full width mode

  # iv
  - classes: hide-chapter-nav theme--dark
    components:
    - template: "@organisms/video--embed/video--embed.html.twig"
      classes: boxed
      id: xt27-zrvHkk
      # see https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
      poster: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/intro-book-unfolding_thumbnail.jpg
      youtube:
        embed: xt27-zrvHkk
      overlay:
        heading: Boxed Width
        text: Embedded video rendered in boxed width mode

  # v
  - classes: hide-chapter-nav theme--dark
    components:
    - template: "@organisms/video--embed/video--embed.html.twig"
      id: xt27-zrvHkk
      # see https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
      poster: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/intro-book-unfolding_thumbnail.jpg
      youtube:
        embed: xt27-zrvHkk

################################################################################
## CHAPTER 1 ###################################################################
################################################################################

- title: "Introducing the Book"
  numeral: I
  pages:

  # c1p0
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/1_la-prose-section-introducing-book.jpg"
        alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'

  # c1p1
  - classes: ''
    components:
    - template: "@layouts/one_up--primary/one_up--primary.html.twig"
      cols: 'medium-4'
      offset: 'medium-offset-4'
      grid: align-middle
      components:
      - template: "@molecules/AudioWithTranscript/AudioWithTranscript.html.twig"
        audio:
          src: "../assets/audio/music.ogg"
        transcript:
          title: "Listen"
          button_text: "Read Transcript"
          id: "transcript-demo"
          brief: "Lorem ipsum dolor sit amet"
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et felis ac arcu cursus imperdiet. Mauris volutpat, ligula sit amet semper egestas, nunc velit pretium sem, id ornare nisl nisl nec erat."

  # c1p2
  - classes: hide-chapter-nav
    components:
    - template: "@organisms/in-depth/in-depth.html.twig"
      classes: theme--dark
      slides:
      - caption: ''
        components:
        - template: "@molecules/slide--in-depth__intro/slide--in-depth__intro.html.twig"
          title: What Is an Artist's Book?
          text: 'An artist’s book, like a painting or a sculpture, is created to be a work of art. It is a hybrid art form, both literary and visual in concept, and often collaborative.</em>'
          picture:
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_la-prose-detail-intro.jpg
            alt: La Prose detail
            style: square
      - caption:
          id: ch1p2-slide-2-caption
          brief: <p>Book art has a long history. In the <em>Book of Kells</em> (ca. 800), the letterform is an expression of transcendence. Even beyond its overt religious significance, the book is truly, in the words of Stéphane Mallarmé, an “<em>instrument spirituel.</em>”</p><small>The <em>Book of Kells</em> (Ireland or Scotland, ca. 800)</small>
          text: 'Chi-Rho page from <em>Book of Kells</em>, Irish or Scottish, ca. 800. Ink on vellum, 13 x 10 1/16 in. (33 x 25.5 cm). © Trinity College Dublin'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
      - caption:
          id: ch1p2-slide-3-caption
          brief: <p>William Blake’s illustrations display a singular vision and deep interpenetration of text and image, a unified expression that has rarely been equaled. Many consider Blake the father of book art.</p><small>William Blake, illustration for <em>Book of Job</em> (1825)</small>
          text: 'William Blake, "Thou hast fulfilled the Judgment of the wicked," plate 16 from the complete proof edition of Blake’s <em>Book of Job</em>, 1825. Engraving, image: 7 3/4 x 6 3/8 in. (19.6 x 16.2 cm). Fine Arts Museums of San Francisco, Museum purchase, William H. Noble Bequest Fund, 1979.1.11.17'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
      - caption:
          id: ch1p2-slide-4-caption
          brief: <p><em>Livres d’artistes</em>, deluxe editions illustrated by contemporary artists, came of age with <em>Parallèlement</em>, published by Ambroise Vollard (1866–1939). His younger peer Daniel-Henry Kahnweiler (1884–1979) published avante-garde writers such as Guillaume Apollinaire, Gertrude Stein, and Max Jacob, illustrated by Derain, Gris, Picasso, Braque, and other.</p><small>Pierre Bonnard and Paul Verlaine, <em>Parallèlement,</em> 1900</small>
          text: 'Pierre Bonnard, <em>Untitled,</em> page 4 of the book <em>Parallèlement</em> by Paul Verlaine (Paris: Ambroise Vollard, 1900), 1887–1900. Lithograph (pink sanguine) on Holland wove paper watermarked <em>Parallèlement,</em> sheet: 11 5/8 x 9 1/2 in. (29.5 x 24 cm); image: 3 5/8 x 7 in. (9.3 x 17.9 cm). Printed by Auguste Clot, Paris (lithographs); and Imprimerie Nationale de France, Paris (text). Binding by René Kieffer. Woodcuts by Tony Beltrand. Fine Arts Museums of San Francisco, The Reva and David Logan Collection of Illustrated Books, 2000.200.45.6'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
      - caption:
          id: ch1p2-slide-5-caption
          brief: '<p>Russian Futurists further developed the notion of the book as art with non-deluxe but conceptually advanced editions. Both the <em>livre d’artiste</em> and the artist-published "democratic multiple," have persisted to the present day, as has the third way taken by <em>La prose</em>, combining high craft with a visionary approach to the book&rsquo;s form.</p><small>El Lissitsky and Vladimir Mayakovsky: <em>Dlia Golosa (For the Voice)</em>, 1923</small>'
          text: 'El Lissitzky (Lazar Markovitch), fourth chapter, page 17 in the book <em>Dlia Golosa (For the Voice)</em> by Vladimir Vladimirovich Mayakovsky (Berlin: Gosizdat, 1923), 1923. Lithograph (color) on cream wove paper, sheet: 7 3/8 x 4 7/8 in. (18.7 x 12.4 cm); image: 5 1/4 x 4 3/8 in. (13.4 x 11.2 cm). Fine Arts Museums of San Francisco, Gift of the Reva and David Logan Foundation, 1998.40.79.8'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
          
  # c1p3
  - classes: hide-chapter-nav
    components:
    - template: "@organisms/in-depth/in-depth.html.twig"
      classes: ''
      slides:
      - caption: ''
        components:
        - template: "@molecules/slide--in-depth__intro/slide--in-depth__intro.html.twig"
          title: What Is an Artist's Book?
          text: 'An artist’s book, like a painting or a sculpture, is created to be a work of art. It is a hybrid art form, both literary and visual in concept, and often collaborative.</em>'
          picture:
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_la-prose-detail-intro.jpg
            alt: La Prose detail
            style: square
      - caption:
          id: ch1p3-slide-2-caption
          brief: <p>Book art has a long history. In the <em>Book of Kells</em> (ca. 800), the letterform is an expression of transcendence. Even beyond its overt religious significance, the book is truly, in the words of Stéphane Mallarmé, an “<em>instrument spirituel.</em>”</p><small>The <em>Book of Kells</em> (Ireland or Scotland, ca. 800)</small>
          text: 'Chi-Rho page from <em>Book of Kells</em>, Irish or Scottish, ca. 800. Ink on vellum, 13 x 10 1/16 in. (33 x 25.5 cm). © Trinity College Dublin'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
      - caption:
          id: ch1p3-slide-3-caption
          brief: <p>William Blake’s illustrations display a singular vision and deep interpenetration of text and image, a unified expression that has rarely been equaled. Many consider Blake the father of book art.</p><small>William Blake, illustration for <em>Book of Job</em> (1825)</small>
          text: 'William Blake, "Thou hast fulfilled the Judgment of the wicked," plate 16 from the complete proof edition of Blake’s <em>Book of Job</em>, 1825. Engraving, image: 7 3/4 x 6 3/8 in. (19.6 x 16.2 cm). Fine Arts Museums of San Francisco, Museum purchase, William H. Noble Bequest Fund, 1979.1.11.17'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
      - caption:
          id: ch1p3-slide-4-caption
          brief: <p><em>Livres d’artistes</em>, deluxe editions illustrated by contemporary artists, came of age with <em>Parallèlement</em>, published by Ambroise Vollard (1866–1939). His younger peer Daniel-Henry Kahnweiler (1884–1979) published avante-garde writers such as Guillaume Apollinaire, Gertrude Stein, and Max Jacob, illustrated by Derain, Gris, Picasso, Braque, and other.</p><small>Pierre Bonnard and Paul Verlaine, <em>Parallèlement,</em> 1900</small>
          text: 'Pierre Bonnard, <em>Untitled,</em> page 4 of the book <em>Parallèlement</em> by Paul Verlaine (Paris: Ambroise Vollard, 1900), 1887–1900. Lithograph (pink sanguine) on Holland wove paper watermarked <em>Parallèlement,</em> sheet: 11 5/8 x 9 1/2 in. (29.5 x 24 cm); image: 3 5/8 x 7 in. (9.3 x 17.9 cm). Printed by Auguste Clot, Paris (lithographs); and Imprimerie Nationale de France, Paris (text). Binding by René Kieffer. Woodcuts by Tony Beltrand. Fine Arts Museums of San Francisco, The Reva and David Logan Collection of Illustrated Books, 2000.200.45.6'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
      - caption:
          id: ch1p3-slide-5-caption
          brief: '<p>Russian Futurists further developed the notion of the book as art with non-deluxe but conceptually advanced editions. Both the <em>livre d’artiste</em> and the artist-published "democratic multiple," have persisted to the present day, as has the third way taken by <em>La prose</em>, combining high craft with a visionary approach to the book&rsquo;s form.</p><small>El Lissitsky and Vladimir Mayakovsky: <em>Dlia Golosa (For the Voice)</em>, 1923</small>'
          text: 'El Lissitzky (Lazar Markovitch), fourth chapter, page 17 in the book <em>Dlia Golosa (For the Voice)</em> by Vladimir Vladimirovich Mayakovsky (Berlin: Gosizdat, 1923), 1923. Lithograph (color) on cream wove paper, sheet: 7 3/8 x 4 7/8 in. (18.7 x 12.4 cm); image: 5 1/4 x 4 3/8 in. (13.4 x 11.2 cm). Fine Arts Museums of San Francisco, Gift of the Reva and David Logan Foundation, 1998.40.79.8'
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
          alt: untitled page from parallelement by paul verlaine and pierre bonnard
          style: vertical
          
################################################################################
## Footer ######################################################################
################################################################################

- title: Footer
  numeral: VII
  classes: footer
  id: insights__footer
  tag: footer
  pages:
    - classes: height-auto hide-chapter-nav
      components:
      - template: "@organisms/Section/Section.html.twig"
        section_classes: theme--primary-light
        components:
          - template: "@molecules/footer__cta/footer__cta__wrapper.html.twig"
            components:
              - template: "@molecules/footer__cta/footer__cta.html.twig"
                components:
                - template: "@atoms/h4/h4.html.twig"
                  text: Plan your visit
                - template: "@atoms/textarea/textarea.html.twig"
                  text: "<p>Purchase tickets, view hours, and get directions to prepare for your visit.</p>"
                - template: "@atoms/cta__button/cta__button.html.twig"
                  text: Start planning
                  href: https://legionofhonor.famsf.org/visit-us
                  target: _blank
              - template: "@molecules/footer__cta/footer__cta.html.twig"
                components:
                - template: "@atoms/h4/h4.html.twig"
                  text: Learn more about the Logan Collection
                - template: "@atoms/textarea/textarea.html.twig"
                  text: "<p>Find out how the Logan Collection at the Legion of Honor began.</p>"
                - template: "@atoms/cta__button/cta__button.html.twig"
                  text: Learn more
                  href: https://legionofhonor.famsf.org/legion/collections/reva-and-david-logan-collection-illustrated-books
                  target: _blank
              - template: "@molecules/footer__cta/footer__cta.html.twig"
                classes: theme--primary-dark
                components:
                - template: "@atoms/h4/h4.html.twig"
                  text: Subscribe for updates
                - template: "@atoms/textarea/textarea.html.twig"
                  text: "<p>Be the first to hear about new exhibitions, events, and more.</p>"
                - template: "@atoms/cta__button/cta__button.html.twig"
                  text: Subscribe
                  href: http://famsf.us4.list-manage1.com/subscribe?u=d7a49f337e55b897015517194&id=9757c5111b
                  target: _blank
      - template: "@organisms/Section/Section.html.twig"
        section_classes: grid-container grid-container-padded footer__content
        components:
          - template: "@layouts/two_up--primary/two_up--primary.html.twig"
            left:
              offset:
              cols: medium-6 large-4
              components:
              - template: "@atoms/h3/h3.html.twig"
                text: "We Are The Fine Arts Museum of San Francisco"
              - template: "@atoms/textarea/textarea.html.twig"
                text: "<p class='margin-bottom-3'>Our organization oversees two unique museums—the de Young in Golden Gate Park and the Legion of Honor in Lincoln Park—and stands as one of the most visited arts institutions in the United States.</p>"
              - template: "@atoms/cta__button--alt/cta__button--alt.html.twig"
                text: Tickets
                href: https://tickets.famsf.org/events/283/list
                target: _blank
                classes: margin-bottom-0
              - template: "@atoms/textarea/textarea.html.twig"
                text: </br>
              - template: "@atoms/cta__button--alt/cta__button--alt.html.twig"
                text: Become a member
                href: http://www.famsf.org/join
                target: _blank
                classes: margin-bottom-0
            right:
              offset: large-offset-2
              cols: medium-6 large-6
              components:
              - template: "@layouts/two_up--primary/two_up--primary.html.twig"
                classes: footer-feature
                left:
                  offset:
                  cols: medium-7
                  components:
                  - template: "@atoms/img/img.html.twig"
                    url: https://insights.famsf.org/assets/images/de-young-museum.jpg
                    alt: de Young Museum
                right:
                  offset:
                  cols: medium-5
                  components:
                  - template: "@atoms/h4/h4.html.twig"
                    classes: separator-left
                    text: de Young Museum
                  - template: "@atoms/textarea/textarea.html.twig"
                    text:
                      <p class="show-for-large">
                      Golden Gate Park<br/>
                      50 Hagiwara Tea Garden Drive<br/>
                      San Francisco, CA 94118<br/>
                      Open 9:30 a.m.—5:15 p.m.<br/>
                      Tuesdays—Sundays<br/>
                      415 750-3600<br/>
                      </p>
              - template: "@layouts/two_up--primary/two_up--primary.html.twig"
                classes: footer-feature
                left:
                  offset:
                  cols: medium-7
                  components:
                  - template: "@atoms/img/img.html.twig"
                    url: https://insights.famsf.org/assets/images/legion-of-honor.jpg
                    alt: Legion of Honor
                right:
                  offset:
                  cols: medium-5
                  components:
                  - template: "@atoms/h4/h4.html.twig"
                    classes: separator-left
                    text: Legion of Honor
                  - template: "@atoms/textarea/textarea.html.twig"
                    text:
                      <p class="show-for-large">
                      Lincoln Park<br/>
                      100 34th Avenue<br/>
                      San Franciso, CA 94121<br/>
                      Open 9:30 a.m.—5:15 p.m.<br/>
                      Tuesdays—Sundays<br/>
                      415 750-3600<br/>
                      </p>
      - template: "@molecules/footer__navigation/footer__navigation.html.twig"
        left:
          components:
          - template: "@molecules/ul/ul.html.twig"
            classes: menu menu--footer
            components:
            - template: "@atoms/li/li.html.twig"
              components:
              - template: "@atoms/a/a.html.twig"
                url: http://www.famsf.org/contact
                target: _blank
                text: Contact
            - template: "@atoms/li/li.html.twig"
              components:
              - template: "@atoms/a/a.html.twig"
                url: http://www.famsf.org/privacy
                target: _blank
                text: Privacy
            - template: "@atoms/li/li.html.twig"
              components:
              - template: "@atoms/a/a.html.twig"
                url: http://www.famsf.org/terms
                target: _blank
                text: Terms & Conditions
        right:
          components:
          - template: "@atoms/copyright/copyright.html.twig"
            text: "2018 Fine Arts Museum of San Francisco"