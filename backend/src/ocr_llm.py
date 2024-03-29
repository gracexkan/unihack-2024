import google.generativeai as genai

import os

def process_llm(info):
    medical_info = """
        {}
    """.format(info)

    prompt = """
    1. Given the info:
    {}

    2. Summarise this info as:
    Medication name:
    Duration (number of days): Put -1 if it is not provided
    Dosage (mL): put -1 if it is not provided or if it is not taken in mL
    Dosage (mg): put -1 if it is not provided or if it is not taken in mg
    numPills (integer number of pills): put -1 if it is not provided or if it is not taken in pill form
    Frequency (dosage taken per day): Put 0 if it is "as needed", -1 if not provided
    Restrictions:
    Severity (low or high, will it cause severe health problems if the user does not take it at all):

    3. Format the response as a parseable json:
    medicationName (String), duration (int), frequency (int), mlDosage (int), mgDosage (int), numPills (int), restrictions (String[]), severity (String)

    4. Put fields as null if you can't find info on them. Do not put in comments. Only send back the json.
    """.format(medical_info)

    GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

    genai.configure(api_key=GOOGLE_API_KEY)

    model = genai.GenerativeModel('gemini-pro')   

    response = model.generate_content(prompt)

    print(response.text.strip("`").replace("json", ""))

    return response.text.strip("`").replace("json", "")