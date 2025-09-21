-- Table des utilisateurs
CREATE TABLE users (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(), -- Supabase utilise UUID
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    country VARCHAR(50) NOT NULL,
    currency VARCHAR(3) DEFAULT 'XOF',
    balance DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des produits
CREATE TABLE products (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    commission_rate DECIMAL(5,2) NOT NULL,
    price DECIMAL(10,2),
    niche TEXT, -- Pour recommandations
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des affiliés
CREATE TABLE affiliates (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    ref_parent_id UUID REFERENCES affiliates(id),
    total_referrals INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des transactions
CREATE TABLE transactions (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    affiliate_id UUID REFERENCES affiliates(id),
    product_id UUID REFERENCES products(id),
    type VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des retraits
CREATE TABLE withdrawals (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des préférences utilisateur (pour recommandations)
CREATE TABLE user_prefs (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table de l'historique du chat
CREATE TABLE chat_history (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes pour optimiser les requêtes
CREATE INDEX idx_affiliate_user ON affiliates(user_id);
CREATE INDEX idx_transaction_affiliate ON transactions(affiliate_id);
CREATE INDEX idx_withdrawal_user ON withdrawals(user_id);

-- Trigger pour mettre à jour le solde après approbation
CREATE OR REPLACE FUNCTION update_balance() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'approved' THEN
        UPDATE users SET balance = balance + NEW.amount WHERE id = (SELECT user_id FROM affiliates WHERE id = NEW.affiliate_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trig_update_balance AFTER UPDATE ON transactions
FOR EACH ROW EXECUTE FUNCTION update_balance();