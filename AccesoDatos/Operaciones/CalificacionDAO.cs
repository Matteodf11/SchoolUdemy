using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccesoDatos.Context;
using AccesoDatos.Models;

namespace AccesoDatos.Operaciones
{
    public class CalificacionDAO
    {
        ManejoAlumnosDbContext context = new ManejoAlumnosDbContext();

        public List<Calificacion> CalificacionesPorAlumno(int idMatricula)
        {
            try
            {
                var calificaciones = context.Calificacions.Where(c => c.MatriculaId == idMatricula).ToList();
                return calificaciones;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public bool CrearCalificacion(Calificacion calificacion)
        {
            try
            {
                context.Calificacions.Add(calificacion);
                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool EliminarCalificacion(int id)
        {
            try
            {
                var calificacion = context.Calificacions.FirstOrDefault(c => c.Id == id);
                if (calificacion != null)
                {
                    context.Calificacions.Remove(calificacion);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }


    }
}
