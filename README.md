<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/PeterDevelops/final-project">
    <img src="frontend/public/Logo.png" alt="Logo" width="200" height="200">
  </a>
<br />
<br />
  <p align="center">
    Your Virtual Farmers Market
    <br />
    <a href="https://github.com/PeterDevelops/final-project/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/PeterDevelops/final-project/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
<br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Mrkt is a Virtual Farmers Market allowing users to shop local vendors from the comfort of home, and arrange for pick up or delivery of their items at a time convenient to them, while allowing vendors or local producers of any size to reach a large customer base with whatever staff and product output they already have.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Express][Express.js]][Express-url]
* [![Tailwind][Tailwindcss]][TailwindCSS-url]
* [![Socket.io][Socket.io]][Socket.io-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

Ensure you have Node.js and npm installed on your machine.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Sign up for [Thunderforest](https://thunderforest.com) and get a free API Key

2. Clone the repo
   ```sh
   git clone https://github.com/PeterDevelops/final-project.git
   ```
3. Navigate to the backend directory and install dependencies
   ```sh
    cd final-project/backend
    npm install
   ```
4. Run the backend server
   ```sh
    node server.js
   ```
5. In a new terminal, navigate to the frontend directory and install dependencies
   ```sh
    cd ../frontend
    npm install
   ```
6. Set up your .env file for the frontend:
    - Copy the .env.example file to create a new .env file
      ```sh
        cp .env.example .env
        ```
    - Open the .env file and add your Thunderforest API key:
      ```js
        REACT_APP_THUNDERFOREST_API_KEY=<your-thunderforest-api-key>
        ```
7. Start the frontend development server
   ```sh
    npm start
   ```

Your application should now be running locally. The backend server will typically run on http://localhost:8080 and the frontend on http://localhost:3000.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This app is designed to help users discover and interact with local vendors through an interactive map interface. Below are some key features and how to use them:

### Explore Vendors on the Map

* __View Vendor Locations:__ The app features a dynamic map where vendors are marked based on their geographical location. Users can zoom in/out to explore different areas and click on markers to view vendor details.

* __Filter Vendors in View:__ As you navigate the map, the list of vendors displayed below the map automatically updates to show only those currently in the map’s frame.

### Search for Products and Vendors

* __Search by Category or Vendor:__ Use the search bar at the top to find products by category or specific vendors by name. The search results will display options grouped by category, allowing for easy navigation.

* __Direct Navigation:__ Clicking on a search result will filter the displayed products or vendors accordingly, and you will be navigated to the relevant page.

### Vendor Profiles

* __Detailed Vendor Information:__ Click on any vendor marker on the map or select a vendor from the search results to view their profile. Here, you can find details about their offerings, location, and more.

### Shopping Cart

* __Add Products to Cart:__ While browsing products, you can easily add items to your shopping cart. The cart icon in the navbar will show the total number of items and allow you to view or modify your selections at any time.

### Inbox and Communication

* __Messaging:__ Stay connected with vendors and other users through the app’s inbox feature. Access your messages directly from the navbar and manage your conversations effortlessly.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Screenshots -->
## Screenshots

Include Screenshots Here

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTRIBUTORS -->
## Contributors

- Peter Dinh (https://github.com/PeterDevelops)
- Jeff Dobson (https://github.com/Jdob11)
- Lily Whitford (https://github.com/lilyjwhitford)
- Lisa Wild (https://github.com/liisawiild)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* We’d like to thank the instructors, mentors, and staff at Lighthouse Labs for their support throughout this project. This application was developed as our final project, and their guidance was invaluable in helping us achieve our goals.

* We also want to extend our thanks to our fellow students. Your camaraderie and collaboration were crucial in getting through this intense journey together. Working alongside you made the experience both manageable and rewarding.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/PeterDevelops/final-project.svg?style=for-the-badge
[contributors-url]: https://github.com/PeterDevelops/final-project/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PeterDevelops/final-project.svg?style=for-the-badge
[forks-url]: https://github.com/PeterDevelops/final-project/network/members
[stars-shield]: https://img.shields.io/github/stars/PeterDevelops/final-project.svg?style=for-the-badge
[stars-url]: https://github.com/PeterDevelops/final-project/stargazers
[issues-shield]: https://img.shields.io/github/issues/PeterDevelops/final-project.svg?style=for-the-badge
[issues-url]: https://github.com/PeterDevelops/final-project/issues
[license-shield]: https://img.shields.io/github/license/PeterDevelops/final-project.svg?style=for-the-badge
[license-url]: https://github.com/PeterDevelops/final-project/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-35495E?style=for-the-badge&logo=express&logoColor=4FC08D
[Express-url]: https://expressjs.com/
[TailwindCSS]: https://img.shields.io/badge/TailwindCSS-1e293b?style=for-the-badge&logo=tailwindcss&logoColor=388df8
[TailwindCSS-url]: https://tailwindcss.com/
[Socket.io]: https://img.shields.io/badge/socket.io-563D7C?style=for-the-badge&logo=socketdotio&logoColor=white
[Socket.io-url]: https://socket.io/
