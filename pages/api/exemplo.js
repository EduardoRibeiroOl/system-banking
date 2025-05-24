import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('nome_do_banco'); // Substitua pelo seu banco

    switch (req.method) {
      case 'GET':
        const dados = await db.collection('exemplos').find({}).toArray();
        res.status(200).json(dados);
        break;
      
      case 'POST':
        const novoItem = req.body;
        const resultado = await db.collection('exemplos').insertOne(novoItem);
        res.status(201).json(resultado);
        break;
      
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}