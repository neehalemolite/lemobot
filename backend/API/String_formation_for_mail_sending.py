def String_formation_for_mail_sending(Domain, Name, EmailID, Contact, prefer_Mode_of_Contact, Project_Domain, Project_Description, uploadfile):
    data = {
        "Domain": Domain,
        "Name": Name,
        "Email_ID": EmailID,
        "Contact_Number": Contact,
        "Preferred_Mode_of_Contact": prefer_Mode_of_Contact,
        "Project_Domain": Project_Domain,
        "Project_Description": Project_Description,
        "Uploaded_file": uploadfile,
    }
    
    formatted_string = (
        f"Domain: {data['Domain']}\n"
        f"Name: {data['Name']}\n"
        f"Email ID: {data['Email_ID']}\n"
        f"Contact Number: {data['Contact_Number']}\n"
        f"Preferred Mode of Contact: {data['Preferred_Mode_of_Contact']}\n"
        f"Project Domain: {data['Project_Domain']}\n"
        f"Project Description: {data['Project_Description']}\n"
        f"Uploaded_file: {data['Uploaded_file']}\n"
    )
    
    return formatted_string


# # Example usage
# Domain = "example.com"
# Name = "John Doe"
# EmailID = "john.doe@example.com"
# Contact = "123-456-7890"
# prefer_Mode_of_Contact = "Email"
# Project_Domain = "Web Development"
# Project_Description = "Building a new company website."

# formatted_string = String_formation_for_mail_sending(Domain, Name, EmailID, Contact, prefer_Mode_of_Contact, Project_Domain, Project_Description)
# print(formatted_string)
