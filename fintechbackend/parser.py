import os
import instructor
from pydantic import ValidationError
from google import genai
from dotenv import load_dotenv
from models import TransactionAI 

load_dotenv()

# Using the 2026 Stable Preview for Gemini 3
MODEL_NAME = "gemini-3-flash-preview" 

# Initialize the Instructor client
client = instructor.from_provider(
    f"google/{MODEL_NAME}", 
    api_key=os.getenv("GOOGLE_API_KEY")
)

def extract_transaction_info(sms_text: str) -> TransactionAI:
    """
    Takes raw SMS text and uses Gemini 3 to return a structured 
    TransactionAI object. Optimized for Indian Banking SMS patterns.
    """
    try:
        return client.chat.completions.create(
            model=MODEL_NAME, 
            response_model=TransactionAI,
            max_retries=2, # Increased retries for complex Indian SMS strings
            messages=[
                {
                    "role": "system", 
                    "content": (
                        "You are a specialized Indian Fintech Parser. "
                        "Identify if the transaction is a DEBIT (Spent) or CREDIT (Received). "
                        "Extract: Amount, Merchant (e.g., Zomato, Swiggy, Amazon), Bank (e.g., HDFC, ICICI, SBI), "
                        "and Category (Food, Travel, Bills, Shopping, Salary, Investment). "
                        "If the merchant is a person (UPI transfer), set is_personal_transfer to True."
                    )
                },
                {"role": "user", "content": f"SMS Text: {sms_text}"},
            ],
            validation_context={"sms": sms_text}
        )
    except Exception as e:
        # Professional Logging should happen here
        print(f"Parser Error: {e}")
        # Return a safe fallback object to prevent the Main Brain from crashing
        return TransactionAI(
            amount=0.0, 
            merchant="Unknown", 
            bank_name="Unknown", 
            category="Uncategorized",
            is_personal_transfer=False
        )