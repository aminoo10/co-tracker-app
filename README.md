# Change Order Tracker

https://co-tracker-app.vercel.app/

A CRUD app I created to help track ServiceNow change orders during my role as a deployment lead. 

## How to Use

* Clck the green plus button on the top left to create a new change order entry
* Add in the details such as the Name of the change, what MAL code is involved, the change number, the starting and ending times of the deployment, and whether a runbook has been provided to preform work duties. **Start Time, End Time, and Change Order Number** are required fields


## Features

* You can sort a column from ascending/descending order. An arrow next to the column name will denote whether it is currently in ascending state, or descending state.

  ![image](https://github.com/user-attachments/assets/1ebc03cb-cd96-4b8e-af58-2dbda69b09e2)

   <sub>*(this here is for the CHG column, which is being sorted in ascending order, as per the arrow facing up.)*<sub>

* Based on a change's risk rating, if a change is still in New state, a warning will be caluclated determining how much lead time is required to submit the change without it going expedited.

  ![image](https://github.com/user-attachments/assets/6a273cd0-29ba-455d-80ae-2d8adfe58461)

  <sub>*(currently, this does not count for weekends and rather calculates based on the amount of days till the change is scheduled to start)*<sub>

* approximately a day prior to the change's end window, a message will be present reminding the user to close any changes before the listed date and time.

  ![image](https://github.com/user-attachments/assets/1befd03a-de05-422b-8914-91ae1ff8f269)
