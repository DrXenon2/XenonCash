-- Ajouter la colonne niche aux products (si pas déjà présente)
ALTER TABLE products ADD COLUMN IF NOT EXISTS niche TEXT;

-- Ajouter les tables pour recommandations et chat
CREATE TABLE user_prefs (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_history (
    id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Ajouter les indexes
CREATE INDEX idx_affiliate_user ON affiliates(user_id);
CREATE INDEX idx_transaction_affiliate ON transactions(affiliate_id);
CREATE INDEX idx_withdrawal_user ON withdrawals(user_id);

-- Ajouter le trigger
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