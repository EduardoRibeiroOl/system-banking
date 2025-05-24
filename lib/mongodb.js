import { MongoClient, ServerApiVersion } from 'mongodb'; // Adicione ServerApiVersion aqui

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1, // Agora reconhecido
    strict: true,
    deprecationErrors: true,
  }
};

// Restante do código permanece igual...

let client;
let clientPromise;

if (!uri) {
  throw new Error('Adicione sua MONGODB_URI no .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // Em desenvolvimento, reutilize a conexão global
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Em produção, crie uma nova conexão
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;