
#pip install google-api-python-client
from googleapiclient.discovery import build
from google.oauth2 import service_account
import Global_Variables as GV
import io
from googleapiclient.http import MediaIoBaseUpload

SCOPES = GV.GDrive_SCOPES
SERVICE_ACCOUNT_FILE = GV.GDrive_SERVICE_ACCOUNT_FILE
PARENT_FOLDER_ID = GV.GDrive_PARENT_FOLDER_ID

def authentication():
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return creds

def upload_file(file_path,Name_of_file):
    creds = authentication()
    service = build('drive','v3',credentials= creds)

    file_metadata = {
        'name' : Name_of_file,
        'parents' : [PARENT_FOLDER_ID]
    }

    media = MediaIoBaseUpload(io.BytesIO(file_path), mimetype='application/octet-stream', resumable=True)
    
    file = service.files().create(
        body = file_metadata,
        media_body = media,
    ).execute()

    Link = f"https://drive.google.com/uc?id={file['id']}&export=download"

    return Link