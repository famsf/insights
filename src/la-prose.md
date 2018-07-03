---
layout: "templates/pages/digital-story.html.twig"
title: La Prose
tagline: From the de Young and Legion of Honor
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
      subtitle: du Transsibérien et de la petite Jehanne de France
      info: "Reva and David Logan Collection of Illustrated Books Legion of Honor Museum"
      image:
        url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/0_la-prose-title-card.jpg
        alt: "Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars"

  # ii
  - components:
    - template: "@layouts/one_up--primary/one_up--primary.html.twig"
      cols: medium-8
      offset: medium-offset-2
      dropcap: false
      classes: big_type
      components:
      - template: "@atoms/h2/h2.html.twig"
        text: Introduction
      - template: "@atoms/textarea/textarea.html.twig"
        text: "<p>By 1913, Paris had been for more than a decade the epicenter of artistic revolution in Europe. That year, artist Sonia Delaunay and poet Blaise Cendrars collaborated on <em>La prose du Transsibérien et de la petite Jehanne de France (Prose of the Trans-Siberian and of Little Jehanne of France)</em>. Hailed as the first “simultaneous book,” the artwork was conceived as a unified experience of text and image, indivisible and apprehended concurrently.<p>"

  # iii
  - classes: dark
    components:
    - template: "@atoms/video--embed/video--embed.html.twig"
      id: WmrP8JhWb2U
      youtube:
        embed: WmrP8JhWb2U

################################################################################
## CHAPTER 1 ###################################################################
################################################################################

- title: "Introducing the Book"
  numeral: I
  pages:

  # c1p1
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/1_la-prose-section-introducing-book.jpg"
        alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'

  # c1p2
  - components:
    - template: "@layouts/one_up--primary/one_up--primary.html.twig"
      components:
      - template: "@molecules/standalone-quote/standalone-quote.html.twig"
        component_name: standalone-quote
        name: Blaise Cendrars in Der Sturm (Berlin), September, 1913
        text: Mme. Delaunay has made such a beautiful book of colors that my poem is more saturated with light than is my life. . . .  Besides, think that this book should be two meters high! Moreover, that the edition should reach the height of the Eiffel Tower!.
        large_text: false

  # c1p3
  - components:
    - template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c1p3-caption-1
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
            alt: Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars
            style: vertical
      right:
        components:
        - template: "@atoms/textarea/textarea.html.twig"
          text: "<p>It was an audacious work of art: Appropriating a map-fold
            format, the book unfurls to over six feet in length, then opens
            to reveal Delaunay’s abstract forms confronting a poem of more than
            400 lines splashed across the right-hand side of the opening.</p>"
          dropcap: true

  # c1p4
  - components:
    - template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
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
          text: "<p>Cendrars (1887-1961) was born Frédéric-Louis Sauser in Neuchatel,
            Switzerland, and became a French citizen in 1916. One of the leading
            literary figures of 20th century France, he was a friend and collaborator
            with many artists, including Fernand Léger, Marc Chagall, and Amedeo
            Modigliani.</p>"
          dropcap: true

  # c1p5
  - components:
    - template: "@organisms/in-depth/in-depth.html.twig"
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
      button:
        text: Learn more
        id: in-depth-artist-book
      modal:
        full_screen: true
        class: in-depth-modal
        components:
        - template: "@organisms/horizontal-image-slider/horizontal-image-slider.html.twig"
          slides:
          - caption: ''
            components:
            - template: "@molecules/slide--in-depth__intro/slide--in-depth__intro.html.twig"
              title: Scandals & Controversies
              text: 'Book art has a long history. In the <em>Book of Kells</em>, the letterform is an expression of transcendance; even beyond its overt religious significance, here the book is truly, in the words of Stéphane Mallarmé, an <em>"instrument spirituel."</em>'
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
                style: square
          - caption:
              id: ch1p5-slide-2-caption
              brief: William Blake’s illustrations display a singular vision and deep interpenetration of text and image, a unified expression that has rarely been equaled. Many consider Blake the father of book art. William Blake, illustration for Book of Job (1823)
              text: 'William Blake, Plate 16: "Thou hast fulfilled the Judgment of the wicked" from the complete proof edition of Blake''s Book of Job, 1825. Engraving, 19.6 x 16.2 cm (image). FAMSF, museum purchase, William H. Noble Bequest Fund, 1979.1.11.17'
            components:
            - template: "@molecules/Picture/Picture.html.twig"
              srcset:
              - min-width: 0px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
              - min-width: 350px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
              - min-width: 800px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
              url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/6_book-of-job.jpg
              alt: untitled page from parallelement by paul verlaine and pierre bonnard
              style: vertical
          - caption:
              id: ch1p5-slide-3-caption
              brief: Publication of deluxe editions illustrated by contemporary artists was taken up in earnest with livre d’artiste editions such as Parallelement, published by Ambroise Vollard (1866–1939). Vollard’s contemporary Daniel-Henry Kahnweiler (1884–1979) published adventurous works by Pablo Picasso, Georges Braque, and others, with literary texts by as-yet obscure writers such as Guillaume Apollinaire, Max Jacob, André Malraux, and Gertrude Stein. Pierre Bonnard/Paul Verlaine, Parallelement (1900)
              text: 'Pierre Bonnard (artist), Tony  Beltrand, Ambroise Vollard (publisher), Paul Verlaine (author), René Kieffer (binder), Imprimerie Nationale de France (printer), Auguste Clot (printer), Untitled, page 4 in the book Parallèlement by Paul Verlaine (Paris: Ambroise Vollard, 1900)., 1887–1900. Lithograph (pink sanguine) on Holland wove paper watermarked "Parallèlement", sheet: 295 x 240 mm (11 5/8 x 9 7/16 in.); image: 93 x 179 mm (3 11/16 x 7 1/16 in.). FAMSF, The Reva and David Logan Collection of Illustrated Books, 2000.200.45.6'
            components:
            - template: "@molecules/Picture/Picture.html.twig"
              srcset:
              - min-width: 0px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
              - min-width: 350px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
              - min-width: 800px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
              url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/7_parallelement.jpg
              alt: untitled page from parallelement by paul verlaine and pierre bonnard
              style: vertical
          - caption:
              id: ch1p5-slide-4-caption
              brief: 'The concept of the book as art was further developed by the Russian Futurists in non-luxurious but conceptually advanced editions. The deluxe livre d''artiste and its lower-cost counterpart, the artist-published "democratic multiple," have persisted to the present day. So has the third way taken by La prose, where self-publishing artists combine high craft values with a visionary approach to the form of the book. El Lissitsky/Vladimir Mayakovsky: Dlia Golosa (For the Voice), 1923'
              text: 'El Lissitzky (artist), Gosizdat (publisher), fourth chapter, page 17 in the book Dlia Golosa (For the Voice) by Vladimir Vladimirovich Mayakovsky (Berlin: Gosizdat, 1923), 1923. Lithograph (color) on cream wove paper, sheet: 187 x 124 mm (7 3/8 x 4 7/8 in.); image: 134 x 112 mm (5 1/4 x 4 7/16 in.). FAMSF, Gift of the Reva and David Logan Foundation, 1998.40.79.8'
            components:
            - template: "@molecules/Picture/Picture.html.twig"
              srcset:
              - min-width: 0px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
              - min-width: 350px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
              - min-width: 800px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
              url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/8_lissitzky.jpg
              alt: untitled page from parallelement by paul verlaine and pierre bonnard
              style: vertical

################################################################################
## CHAPTER 2 ###################################################################
################################################################################

- title: "Paris: 1913"
  numeral: II
  pages:

  # c2p1
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/9_paris-aerial-view.jpg"
        alt: 'Aerial view of Paris, France, from a balloon, showing the River Seine, the Eiffel Tower and buildings of the Exposition Universelle of 1889'

  # c2p2
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      left:
        components:
          - template: "@atoms/cliff-note/cliff-note.html.twig"
            text: The year 1913, on the cusp of the Great War, was a kind of fulcrum in time, and Paris was the balance point.
      right:
        components:
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>La prose was a product of its time and place, a period like no other before or since. Georges Braque and Pablo Picasso were creating the radical new artistic vision of Cubism, leading to the birth of abstraction, and Marcel Duchamp was brewing his own conceptual artistic revolution. In poetry, Guillaume Apollinaire was charging through the door that Stéphane Mallarmé (1842–1898) had opened with his sophisticated exploration of visual poetics. Russian emigrés were injecting energy and radical ideas into the mix, bringing with them the bold dynamics of Futurism. The modernist spirit that was centered in Paris extended to all of Europe and the world beyond, setting the stage for the advent of Dada and Surrealism.</p>"
            dropcap: true
          - template: "@molecules/inline-quote/inline-quote.html.twig"
            component_name: inline-quote
            name: Blaise Cendrars, La lotissement du ciel (Sky)
            date: '1949'
            text: It was not the art dealers, nor the critics, nor the collectors who made these painters famous, it was the modern poets, and people forget it rather too easily, and so do all these painters who, today, are millionaires and are still indebted to us, the poor poets!     

  # c2p3
  - components:
    - template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c2p3-caption-1
            text: 'Stéphane Mallarmé, ca. 1890. Nadar studio. © The New York Public Library'
          picture:
            srcset:
            - min-width: 0px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/10_mallarme.jpg
            - min-width: 350px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/10_mallarme.jpg
            - min-width: 800px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/10_mallarme.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/10_mallarme.jpg
            alt: Photo of Stéphane Mallarmé
            style: vertical
        - template: "@atoms/h3/h3.html.twig"
          text: "Stephané Mallarmé"
        - template: "@atoms/textarea/textarea.html.twig"
          text: "<p>Mallarmé (1842-1898) is widely credited with opening the field of modernist visual poetics with his poem Un coup de dés jamais n’abolira le hazard (A Throw of the Dice Will Never Abolish Chance). He was a major influence on many of the poets, and even visual artists, of the generation that followed, an influence that is still felt today.</p>"
          dropcap: true
        - template: "@molecules/inline-quote/inline-quote.html.twig"
          component_name: inline-quote
          name: R. Howard Bloch, One Toss of the Dice
          date: 2017
          text: One Toss of the Dice” was the birth certificate of modern poetry...
      right:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c2p3-caption-2
            text: Photograph of Guillaume Apollinaire with a shrapnel wound to the temple, spring 1916. Wikimedia
          picture:
            srcset:
            - min-width: 0px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/11_apollinaire.jpg
            - min-width: 350px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/11_apollinaire.jpg
            - min-width: 800px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/11_apollinaire.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/11_apollinaire.jpg
            alt: Photo of Guillaume Apollinaire
            style: vertical
        - template: "@atoms/h3/h3.html.twig"
          text: "Guillaume Apollinaire"
        - template: "@atoms/textarea/textarea.html.twig"
          text: '<p>Apollinaire (1880-1918) was the quintessential poet of modernism. Immensely influential among his contemporaries, poets and artists alike, he helped define the avant-garde in both art and literature, and coined the terms "cubism" and "surrealism."</p>'
          dropcap: true
        - template: "@molecules/inline-quote/inline-quote.html.twig"
          component_name: inline-quote
          name: Jacques Vaché, letter to André Breton
          date: 1918
          text: "[Apollinaire] marks an epoch. The beautiful things we can do now!"

  # c2p4
  - components:
    - template: "@organisms/horizontal-image-slider/horizontal-image-slider.html.twig"
      slides:
      - intro_slide: true
        components:
        - template: "@atoms/h3/h3.html.twig"
          text: Painter-Poet collaborations
        - template: "@atoms/textarea/textarea.html.twig"
          text: The hothouse atmosphere of Paris produced what historian Roger Shattuck called “an atmosphere of perpetual collaboration,” a cross-disciplinary burgeoning of the avant-garde at a time when artists, poets, and musicians frequented the same cafes and saw one another regularly.
      - caption:
          id: c2p4-slide-2-caption
          brief: The avant-garde writer Max Jacob was one of Picasso’s earliest Paris friends. Picasso spent the summer of 1910 in Cadaqués, Spain, where he made a series of etchings to illustrate Jacob’s Saint Matorel. They are among his greatest cubist prints.
          text: "Pablo Picasso (artist), Henry Kahnweiler (publisher), Max Jacob (author), Paul Birault (printer), Les Presses Eugène Delâtre (printer), Saint Matorel by Max Jacob (Paris: Henry Kahnweiler, 1911), 1911. 4 etchings (one with drypoint) on ivory laid Holland van Gelder paper; publisher's device on title page after a woodcut by Andre Derain; quarter leather with decorated Japanese paper covers, gold lettering on spine; decorated Japanese paper endpapers; original wrappers bound in, object: 267 x 200 mm (10 1/2 x 7 7/8 in.). FAMSF, The Reva and David Logan Collection of Illustrated Books, 2000.200.59.1-4"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/12_picasso-jacob.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/12_picasso-jacob.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/12_picasso-jacob.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/12_picasso-jacob.jpg
          alt: the book saint matorel by max jacob and pablo picasso
          style: vertical
      - caption:
          id: c2p4-slide-3-caption
          brief: "<em>L'Enchanteur pourrissant</em> was a book of firsts: Apollinaire's first published book, illustrated with Derain's first book illustrations – also the first book from the great publisher Daniel-Henry Kahnweiler, then age 25."
          text: "André Derain (artist), Henry Kahnweiler (publisher), Guillaume Apollinaire (author), Paul Birault (printer), Untitled, title page, publisher’s detail, in the book L'Enchanteur pourrissant by Guillaume Apollinaire (Paris: Henry Kahnweiler, 1909)., 1909. Woodcut on Arches laid paper, sheet: 265 x 200 mm (10 7/16 x 7 7/8 in.); Image: 64 x 73 mm (2 1/2 x 2 7/8 in.). FAMSF, The Reva and David Logan Collection of Illustrated Books, 2000.200.49.1"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/13_lenchanteur-pourrissant.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/13_lenchanteur-pourrissant.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/13_lenchanteur-pourrissant.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/13_lenchanteur-pourrissant.jpg
          alt:  title page from the book L'Enchanteur pourrissant by Guillaume Apollinaire
          style: vertical
      - caption:
          id: c2p4-slide-4-caption
          brief: "<em>La fin du monde</em> was conceived as a screenplay, begun in collaboration with Guillaume Apollinaire and Jean Cocteau, both of whom soon dropped out. Léger and Cendrars had both suffered serious injuries in the trenches of First World War, and each felt a strong affinity with the other’s work."
          text: "Fernand Léger (artist), Editions de la Sirène (publisher), Blaise Cendrars (author), Richard Marcelle (printer), Frazier-Soye (printer), 12th illustration in the book La Fin du monde, filmée par l'ange N.D. by Blaise Cendrars (Paris: Editions de la Sirène, 1919), 1919. Color pochoir on ivory wove, lafuma paper, sheet: 320 x 250 mm (12 5/8 x 9 13/16 in.); image: 320 x 79 mm (12 5/8 x 3 1/8 in.), FAMSF, Gift of the Reva and David Logan Foundation, 1998.40.77.12"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/14_la-fin-du-monde.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/14_la-fin-du-monde.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/14_la-fin-du-monde.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/14_la-fin-du-monde.jpg
          alt: illustration in the book La Fin du monde by Blaise Cendrars and Fernand Léger
          style: vertical
      - caption:
          id: c2p4-slide-5-caption
          brief: "Raymond Radiguet, a charismatic prodigy, died in 1923 at age 20, leaving behind two brilliant and scandalous novels and a string of lovers, male and female, that seemed to include half of Paris bohemia. Gris, for his part, met an untimely death at age 40, in the year following publication of <em>Denise</em>."
          text: "Juan Gris (artist), Galerie Simon (publisher), Imprimerie Pitault (printer), Raymond Radiguet (author), Leibovitz (printer), Denise by Raymond Radiguet (Paris: Éditions de la Galerie Simon, 1926), 1926. Book with five lithographs on  japon ancien, including front cover; cream japon wrappers with lithograph on front, object: 264 x 195 x 4 mm (10 3/8 x 7 11/16 x 3/16 in.). FAMSF, Gift of the Reva and David Logan Foundation, 1998.40.55.1-5. © 2018 Artists Rights Society (ARS), New York / ADAGP, Paris"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/15_denise.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/15_denise.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/15_denise.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/15_denise.jpg
          alt: title page from the book Denise by Raymond Radiguet and Juan Gris
          style: vertical

  # c2p5
  - components:
    - template: "@molecules/commentary/commentary.html.twig"
      component_name: commentary
      author_name: Mary Ann Caws
      author_title: "Distinguished Professor Emerita of English, French, and Comparative Literature at the Graduate School of the City University of New York"
      author_bio: "Mary Ann Caws is the author of more than 40 books, including The Surrealist Look: An Erotics of Encounter (1997), and Picasso’s Weeping Woman: The Life and Art of Dora Maar (2000)."
      author_image: ''
      components:
      - template: "@atoms/textarea/textarea.html.twig"
        text: "<p>The cacophonous <em>Rite of Spring</em> was the centerpiece of a simultaneity of sound, color, and movement. Nijinsky danced its May 29 premiere for Sergei Diaghilev’s Ballets Russes in Paris’s Théâtre des Champs-Élysées, and the spectacle provoked a celebrated pandemonium. Igor Stravinsky’s discordant music touched off outrage from the more conservative audience members, with others equally vehement in its defense. This riot against modernism, to put it bluntly, conferred on the piece more glory than anything positive could possibly have done—riots led to revelry in the long run.</p>"
        dropcap: false

  # c2p6
  - components:
    - template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c2p6-caption-1
            brief: Diaghilev with Stravinsky at the Rite of Spring premiere, 1913
            text: 'Rite of Spring premiere 1913. © Hulton Archive/Getty Images'
          picture:
            srcset:
            - min-width: 0px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/16_stravinsky-diaghilev.jpg
            - min-width: 800px
              src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/16_stravinsky-diaghilev.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/16_stravinsky-diaghilev.jpg
            alt: Sergei Diaghilev with Igor Stravinsky at the Rite of Spring premiere, 1913
            style: horizontal
      right:
        components:
          - template: "@molecules/inline-quote/inline-quote.html.twig"
            component_name: inline-quote
            name: Blaise Cendrars, radio interview
            date: '1950'
            text: "A woman nearby, covered by diamonds, but the music of Stravinsky drove her crazy, tore out a brand new folding seat and smashed me over the head with it, so I had to spend the rest of the night drinking champagne in Montmartre with Stravinsky [and] Diaghilev . . . still wearing the folding chair like a horse collar..."

  # c2p7
  - components:
    - template: "@organisms/horizontal-image-slider/horizontal-image-slider.html.twig"
      slides:
      - intro_slide: true
        components:
        - template: "@atoms/h3/h3.html.twig"
          text: Other Events of 1913
        - template: "@atoms/textarea/textarea.html.twig"
          text: Rarely had there been a time when artists felt so emboldened to disregard rules and traditions. Here are a few other landmarks of the tumultuous year of 1913.
      - caption:
          id: c2p7-slide-2-caption
          brief: 'Marcel Duchamp creates his first "ready-made," <em>Bicycle Wheel</em>'
          text: "Marcel Duchamp, Bicycle Wheel, third version, 1951. Museum of Modern Art, MOMA, New York, USA. © Album / Alamy Stock Photo"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/17_duchamp.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/17_duchamp.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/17_duchamp.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/17_duchamp.jpg
          alt: third version of Bicycle Wheel by Marcel Duchamp
          style: vertical
      - caption:
          id: c2p7-slide-3-caption
          brief: "Marcel Proust writes Swann’s Way"
          text: "Some of Marcel Proust’s notes for Swann’s Way, with doodles. © Bibliotheque nationale de France (BnF), Paris, France, Dist. RMN-Grand Palais/Art Resource, NY"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/18_proust.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/18_proust.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/18_proust.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/18_proust.jpg
          alt: pages of Marcel Proust’s notes for Swann’s Way with drawings
          style: vertical
      - caption:
          id: c2p7-slide-4-caption
          brief: "Maurice Ravel composes <em>Trois poèmes de Stéphane Mallarmé</em>"
          text: "Maurice Ravel. Bibliothèque nationale de France"
        components:
          template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/19_maurice-ravel.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/19_maurice-ravel.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/19_maurice-ravel.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/19_maurice-ravel.jpg
          alt: photo of maurice ravel
          style: vertical
      - caption:
          id: c2p7-slide-5-caption
          brief: "Guillaume Apollinaire writes Alcools, with a portrait by Picasso and etchings by Louis Marcoussis"
          text: "Guillaume Apollinaire: Alcools, with a portrait by Picasso and etchings by Louis Marcoussis"
        components:
        - template: "@molecules/Picture/Picture.html.twig"
          srcset:
          - min-width: 0px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/20_alcools.jpg
          - min-width: 350px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/20_alcools.jpg
          - min-width: 800px
            src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/20_alcools.jpg
          url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/20_alcools.jpg
          alt: title page for the book alcools by guillaume apollinaire with a portrait by Picasso and etchings by Louis Marcoussis
          style: vertical

################################################################################
## CHAPTER 3 ###################################################################
################################################################################

- title: The Book
  numeral: III
  pages:

  # c3p1
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/21_la-prose-the-book.jpg"
        alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'

  # c3p2
  - components:
    - template: "@layouts/one_up--primary/one_up--primary.html.twig"
      components:
      - template: "@molecules/standalone-quote/standalone-quote.html.twig"
        component_name: standalone-quote
        name: Blaise Cendrars
        text: A sad poem printed on sunlight.
        large_text: true

  # c3p2
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      right:
        components:
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>The book is a vortex of convergent and oppositional energies, an environment created for a remarkable reading experience. When folded, roughly four by seven inches, and just over an inch thick, it can be read by flipping the accordion-fold “pages.” Alternatively, one can unfold it to full length, more than six feet, on a long table. That way the entire design and text can be apprehended – not, as Apollinaire said, at a glance, but by following the poetic narrative as it weaves through splashes of color.</p>"
            dropcap: true
          - template: "@atoms/cta__button/cta__button.html.twig"
            text: Read an English translation of the Poem
            href: "https://lyricstranslate.com/en/prose-du-transsib%C3%A9rien-et-de-la-petite-jehanne-de-france-trans-siberian-prose-and-little-jeann.html"
            target: _blank
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c3p3-caption-1
            brief: Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars
            text: 'Sonia Delaunay-Terk (artist), Blaise Cendrars (author), La Prose du Transsibérien et de la petite Jehanne de France (detail), 1913. Illustrated book with pochoir, case: 80 x 17 in. (203.2 x 43.2 cm). FAMSF, Gift of the Reva and David Logan Foundation, 2016.15.4.1'
          picture:
            srcset:
              - min-width: 0px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/22_la-prose-detail-the-book.jpg
              - min-width: 350px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/22_la-prose-detail-the-book.jpg
              - min-width: 800px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/22_la-prose-detail-the-book.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/22_la-prose-detail-the-book.jpg
            alt: Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars
            style: horizontal

  # c3p4
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: "Using Light"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "Mary Ann Caws explains a source of Robert and Sonia Delaunay’s experimentation with chromatic simultaneity."
          - template: "@molecules/inline-quote/inline-quote.html.twig"
            component_name: inline-quote
            name: Mary Ann Caws
            date: '2017'
            text: "La prose is at once a simultaneous riot of colors, as both painter and poet intended, according to the authors' acquaintance with the theories of Michel-Eugène Chevreul, author of De la loi du contraste simultané des couleurs (The Laws of Contrast of Color, 1839). Chevreul experimented with a color wheel, and his discoveries had a great influence on the impressionists and the post-impressionists, and, in turn, on the whirling colors of this brightly-lit scroll of a poem."
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c3p4-caption-1
            brief: Chevreul color chart
            text: 'Chevreul color wheel, 1839. Wikimedia'
          picture:
            srcset:
              - min-width: 0px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/23_chevreul-color-chart.jpg
              - min-width: 350px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/23_chevreul-color-chart.jpg
              - min-width: 800px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/23_chevreul-color-chart.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/23_chevreul-color-chart.jpg
            alt: Chevreul color wheel
            style: horizontal

  # c3p5
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: "Painting Sunlight"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "Blaise Cendrars describes the kind of experimentation Robert and Sonia Delaunay were undertaking at the beginnings of modernist abstraction in painting."
          - template: "@molecules/inline-quote/inline-quote.html.twig"
            component_name: inline-quote
            name: "Blaise Cendrars, Aujourd’hui"
            date: '1931'
            text: "[Robert Delaunay] closed the shutters and shut himself up in his dark room... he made a little hole in the shutter with a brace and bit. A thin ray of sunlight filtered into the [room] and he began to paint it... to analyze all its elements of form and color. Without knowing it, he was doing spectrum analysis. He worked for months like this,... reaching the sources of emotion without any subject matter whatever."
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c3p5-caption-1
            brief: "Robert Delaunay’s shaped canvas <em>Windows Open Simultaneously</em>, 1912"
            text: 'Robert Delaunay, Windows Open Simultaneously 1st Part, 3rd Motif (Fenetres ouvertes simultanément 1ère partie 3e motif),1912. The Solomon R. Guggenheim Foundation Peggy Guggenheim Collection, Venice, 1976'
          picture:
            srcset:
              - min-width: 0px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/24_windows-open.jpg
              - min-width: 350px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/24_windows-open.jpg
              - min-width: 800px
                src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/24_windows-open.jpg
            url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/24_windows-open.jpg
            alt: Windows Open Simultaneously 1st Part, 3rd Motif by Robert Delaunay
            style: horizontal

  # c3p6
  - components:
    - template: "@molecules/commentary/commentary.html.twig"
      component_name: commentary
      author_name: Marjorie Perloff
      author_title: "Sadie D. Patek Professor of Humanities Emerita at Stanford University and Florence Scott Professor Emerita of English at the University of Southern California"
      author_bio: "Marjorie Perloff is the author of many books on poetry and poetics, including <em>The Futurist Moment: Avant-Garde, Avant-Guerre, and the Language of Rupture</em> (1986), which deals extensively with artists and poets in the years leading up to WWI."
      author_image: ''
      components:
      - template: "@atoms/textarea/textarea.html.twig"
        text: "<p>La prose du Transsibérien is a text full of contradictions. The title, for starters, is odd: it should be “le prose” and, even then, why call a lineated lyric “prose”? Cendrars declared that he used the word “prose” so as to open up the discourse; then, too, the poem is “dedicated to the musicians”—evidently those new musicians of the period, such as Eric Satie or Igor Stravinsky, who were avoiding all conventional rhythms. The long free-verse lines, with their paratactic structure and repetition, remind one of Walt Whitman, but the voice of this poem is hardly Whitman’s oracular one. Rather, Cendrars stresses immediacy, nervous energy, and excitement:</p>"
        dropcap: false
      - template: "@atoms/cta__button/cta__button.html.twig"
        text: Read more from this essay by Marjorie Perloff
        href: "https://legionofhonor.famsf.org/marjorie-perloff-s-cubist-collaboration-abstract-assemblage"
        target: _blank

################################################################################
## CHAPTER 4 ###################################################################
################################################################################

- title: The Making of <em>La prose</em>
  numeral: IV
  pages:

  # c4p1
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/25_la-prose-making-of.jpg"
        alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'

  # c4p2
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      left:
        components:
          - template: "@atoms/cliff-note/cliff-note.html.twig"
            text: In creating an authentic facsimile edition, artist and educator Kitty Maryatt has conducted exhaustive research into the production processes used for La prose in 1913.
          - template: "@molecules/Picture/PictureWithCaption.html.twig"
            caption:
              id: c4p2-caption-1
              brief: "Paper conservator Victoria Binder used a microscope to analyze the fiber composition of the copy of <em>La prose</em> in the Logan Collection at the Legion of Honor"
              text: 'Sonia Delaunay-Terk (artist), Blaise Cendrars (author), <em>La Prose du Transsibérien et de la petite Jehanne de France</em> (detail), 1913. Illustrated book with pochoir, case: 80 x 17 in. (203.2 x 43.2 cm). FAMSF, Gift of the Reva and David Logan Foundation, 2016.15.4.1'
            picture:
              srcset:
                - min-width: 0px
                  src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/27_microscopic-view-la-prose.jpg
                - min-width: 350px
                  src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/27_microscopic-view-la-prose.jpg
                - min-width: 800px
                  src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/27_microscopic-view-la-prose.jpg
              url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/27_microscopic-view-la-prose.jpg
              alt: Microscopic view of La prose du Transsiberien used to analyze fiber composition
              style: horizontal
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: "Typography"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>Maryatt has identified 30 separate typefaces used in the typographic composition for the poem. The book was printed at Imprimérie Crété, the largest printing facility in France. Cendrars provided detailed instructions for the compositors, most likely by consulting Crété’s type specimen catalogue. </p>"
            dropcap: false
          - template: "@molecules/Picture/PictureWithCaption.html.twig"
            caption:
              id: c4p2-caption-2
              brief: "Type compositors at Crété"
              text: '<em>Imprimerie Crété</em> by Société Anonyme (Paris: Corbeil, 1925). Courtesy of Kitty Maryatt'
            picture:
              srcset:
                - min-width: 0px
                  src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/26_type-compositors.jpg
                - min-width: 350px
                  src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/26_type-compositors.jpg
                - min-width: 800px
                  src: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/26_type-compositors.jpg
              url: https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/26_type-compositors.jpg
              alt: Photo of type compositors at Crété
              style: horizontal
          - template: "@atoms/h3/h3.html.twig"
            text: "Art"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>Sonia Delaunay painted the image for La prose on mattress ticking first. The image was reproduced for the edition by pochoir, a stencil process, with color applied by hand using prescribed brush strokes, exacting manipulation of stencils, precise registration, and consistent color matching. It is likely that the pochoir was performed at Crété.</p>"
            dropcap: false

  # c4p3
  - classes: dark
    components:
    - template: "@atoms/video--embed/video--embed.html.twig"
      id: 6vGKaYv7Iho
      youtube:
        embed: 6vGKaYv7Iho

  # c4p4
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      left:
        components:
          - template: "@atoms/textarea/textarea.html.twig"
            text: ""
            dropcap: false
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: "Structure"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>The book appropriated the form of a folded map, and a map of the route of the Trans-Siberian Railroad was included at the top corner of the layout, with the poem unfolding to more than six feet vertically. It was designed to first unfold with only the blank back side showing so that it could then be dramatically opened to expose the contents all at once, in keeping with the precepts of simultaneité. It was enclosed in a hand-painted vellum cover, which is said to have been made for only 30 copies.</p>"
            dropcap: false
          - template: "@atoms/h3/h3.html.twig"
            text: "Edition"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>There were to be 150 copies in total, but it is likely that only about half that many were produced. A prospectus announced eight deluxe copies printed on vellum, 28 on japon (imported Japanese) paper, and for the standard trade copies simulated japon (similé japon). Maryatt has identified the Logan copy at the Legion of Honor, with its crisp letterpress printing, as one of the rare copies on japon.</p>"
            dropcap: false

################################################################################
## CHAPTER 5 ###################################################################
################################################################################

- title: Contemporary Relevance
  numeral: V
  pages:

  # c5p1
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/28-bill-ham-light-show.jpg"
        alt: 'Still from Kinetic Light Painting by Bill Ham'

  # c5p2
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      left:
        components:
          - template: "@atoms/cliff-note/cliff-note.html.twig"
            text: The avant-garde, forward-looking nature of La prose has many parallels in our time.
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: "The 1950s: Cendrars and Kerouac"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>In some respects, the poem resembles Jack Kerouac’s On the Road. In composition, they share a common conceit: the illusion that they were composed, or narrated, in a single sitting, the intimate testimonial quality of a tale of alienation and transgression, drawing the listener or reader in. Both are road-trip stories, with socially marginalized traveling companions, that move across vast landscapes. Both are simultaneously life-changing inward journeys. And anyone who’s seen the Kerouac manuscript, the scroll, will immediately recognize the physical resemblance. With visual art, though, the two reading experiences diverge, and it is the hybrid nature of what we are looking at that distinguishes La prose as a unique and transcendent experience for the reader and viewer.</p>"
            dropcap: false
          - template: "@atoms/h3/h3.html.twig"
            text: "The 1960s: Light, Color, Motion"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>The interplay of colors and the synesthetic illusion of movement in Delaunay’s pochoir has an uncanny parallel in the psychedelic light shows of the 1960’s, where bright, pulsating, liquid forms merged with an experience of rhythmic sound, as the rhythms of Cendrars’s lines – dedicated, as he says, “to the musicians” – seem to emerge from the artist’s abstract color-forms.</p>"
            dropcap: false
          - template: "@atoms/h3/h3.html.twig"
            text: "Book Art Now"
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>The steady growth of the field of book art in recent decades finds an iconic predecessor in La prose. Its unique appropriation of structure, and its hybrid nature, have made it an influence on succeeding generations of artists and writers who take the book beyond the limits of conventional form. For his spectacular book Nature Abhors, Philip Zimmermann used a structure devised by influential book artist Hedi Kyle.</p>"
            dropcap: false

  # c5p3
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: This Project
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>As the only works of art that must be handled to be fully experienced, artists’ books present a challenge for an institution charged with their conservation and display. The current project, funded by a generous grant from the Reva and David Logan Foundation, addresses this challenge by making contents of, and related information about, selected books from the collection available online utilizing the affordances of digital media. The project aims in this way to raise the profile of the collection and to create greater public understanding and awareness of what critic and historian Johanna Drucker has called arguably “the quintessential 20th century artform.” This project intends to make significant work by many of the most important artists of the twentieth century available in its entirety to public access for the first time.</p>
                   <p>With more than more than 400 carefully assembled titles, the Logan Collection contains many of the most important works in the genre, with significant artists’ books representing virtually every major art movement dating from the beginnings of the genre of the livre d’artiste in the late 19th century. Augmented by important works already held by the Achenbach, the Logan gift established the Fine Arts Museums of San Francisco as stewards of one of the most historically-significant collections of artists’ books in the United States.</p>"
            dropcap: false
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
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

  # c5p4
  - classes: dark
    components:
    - template: "@atoms/video--embed/video--embed.html.twig"
      id: p6io0gBiXe0
      youtube:
        embed: p6io0gBiXe0

################################################################################
## CHAPTER 6 ###################################################################
################################################################################

- title: About the Collectors
  numeral: VI
  pages:

  # c6p1
  - components:
    - template: "@molecules/chapter__title/chapter__title.html.twig"
      img:
        url: "https://live-famsf-insights.pantheonsite.io/sites/default/files/laprose/29_la-prose-collectors.jpg"
        alt: 'Detail of La prose du Transsibérien et de la petite Jehanne de France by Sonia Delaunay-Terk and Blaise Cendrars'

  # c6p2
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      classes: dark
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: The Reva and David Logan Collection of Illustrated Books
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>Over a period of 20 years the Chicago collectors Reva and David Logan built one of the great private collections of artists’ books, and in 1998 donated that collection to the Achenbach Foundation, home of works on paper at the Fine Arts Museums of San Francisco.</p>
                   <p>With more than more than 400 carefully assembled titles, the Logan Collection contains many of the most important works in the genre, with significant artists’ books representing virtually every major art movement dating from the beginnings of the genre of the livre d’artiste in the late 19th century. Augmented by important works already held by the Achenbach, the Logan gift established the Fine Arts Museums of San Francisco as stewards of one of the most historically-significant collections of artists’ books in the United States.</p>"
            dropcap: false
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
          caption:
            id: c6p2-caption-1
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

  # c6p3
  - components:
    - template: "@layouts/two_up--primary/two_up--primary.html.twig"
      right:
        components:
          - template: "@atoms/h3/h3.html.twig"
            text: This Project
          - template: "@atoms/textarea/textarea.html.twig"
            text: "<p>As the only works of art that must be handled to be fully experienced, artists’ books present a challenge for an institution charged with their conservation and display. The current project, funded by a generous grant from the Reva and David Logan Foundation, addresses this challenge by making contents of, and related information about, selected books from the collection available online utilizing the affordances of digital media. The project aims in this way to raise the profile of the collection and to create greater public understanding and awareness of what critic and historian Johanna Drucker has called arguably “the quintessential 20th century artform.” This project intends to make significant work by many of the most important artists of the twentieth century available in its entirety to public access for the first time.</p>
                   <p>With more than more than 400 carefully assembled titles, the Logan Collection contains many of the most important works in the genre, with significant artists’ books representing virtually every major art movement dating from the beginnings of the genre of the livre d’artiste in the late 19th century. Augmented by important works already held by the Achenbach, the Logan gift established the Fine Arts Museums of San Francisco as stewards of one of the most historically-significant collections of artists’ books in the United States.</p>"
            dropcap: false
      left:
        components:
        - template: "@molecules/Picture/PictureWithCaption.html.twig"
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

  # c6p4
  - classes: dark
    components:
    - template: "@atoms/video--embed/video--embed.html.twig"
      id: _QWKwhv8MG4
      youtube:
        embed: _QWKwhv8MG4
---