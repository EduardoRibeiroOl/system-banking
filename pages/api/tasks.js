import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('teste'); // Substitua pelo nome do seu banco
  const collection = db.collection('tasks'); // Coleção para exemplos

  try {
    switch (req.method) {
      // CREATE (POST)  
      case 'POST':
  const newTask = {
    ...req.body,
    createdAt: new Date(),
    completed: false
  };
  const result = await collection.insertOne(newTask);
  
  // Modificação aqui: usar insertedId e spread operator
  res.status(201).json({ 
    success: true, 
    data: {
      _id: result.insertedId,
      ...newTask
    } 
  });
  break;

      // READ (GET)
      case 'GET':
        const tasks = await collection.find({}).sort({ createdAt: -1 }).toArray();
        res.status(200).json({ success: true, data: tasks });
        break;

      // UPDATE (PUT)
      case 'PUT':
        const { id, ...updateData } = req.body;
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        res.status(200).json({ success: true, data: updateResult });
        break;

      // DELETE
      case 'DELETE':
        const deleteResult = await collection.deleteOne({ 
          _id: new ObjectId(req.query.id) 
        });
        res.status(200).json({ success: true, data: deleteResult });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Server Error',
      details: error.message 
    });
  }
}