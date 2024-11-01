const db = require("../db");

class Employee extends db {

    async getEmployees() {
        const result = await this.query('SELECT * FROM employee ORDER BY id');
        return result.rows;
    }

    async createEmployee(first_name, last_name, roles_id, manager_id = null) {
        const result = await this.query(
            'INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [first_name, last_name, roles_id, manager_id]
        );
        return result.rows[0];
    }

    async updateEmployee(id, first_name, last_name, roles_id, manager_id = null) {
        const result = await this.query(
            'UPDATE employee SET first_name = $1, last_name = $2, roles_id = $3, manager_id = $4 WHERE id = $5 RETURNING *',
            [first_name, last_name, roles_id, manager_id, id]
        );
        return result.rows[0];
    }

    async deleteEmployee(id) {
        const result = await this.query(
            'DELETE FROM employee WHERE id = $1 RETURNING *',
            [id]
        );
        return result.rows[0];
    }
}

module.exports = Employee;