const sql = require('./db'); // Assuming db.js exports the MySQL connection pool

const Category = {};

Category.create = async (newCategory) => {
  try {
    const [result] = await sql.execute('INSERT INTO categories (category_name) VALUES (?)', [newCategory.category_name]);
    return { id: result.insertId, ...newCategory };
  } catch (error) {
    throw new Error(`Could not create category: ${error.message}`);
  }
};

Category.getAll = async () => {
  try {
    const [rows] = await sql.execute('SELECT * FROM categories');
    return rows;
  } catch (error) {
    throw new Error(`Could not fetch categories: ${error.message}`);
  }
};

Category.findById = async (categoryId) => {
  try {
    const [rows] = await sql.execute('SELECT * FROM categories WHERE id = ?', [categoryId]);
    if (rows.length) {
      return rows[0];
    }
    throw new Error('Category not found');
  } catch (error) {
    throw new Error(`Could not find category: ${error.message}`);
  }
};

Category.updateById = async (categoryId, categoryData) => {
  try {
    const [result] = await sql.execute('UPDATE categories SET category_name = ? WHERE id = ?', [categoryData.category_name, categoryId]);
    if (result.affectedRows === 0) {
      throw new Error('Category not found');
    }
    return { id: categoryId, ...categoryData };
  } catch (error) {
    throw new Error(`Could not update category: ${error.message}`);
  }
};

Category.remove = async (categoryId) => {
  try {
    const [result] = await sql.execute('DELETE FROM categories WHERE id = ?', [categoryId]);
    if (result.affectedRows === 0) {
      throw new Error('Category not found');
    }
    return { message: `Category deleted successfully` };
  } catch (error) {
    throw new Error(`Could not delete category: ${error.message}`);
  }
};

module.exports = Category;
