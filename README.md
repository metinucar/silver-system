# Planning Deck
Planning Deck is a consensus-based & gamified application for estimating development goals.

![Planning Deck screenshot](https://d26dzxoao6i3hh.cloudfront.net/items/2H1r1k021Y1n2n1Y2P1c/Image%202017-06-26%20at%205.05.28%20fm.png?v=45f06dd3)

## Usage
1. Choose a card
2. Wait while others choose their cards
3. Reveal your card and others cards
4. Start over

## Setup
1. Clone or download this repository
2. Install npm by following instructions here [here](https://www.npmjs.com/get-npm). Minimum required version is *4.1*
3. Install gulp using `npm install --global gulp-cli`. Minimum required version is *3.9*
4. Go into project folder and run `npm install`
5. Run `gulp serve` to start development environment. Then visit [http://localhost:3000/](http://localhost:3000/) to see the working version.
6. Run `gulp build` to compile the app for release. The release-ready files are can be found **tmp** folder

## Details
### Layout
1. Jade templating engine is used to create DOM structure
2. A dedicated Gulp task is used for Jade-to-HTML conversion
3. The DOM is manipulated partly when required. For example, notification element is added/removed through Javascript

### Styling
1. **normalize.css** is used for CSS resets
2. **Modularscale-sass** is used for size types and creating a sense of harmony in a design
3. **sass-mq** is used for media queries
4. The rest of styling is custom
5. Flexbox is used for creating card grid
6. A custom notification system is built for notifying users when they select a card
7. The letter **a** from the brand logotype is used in card design
8. The brand colors ( e.g. light blue, dark gray and red ) are used in the design
9. SASS and BEM are used when creating stylesheet
10. A dedicated Gulp task takes care of SASS-to-CSS conversion
11. Prefixing is done via **autoprefixer**
12. `Open Sans Condensed` is used as it resembles the brand logotype. `Roboto` is used for text.
13. See more at **src/_styles/**

### Scripts
1. **jQuery** is the only external library used
2. Custom functions are used for interactions, steps, and everything else
3. See more at **src/_scripts/main.js**
