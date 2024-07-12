const sql = require('./db');

const Service = {};

Service.create = async (newService) => {
  try {
    const [result] = await sql.execute('INSERT INTO services (category_id, service_name, type) VALUES (?, ?, ?)', [newService.category_id, newService.service_name, newService.type]);
    return { id: result.insertId, ...newService };
  } catch (error) {
    throw new Error(`Could not create service: ${error.message}`);
  }
};

Service.getAll = async () => {
  try {
    const [rows] = await sql.execute('SELECT * FROM services');
    return rows;
  } catch (error) {
    throw new Error(`Could not fetch services: ${error.message}`);
  }
};

Service.findById = async (serviceId) => {
  try {
    const [rows] = await sql.execute('SELECT * FROM services WHERE id = ?', [serviceId]);
    if (rows.length) {
      return rows[0];
    }
    throw new Error('Service not found');
  } catch (error) {
    throw new Error(`Could not find service: ${error.message}`);
  }
};

Service.updateById = async (serviceId, serviceData) => {
  try {
    const [result] = await sql.execute('UPDATE services SET category_id = ?, service_name = ?, type = ? WHERE id = ?', [serviceData.category_id, serviceData.service_name, serviceData.type, serviceId]);
    if (result.affectedRows === 0) {
      throw new Error('Service not found');
    }
    return { id: serviceId, ...serviceData };
  } catch (error) {
    throw new Error(`Could not update service: ${error.message}`);
  }
};

Service.remove = async (serviceId) => {
  try {
    const [result] = await sql.execute('DELETE FROM services WHERE id = ?', [serviceId]);
    if (result.affectedRows === 0) {
      throw new Error('Service not found');
    }
    return { message: `Service deleted successfully` };
  } catch (error) {
    throw new Error(`Could not delete service: ${error.message}`);
  }
};

module.exports = Service;
