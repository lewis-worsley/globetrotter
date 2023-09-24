# Globetrotters
Globetrotters is a social media platform designed for travellers across the globe, to log and share their journeys (and blogs) with like-minded people. Globetrotters is dedicated to providing a space where users can freely post about their experiences in every country and every continent, whether it be backpacking, city breaks, adventures, roadtrips, family trips, activities and more. 

Globetrotters servers as a front-end component which is connected to the globetrotter-drf-api backend, developed using Django Rest Framework.

<img src="./docs/am-i-responsive.png">

<br>

## Contents
<hr>

[Planning & Development](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#planning--development)

[Features](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#features)

[Testing](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#testing)

[Deployment](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#deployment)

[Languages](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#languages)

[Software](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#software)

[Media](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#media)

[Credits](https://github.com/lewis-worsley/globetrotter/blob/main/README.md#credits)

<br>

## Planning & Development

Popular social media platforms like X (Twitter), Facebook, Instagram, and TikTok are used in various ways for users to share any topic or interest, including travelling, which features heavily on Instagram and TikTok as pictures and videos are their primary source of interaction with the user. Globetrotters aims to created a dedicated space to only travel related content - to be the number one space where users can post detailed journeys and blogs. Furthermore, the app aims to share recent global news and guides for every country so users and non users are kept informed and educated about what's happening in the world.

<br>

### Site Objective
<hr>

Globetrotters is a social media platform aimed for any type of traveller who wishes to log and share their experience with fellow travellers and non users of the application.
<br>
<br>
It's a consumption application for users and non users to read, inform, educate and enjoy. The aim is to convert as many people who love travelling to sign up to the website and post their journeys and blogs, whether they're frequent flyers or holiday once a year.
<br>
<br>
In summary, the site is to:

- allow visitors to read journeys, blogs and news, as well as profiles
- display a user's journeys and blogs on their profile page
- offer a seemless experience as users navigate across the app
- allow visitors to sign up and sign in
- provide users to perform CRUD functionality (create, read, update and delete) with their journeys and blogs
- deliver a colourful experience which represents travel and provokes positive emotions
- connect with the globetrotter-drf-api to store and provide data to the user
- ensure the purpose of the app is clearly demonstrated to the user, demonstration the mission and vision of Globetrotters
- provide authenticated users the opportunity to engage with journeys and blogs by liking and commenting
- offer users of the app the opportunity to add a personal bio and their country home
- give users the ability to filter results by search

<br>

### Target Audience
<hr>

The website is designed to attract all types of travellers, but with a major focus on ages 18-45:

- Univerity students
- Young adults
- Frequent flyers
- Backpackers
- Holiday-goers

Equally, the website can also be used by families to post about their experiences.

Globetrotters is a platform for anyone looking for inspiration, interested in travelling, and/or wish to be kept up-to-date with the news around the globe.

<br>

### User Stories 
<hr>

User stories for admin:

- As a Site Admin, I'd like to be able to create, read, update and delete news so that the website remains up-to-date
- As a Site Admin, I'd like to be able to restrict access and redirect unauthorised visitors to pages they're not permitted to see

User stories for an authenticated user:

- As a user, I'd like to be able to create, update, read and delete journeys and blogs
- As a user, I'd like to be able edit my profile, including updating my username and password
- As a user, I'd like to be able to see all my journeys and blogs on my profile page
- As a user, I'd like to be able to follow or unfollow other accounts
- As a user, I'd like to be able to have an enjoyable experience on the page, including easy navigation
- As a user, I'd like to be able to sign in and out of my account

User stories for a non authenticated user:

- As a visitor, I'd like to be able to view the latest journeys, blogs and news
- As a visitor, I'd like to be able to view profiles
- As a visitor, I'd like to be able to search for journeys, blogs and news
- As a visitor, I'd like to be able to create an account and sign in
- As a visitor, I'd like to be able to have an enjoyable experience on the page, including easy navigation

<br>

### Colour Scheme
<hr>

The brand has a five colour palette. Green was selected as the primary colour because it evokes positives emotions such as safe, tranquil, prosperity and knowledge, as well as symbolises life, health, nature and balance. It's the colour that is associated with nature. When we see green, people think of grass, trees, forests and woodland environments, so it naturally links to life and growth. Green is believed to have calming and relaxing influnces due to its connection to nature.

The colour palette was inspired by the following picture:

<img src="./docs/planning-development/colour-palette.png">
<br>

- Grey: not used
- Grey Blue: #023c62
- Teal: #0EA098
- Blue: #02636D
- Green: #63610C

Bootstrap dark background colour (#212529) was adopted for text, card, and footer to provide effective contrast.

Page background was set to #F5F5F5.

<br>

### Typography
<hr>

The following font pair was used imported from Google Fonts:

- Headings: Playfair Display - a transtional design, featured on more than 4,300,000 websites
- Body: Source Sans 3 - open source typefac family, intended to work well in user interfaces. Featured on more than 20,000 websites

<br>

### Wireframes
<hr>

I used Miro to help create a medium-fedility prototype/wireframe to assist my design create for Globetrotters. By creating pages I could understand how navigation would work for users and what the feel and look would represent to visitors and users. 

<img src="./docs/planning-development/wireframes.png">

<br>

### Moodboard
<hr>

To help inspire my design I created a moodbood on Canva to ensure I was creating a website which reflected aspects of travelling

<img src="./docs/planning-development/moodboard.png">

<br>

### Database Schema
<hr>

The application I used to draw my database schema was DBDiagram to help visualise how the models will look and operate in the backend

<img src="./docs/planning-development/database-schema.png">

<br>

### Agile Methodology
<hr>

 A kanban board on GitHub was used as an agile tool for the planning and development of Globetrotters. To view it, please click [here](https://github.com/lewis-worsley/projects/4).

<img src="./docs/planning-development/kanban-board.png">

<br>

In total, the project consisted of eight epics which are referenced and linked to user stories on the kanban board:

 1. Navigation & Authentication
 2. Journeys
 3. Feed
 4. Comments
 5. Tag
 6. Blogs
 7. News
 8. Profile

<br>

#### MoSCoW
<hr>

The MoSCoW prioritisation technique was used as an agile work method for this project. To help priortise epics, and therefore subsequently user stories, three categories were definied:

- must-have
- should-have
- could-have

<img src="./docs/planning-development/moscow.png">

<br>

A project board was used to create epics and user stories by using the 'Issues' function. To view them, please click [here](https://github.com/lewis-worsley/globetrotter/issues).

<br>

## Features

All contents on the website is restricted into a Container tag to give plenty of space and margin to the width of the webpage. All components displayed on the website are provided by React-Bootstrap.

### Permanent features
<hr>

The following features are permanently visible across all pages to provide ease of use and navigation for visitors. 


#### Navigation bar
<hr>

​The NavBar operates conditional rendering based on whether a user is signed in or out of their account. The NavBar is sticky so the user always has navigation available regardless of their position on the page.

Here is how the NavBar appears based on conditional rendering:

- Signed out: [here]()
- Signed in: [here]()
- Signed out (mobile): [here]()
- Signed in (mobile): [here]()

On mobile, if a user clicks on a navlink (tab), the user is pushed to that page and the navbar toggle closes. If a user opens the toggle but then clicks outside of the nav, the navbar toggle is closed.

The logo is a permanent fixture regardless of condition and pushes the user to the homepage when clicked.

<br>

#### Footer
<hr>

​The Footer operates conditional rendering based on whether a user is signed in or out of their account. On smaller screens text is pushed to the centre.

If a user is signed in, a link to their profile account is displayed. If signed out they are presented with sign in and sign up links.

- Signed out: [here]()
- Signed in: [here]()
- Mobile: [here]()

Future development: include company social media and contact details.

<br>

### Existing features
<hr>

Existing features:

- Homepage

#### Homepage
<hr>

The homepage performs conditional rendering based on whether a user is signed in or out. The homepage can be split into the following segments:

- Hero image
- About
- Journeys ("Why be a Globetrotter?")
- Blogs
- News

<br>

##### Hero image
<hr>

As a Globetrotters is a social media platform hoping to attract as many sign ups as possible from their target audience, a welcoming message is presented to the user.

- Desktop view: [here]()
- Mobile view: [here]()

Future development: fix the title margin on smaller screens and include a scroll icon as there is no apparent call-to-action (CTA) visible. This could potentially be offset by introducing a compelling video for engagement.

<br>

##### About
<hr>

The about section provides a short blurb to communicate with visitors about the existence of Globetrotters and it's vision.

On mobile view, the logo disappears to help condense the page.

- Desktop view: [here]()
- Mobile view: [here]()

<br>

##### Journeys
<hr>

A small blurb is included to encourage users to create an account or sign in if logged out by providing two CTAs: Sign up or Sign in. Sign up button is giving better visual treatment as previous users should, in theory, be familiar with the layout of the website.

On mobile view, the image disappears to help condense the page.

- Desktop view - signed out: [here]()
- Desktop view - signed in: [here]()
- Mobile view: [here]()

The three latest journeys published are featured on the homepage on large and extra small screens, two on medium screens, and one on small screens. This is because the React component CardDeck causes the content to lose it's format on screens smaller than large or screens bigger than extra small.

Conditional rendering is added to the button underneath the cards whether a user is logged in or not.

- Signed out: [here]()
- Signed in: [here]()

<br>

##### Blogs
<hr>

The three latest blogs published are featured on the homepage on large and extra small screens, two on medium screens, and one on small screens. This is because the React component CardDeck causes the content to lose it's format on screens smaller than large or screens bigger than extra small.

The button has no conditional rendering - pushes users to the blogs page.

- Desktop view: [here]()
- Mobile view: [here]()

<br>

##### News
<hr>

The three latest news published are featured on the homepage on large and extra small screens, two on medium screens, and one on small screens. This is because the React component CardDeck causes the content to lose it's format on screens smaller than large or screens bigger than extra small.

The button has no conditional rendering - pushes users to the news page.

- Desktop view: [here]()
- Mobile view: [here]()

<br>

#### Authentication
<hr>

Users are presented with an option to either sign up or sign when on the webpage. If a user is logged in and proceeds to visit one of the following pages, they're redirected back to the homepage.

If there is an error on the form, a user is presented with an error message.

- Sign up example: [here]()
- Sign in example: [here]()

When a user successfully creates an account via the sign up page, they're then redirected to the sign in page to sign in.

<br>

##### Sign up
<hr>

Screens smaller than large (≥992px), the image is removed.

- Desktop view: [here]()
- Mobile view: [here]()

<br>

##### Sign in
<hr>

Screens smaller than large (≥992px), the image is removed.

- Desktop view: [here]()
- Mobile view: [here]()

<br>

#### Journeys
<hr>

Adopted colour theme for journeys: Green #63610C

All journeys are published on the journeys page but this component can also be found on the blogs, news and homepage pages but as a smaller section on those pages respectively.

See example: [here]()

To ensure users are able to establish the difference between journeys, blogs and news, the colour card header background inherits a green colour.

The information is placed in a React Card component for structural and content purposes.

The card features:

- heading
- content
- read more...
- like count
- comment count
- CTA

If a user clicks the heading, read more..., comment count, or CTA they are directed to the unique journey page. Authenticated users can like a journey without viewing the unique page.

- Desktop view: [here]()
- Mobile view: [here]()

The search query is available to use on all screens.

- Search query: [here]()

If a user is signed in, a button appears above the search query for users to create a journey which directs them to an appropriate form.

- Button for signed in users: [here]()

On screens smaller than large (≥992px), all other components on the page are hidden.

Image height cannot exceed image width but can be equal. However across all journey components width is greater than height to ensure a format that is close to a 16:9 screen on all devices.

Infinite scroll component has been implemented to display further journeys published if the user goes on to scroll past more than 10 journeys.

<br>

#### Blogs
<hr>

Adopted colour theme for blogs: Blue #02636D

All blogs are published on the blogs page but this component can also be found on the journeys, news and homepage pages but as a smaller section on those pages respectively.

See example: [here]()

To ensure users are able to establish the difference between journeys, blogs and news, the colour card header background inherits a blue colour.

The information is placed in a React Card component for structural and content purposes.

The card features:

- heading
- content
- read more...
- like count
- comment count
- CTA

If a user clicks the heading, read more..., comment count, or CTA they are directed to the unique blogs page. Authenticated users can like a blog without viewing the unique page.

- Desktop view: [here]()
- Mobile view: [here]()

The search query is available to use on all screens.

- Search query: [here]()

If a user is signed in, a button appears above the search query for users to create a blog which directs them to an appropriate form.

- Button for signed in users: [here]()

On screens smaller than large (≥992px), all other components on the page are hidden.

Image height cannot exceed image width but can be equal. However across all blog components width is greater than height to ensure a format that is close to a 16:9 screen on all devices.

Infinite scroll component has been implemented to display further blogs published if the user goes on to scroll past more than 10 blogs.

<br>

#### News
<hr>

Adopted colour theme for news: Grey Blue #023C62

All news are published on the news page but this component can also be found on the journeys, blogs and homepage pages but as a smaller section on those pages respectively.

See example: [here]()

To ensure users are able to establish the difference between news, blogs and news, the colour card header background inherits a grey blue colour.

The information is placed in a React Card component for structural and content purposes.

The card features:

- heading
- content
- read more...
- CTA

If a user clicks the heading, read more..., comment count, or CTA they are directed to the unique news page. There is no like or comment function for news.

- Desktop view: [here]()
- Mobile view: [here]()

The search query is available to use on all screens.

- Search query: [here]()

A news article cannot be created by non and authenticated users, only by admin.

On screens smaller than large (≥992px), all other components on the page are hidden.

Image height cannot exceed image width but can be equal. However across all news components width is greater than height to ensure a format that is close to a 16:9 screen on all devices.

Infinite scroll component has been implemented to display further news published if the user goes on to scroll past more than 10 news.

<br>

## Languages & Frameworks and other technologies

- HTML
- CSS
- Javascript
- Python
- Django Rest Framework
- React
- React-Bootstrap
- ElephantSQL
- Heroku
- Cloudinary

<br>

## Software

The logo for Globetrotters was inspired by a google search for "backpacks". It was created via Adobe Creative Cloud Suite; more specifically I used:

- Adobe Illustrator

<br>

## Media

- Images were sourced from pexels.com
- Icons were sourced from Font Awesome
- No Results image was provided by Code Institute
- Fonts provided by Google Fonts

<br>

## Credits

To help bring this project to life, the following deserve recognition:

<br>

### Content
<hr>

- Stack Overflow for providing answers to errors discovered during the project and implementing new ideas such as extending the background colour beyond Container with CSS: https://stackoverflow.com/questions/22083157/extend-background-color-of-header-beyond-container-with-css
- Geek for Geeks for providing me a solution to implement a ReadMore component: https://www.geeksforgeeks.org/how-to-create-a-read-more-component-in-reactjs/
- gomakethings.com for teaching me how to make an image extend out Container via CSS: https://gomakethings.com/how-to-break-an-image-out-of-its-parent-container-with-css/


<br>

### Thanks
<hr>

- Richard Wells (mentor)
    - With his help and guidance I was able to successfully build a project I'm proud of which including building the back and front ends. 
- Code Institute
    - The Moments walkthrough project provided me with the tools to tackle this challenge by providing a strong foundation and template to work from