# /storage/emulated/0/Documents/XenonCash/XenonCash/ml/scripts/preprocess.py
import pandas as pd

# Charger les données
earnings_data = pd.read_csv('../data/earnings_data.csv')

# Calculer EPC et ROI
earnings_data['epc'] = earnings_data['amount'] / earnings_data['clicks']
earnings_data['roi'] = (earnings_data['amount'] - 100) / 100 * 100  # Exemple simplifié

# Sauvegarder les données traitées
earnings_data.to_csv('../data/processed/processed_earnings.csv', index=False)
print("Prétraitement terminé !")