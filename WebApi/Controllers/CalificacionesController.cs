using AccesoDatos.Models;
using AccesoDatos.Operaciones;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalificacionesController : ControllerBase
    {
        private CalificacionDAO calificacionDAO = new CalificacionDAO();

        [HttpGet("calificacionesAlumno")]
        public List<Calificacion> GetCalificacionesAlumno(int idMatricula)
        {
            var result = calificacionDAO.CalificacionesPorAlumno(idMatricula);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        [HttpPost("crearCalificacion")]
        public bool CrearCalificacion([FromBody] Calificacion calificacion)
        {
            try
            {
                if (calificacion == null)
                {
                    return false;
                }
                bool result = calificacionDAO.CrearCalificacion(calificacion);
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        [HttpDelete("eliminarCalificacion")]
        public bool EliminarCalificacion(int id)
        {
            try
            {
                var calificacion = calificacionDAO.EliminarCalificacion(id);
                if (calificacion == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
