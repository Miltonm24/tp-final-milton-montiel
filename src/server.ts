import app from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
