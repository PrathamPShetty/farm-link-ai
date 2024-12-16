import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
import joblib  # For saving and loading the model

# Load the dataset
data = pd.read_csv("dataset/fertilizer_recommendation.csv")

print(data['Fertilizer Name'].unique())

# Label encoding for categorical features
le_soil = LabelEncoder()
data['Soil Type'] = le_soil.fit_transform(data['Soil Type'])
le_crop = LabelEncoder()
data['Crop Type'] = le_crop.fit_transform(data['Crop Type'])

# Splitting the data into input and output variables
X = data.iloc[:, :8]
y = data.iloc[:, -1]

# Training the Decision Tree Classifier model
dtc = DecisionTreeClassifier(random_state=0)
dtc.fit(X, y)

# Save the trained model using joblib
joblib.dump(dtc, 'fertilizer_recommendation_model.pkl')
joblib.dump(le_soil, 'soil_label_encoder.pkl')
joblib.dump(le_crop, 'crop_label_encoder.pkl')

# Define a function for predicting the fertilizer based on user input
def predict_fertilizer(jsont, jsonh, jsonsm, jsonsoil, jsoncrop, jsonn, jsonk, jsonp):
    # Label encode the soil and crop type input
    soil_enc = le_soil.transform([jsonsoil])[0]
    crop_enc = le_crop.transform([jsoncrop])[0]
    
    # Prepare the input for prediction
    user_input = [jsont, jsonh, jsonsm, soil_enc, crop_enc, jsonn, jsonk, jsonp]
    
    # Load the saved model
    model = joblib.load('./models/fertilizer_recommendation_model.pkl')
    
    # Make prediction
    fertilizer_name = model.predict([user_input])
    
    return fertilizer_name[0]  # Return the predicted fertilizer

# Example: Using the user-defined function to predict fertilizer
# Example user input (These values can be replaced as per requirement)
user_input = [26, 52, 38, 'Sandy', 'Maize', 37, 0, 0]  # Example user input
predicted_fertilizer = predict_fertilizer(*user_input)
print("Predicted Fertilizer:", predicted_fertilizer)
