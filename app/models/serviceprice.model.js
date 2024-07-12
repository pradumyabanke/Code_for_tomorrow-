const sql = require('./db');

const ServicePriceOption = {};

ServicePriceOption.create = async (newPriceOption) => {
  try {
    const [result] = await sql.execute('INSERT INTO service_price_options (service_id, duration, price, type) VALUES (?, ?, ?, ?)', [newPriceOption.service_id, newPriceOption.duration, newPriceOption.price, newPriceOption.type]);
    return { id: result.insertId, ...newPriceOption };
  } catch (error) {
    throw new Error(`Could not create price option: ${error.message}`);
  }
};

ServicePriceOption.getAllByServiceId = async (serviceId) => {
  try {
    const [rows] = await sql.execute('SELECT * FROM service_price_options WHERE service_id = ?', [serviceId]);
    return rows;
  } catch (error) {
    throw new Error(`Could not fetch price options: ${error.message}`);
  }
};

ServicePriceOption.findById = async (priceOptionId) => {
  try {
    const [rows] = await sql.execute('SELECT * FROM service_price_options WHERE id = ?', [priceOptionId]);
    if (rows.length) {
      return rows[0];
    }
    throw new Error('Price option not found');
  } catch (error) {
    throw new Error(`Could not find price option: ${error.message}`);
  }
};

ServicePriceOption.updateById = async (priceOptionId, priceOptionData) => {
  try {
    const [result] = await sql.execute('UPDATE service_price_options SET service_id = ?, duration = ?, price = ?, type = ? WHERE id = ?', [priceOptionData.service_id, priceOptionData.duration, priceOptionData.price, priceOptionData.type, priceOptionId]);
    if (result.affectedRows === 0) {
      throw new Error('Price option not found');
    }
    return { id: priceOptionId, ...priceOptionData };
  } catch (error) {
    throw new Error(`Could not update price option: ${error.message}`);
  }
};

ServicePriceOption.remove = async (priceOptionId) => {
  try {
    const [result] = await sql.execute('DELETE FROM service_price_options WHERE id = ?', [priceOptionId]);
    if (result.affectedRows === 0) {
      throw new Error('Price option not found');
    }
    return { message: `Price option deleted successfully` };
  } catch (error) {
    throw new Error(`Could not delete price option: ${error.message}`);
  }
};

module.exports = ServicePriceOption;
