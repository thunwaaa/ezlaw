import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const { lawTypeId } = req.query;

  if (!lawTypeId) {
    return res.status(400).json({ error: 'lawTypeId is required' });
  }

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'css222',
      database: 'law_db',
    });

    const [rows] = await connection.execute(`
      SELECT 
          lh.id AS hierarchy_id,
          lh.name AS hierarchy_name,
          lh.level_name,
          lh.parent_id,
          lh.order_index,
          s.id AS section_id,
          s.section_number,
          s.section_type,
          s.section_order,
          s.content
      FROM 
          sections_hierarchy lh
      LEFT JOIN 
          sections s 
      ON 
          lh.id = s.hierarchy_id
      WHERE 
          lh.law_type_id = ?
      ORDER BY 
          lh.order_index ASC, s.section_order ASC;
    `, [lawTypeId]);

    const hierarchyMap = {};
    rows.forEach(row => {
      if (!hierarchyMap[row.hierarchy_id]) {
        hierarchyMap[row.hierarchy_id] = {
          id: row.hierarchy_id,
          name: row.hierarchy_name,
          level_name: row.level_name,
          parent_id: row.parent_id,
          order_index: row.order_index,
          children: [],
          sections: [],
        };
      }
      if (row.section_id) {
        hierarchyMap[row.hierarchy_id].sections.push({
          section_number: row.section_number,
          section_type: row.section_type,
          content: row.content,
        });
      }
    });

    const result = [];
    Object.values(hierarchyMap).forEach(item => {
      if (item.parent_id === null) {
        result.push(item);
      } else {
        hierarchyMap[item.parent_id]?.children.push(item);
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
