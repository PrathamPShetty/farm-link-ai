import pandas as pd
import numpy as np
import json
import sys
import joblib  # For saving and loading the model

# Read the dataset
dataset = pd.read_csv('dataset/Crop_recommendation.csv')
print(dataset['label'].unique())

# Divide the dataset into features and labels
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values

# Split the dataset into training and test sets
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

# Train the model using the Random Forest Classifier algorithm
from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
classifier.fit(X_train, y_train)

# Save the trained model using joblib
# joblib.dump(classifier, 'crop_recommendation_model.pkl')

# Get the predictions for the test set
predictions = classifier.predict(X_test)

# Calculate the accuracy score
from sklearn.metrics import accuracy_score
score = accuracy_score(y_test, predictions)
print(score, "Total Accuracy Score")


# # Define a function to make predictions based on user input
# def predict_crop(user_input):
#     # Load the saved model
#     model = joblib.load('./models/crop_recommendation_model.pkl')
    
#     # Ensure the user input is in the correct shape for prediction
#     user_input = np.array(user_input).reshape(1, -1)  # Reshaping for a single prediction
    
#     # Make prediction
#     prediction = model.predict(user_input)
    
#     return prediction[0]  # Return the predicted crop

# # Example: Using the user-defined function to predict crop
# # Here, the user_input will be an array of 7 values representing different features.
# user_input = [76,44,17,20.41,62.55,5.85,65.27]  # Example user input

# predicted_crop = predict_crop(user_input)
# print("Predicted Crop:", predicted_crop)
