import pymongo
from pymongo import MongoClient

def FAQs_Fetch():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client['lemolite_bot']
    services = db['faqs']
    
    fields_to_fetch = {
    'Question': 1,
    'Answer': 1,
    'Category': 1,
    '_id': 0  # Exclude the _id field, set to 1 if you want to include it
    }

    # Fetch all documents from the 'services' collection
    cursor = services.find({}, fields_to_fetch)
    documents = list(cursor)
    return documents