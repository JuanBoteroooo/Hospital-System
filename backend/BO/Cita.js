class Cita {
  constructor(db) {
    this.db = db;
  }

  // Crear nueva cita
  async Crear(params) {
    console.log('Parámetros recibidos en Crear:', params);
    
    if (!params) {
      throw new Error("Parámetros no proporcionados.");
    }

    const { appointmentDate, appointmentTime, personId, EmployerId } = params;

    try {
      const result = await this.db.exe('crearCita', [appointmentDate, appointmentTime, personId, EmployerId]);
      if (result && result.rows.length > 0) {
        console.log('Cita agendada:', result.rows[0]);
        return { msg: "Cita agendada con éxito.", cita: result.rows[0] };
      } else {
        return { msg: "No se pudo agendar la cita." };
      }
    } catch (error) {
      console.error('Error agendando cita:', error);
      return { msg: "Error agendando la cita." };
    }
  }

  // Ver cita(s)
  async Ver(params) {
    console.log('Parámetros recibidos en Ver:', params);

    if (!params || !params.appointmentId) {
      throw new Error("ID de la cita no proporcionado.");
    }

    const {appointmentId} = params;

    try {
      const result = await this.db.exe('verCita', [appointmentId]);
      if (result && result.rows.length > 0) {
        console.log('Cita encontrada:', result.rows[0]);
        return { msg: "Cita encontrada.", cita: result.rows[0] };
      } else {
        return { msg: "No se encontró la cita." };
      }
    } catch (error) {
      console.error('Error buscando la cita:', error);
      return { msg: "Error buscando la cita." };
    }
  }

  // Modificar cita
  async Modificar(params) {
    console.log('Parámetros recibidos en Modificar:', params);

    if (!params || !params.appointmentId || !params.appointmentDate || !params.appointmentTime) {
      throw new Error("Parámetros no proporcionados para modificar la cita.");
    }

    const { appointmentId, appointmentDate, appointmentTime, personId, EmployerId } = params;

    try {
      const result = await this.db.exe('modificarCita', [appointmentId, appointmentDate, appointmentTime, personId, EmployerId]);
      if (result.rowCount > 0) {
        console.log('Cita modificada con éxito.');
        return { msg: "Cita modificada con éxito." };
      } else {
        return { msg: "No se pudo modificar la cita." };
      }
    } catch (error) {
      console.error('Error modificando la cita:', error);
      return { msg: "Error modificando la cita." };
    }
  }

  // Eliminar cita
  async Eliminar(params) {
    console.log('Parámetros recibidos en Eliminar:', params);

    if (!params || !params.appointmentId) {
      throw new Error("ID de la cita no proporcionado.");
    }

    try {
      const result = await this.db.exe('eliminarCita', [params.appointmentId]);
      if (result.rowCount > 0) {
        console.log('Cita eliminada con éxito.');
        return { msg: "Cita eliminada con éxito." };
      } else {
        return { msg: "No se pudo eliminar la cita." };
      }
    } catch (error) {
      console.error('Error eliminando la cita:', error);
      return { msg: "Error eliminando la cita." };
    }
  }
}

module.exports = Cita;
