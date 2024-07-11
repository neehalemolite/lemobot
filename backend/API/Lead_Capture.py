from pymongo import MongoClient
from Mail_Sending_Lemolite import Mail_Sending_Lemolite
from String_formation_for_mail_sending import String_formation_for_mail_sending
from Mail_Sending_Client import Mail_Sending_Client
# Replace the uri string with your MongoDB deployment's connection string.

def Lead_Capture(Domain, Name, EmailID, Contact, prefer_Mode_of_Contact, Project_Domain, Project_Description,file_link):
    client = MongoClient("mongodb://localhost:27017/")
    # Specify the database name
    db = client["lemolite_bot"]
    # Specify the collection name
    collection = db["lead"]
    # The data to be inserted
    data = {
        "Domain": Domain,
        "Name": Name,
        "Email_ID": EmailID,
        "Contact_Number": Contact,
        "Preferred_Mode_of_Contact": prefer_Mode_of_Contact,
        "Project_Domain":Project_Domain,
        "Project_Description":Project_Description,
        "Uploaded_File":file_link,
    }
    # Insert the data into the collection
    result = collection.insert_one(data)
    # Print the inserted document's ID
    body = String_formation_for_mail_sending(Domain, Name, EmailID, Contact, prefer_Mode_of_Contact, Project_Domain, Project_Description,file_link)
    Mail_Sending_Lemolite(body)
    Mail_Sending_Client(EmailID,Project_Domain,Project_Description)
    
    return f"Data inserted with record id {result.inserted_id}"