import google.generativeai as genai

import os

medical_info = """
      "indications_and_usage": [
        "1 INDICATIONS AND USAGE VIAGRA is indicated for the treatment of erectile dysfunction. VIAGRA is a phosphodiesterase-5 (PDE5) inhibitor indicated for the treatment of erectile dysfunction (ED) ( 1 )"
      ],
      "dosage_and_administration": [
        "2 DOSAGE AND ADMINISTRATION • For most patients, the recommended dose is 50 mg taken, as needed, approximately 1 hour before sexual activity. However, VIAGRA may be taken anywhere from 30 minutes to 4 hours before sexual activity ( 2.1 ) • Based on effectiveness and toleration, may increase to a maximum of 100 mg or decrease to 25 mg ( 2.1 ) • Maximum recommended dosing frequency is once per day ( 2.1 ) 2.1 Dosage Information For most patients, the recommended dose is 50 mg taken, as needed, approximately 1 hour before sexual activity. However, VIAGRA may be taken anywhere from 30 minutes to 4 hours before sexual activity. The maximum recommended dosing frequency is once per day. Based on effectiveness and toleration, the dose may be increased to a maximum recommended dose of 100 mg or decreased to 25 mg. 2.2 Use with Food VIAGRA may be taken with or without food. 2.3 Dosage Adjustments in Specific Situations VIAGRA was shown to potentiate the hypotensive effects of nitrates and its administration in patients who use nitric oxide donors such as organic nitrates or organic nitrites in any form is therefore contraindicated [ see Contraindications (4.1) , Drug Interactions (7.1) , and Clinical Pharmacology (12.2) ] . When VIAGRA is co-administered with an alpha-blocker, patients should be stable on alpha-blocker therapy prior to initiating VIAGRA treatment and VIAGRA should be initiated at 25 mg [ see Warnings and Precautions (5.5) , Drug Interactions (7.2) , and Clinical Pharmacology (12.2) ]. 2.4 Dosage Adjustments Due to Drug Interactions Ritonavir The recommended dose for ritonavir-treated patients is 25 mg prior to sexual activity and the recommended maximum dose is 25 mg within a 48 hour period because concomitant administration increased the blood levels of sildenafil by 11-fold [ see Warnings and Precautions (5.6) , Drug Interactions (7.4) , and Clinical Pharmacology (12.3) ]. CYP3A4 Inhibitors Consider a starting dose of 25 mg in patients treated with strong CYP3A4 inhibitors (e.g., ketoconazole, itraconazole, or saquinavir) or erythromycin. Clinical data have shown that co-administration with saquinavir or erythromycin increased plasma levels of sildenafil by about 3 fold [ see Drug Interactions (7.4) and Clinical Pharmacology (12.3) ]. 2.5 Dosage Adjustments in Special Populations Consider a starting dose of 25 mg in patients > 65 years, patients with hepatic impairment (e.g., cirrhosis), and patients with severe renal impairment (creatinine clearance <30 mL/minute) because administration of VIAGRA in these patients resulted in higher plasma levels of sildenafil [ see Use in Specific Populations (8.5 , 8.6 , 8.7) and Clinical Pharmacology (12.3) ] ."
      ],
"""

prompt = """
Given the info:
{}

Summarise this info as:export GOOGLE_API_KEY=
Medication name:
Duration (number of days): Put -1 if it is not provided
Dosage (mL): put -1 if it is not provided or if it is not taken in mL
Dosage (mg): put -1 if it is not provided or if it is not taken in mg
numPills (integer number of pills): put -1 if it is not provided or if it is not taken in pill form
Frequency (dosage taken per day): Put 0 if it is "as needed", -1 if not provided
Restrictions:
Severity (low or high, will it cause severe health problems if the user does not take it at all):

Format the response as a parseable json:
medicationName (String), duration (int), frequency (int), mlDosage (int), mgDosage (int), numPills (int), restrictions (String[]), severity (String)

Put fields as null if you can't find info on them. Do not put in comments. Only send back the json.
""".format(medical_info)

GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-pro')   

response = model.generate_content(prompt)

print(response.text)