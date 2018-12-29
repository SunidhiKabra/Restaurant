# Restaurant Reservation
## <center>WIKI (Planning) <center>

### Description of the product and functionalities:
* Our product will help customers in making reservations using their phone messaging service. The customer can make a booking for a specified time and number of people (adults as well as kids). Customer can change the reservation 15 mins prior to the table availability, pre-order items, can make special requests like birthdays or anniversaries, can make requests for specially-abled accommodation. The app features includes the alerts to the customers like the ‘table is ready’, ‘the table will be ready in 15 minutes’, ‘the waiting time for the table is #’.

* All the above features can be done using the the web portal for reservations too.
* The web portal for Admin has the features to approve or cancel reservation requests. He can monitor the status of the reservations, change the priority of the reservations on the basis of previous data, notify the customer if the accommodation request can be completed or not,   alter the menu, send pre-ordered items by the customer to the staff and adjust the walk-ins.
### Assumptions:
* We have 5 tables with 4 seatings on each
* 2 extra tables and 2 child seats.
* Initial allotment will be done on the basis that each reservation takes 45 minutes to complete.
### Details of the features and descriptions of both the mobile app and web app:
Messaging Service on phone using Twillio:
* CRUD features of a booking
* Selecting time slot feature
* Number of people
* Pre-order food
* Special requests (birthdays, anniversaries, etc)
* Specially-abled accommodation
* Adjust reservation time
* Alerts about the reservation (waiting time, table ready, 15 mins prior availability)
* Add member numbers to replicate the alert messages
### Admin Portal:
* Monitor status of reservations
* Approve/cancel reservation requests
* Adjust reservation requests (change priority on the basis of previous data)
* Accommodate special requests and notify the user if the request can be completed or node
* Alter menu
* Send pre-ordered items for a reservation to the staff
* Adjust walk-ins
### Web Portal for reservation:
* It has the same features as available when registering using phone via Twilio
### Details on the technology to be used:
* Messaging Service using Twillio:Nodejs
* Web portal for Admin: Nodejs, Bootstrap
* Web portal for Reservation: Nodejs, Bootstrap
* Database: MongoDB
### Details of the DB schema to be adopted:
* Customer:
    * Group number
    * Time slot requested
    * Adults
    * Kids
    * Special Requests
    * Disability Accommodation
    * No. of bookings done previously
* Furniture:
    * Tables used currently
    * Chairs used currently
* Menu:
    * Starters
    * Main Course
    * Drinks
    * Desserts
* Orders:
    * Group number
    * Starters
    * Main Course
    * Drinks
    * Desserts


