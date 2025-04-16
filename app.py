import os
import numpy as np
import pandas as pd
from flask_cors import CORS
import tensorflow as tf
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from tensorflow.keras.losses import MeanSquaredError
from io import BytesIO
app = Flask(__name__)
CORS(app)
custom_objects = {"mse": MeanSquaredError()}
image_model = load_model("house_price_model.h5",custom_objects=custom_objects)
text_model = load_model("house_price_text_model.h5",custom_objects=custom_objects)
df = pd.read_csv("houseinfo_updated.csv")
categorical_cols = ["mainroad", "guestroom", "basement", "hotwaterheating", 
                    "airconditioning", "prefarea", "furnishingstatus", "city"]
label_encoders = {}
for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le  
X_sample = df.drop(columns=["price"])
scaler_X = MinMaxScaler().fit(X_sample)
scaler_y = MinMaxScaler().fit(df[["price"]])
IMG_SIZE = (224, 224)
image_types = ["bathroom", "bedroom", "kitchen", "frontal"]
def predict_image_price(images):
    house_images = {}
    for img_type, img_file in zip(image_types, images):
        img = load_img(BytesIO(img_file.read()), target_size=IMG_SIZE)  
        img = img_to_array(img) / 255.0
        house_images[img_type] = np.expand_dims(img, axis=0)
    predicted_price = image_model.predict(house_images)
    return scaler_y.inverse_transform(predicted_price)[0][0]
def predict_text_price(features):
    features_df = pd.DataFrame([features], columns=X_sample.columns)
    features_scaled = scaler_X.transform(features_df)
    predicted_price = text_model.predict(features_scaled)
    return scaler_y.inverse_transform(predicted_price)[0][0]
@app.route("/predict/image", methods=["POST"])
def predict_image():
    files = request.files.getlist("images")
    if len(files) != 4:
        return jsonify({"error": "Upload exactly 4 images"}), 400
    predicted_price = predict_image_price(files)
    return jsonify({"predicted_price": float(predicted_price)})
@app.route("/predict/text", methods=["POST"])
def predict_text():
    data = request.json
    try:
        features = [label_encoders[col].transform([data[col]])[0] if col in categorical_cols else data[col] for col in X_sample.columns]
        predicted_price = predict_text_price(features)
        return jsonify({"predicted_price": float(predicted_price)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
if __name__ == "__main__":
    app.run(debug=True)
