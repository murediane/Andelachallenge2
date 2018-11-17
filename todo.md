# Last 24 hours

1. organize and initiate the project

## Next 24 hours

1. start working on the project

### Blockers

<!-- no blockers yet -->

### the stories needed to complete the UI

<!-- this is about the user actions only -->

1. user can create an account
2. user can login (enter in his/her account)
3. user can create a parcel delivery order (add the quotes based on weight categories)
4. user can view all the created orders details
5. user can change the destination of the order
6. user can cancel the parcel delivery order
7. user can view the orders of specific status
8. The user should be email notified to the parcel's​ status​​ change.
9. The user should be email notified to the parcel's​ location​​ change.
10. The number of parcel delivery order that has been delivered. //Profile
11. The number of parcel delivery orders that are (in transit). //Profile
12. List of all parcel delivery orders. //Profile

<!-- this is about the admin actions only -->

1. Admin can change the ​ status​​ a parcel delivery order.
2. admin can change the present​​ ​location​​ of the order.

<!-- this is for both admin and user -->

1. The application should google map the ​order's origin and the ​destination​​.
2. The application should google map computed travel distance between origin and​ destination.
3. The application should google map journey duration between origin and​ destination.

### the stories needed to complete the server (API)

1. Environment configuration (eslint,babel,travis,coveralls,heroku,prettier, ...)
2. Database preparation (creating the database file to handle the data manipulation)
3. creating the schema for the parcels and users
4. GET /parcels Get all parcel delivery orders
5. GET /parcels/<**parcelId**> Get a specific parcel delivery order
6. GET /users/<**userId**>/parcels Get all parcel delivery orders by a specific user
7. PUT /parcels/<**parcelId**>/cancel Cancel a parcel delivery order
8. POST /parcels Create a parcel delivery order
