[![Netlify Status][nt-status]][nt-deploy]

[nt-status]: https://api.netlify.com/api/v1/badges/f5780fca-8fa1-4eb6-a8ff-1d8ca6821311/deploy-status
[nt-deploy]: https://app.netlify.com/sites/magnoblog/deploys

# Magno Blog

Este es el código de [mi web personal](https://magnoblog.netlify.com), publicada
en los servidores de [Netlify](https://netlify.com) utilizando el generador de
sitios estáticos [Hugo](https://www.gohugo.io).

El HTML, CSS y JS los he creado yo, no esto usando ningún _tema_. Esta es la
estructura:

```
                      ┌──────────────┐        ┌───────────────────┐             ┌──────────┐
                      │ partials     ╠════════╣ baseof.html       ╠═════════════╣ base.css │
                      ├──────────────┤        ├───────────────────┤             └──────────┘
                      │ social-media │        │ » head            │
                      │ page-entry   │        │    ├─ metadata    │
                      └──────────────┘        │    ├─ styles      │
                                              │    └─ fonts       │
                                              │ » body            │
                                              │    ├─ intro       │
                                              │    ├─ header      │
                                           ╔══╣▒▒▒▒├─ main ▒▒▒▒▒▒▒│
                                           ║  │    └─ footer      │
                                           ║  │ » scripts         │
                                           ║  └───────────────────┘
                                           ║
           ╔═════════════════════╦═════════╩═════════╦════════════════════╗
           ║                     ║                   ║                    ║
┌──────────╩──────────┐  ┌───────╩────────┐  ┌───────╩───────┐  ┌─────────╩─────────┐
│ home.html           │  │ list.html      │  │ single.html   │  │ 404.html          │
├─────────────────────┤  ├────────────────┤  ├───────────────┤  ├───────────────────┤
│ » #animation #start │  │ » .main-title  │  │ » .main-title │  │ » #not-found      │
│    └─ animation.js  │  │ » article      │  │ » .toc        │  │    └─ .main-title │
│ » #about            │  │ » .categories  │  │ » article     │  └───────────────────┘
│    └─ .social_media │  │ » .post        │  └───────╦───────┘
│ » #portfolio        │  └───────╦────────┘          ║
│    ├─ .project      │          ║                   ║
│    ├─ .project      │          ║                   ║
│    └─ ...           │          ╚═════════╦═════════╝
│ » #portfolio        │                    ║
│ » #blog             │                    ║
│    └─ .entry        │                    ║
└──────────╦──────────┘                    ║
           ║                               ║
     ┌─────╩─────┐                   ┌─────╩─────┐
     │ home.css  │                   │article.css│
     └───────────┘                   ├───────────┤
                                     │ » .info   │
                                     │ » code    │
                                     │ » table   │
                                     │ » quote   │
                                     └───────────┘
```
