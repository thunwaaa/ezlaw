import mysql from 'mysql2/promise';

// Create a connection pool outside of the handler function
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'css222',
  database: 'law_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const searchTerm = req.query.query;

    if (!searchTerm) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const query = `
      SELECT 
        s.id, 
        s.section_number, 
        s.section_type, 
        s.content, 
        sh.name AS section_name, 
        sh.level_name AS level_name,
        lt.name AS law_type, 
        sh.law_type_id AS law_type_id,
        s.hierarchy_id AS hierarchy_id,
        sh.parent_id AS parent_id
      FROM sections s
      JOIN sections_hierarchy sh ON s.hierarchy_id = sh.id
      JOIN law_type lt ON sh.law_type_id = lt.id
      WHERE 
        s.section_number LIKE ? OR 
        s.content LIKE ?
      ORDER BY s.section_order
      LIMIT 20
    `;

    try {
        const [results] = await pool.execute(query, [
            `%${searchTerm}%`,
            `%${searchTerm}%`
        ]);
      
        //   // If results found, prepare detailed navigation info
        //   const processedResults = results.map(result => ({
        //     ...result,
        //     navigationPath: [result.law_type_id, result.hierarchy_id, result.parent_id].filter(Boolean)
        //   }));

        const processedResults = results.map(result => ({
            id: result.id,
            law_type_id: result.law_type_id,
            hierarchy_id: result.hierarchy_id,
            parent_id: result.parent_id,
            law_type: result.law_type,
            section_number: result.section_number,
            content: result.content,
            section_name: result.section_name,
            level_name: result.level_name,
            // Construct navigation path if not already present
            navigationPath: result.navigationPath || 
            [result.law_type_id, result.hierarchy_id, result.parent_id].filter(Boolean)
        }));
      
        res.status(200).json(processedResults);
    } catch (error) {
        console.error('Error during the search query execution:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  } else {
        res.status(405).json({ error: 'Method Not Allowed' });
  }
}