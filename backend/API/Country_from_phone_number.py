import phonenumbers
from phonenumbers import geocoder

def detect_country(phone_number: str) -> str:
    try:
        # Parse the phone number
        parsed_number = phonenumbers.parse(phone_number, None)
        # Get the country name
        country = geocoder.description_for_number(parsed_number, "en")
        return country
    except phonenumbers.NumberParseException as e:
        return f"Error: {e}"

# Example usage
phone_number = "+8469346488"
country = detect_country(phone_number)
print(f"The country for phone number {phone_number} is: {country}")
