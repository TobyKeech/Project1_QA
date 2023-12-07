# QA Estate Agent Project 1

# Estate Agency: Rook Residences

Estate Agent Website for Project 1 of QA.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Tech Stack](#tech-stack)
- [Planning](#planning)
- [Challenges](#challenges)
- [Future Improvemenets](#future-imporvements)
- [What I would do differently](#what-I-would-do-differently)

  

## Description

The project wacs reated for the QA project 1 utilising frontend knowledge to build a CRUD application. The website is a estate agancy of Rook Residences to use in regards  where you can view properties, sellers and buyers. You can filter for a specific property you wish to see depenedent on search conditions. A new porperty, seller andd buyer can be added to the website. Properties can be updated from "for sale" to "sold". Properties, buyers and sellers can also be deleted or edited to provide new details. 

## Installation

Follow these steps to set up and run the project on your local machine.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/TobyKeech/Project1_QA.git

2. **Navigate to the Project Directory:**
   ```bash
   cd p1_estate_agent
   
3. **Install Dependencies:**
   ```bash
   npm install

## Usage

1. **Start the backend server for the application:**
   ```bash
   npx json-server --watch data\db.json --port 8081
   ```

2. **Run the project on your machine:**
   ```bash
   npm start
    ```
Visit http://localhost:3000 in your web browser to view the application.

## Tech Stack
1. Javascript
2. CSS
3. HTML

## Technologies Used
1. React
2. Bootstrap

## Planning
**Trello Board:**


This was used to identify tasks at three levels to keep track of objects and targets for the day. Three levels of priority were used of low, medium and high to influence the important of features or bug fixes. See example above of this. 

**Stand Ups**
This was consulted on a daily basis with Lyam to access our objectives for the day and any barriers we had. We would consult wether we could provide assiatance for a task the other was attempting to tackle. We provided feedback and suggestions to better improve each others webistes. 

**Inital Steps**
I started by breaking down the example code to help me understand how things worked and the process which were happening. I spent initally before the project week itself reading over how things worked and anything new I broke it down and tried it in a seperate enviroment to better understand. I often took notes and referenced back to these as well as breaking code down line by line. 

## Challanges
I would have liked more time with Javascript and React before starting the project but took this an oppurtunity to learn and consolidate. Utilising useReducer slowed me down a lot as I had no used this before and understanding the process and how it was working within the application. This was great to push myself with but presented a lot of errors and issues in the early stages. 

Passing down properties wether that was data or functions I also found challanging to begin with. Although I feel more confident with this now it made understanding my code hard at times. My lack of commenting as I was going through did not help which I have addressed further down. Getting certian functionalities of adding, deleting and editing became a challange as I had this being hidden via state and therefore required passing information up and down to trigger certian functions.

As mentioned below, bootstrap was great to use but the challanages with applying styling how I wanted and also the user experience I wished to provide made this more challanging than it needed to be. I reference below how I would approach this in the future. 


## Future Improvements
1. I would like to have added a bookings page to the application as this was thought of late on into the application. Using new react features required more time to understand than I would have liked and by the time I got round to it and wanted to focus on what I had and making it styled well for presentation.
   
2. When changing the property from the status of "SOLD" and "FOR SALE" I would have liked to include a visual change on the application to reflect this. This would have made a more user friendly experience.

## What I would do differrently

1. I feel spending more time with bootstrap would have been benifiical. Although good to use and provided a lot of layouts and structure at times CSS became more challanging due to my lack of knowledge of it and only the second time using it. Certian bugs and issues could have been fixed quicker had I spent more time going over it.

2. Not get to far ahead before taking the time to add comments. At times I would add code and say to myself that I would come back to comment later on and didn't. This could make more work for myself further down the line re tracing what I had done before when I should have taken the time to add it. 




