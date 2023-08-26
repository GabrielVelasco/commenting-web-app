# Commenting Web App

This is a CRUD/REST API that simulates a commenting web app created using Node.js and Express, with EJS templates for practicing web development skills.

## Technologies Used
- Node.js
- Express
- EJS (Embedded JavaScript) templates

## API Endpoints

### Create
- **GET** `/comments/new`
  - Description: Fetches the page for creating a new comment.
- **POST** `/comments`
  - Description: Adds a new comment.
  - Parameters: None (Data sent in the request body).

### Read
- **GET** `/comments`
  - Description: Fetches the page to render all comments.
- **GET** `/comments/:id`
  - Description: Fetches a specific comment by ID.
  - Parameters:
    - `:id` - The ID of the comment.

### Update
- **GET** `/comments/:id/edit`
  - Description: Fetches the page for editing a comment.
  - Parameters:
    - `:id` - The ID of the comment to be edited.
- **PATCH** `/comments/:id`
  - Description: Updates a specific comment by ID.
  - Parameters:
    - `:id` - The ID of the comment to be updated.
  - Data sent in the request body for partial updates.

### Delete
- **DELETE** `/comments/:id`
  - Description: Deletes a specific comment by ID.
  - Parameters:
    - `:id` - The ID of the comment to be deleted.

## Usage
1. Clone or download this repository.
2. Install the required dependencies using `npm install`.
3. Run 'node index.js'.
4. Use your web browser (localhost /comments | localhost/comments/new, and so on...)

## Disclaimer
This API is a learning project and not intended for production use.