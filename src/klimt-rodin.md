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
          title:
            firstLine: Klimt &
            secondLine: Rodin
          subtitle: An artistic journey
          info: Legion of Honor Museum<br>October 14, 2017 – January 28, 2018
          image:
            url: https://3.bp.blogspot.com/-RE9D7tm8uVU/VvecOJZ5ddI/AAAAAAAAgqc/TUZpJwTFqH4TR7oG4J3GzuFhr1NOAuYJw/w1200-h630-p-k-no-nu/Lady%2Bwith%2BHat%2Band%2BFeather%2BBoa%2Bby%2BGustav%2BKlimt.jpg
            alt: An Image of Lady with Hat and Feather Boa, 1909 by Gustav Klimt
      intro2:
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        classes: dark
        data:
          cols: medium-8
          offset: medium-offset-2
          dropcap: false
          classes: big_type dark
          components:
          - template: "@atoms/h2/h2.html.twig"
            data:
              text: Introduction
          - template: "@atoms/textarea/textarea.html.twig"
            data:
              text: "<p>Upon the centennial of their deaths, Klimt & Rodin: An Artistic
                Encounter explores the dialogue between the work of French sculptor
                Auguste Rodin (1840–1917) and Austrian painter Gustav Klimt (1862–1918)
                and examines their numerous connections, ranging from their mutual
                interest in the human form to their philosophical outlooks on the
                world. A comparison of these two artists reminds the contemporary
                viewer of the challenges each encountered and how their work pushed
                the story of modern art forward<p>"
  chapter1:
    title: In Search of Modernity
    numeral: I
    id: chapter1
    pages:
      c1p1:
        classes: ''
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: I
          title: In Search of Modernity
          img:
            url: "/assets/images/Portrait-of-Sonja-Knips.jpg"
            alt: ''
      c1p2:
        classes: ''
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          left:
            components:
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>This exhibition allows the public to study, for the very
                  first time on the West Coast, the full evolution of Klimt’s artistic
                  output, ranging from his early and academically applauded work to
                  his provocative and critically debated mature style, as seen here
                  in The Virgin. Revered today as a pioneer of modernism in Vienna,
                  Klimt produced only a very limited number of canvases over his career.
                  Many of these canvases are deemed too fragile to travel, making
                  a sizable display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p>"
                dropcap: true
          right:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: caption
                  brief: Gustav Klimt
                  text: Gustav Klimt, The Virgin, 1913. Oil on canvas, 74 3/4 x 78
                    3/4 in. (190 x 200 cm). Národní Galerie, Prague, 04152
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  - min-width: 350px
                    src: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  - min-width: 800px
                    src: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  url: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  alt: Gustav Klimt, The Virgin, 1913
                  style: vertical
      c1p3:
        classes: ''
        template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
        data:
          left:
            components:
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>At the turn of the 19th century to the 20th, the art world
                  in all of Europe was in a constant flux. Regarding Vienna, the Austrian
                  writer and critic Hermann Bahr stated, “Common to all the people
                  of this age is the fact that more is weighing on them than they
                  can bear; no one is equal to his or her burden. Never before has
                  life been so heavy for people; just to exist, they muster an effort
                  that goes beyond their strength.” This was the environment that
                  surrounded Auguste Rodin and Gustav Klimt. Through their art, these
                  two men aspired to convey the experience of being human as being
                  deeply rooted in the Symbolist idea of becoming and passing away.
                  In doing so, they broke with traditions of art.</p>"
                dropcap: true
          right:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: caption2
                  text: Vienne En Tramway (original title)/Eine Fahrt Durch Wien (German
                    release title), 1906. Cinematographer unknown. Transfer to file
                    of an original 35mm nitrate film print, 68m, 16fps, 3‘44‘‘. Collection
                    of the Austrian Film Museum, Vienna
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://lh3.googleusercontent.com/bzMOrr3XhbDtEa4nGSLFW2Q8t-jmiko4a3OyFFaUmZOMkRHxgPapfv5TquJP0cWcUQ9ZBUTPecYKZGjnNzYpyR3pOd-5vaeyrBP1KoZ1vnOgTfeDhHfaajuQSEnaaM_BrAZreUNAGDjqz3qNtfYzvLO2pF9JuyCa_9AuOBZgahmaihdNCQ1SIUeJCXGLM3DrERs9dgqEDgLrDvwZYQEbY0a0DUHgl9EN0WMAy1wHIUQ0pgPxEDhKbDDjWVMdsmTCtvQSBcGZP62L6U9a5Bt9o9pK4CJ_tU0tzzUKIWyABflnn7aOMFhiXRL632KyV8qc5ZY0GVpZj2HSm_gvVTa3HU6CPoyYhTNtGtAVyg4z543o8SV5tLWc_-ISQWBOWJfRqOPCLj6P4d9_WoaXJfG5E4JjNr42ZOKxWKsCxw-cPqSt73Ura1pyZuSuPIurBhZIkiilaS1_SorQVmjxI2sF6lVDkfPP662I9HKhlC16TTp61sw4qdkJmZgl0Fap6lHaS8V5fY-fZLMLzxBWqsu8iwnoiyjq1fy9ozoc_Xk0f0KMkCPievVf-9GBPL-L85yI=w1904-h1654
                  - min-width: 350px
                    src: https://lh3.googleusercontent.com/bzMOrr3XhbDtEa4nGSLFW2Q8t-jmiko4a3OyFFaUmZOMkRHxgPapfv5TquJP0cWcUQ9ZBUTPecYKZGjnNzYpyR3pOd-5vaeyrBP1KoZ1vnOgTfeDhHfaajuQSEnaaM_BrAZreUNAGDjqz3qNtfYzvLO2pF9JuyCa_9AuOBZgahmaihdNCQ1SIUeJCXGLM3DrERs9dgqEDgLrDvwZYQEbY0a0DUHgl9EN0WMAy1wHIUQ0pgPxEDhKbDDjWVMdsmTCtvQSBcGZP62L6U9a5Bt9o9pK4CJ_tU0tzzUKIWyABflnn7aOMFhiXRL632KyV8qc5ZY0GVpZj2HSm_gvVTa3HU6CPoyYhTNtGtAVyg4z543o8SV5tLWc_-ISQWBOWJfRqOPCLj6P4d9_WoaXJfG5E4JjNr42ZOKxWKsCxw-cPqSt73Ura1pyZuSuPIurBhZIkiilaS1_SorQVmjxI2sF6lVDkfPP662I9HKhlC16TTp61sw4qdkJmZgl0Fap6lHaS8V5fY-fZLMLzxBWqsu8iwnoiyjq1fy9ozoc_Xk0f0KMkCPievVf-9GBPL-L85yI=w1904-h1654
                  - min-width: 800px
                    src: https://lh3.googleusercontent.com/bzMOrr3XhbDtEa4nGSLFW2Q8t-jmiko4a3OyFFaUmZOMkRHxgPapfv5TquJP0cWcUQ9ZBUTPecYKZGjnNzYpyR3pOd-5vaeyrBP1KoZ1vnOgTfeDhHfaajuQSEnaaM_BrAZreUNAGDjqz3qNtfYzvLO2pF9JuyCa_9AuOBZgahmaihdNCQ1SIUeJCXGLM3DrERs9dgqEDgLrDvwZYQEbY0a0DUHgl9EN0WMAy1wHIUQ0pgPxEDhKbDDjWVMdsmTCtvQSBcGZP62L6U9a5Bt9o9pK4CJ_tU0tzzUKIWyABflnn7aOMFhiXRL632KyV8qc5ZY0GVpZj2HSm_gvVTa3HU6CPoyYhTNtGtAVyg4z543o8SV5tLWc_-ISQWBOWJfRqOPCLj6P4d9_WoaXJfG5E4JjNr42ZOKxWKsCxw-cPqSt73Ura1pyZuSuPIurBhZIkiilaS1_SorQVmjxI2sF6lVDkfPP662I9HKhlC16TTp61sw4qdkJmZgl0Fap6lHaS8V5fY-fZLMLzxBWqsu8iwnoiyjq1fy9ozoc_Xk0f0KMkCPievVf-9GBPL-L85yI=w1904-h1654
                  url: https://lh3.googleusercontent.com/bzMOrr3XhbDtEa4nGSLFW2Q8t-jmiko4a3OyFFaUmZOMkRHxgPapfv5TquJP0cWcUQ9ZBUTPecYKZGjnNzYpyR3pOd-5vaeyrBP1KoZ1vnOgTfeDhHfaajuQSEnaaM_BrAZreUNAGDjqz3qNtfYzvLO2pF9JuyCa_9AuOBZgahmaihdNCQ1SIUeJCXGLM3DrERs9dgqEDgLrDvwZYQEbY0a0DUHgl9EN0WMAy1wHIUQ0pgPxEDhKbDDjWVMdsmTCtvQSBcGZP62L6U9a5Bt9o9pK4CJ_tU0tzzUKIWyABflnn7aOMFhiXRL632KyV8qc5ZY0GVpZj2HSm_gvVTa3HU6CPoyYhTNtGtAVyg4z543o8SV5tLWc_-ISQWBOWJfRqOPCLj6P4d9_WoaXJfG5E4JjNr42ZOKxWKsCxw-cPqSt73Ura1pyZuSuPIurBhZIkiilaS1_SorQVmjxI2sF6lVDkfPP662I9HKhlC16TTp61sw4qdkJmZgl0Fap6lHaS8V5fY-fZLMLzxBWqsu8iwnoiyjq1fy9ozoc_Xk0f0KMkCPievVf-9GBPL-L85yI=w1904-h1654
                  alt: Gustav Klimt, The Virgin, 1913
                  style: vertical
      c1p4:
        template: "@molecules/AmbientVideo/AmbientVideo.html.twig"
        data:
          poster: "/assets/images/video/rodin.jpg"
          text: "By 1900—after 30 years of creating groundbreaking work that often brought about adverse criticism and numerous scandals—Rodin, at the age of 60, was at last enjoying international acclaim. He was widely regarded as the greatest living sculptor, French or otherwise, of his age. He exhibited his sculpture throughout Europe and the United States, sharing his work with new audiences. Reviewing the first major display of Rodin’s work in Vienna, in 1898, the art critic Ludwig Hevesi went so far as to describe the artist as the &dlquo;Parisian Michelangelo.&drquo;"
          youtube:
            embed: "BcYu-BrGiGs"
          sources:
            webm: "/assets/video/rodin.webm"
            m4v: "/assets/video/rodin.m4v"
      c1p5:
        classes: ''
        template: "@layouts/two_up--even_cols/two_up--even_cols.html.twig"
        data:
          left:
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                caption:
                  id: caption3
                  text: Photograph of Gustav Klimt, 1913. Ullstein Bild / Getty Images
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://doc-08-c8-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/sh8ca4t9fn9brkn45oco070nbje02a79/1529337600000/16614641474694810689/*/1tOTiIVh2ZYF2SMwzMEH-nMfrMwtpZcx4
                  - min-width: 350px
                    src: https://doc-08-c8-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/sh8ca4t9fn9brkn45oco070nbje02a79/1529337600000/16614641474694810689/*/1tOTiIVh2ZYF2SMwzMEH-nMfrMwtpZcx4
                  - min-width: 800px
                    src: https://doc-08-c8-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/sh8ca4t9fn9brkn45oco070nbje02a79/1529337600000/16614641474694810689/*/1tOTiIVh2ZYF2SMwzMEH-nMfrMwtpZcx4
                  url: https://doc-08-c8-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/sh8ca4t9fn9brkn45oco070nbje02a79/1529337600000/16614641474694810689/*/1tOTiIVh2ZYF2SMwzMEH-nMfrMwtpZcx4
                  alt: Photograph of Gustav Klimt, 1913. Ullstein Bild / Getty Images
                  style: vertical
          right:
            components:
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>By comparison, Gustav Klimt, at age 38 in 1900, although
                  achieving financial success, continued to struggle with dogged critiques
                  of his paintings. His city of Vienna was experiencing an economic
                  upturn and an architectural rebirth. Nonetheless, as the capital
                  of Austria-Hungary and the seat of its emperor and his court, Vienna
                  was engaged with its great past and slow to adopt a modern aesthetic.
                  The prevailing artistic style was historicist—an academic style
                  based on the imitation of past masters, depicting scenes from mythology
                  and history. Klimt had created many paintings in this style for
                  the many new buildings springing up around Vienna but, starting
                  in the 1890s, he shifted toward a more modern and challenging mode.
                  He became the leader of modern art in Vienna and, thus, was a founding
                  member and first president of the Viennese Secession, a group of
                  artists that was looking both forward and further afield to the
                  new artistic ideas emerging from Paris.</p>"
                dropcap: true
  chapter2:
    id: chapter2
    title: Meeting of the Minds
    numeral: II
    pages:
      c2p1:
        classes: ''
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: II
          title: Meeting of the Minds
          img:
            url: "/assets/images/klimt_portrait_of_ria_munk_iii.jpg"
            alt: ''
      c2p2:
        classes: ''
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        data:
          classes: dark
          offset: medium-offset-1
          components:
          - template: "@atoms/video--embed/video--embed.html.twig"
            data:
              poster: https://files.slack.com/files-pri/T024Y2MQC-FB9BE7CCC/alee.jpg?pub_secret=c6f841d9eb
              sources:
                webm: "/assets/video/rodin.webm"
                m4v: "/assets/video/rodin.m4v"
      c2p3:
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        data:
          classes: dark
          components:
          - template: "@atoms/audio_player/audio_player.html.twig"
            data:
              srcset:
              - "..."
              - "..."
  chapter3:
    id: chapter3
    title: Comparing Genius
    numeral: III
    pages:
      c3p1:
        classes: dark
        template: "@molecules/chapter__title/chapter__title.html.twig"
        data:
          numeral: III
          title: Comparing Genius
          img:
            url: "/assets/images/beethoven_frieze.jpg"
            alt: ''
      c3p2:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          left:
            components:
            - template: "@atoms/cliff-note/cliff-note.html.twig"
              data:
                component_name: cliff-note
                text: Cliff Note aka Blurb - Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Phasellus nec nisl id purus pellentesque porta
                  in id enim.
          right:
            components:
            - template: "@molecules/inline-quote/inline-quote.html.twig"
              data:
                component_name: inline-quote
                name: John Doe
                date: '2018'
                text: Inline Quote - Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Phasellus nec nisl id purus pellentesque porta in id enim.
                  Aliquam libero purus, eleifend quis lacinia non, pulvinar in neque.
      c3p3:
        template: "@layouts/one_up--primary/one_up--primary.html.twig"
        data:
          components:
          - template: "@molecules/standalone-quote/standalone-quote.html.twig"
            data:
              component_name: standalone-quote
              name: Motto of Secession, 1900
              text: To every age its art. To every art its freedom.
              large_text: true
      c3p4:
        template: "@molecules/commentary/commentary.html.twig"
        data:
          component_name: commentary
          author_name: Charles Desmarais
          author_title: Art Critic, San Francisco Chronicle
          author_bio: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            consequuntur distinctio, dolores earum, esse eveniet in inventore nemo
            optio soluta sunt, tempora totam! At, excepturi iusto laborum necessitatibus
            nesciunt veniam.
          author_image:
            srcset:
            - min-width: 0px
              src: https://www.fillmurray.com/300/300
            - min-width: 768px
              src: https://www.fillmurray.com/400/400
            - min-width: 960px
              src: https://www.fillmurray.com/500/500
            url: https://www.fillmurray.com/500/500
            alt: A picture of Bill Murray
            style: vertical
          components:
          - template: "@atoms/textarea/textarea.html.twig"
            data:
              text: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem
                ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.</p>"
              dropcap: false
      c3p5:
        template: "@organisms/horizontal-image-slider/horizontal-image-slider.html.twig"
        data:
          slides:
          - intro_slide: true
            components:
            - template: "@atoms/h3/h3.html.twig"
              data:
                text: This is a heading
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
          - caption:
              id: slide-1-caption
              brief: Lorem ipsum dolor sit amet
              text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et
                felis ac arcu cursus imperdiet. Mauris volutpat, ligula sit amet semper
                egestas, nunc velit pretium sem, id ornare nisl nisl nec erat.
            template: "@molecules/Picture/Picture.html.twig"
            data:
              srcset:
              - min-width: 0px
                src: https://www.fillmurray.com/900/630
              - min-width: 350px
                src: https://www.fillmurray.com/900/630
              - min-width: 800px
                src: https://www.fillmurray.com/900/630
              url: https://www.fillmurray.com/900/630
              alt: A picture of Bill Murray
              style: vertical
          - caption:
              brief: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                et felis ac arcu cursus imperdiet. Mauris volutpat, ligula sit amet
                semper egestas, nunc velit pretium sem, id ornare nisl nisl nec erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et felis
                ac arcu cursus imperdiet. Mauris volutpat, ligula sit amet semper
                egestas, nunc velit pretium sem, id ornare nisl nisl nec erat.
            template: "@molecules/Picture/Picture.html.twig"
            data:
              srcset:
              - min-width: 0px
                src: https://www.stevensegallery.com/900/630
              - min-width: 350px
                src: https://www.stevensegallery.com/900/630
              - min-width: 800px
                src: https://www.stevensegallery.com/900/630
              url: https://www.stevensegallery.com/900/630
              alt: A picture of a kitten
              style: vertical
          - template: "@molecules/Picture/Picture.html.twig"
            caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              convallis est sit amet leo feugiat, in pulvinar tellus efficitur. Sed
              a leo nunc. Vivamus quam neque, accumsan et mauris in, mattis efficitur
              lorem.
            data:
              srcset:
              - min-width: 0px
                src: https://www.placecage.com/900/630
              - min-width: 350px
                src: https://www.placecage.com/900/630
              - min-width: 800px
                src: https://www.placecage.com/900/630
              url: https://www.placecage.com/900/630
              alt: A picture of Nicolas Cage
              style: vertical
      c3p6:
        template: "@organisms/in-depth/in-depth.html.twig"
        data:
          title: Lorem ipsum lorem ipsum
          picture:
            srcset:
            - min-width: 0px
              src: https://www.fillmurray.com/300/300
            - min-width: 768px
              src: https://www.fillmurray.com/400/400
            - min-width: 960px
              src: https://www.fillmurray.com/500/500
            url: https://www.fillmurray.com/500/500
            alt: A picture of Bill Murray
            style: square
          modal_button_text: Learn more
          id: in-depth-example
          full_screen: true
          class: in-depth-modal
          component:
            template: "@organisms/horizontal-image-slider/horizontal-image-slider.html.twig"
            data:
              slides:
              - template: "@molecules/slide--in-depth__intro/slide--in-depth__intro.html.twig"
                data:
                  title: Scandals & Controversies
                  text: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem
                    ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum
                    lorem ipsum '
                  picture:
                    srcset:
                    - min-width: 0px
                      src: https://www.fillmurray.com/300/300
                    - min-width: 768px
                      src: https://www.fillmurray.com/400/400
                    - min-width: 960px
                      src: https://www.fillmurray.com/500/500
                    url: https://www.fillmurray.com/500/500
                    alt: A picture of Bill Murray
                    style: square
              - caption:
                  id: in-depth-slide-1-caption
                  brief: Lorem ipsum dolor sit amet
                  text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    et felis ac arcu cursus imperdiet. Mauris volutpat, ligula sit
                    amet semper egestas, nunc velit pretium sem, id ornare nisl nisl
                    nec erat.
                template: "@molecules/Picture/Picture.html.twig"
                data:
                  srcset:
                  - min-width: 0px
                    src: https://www.fillmurray.com/900/630
                  - min-width: 350px
                    src: https://www.fillmurray.com/900/630
                  - min-width: 800px
                    src: https://www.fillmurray.com/900/630
                  url: https://www.fillmurray.com/900/630
                  alt: A picture of Bill Murray
                  style: vertical
              - caption:
                  brief: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nam et felis ac arcu cursus imperdiet. Mauris volutpat, ligula
                    sit amet semper egestas, nunc velit pretium sem, id ornare nisl
                    nisl nec erat. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Nam et felis ac arcu cursus imperdiet. Mauris volutpat,
                    ligula sit amet semper egestas, nunc velit pretium sem, id ornare
                    nisl nisl nec erat.
                template: "@molecules/Picture/Picture.html.twig"
                data:
                  srcset:
                  - min-width: 0px
                    src: https://www.stevensegallery.com/900/630
                  - min-width: 350px
                    src: https://www.stevensegallery.com/900/630
                  - min-width: 800px
                    src: https://www.stevensegallery.com/900/630
                  url: https://www.stevensegallery.com/900/630
                  alt: A picture of a kitten
                  style: vertical
              - template: "@molecules/Picture/Picture.html.twig"
                caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Cras convallis est sit amet leo feugiat, in pulvinar tellus efficitur.
                  Sed a leo nunc. Vivamus quam neque, accumsan et mauris in, mattis
                  efficitur lorem.
                data:
                  srcset:
                  - min-width: 0px
                    src: https://www.placecage.com/900/630
                  - min-width: 350px
                    src: https://www.placecage.com/900/630
                  - min-width: 800px
                    src: https://www.placecage.com/900/630
                  url: https://www.placecage.com/900/630
                  alt: A picture of Nicolas Cage
                  style: vertical
      c3p7:
        template: "@layouts/two_up--primary/two_up--primary.html.twig"
        data:
          right:
            id: sample-sticky-anchor
            components:
            - template: "@atoms/textarea/textarea.html.twig"
              data:
                text: "<p>This exhibition allows the public to study, for the very
                  first time on the West Coast, the full evolution of Klimt’s artistic
                  output, ranging from his early and academically applauded work to
                  his provocative and critically debated mature style, as seen here
                  in The Virgin. Revered today as a pioneer of modernism in Vienna,
                  Klimt produced only a very limited number of canvases over his career.
                  Many of these canvases are deemed too fragile to travel, making
                  a sizable display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p><p>This
                  exhibition allows the public to study, for the very first time on
                  the West Coast, the full evolution of Klimt’s artistic output, ranging
                  from his early and academically applauded work to his provocative
                  and critically debated mature style, as seen here in The Virgin.
                  Revered today as a pioneer of modernism in Vienna, Klimt produced
                  only a very limited number of canvases over his career. Many of
                  these canvases are deemed too fragile to travel, making a sizable
                  display of his work a once-in-a-lifetime opportunity.</p>"
                dropcap: true
          left:
            attributes: data-sticky-container
            components:
            - template: "@molecules/Picture/PictureWithCaption.html.twig"
              data:
                attributes: data-sticky data-anchor='sample-sticky-anchor' data-margin-top='4'
                caption:
                  id: caption
                  brief: Gustav Klimt
                  text: Gustav Klimt, The Virgin, 1913. Oil on canvas, 74 3/4 x 78
                    3/4 in. (190 x 200 cm). Národní Galerie, Prague, 04152
                picture:
                  srcset:
                  - min-width: 0px
                    src: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  - min-width: 350px
                    src: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  - min-width: 800px
                    src: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  url: https://lh3.googleusercontent.com/3QCNuJKnnA8I7TdfZEP2Wb1OKaouHbLmHZWDbvY0jlRsFjcex-p72iAFfsDIkDp60kLjefLBvMifZg9nU-BN3D8azKC28zrRIGoemeblgidEoiyuWwAX4EEY5hBseVCwh5CLTNvrcdedtcYJ38lIGM26suRHXYZ_EKDSIWbpAU5sW9DtB2UehdVFs-d-4z34Tm8bMVLfIdwE_1cvfpk6H44xPFB8Nt-TXJBlpBaVtLDAo4dWYPmqUnUBXjDgm6bdXXRVcOKCumvmJgc7idqxpiBGixFSWpBcgtfDxGTLxyPSnrg_95VNyz7RMEKYFR_mIfrF4WlY0h5E1U1BW5ZWc7Ibbg9Dr-pWDApOGg4AzfpV-COuAc7GX-dHg_mxCKwI72uRtdC5eSO4klalGsRFQ7MCJGMSxfdoNtLgYVoJRBsxuTOwxQjs2GoRjSAcxW55rZyV5nK2GdYsy5wmn1mZSryPfrmxjEf2jpmgR64HBwRU4qbs7r4_c8hyUurEvNGrHOvjjYOLEVBvswyutFI8vKej3YcRjJTQJlvIpuetNZrPUWX38bDmIFm6vQPSaPpu=w1612-h1654
                  alt: Gustav Klimt, The Virgin, 1913
                  style: vertical
---