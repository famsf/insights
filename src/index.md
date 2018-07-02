---
layout: "templates/pages/digital-story.html.twig"
chapters:
  intro:
    title: Introduction
    numeral: A
    active: active
    id: intro
    pages:
      intro1:
        classes: invert-top-bar
        template: "@molecules/CoverPage/CoverPage.html.twig"
        data:
          title: La Prose
          subtitle: du Transsibérien et de la petite Jehanne de France
          image:
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/0_la-prose-title-card.jpg
            alt: "Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars"
          info: "Reva and David Logan Collection of Illustrated Books Legion of Honor Museum"
      intro2:
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        data:
          cols: medium-8
          offset: medium-offset-2
          dropcap: false
          classes: big_type
          components:
          - template: "@atoms/h2/h2.html.twig"
            data:
              text: Introduction
          - template: "@atoms/textarea/textarea.html.twig"
            data:
              text: "<p>By 1913, Paris had been for more than a decade the epicenter of artistic revolution in Europe. That year, artist Sonia Delaunay and poet Blaise Cendrars collaborated on <em>La prose du Transsibérien et de la petite Jehanne de France (Prose of the Trans-Siberian and of Little Jehanne of France)</em>. Hailed as the first “simultaneous book,” the artwork was conceived as a unified experience of text and image, indivisible and apprehended concurrently.<p>"
  chapter1:
    title: "Introducing the Book"
    numeral: I
    pages:
      c1p1:
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: I
          title: "Introducing the Book"
          img:
            url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/1_la-prose-section-introducing-book.jpg"
            alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'
      c1p3:
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        data:
          components:
          - template: "@atoms/video--embed/video--embed.html.twig"
            data: {}
      c1p5:
        id: c1p5
        classes: ''
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        data:
          components:
          - template: "@molecules/standalone-quote/standalone-quote.html.twig"
            data:
              text: Mme. Delaunay has made such a beautiful book of colors that my
                poem is more  saturated with light than is my life. . . .  Besides,
                think that this book should be two meters high! Moreover, that the
                edition should reach the height of the Eiffel Tower!
              name: "-Blaise Cendrars in <em>Der Sturm</em> (Berlin), September, 1913"
      c1p6:
        classes: ''
        template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
        data:
          left:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: caption2
                  text: 'Sonia Delaunay-Terk (artist), Blaise Cendrars (author), <em>La
                    Prose du Transsibérien et de la petite Jehanne de France</em>
                    (detail), 1913. Illustrated book with pochoir, case: 80 x 17 in.
                    (203.2 x 43.2 cm). FAMSF, Gift of the Reva and David Logan Foundation,
                    2016.15.4.1'
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/2_la-prose-book-closed.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/2_la-prose-book-closed.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/2_la-prose-book-closed.jpg
                  alt: La Prose du Transsibérien
                  style: vertical
          right:
            components:
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>It was an audacious work of art: Appropriating a map-fold
                  format, the book unfurls to over six feet in length, then opens
                  to reveal Delaunay’s abstract forms confronting a poem of more than
                  400 lines splashed across the right-hand side of the opening</p>."
                dropcap: true
      c1p7:
        id: c1p7
        classes: ''
        template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
        data:
          left:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: caption3
                  text: 'Photo: Florence Henri, 1931. Martini & Ronchetti Gallery
                    and image source'
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/3_sonia-delaunay.jpg
                  - min-width: 350px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/3_sonia-delaunay.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/3_sonia-delaunay.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/3_sonia-delaunay.jpg
                  alt: Photo of sonia delaunay-terk
                  style: vertical
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>Delaunay-Terk (1885-1979) was born in the Ukraine and raised
                  in St. Petersburg. She moved to Paris in 1905. In 1910 she married
                  Robert Delaunay, an artist known for his bold use of color and abstract
                  form. The Delaunays were exemplars of “Orphism,” as Apollinaire
                  had called it, their work infusing Cubism with dynamic light and
                  color. In addition to painting, Delaunay-Terk’s practice encompassed
                  textile and fashion design, bookbinding, furniture design, and set
                  design.</p>"
                dropcap: true
          right:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: caption4
                  text: Ca.1907. Wikimedia Commonse
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/4_blaise-cendrars.jpg
                  - min-width: 350px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/4_blaise-cendrars.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/4_blaise-cendrars.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/4_blaise-cendrars.jpg
                  alt: Photo of blaise cendrars
                  style: vertical
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>Cendrars (1887-1961) was born Frédéric-Louis Sauser in Neuchatel,
                  Switzerland, and became a French citizen in 1916. One of the leading
                  literary figures of 20th century France, he was a friend and collaborator
                  with many artists, including Fernand Léger, Marc Chagall, and Amedeo
                  Modigliani.</p>"
                dropcap: true
      ch1p8:
        template: "@organisms/in-depth/in-depth.html.twig"
        data:
          title: What is an Artist’s Book?
          picture:
            srcset:
            - min-width: 0px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
            - min-width: 768px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
            - min-width: 960px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
            alt: Image of chi-rho page from book of kells
            style: vertical
          modal_button_text: Learn more
          id: in-depth-artist-book
          full_screen: true
          class: in-depth-modal
          component:
            id: in-depth-artist-book
            template: "@organisms/horizontal-image-slider/horizontal-image-slider.html.twig"
            data:
              slides:
              - caption:
                  id: in-depth-slide-1-caption
                  brief: What is an Artist's Book?
                  text: Book art has a long history. In the <em>Book of Kells,</em>
                    the letterform is an expression of transcendance; even beyond
                    its overt religious significance, here the book is truly, in the
                    words of Stéphane Mallarmé, an “<em>instrument spirituel.</em>”
                template: "@molecules/Picture/Picture.html.twig"
                data:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
                  - min-width: 350px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/5_book-of-kells.jpg
                  alt: The Book of Kells
                  style: vertical
              - caption:
                  brief: William Blake’s illustrations display a singular vision and
                    deep interpenetration of text and image, a unified expression
                    that has rarely been equaled. Many consider Blake the father of
                    book art.
                template: "@molecules/Picture/Picture.html.twig"
                data:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
                  - min-width: 350px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
                  alt: Plate 16 from the book of job by william blake
                  style: vertical
              - template: "@molecules/Picture/Picture.html.twig"
                caption: Publication of deluxe editions illustrated by contemporary
                  artists was taken up in earnest with <em>livre d’artiste</em> editions
                  such as <em>Parallelement,</em> published by Ambroise Vollard (1866–1939).
                  Vollard’s contemporary Daniel-Henry Kahnweiler (1884–1979) published
                  adventurous works by Pablo Picasso, Georges Braque, and others,
                  with literary texts by as-yet obscure writers such as Guillaume
                  Apollinaire, Max Jacob, André Malraux, and Gertrude Stein.
                data:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
                  - min-width: 350px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
                  alt: untitled page from parallelement by paul verlaine and pierre
                    bonnard
                  style: vertical
              - template: "@molecules/Picture/Picture.html.twig"
                caption: The concept of the book as art was further developed by the
                  Russian Futurists in non-luxurious but conceptually advanced editions.
                  The deluxe <em>livre d’artiste</em> and its lower-cost counterpart,
                  the artist-published “democratic multiple,” have persisted to the
                  present day. So has the third way taken by La prose, where self-publishing
                  artists combine high craft values with a visionary approach to the
                  form of the book.
                data:
                  srcset:
                  - min-width: 0px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
                  - min-width: 350px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
                  - min-width: 800px
                    src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
                  alt: page from the book dlia golosa by vladimir vladimirovich and
                    el lissitsky
                  style: vertical
  chapter2:
    title: "Paris: 1913"
    numeral: II
    pages:
      c2p1:
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: II
          title: "Paris: 1913"
          img:
            url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/9_paris-aerial-view.jpg"
            alt: 'Aerial view of Paris, France, from a balloon, showing the River Seine, the Eiffel Tower and buildings of the Exposition Universelle of 1889'
      c2p2:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          left:
            components:
              - template: "@atoms/cliff-note/cliff-note.html.twig"
                data:
                  text: The year 1913, on the cusp of the Great War, was a kind of fulcrum in time, and Paris was the balance point.
          right:
            components:
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p><em>La prose</em> was a product of its time and place, a period like no other before or since. Georges Braque and Pablo Picasso were creating the radical new artistic vision of Cubism, leading to the birth of abstraction, and Marcel Duchamp was brewing his own conceptual artistic revolution. In poetry, Guillaume Apollinaire was charging through the door that Stéphane Mallarmé (1842–1898) had opened with his sophisticated exploration of visual poetics. Russian emigrés were injecting energy and radical ideas into the mix, bringing with them the bold dynamics of Futurism. The modernist spirit that was centered in Paris extended to all of Europe and the world beyond, setting the stage for the advent of Dada and Surrealism.</p>"
                  dropcap: false
              - template: "@molecules/inline-quote/inline-quote.html.twig"
                data:
                  component_name: inline-quote
                  name: Blaise Cendrars, La lotissement du ciel (Sky)
                  date: '1949'
                  text: It was not the art dealers, nor the critics, nor the collectors who made these painters famous, it was the modern poets, and people forget it rather too easily, and so do all these painters who, today, are millionaires and are still indebted to us, the poor poets!
  chapter3:
    title: The Book
    numeral: III
    pages:
      c3p1:
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: III
          title: The Book
          img:
            url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/21_la-prose-the-book.jpg"
            alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'
  chapter4:
    title: The Making of <em>La prose</em>
    numeral: IV
    pages:
      c4p1:
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: IV
          title: The Making of <em>La prose</em>
          img:
            url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/25_la-prose-making-of.jpg"
            alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'
  chapter5:
    title: Contemporary Relevance
    numeral: V
    pages:
      c5p1:
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: V
          title: Contemporary Relevance
          img:
            url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/28-bill-ham-light-show.jpg"
            alt: 'Still from Kinetic Light Painting by Bill Ham'
      c5p2:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          left:
            components:
              - template: "@atoms/cliff-note/cliff-note.html.twig"
                data:
                  text: The avant-garde, forward-looking nature of La prose has many parallels in our time.
          right:
            components:
              - template: "@atoms/h3/h3.html.twig"
                data:
                  text: "The 1950s: Cendrars and Kerouac"
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p>In some respects, the poem resembles Jack Kerouac’s On the Road. In composition, they share a common conceit: the illusion that they were composed, or narrated, in a single sitting, the intimate testimonial quality of a tale of alienation and transgression, drawing the listener or reader in. Both are road-trip stories, with socially marginalized traveling companions, that move across vast landscapes. Both are simultaneously life-changing inward journeys. And anyone who’s seen the Kerouac manuscript, the scroll, will immediately recognize the physical resemblance. With visual art, though, the two reading experiences diverge, and it is the hybrid nature of what we are looking at that distinguishes La prose as a unique and transcendent experience for the reader and viewer.</p>"
                  dropcap: false
              - template: "@atoms/h3/h3.html.twig"
                data:
                  text: "The 1960s: Light, Color, Motion"
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p>The interplay of colors and the synesthetic illusion of movement in Delaunay’s pochoir has an uncanny parallel in the psychedelic light shows of the 1960’s, where bright, pulsating, liquid forms merged with an experience of rhythmic sound, as the rhythms of Cendrars’s lines – dedicated, as he says, “to the musicians” – seem to emerge from the artist’s abstract color-forms.</p>"
                  dropcap: false
              - template: "@atoms/h3/h3.html.twig"
                data:
                  text: "Book Art Now"
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p>The steady growth of the field of book art in recent decades finds an iconic predecessor in La prose. Its unique appropriation of structure, and its hybrid nature, have made it an influence on succeeding generations of artists and writers who take the book beyond the limits of conventional form. For his spectacular book Nature Abhors, Philip Zimmermann used a structure devised by influential book artist Hedi Kyle.</p>"
                  dropcap: false
      c5p3:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          right:
            components:
              - template: "@atoms/h3/h3.html.twig"
                data:
                  text: This Project
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p>As the only works of art that must be handled to be fully experienced, artists’ books present a challenge for an institution charged with their conservation and display. The current project, funded by a generous grant from the Reva and David Logan Foundation, addresses this challenge by making contents of, and related information about, selected books from the collection available online utilizing the affordances of digital media. The project aims in this way to raise the profile of the collection and to create greater public understanding and awareness of what critic and historian Johanna Drucker has called arguably “the quintessential 20th century artform.” This project intends to make significant work by many of the most important artists of the twentieth century available in its entirety to public access for the first time.</p>
                         <p>With more than more than 400 carefully assembled titles, the Logan Collection contains many of the most important works in the genre, with significant artists’ books representing virtually every major art movement dating from the beginnings of the genre of the livre d’artiste in the late 19th century. Augmented by important works already held by the Achenbach, the Logan gift established the Fine Arts Museums of San Francisco as stewards of one of the most historically-significant collections of artists’ books in the United States.</p>"
                  dropcap: false
          left:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  brief: The Reva and David Logan Gallery of Illustrated Books at the Legion of Honor
                  text: ''
                picture:
                  srcset:
                    - min-width: 0px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                    - min-width: 350px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                    - min-width: 800px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                  alt: Photo of David and Reva Logan
                  style: horizontal
  chapter6:
    title: About the Collectors
    numeral: VI
    pages:
      c2p1:
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: VI
          title: About the Collectors
          img:
            url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/29_la-prose-collectors.jpg"
            alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'
      c2p2:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          classes: dark
          right:
            components:
              - template: "@atoms/h3/h3.html.twig"
                data:
                  text: The Reva and David Logan Collection of Illustrated Books
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p>Over a period of 20 years the Chicago collectors Reva and David Logan built one of the great private collections of artists’ books, and in 1998 donated that collection to the Achenbach Foundation, home of works on paper at the Fine Arts Museums of San Francisco.</p>
                         <p>With more than more than 400 carefully assembled titles, the Logan Collection contains many of the most important works in the genre, with significant artists’ books representing virtually every major art movement dating from the beginnings of the genre of the livre d’artiste in the late 19th century. Augmented by important works already held by the Achenbach, the Logan gift established the Fine Arts Museums of San Francisco as stewards of one of the most historically-significant collections of artists’ books in the United States.</p>"
                  dropcap: false
          left:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: c2p2-caption-1
                  brief: David and Reva Logan
                  text: Courtesy of the Logan Foundation
                picture:
                  srcset:
                    - min-width: 0px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/30_the-logans.jpg
                    - min-width: 350px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/30_the-logans.jpg
                    - min-width: 800px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/30_the-logans.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/30_the-logans.jpg
                  alt: Photo of David and Reva Logan
                  style: vertical
      c2p3:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          right:
            components:
              - template: "@atoms/h3/h3.html.twig"
                data:
                  text: This Project
              - template: "@atoms/textarea/textarea.html.twig"
                data:
                  text: "<p>As the only works of art that must be handled to be fully experienced, artists’ books present a challenge for an institution charged with their conservation and display. The current project, funded by a generous grant from the Reva and David Logan Foundation, addresses this challenge by making contents of, and related information about, selected books from the collection available online utilizing the affordances of digital media. The project aims in this way to raise the profile of the collection and to create greater public understanding and awareness of what critic and historian Johanna Drucker has called arguably “the quintessential 20th century artform.” This project intends to make significant work by many of the most important artists of the twentieth century available in its entirety to public access for the first time.</p>
                         <p>With more than more than 400 carefully assembled titles, the Logan Collection contains many of the most important works in the genre, with significant artists’ books representing virtually every major art movement dating from the beginnings of the genre of the livre d’artiste in the late 19th century. Augmented by important works already held by the Achenbach, the Logan gift established the Fine Arts Museums of San Francisco as stewards of one of the most historically-significant collections of artists’ books in the United States.</p>"
                  dropcap: false
          left:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  brief: The Reva and David Logan Gallery of Illustrated Books at the Legion of Honor
                  text: ''
                picture:
                  srcset:
                    - min-width: 0px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                    - min-width: 350px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                    - min-width: 800px
                      src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                  url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/31_logan-gallery.jpg
                  alt: Photo of David and Reva Logan
                  style: horizontal
---
La Prose story to go here. In the meantime, would you care to visit the [Klimt-Rodin story](/klimt-rodin)?
