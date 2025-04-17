using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AccesoDatos.Context;
using AccesoDatos.Models;
using AccesoDatos.Operaciones;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnosController : ControllerBase
    {
       
        private AlumnoDAO alumnoDAO = new AlumnoDAO();

        [HttpGet("alumnosProfesor")]
        public List<AlumnoProfesor> GetAlumnosProfesor(string usuario)
        {
            var result = alumnoDAO.AlumnosDeProfesor(usuario);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        [HttpGet("datosAlumno")]
        public Alumno GetDatosAlumno(int id)
        {
            var result = alumnoDAO.AlumnoPorId(id);
            if (result == null)
            {
                return null;
            }
            return result;
        }

        [HttpPut("editarAlumno")]
       public bool editarAlumno([FromBody] Alumno alumno)
        {
            try
            {
                if (alumno == null)
                {
                    return false;
                }
                return alumnoDAO.ActualizarAlumno(alumno.Id, alumno.Dni, alumno.Nombre, alumno.Direccion, alumno.Edad, alumno.Email);
               
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        [HttpPost("crearAlumno")]
        public bool crearAlumno([FromBody] Alumno alumno, int id_asig)
        {
            return alumnoDAO.insertarYMatricular(alumno.Dni, alumno.Nombre, alumno.Direccion, alumno.Edad, alumno.Email, id_asig);
        }

        [HttpDelete("eliminarAlumno")]
        public bool eliminarAlumno(int id)
        {
            return alumnoDAO.EliminarAlumno(id);
        }
    }
}
