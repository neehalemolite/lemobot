import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import Global_Variables as GV

def send_email(sender_email, sender_password, recipient_email, subject, body):
    # Set up the SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587

    # Create the email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject

    # Attach the email body
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Connect to the SMTP server and start TLS for security
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()

        # Log in to the server
        server.login(sender_email, sender_password)

        # Send the email
        server.send_message(msg)

        # Close the connection
        server.quit()

        print(f"Lemolite Email sent successfully!: {recipient_email}")

    except Exception as e:
        print(f"Failed to send Lemolite email: {e}")

# Example usage



def Mail_Sending_Lemolite(body):
    body = f"""
We receive new project request from the lemolite bot

{ body }

Don't forget to call !!
Have a good day !

This is an autogenerated mail if any query related to this mail please contact to {GV.Mail_issue_support}
            """
    send_email(GV.sender_email, GV.sender_password, GV.recipient_email, GV.subject_for_mail, body)