import requests
from flask import Flask, request, jsonify
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
from flask import Flask, request, jsonify
import torch
from torchvision import transforms
from PIL import Image
from flask_cors import CORS
app = Flask(__name__)
CORS(app)



# Define or import the custom model class
class ResNet9(torch.nn.Module):
    def __init__(self, in_channels, num_diseases):
        super().__init__()
        
        self.conv1 = ConvBlock(in_channels, 64)
        self.conv2 = ConvBlock(64, 128, pool=True) # out_dim : 128 x 64 x 64 
        self.res1 = nn.Sequential(ConvBlock(128, 128), ConvBlock(128, 128))
        
        self.conv3 = ConvBlock(128, 256, pool=True) # out_dim : 256 x 16 x 16
        self.conv4 = ConvBlock(256, 512, pool=True) # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(ConvBlock(512, 512), ConvBlock(512, 512))
        
        self.classifier = nn.Sequential(nn.MaxPool2d(4),
                                       nn.Flatten(),
                                       nn.Linear(512, num_diseases))
        
    def forward(self, xb): # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out       

# Load the model (ensure the custom class is available)
model = torch.load('models/plant-disease-model-complete.pth', map_location=torch.device('cpu'))
model.eval()

# Define the image transformations (must match training)
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor()
])

# Load class names (replace with your actual class names)
class_names = ['Apple___Apple_scab',
 'Apple___Black_rot',
 'Apple___Cedar_apple_rust',
 'Apple___healthy',
 'Blueberry___healthy',
 'Cherry_(including_sour)___Powdery_mildew',
 'Cherry_(including_sour)___healthy',
 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
 'Corn_(maize)___Common_rust_',
 'Corn_(maize)___Northern_Leaf_Blight',
 'Corn_(maize)___healthy',
 'Grape___Black_rot',
 'Grape___Esca_(Black_Measles)',
 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
 'Grape___healthy',
 'Orange___Haunglongbing_(Citrus_greening)',
 'Peach___Bacterial_spot',
 'Peach___healthy',
 'Pepper,_bell___Bacterial_spot',
 'Pepper,_bell___healthy',
 'Potato___Early_blight',
 'Potato___Late_blight',
 'Potato___healthy',
 'Raspberry___healthy',
 'Soybean___healthy',
 'Squash___Powdery_mildew',
 'Strawberry___Leaf_scorch',
 'Strawberry___healthy',
 'Tomato___Bacterial_spot',
 'Tomato___Early_blight',
 'Tomato___Late_blight',
 'Tomato___Leaf_Mold',
 'Tomato___Septoria_leaf_spot',
 'Tomato___Spider_mites Two-spotted_spider_mite',
 'Tomato___Target_Spot',
 'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
 'Tomato___Tomato_mosaic_virus',
 'Tomato___healthy']




pesticide_recommendations = {
    'Apple___Apple_scab': 'Mancozeb or Captan',
    'Apple___Black_rot': 'Thiophanate-methyl or Captan',
    'Apple___Cedar_apple_rust': 'Myclobutanil or Propiconazole',
    'Cherry_(including_sour)___Powdery_mildew': 'Sulfur or Myclobutanil',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot': 'Azoxystrobin or Propiconazole',
    'Corn_(maize)___Common_rust_': 'Mancozeb or Chlorothalonil',
    'Corn_(maize)___Northern_Leaf_Blight': 'Mancozeb or Azoxystrobin',
    'Grape___Black_rot': 'Mancozeb or Captan',
    'Orange___Haunglongbing_(Citrus_greening)': 'No effective pesticide; manage psyllids using Imidacloprid',
    'Peach___Bacterial_spot': 'Copper-based sprays or Oxytetracycline',
    'Potato___Early_blight': 'Chlorothalonil or Mancozeb',
    'Potato___Late_blight': 'Metalaxyl or Mancozeb',
    'Squash___Powdery_mildew': 'Sulfur or Potassium bicarbonate',
    'Tomato___Bacterial_spot': 'Copper-based sprays or Streptomycin',
    'Tomato___Early_blight': 'Chlorothalonil or Mancozeb',
    'Tomato___Late_blight': 'Metalaxyl or Mancozeb',
    'Tomato___Leaf_Mold': 'Chlorothalonil or Mancozeb',
    'Tomato___Septoria_leaf_spot': 'Chlorothalonil or Mancozeb',
    'Tomato___Spider_mites Two-spotted_spider_mite': 'Abamectin or Bifenazate',
    'Tomato___Target_Spot': 'Chlorothalonil or Mancozeb',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus': 'No pesticide; manage whiteflies using Imidacloprid',
    'Tomato___Tomato_mosaic_virus': 'No pesticide; sanitize tools and remove infected plants',
}


# Load the models and label encoders
crop_model = joblib.load('./models/crop_recommendation_model.pkl')
fertilizer_model = joblib.load('./models/fertilizer_recommendation_model.pkl')
le_soil = joblib.load('./models/soil_label_encoder.pkl')
le_crop = joblib.load('./models/crop_label_encoder.pkl')

# Predefined growing tips for different crops
growing_tips_dict = {
    'rice': "Rice requires warm and humid conditions, and it thrives in flooded fields. It needs abundant water, and the soil must be rich in organic matter. Planting should be done in paddies or flooded fields for optimum growth.",
    'maize': "Maize needs well-drained soil, plenty of sunlight, and regular watering. It is best planted in rows with adequate space between them for proper growth. Maize is sensitive to frost and should be planted after the last frost.",
    'chickpea': "Chickpea grows well in dry climates with moderate temperatures. It needs well-drained soil and minimal watering once the plant has matured. Avoid heavy rainfall during the harvesting season to prevent spoilage.",
    'kidneybeans': "Kidney beans prefer well-drained soil and moderate temperatures. They need plenty of sunlight and should be watered moderately. Avoid waterlogging, and ensure good spacing between plants for proper growth.",
    'pigeonpeas': "Pigeonpeas are drought-resistant and thrive in warm climates. They grow well in well-drained soil, and once established, they require minimal irrigation. They are commonly grown in tropical and subtropical regions.",
    'mothbeans': "Moth beans grow best in dry, arid regions with well-drained soil. These plants are drought-resistant and need minimal water. They should be sown in rows with adequate spacing for proper growth.",
    'mungbean': "Mung beans thrive in warm climates with well-drained soil. They need moderate watering and plenty of sunlight. They are sensitive to frost and should be planted after the last frost.",
    'blackgram': "Blackgram grows well in well-drained soil with moderate rainfall. It requires plenty of sunlight and moderate watering. The plant is sensitive to waterlogging, so avoid excess water during growth.",
    'lentil': "Lentils grow best in cool climates with well-drained soil. They require minimal irrigation, as they are drought-resistant once established. Lentils should be planted in early spring before the hot summer weather sets in.",
    'pomegranate': "Pomegranate thrives in hot, arid climates with well-drained soil. It needs plenty of sunlight and moderate watering. Pomegranates are sensitive to frost, so they should be planted in frost-free regions.",
    'banana': "Bananas require warm temperatures and plenty of rainfall. They grow well in loamy soil with good drainage. Bananas should be watered regularly, but the soil must not become waterlogged.",
    'mango': "Mango trees thrive in tropical and subtropical climates. They require well-drained, sandy soil and full sunlight. Mango trees are drought-resistant once established but benefit from regular watering during fruiting.",
    'grapes': "Grapes grow well in warm climates with well-drained soil. They require plenty of sunlight, and moderate watering is necessary. Grapevines should be pruned regularly for proper growth and yield.",
    'watermelon': "Watermelon grows best in warm climates with sandy, well-drained soil. It requires plenty of sunlight and regular watering, especially during the fruiting stage. Watermelon plants should be spaced properly for optimal growth.",
    'muskmelon': "Muskmelons require warm temperatures and plenty of sunlight. They grow well in loamy, well-drained soil with regular watering. Muskmelons should be spaced adequately to avoid overcrowding.",
    'apple': "Apple trees thrive in cool, temperate climates with well-drained soil. They require full sunlight and regular watering. Apples should be pruned regularly to maintain tree health and improve fruit yield.",
    'orange': "Orange trees grow best in warm, subtropical climates. They need well-drained, slightly acidic soil and plenty of sunlight. Regular watering is necessary, especially during dry periods, but they do not tolerate waterlogged conditions.",
    'papaya': "Papayas grow best in tropical and subtropical climates with well-drained soil. They require full sunlight and regular watering. Papaya plants should be spaced well apart for proper growth.",
    'coconut': "Coconut trees thrive in tropical climates with plenty of rainfall and well-drained, sandy soil. They require full sunlight and can tolerate saltwater, making them ideal for coastal regions.",
    'cotton': "Cotton requires a hot climate with well-drained soil. It needs plenty of sunlight and moderate watering. Cotton plants should be spaced well apart for optimal growth and air circulation.",
    'jute': "Jute thrives in warm, humid climates with heavy rainfall. It grows well in fertile, water-retentive soil. Jute requires plenty of water and should be grown in well-irrigated fields during the rainy season.",
    'coffee': "Coffee grows best in tropical climates with moderate temperatures and well-drained soil. It requires plenty of rainfall and is sensitive to direct sunlight, so it grows best in shaded areas with some protection from the sun."
}




water_requirements_dict = {
    'Urea': "Urea-based fertilizers require moderate watering. Watering should be done in the early morning or late afternoon to ensure the fertilizer is properly absorbed into the soil. It is important to avoid excessive watering to prevent nutrient leaching.",
    'DAP': "Diammonium phosphate (DAP) requires consistent watering, especially during the application. It should be watered in well to help dissolve the nutrients, but excessive water should be avoided to prevent nutrient runoff.",
    '14-35-14': "This balanced fertilizer requires moderate watering. It should be watered in well after application to ensure the nutrients are absorbed by the plant roots. Adequate moisture is crucial for effective nutrient uptake.",
    '28-28': "The 28-28 fertilizer needs moderate watering, with special attention during application. It is best applied when the soil is moist, followed by watering to help dissolve and evenly distribute the nutrients.",
    '17-17-17': "The 17-17-17 balanced fertilizer should be watered in well after application to enhance nutrient absorption. Regular, moderate watering throughout the plant's growth period is essential to prevent nutrient imbalances.",
    '20-20': "Fertilizers with a 20-20 ratio require moderate watering. Apply and water it in thoroughly, ensuring that the soil retains moisture for effective nutrient uptake but avoid overwatering as it can cause leaching.",
    '10-26-26': "This high-phosphorus fertilizer requires moderate watering. It is important to ensure the fertilizer is watered in properly, especially during dry conditions, to aid in nutrient absorption by the plant roots."
}

# Function to make predictions for crop recommendation
def predict_crop(user_input):
    user_input = np.array(user_input).reshape(1, -1)  # Reshape for a single prediction
    prediction = crop_model.predict(user_input)
    return prediction[0]

# Function to make predictions for fertilizer recommendation
def predict_fertilizer(jsont, jsonh, jsonsm, jsonsoil, jsoncrop, jsonn, jsonk, jsonp):
    soil_enc = le_soil.transform([jsonsoil])[0]
    crop_enc = le_crop.transform([jsoncrop])[0]
    
    user_input = [jsont, jsonh, jsonsm, soil_enc, crop_enc, jsonn, jsonk, jsonp]
    fertilizer_name = fertilizer_model.predict([user_input])
    return fertilizer_name[0]

# Function to get growing tips (using predefined dictionary)
def get_growing_tips(crop_name):
    # Fetch the growing tips from the dictionary
    return growing_tips_dict.get(crop_name, "No growing tips available for this crop.")



# Function to get water requirements for fertilizers
def get_water_requirements(fertilizer_name):
    return water_requirements_dict.get(fertilizer_name, "No water requirement information available for this fertilizer.")

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No selected image'}), 400

    try:
        img = Image.open(image_file)
        img_tensor = transform(img).unsqueeze(0)

        with torch.no_grad():
            output = model(img_tensor)
            _, predicted_idx = torch.max(output, 1)

        predicted_class = class_names[predicted_idx.item()]
        pesticide = pesticide_recommendations.get(predicted_class, 'No recommendation available')
        return jsonify({'success':True,'prediction': predicted_class,'pesticide_recommendation': pesticide})

    except Exception as e:
        return jsonify({'error': str(e)}), 500






# Define a route for crop recommendation prediction
@app.route('/predict_crop', methods=['POST'])
def get_crop_recommendation():
    try:
        data = request.get_json()
        user_input = data['features']  # expecting 'features' as a list of input values

        # Validate user input
        if len(user_input) != 7:
            return jsonify({'error': 'Invalid number of features. Expected 7 input values.'}), 400
        
        predicted_crop = predict_crop(user_input)
        growing_tips = get_growing_tips(predicted_crop)  # Get growing tips for the predicted crop
        success=True
        return jsonify({'success':True,'predicted_crop': predicted_crop, 'growing_tips': growing_tips})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Define a route for fertilizer recommendation prediction
@app.route('/predict_fertilizer', methods=['POST'])
def get_fertilizer_recommendation():
    try:
        data = request.get_json()
        user_input = data['features']  # expecting 'features' as a list of input values
        
        # Validate user input
        if len(user_input) != 8:
            return jsonify({'error': 'Invalid number of features. Expected 8 input values.'}), 400
        
        jsont, jsonh, jsonsm, jsonsoil, jsoncrop, jsonn, jsonk, jsonp = user_input
        predicted_fertilizer = predict_fertilizer(jsont, jsonh, jsonsm, jsonsoil, jsoncrop, jsonn, jsonk, jsonp)

        water_requirements = get_water_requirements(predicted_fertilizer)  # Get water requirements for the predicted fertilizer
        return jsonify({'success':True,'predicted_fertilizer': predicted_fertilizer, 'water_requirements': water_requirements})

     

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Home route for testing the API
@app.route('/')
def home():
    return "Crop and Fertilizer Recommendation API is working!"

if __name__ == "__main__":
    app.run(debug=True)
