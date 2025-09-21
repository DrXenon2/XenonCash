// /scripts/seed-data.js - Script pour automatiser le seeding des données de test dans Supabase

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function executeSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf8');
  try {
    await pool.query(sql);
    console.log(`Seeding exécuté avec succès: ${filePath}`);
  } catch (err) {
    console.error(`Erreur lors du seeding de ${filePath}:`, err.message);
    throw err; // Arrête si erreur
  }
}

async function main() {
  try {
    const seedPath = path.join(__dirname, '../database/seed.sql');
    if (!fs.existsSync(seedPath)) {
      console.error('Fichier seed.sql non trouvé à:', seedPath);
      return;
    }
    await executeSqlFile(seedPath);
    console.log('Seeding terminé avec succès !');
  } catch (err) {
    console.error('Erreur globale lors du seeding:', err.message);
  } finally {
    await pool.end(); // Ferme la connexion proprement
  }
}

main();