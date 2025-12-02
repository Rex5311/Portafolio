import bcrypt from 'bcrypt';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('=================================');
console.log('  Password Hash Generator');
console.log('=================================\n');

rl.question('Ingresa la contraseña para hashear: ', async (password) => {
  if (!password || password.trim().length < 6) {
    console.log('\n❌ Error: La contraseña debe tener al menos 6 caracteres');
    rl.close();
    return;
  }

  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n✅ Hash generado exitosamente:\n');
    console.log('Hash:', hash);
    console.log('\n📋 SQL para insertar usuario admin:\n');
    console.log('----------------------------------------');
    console.log(`INSERT INTO usuarios (nombre, email, password, rol)`);
    console.log(`VALUES (`);
    console.log(`  'Juan Esteban Agudelo Carmona',`);
    console.log(`  'admin@juanagudelo.com',`);
    console.log(`  '${hash}',`);
    console.log(`  'admin'`);
    console.log(`);`);
    console.log('----------------------------------------\n');
    console.log('💡 Copia y ejecuta este SQL en tu base de datos Railway/PostgreSQL\n');
  } catch (error) {
    console.error('\n❌ Error al generar hash:', error.message);
  }
  
  rl.close();
});

rl.on('close', () => {
  process.exit(0);
});
