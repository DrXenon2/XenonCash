-- Insérer un utilisateur de test
INSERT INTO users (username, email, phone, country) VALUES
('xenon', 'xenon@example.com', '+23712345678', 'Cameroun');

-- Insérer des produits de test
INSERT INTO products (name, description, commission_rate, price, niche) VALUES
('Guide Business Startup', 'eBook pour entrepreneurs', 30.00, 5000.00, 'business'),
('Cours Digital Marketing', 'Cours en ligne', 40.00, 10000.00, 'tech'),
('Formation Affiliate', 'Guide affilié débutant', 25.00, 3000.00, 'marketing');

-- Insérer un affilié pour l'utilisateur
INSERT INTO affiliates (user_id, referral_code) VALUES
((SELECT id FROM users WHERE username = 'xenon'), 'AFFXENON123');

-- Insérer des transactions de test
INSERT INTO transactions (affiliate_id, product_id, type, amount) VALUES
((SELECT id FROM affiliates WHERE referral_code = 'AFFXENON123'),
 (SELECT id FROM products WHERE name = 'Guide Business Startup'),
 'sale', 1500.00),
((SELECT id FROM affiliates WHERE referral_code = 'AFFXENON123'),
 (SELECT id FROM products WHERE name = 'Cours Digital Marketing'),
 'lead', 4000.00);

-- Insérer une préférence de test
INSERT INTO user_prefs (user_id, preferences) VALUES
((SELECT id FROM users WHERE username = 'xenon'), '{"niches": ["business", "tech"]}');

-- Insérer un historique de chat de test
INSERT INTO chat_history (user_id, message, response) VALUES
((SELECT id FROM users WHERE username = 'xenon'), 'How to promote?', 'Share your referral link on WhatsApp!');-