# SF Film Locations

![map]

## Usage
Clone or download the repository and execute
```
npm install
```
Then open index.html in your browser and enjoy.

Alternatively you can visit the site live at https://ykpeng.github.io/sf_films/.

## Implementation
This is a front-end-only application built with React/Flux and jQuery AJAX, using the San Francisco Data API and the Google Maps API.
In implementing this project I focused on simplicity. I chose not to store the data on my own backend because new films can be added to the SF dataset at any moment. In order to keep my data up to date I would have to regularly sync my database, which seems to add unnecessary complexity.

Because React/Flux and AJAX are the front-end tools I'm most familiar with, I felt they would allow for the fastest speed of development and cleanest code. Were performance or maintainability to become an issue, I would switch to React/Redux, and would replace jQuery AJAX with vanilla JavaScript.

I designed an UI to most clearly and cleanly display all the available information from the SF Data API. Here, too, simplicity, elegance, and ease of use were my priority.

[map]: ./screenshots/sf_films_map.png
