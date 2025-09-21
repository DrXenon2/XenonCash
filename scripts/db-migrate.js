const { createClient } = require('@supabase/supabase-js');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Initialisation du client Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Fonction pour exécuter un fichier SQL
async function executeSqlFile(filePath) {
  try {
    const sql = await fs.readFile(filePath, 'utf8');
    const statements = sql.split(';').filter(s => s.trim()); // Sépare les statements
    for (const statement of statements) {
      await supabase.rpc('execute_raw_sql', { sql: statement }); // Utilise une RPC Supabase (à configurer)
    }
    console.log(`Exécuté avec succès: ${filePath}`);
  } catch (err) {
    console.error(`Erreur lors de l'exécution de ${filePath}:`, err.message);
    throw err; // Propager l'erreur pour gestion globale
  }
}

// Fonction pour exécuter toutes les migrations
async function runMigrations() {
  const migrationsDir = path.join(__dirname, '../database/migrations');
  const files = await fs.readdir(migrationsDir);
  const sortedFiles = files.sort((a, b) => {
    return parseInt(a.split('_')[0]) - parseInt(b.split('_')[0]); // Tri par numéro de migration
  });

  for (const file of sortedFiles) {
    const filePath = path.join(migrationsDir, file);
    await executeSqlFile(filePath);
  }
}

// Fonction principale
async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case 'schema':
        await executeSqlFile(path.join(__dirname, '../database/schema.sql'));
        break;
      case 'seed':
        await executeSqlFile(path.join(__dirname, '../database/seed.sql'));
        break;
      case 'migrations':
        await runMigrations();
        break;
      case 'all':
        await executeSqlFile(path.join(__dirname, '../database/schema.sql'));
        await runMigrations();
        await executeSqlFile(path.join(__dirname, '../database/seed.sql'));
        break;
      default:
        console.log('Usage: node db-migrate.js [schema | seed | migrations | all]');
        process.exit(1);
    }
    console.log('Migration terminée avec succès !');
  } catch (err) {
    console.error('Échec de la migration:', err.message);
    process.exit(1);
  } finally {
    // Fermeture propre (optionnel avec Supabase JS)
    // Pas de pool.end() ici, Supabase gère les connexions
  }
}

// Exécuter le script
main();