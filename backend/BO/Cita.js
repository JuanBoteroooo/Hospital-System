class Cita {
  constructor(db) {
    this.db = db;
  }

  async Crear(params) {
    // Asegúrate de que los parámetros están siendo recibidos
    console.log('Parámetros recibidos en Crear:', params);
    
    if (!params) {
      throw new Error("Parámetros no proporcionados.");
    }

    const { appointmentDate, appointmentTime, personId, EmployerId } = params;

    try {
      const result = await this.db.exe('agendarCita', [appointmentDate, appointmentTime, personId, EmployerId]);
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
}

module.exports = Cita;
