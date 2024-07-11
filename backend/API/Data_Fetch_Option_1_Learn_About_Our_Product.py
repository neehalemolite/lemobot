import pymongo
from pymongo import MongoClient

def Data_Fetch_Option_1_Learn_About_Our_Product():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client['lemolite_bot']
    services = db['services']
    
    fields_to_fetch = {
    'Domain': 1,
    'Specifications': 1,
    'Description': 1,
    '_id': 0  # Exclude the _id field, set to 1 if you want to include it
    }

    # Fetch all documents from the 'services' collection
    cursor = services.find({}, fields_to_fetch)
    documents = list(cursor)
    return documents
# # Call the get_data function and store the returned cursor
# json_data = Data_Fetch_Option_1_Learn_About_Our_Product()
# print(type(json_data))
# print(json_data[0])
