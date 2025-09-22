# /storage/emulated/0/Documents/XenonCash/XenonCash/ml/scripts/train_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Charger les données
data = pd.read_csv('../data/processed/processed_earnings.csv')
X = data[['clicks', 'conversions']]
y = data['total_earnings']

# Diviser les données
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entraîner le modèle
model = LinearRegression()
model.fit(X_train, y_train)

# Sauvegarder le modèle
joblib.dump(model, '../models/earnings_model.h5')
print("Modèle entraîné et sauvegardé !")