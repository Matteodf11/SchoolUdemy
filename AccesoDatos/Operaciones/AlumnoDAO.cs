using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccesoDatos.Context;
using AccesoDatos.Models;
using Microsoft.EntityFrameworkCore;

namespace AccesoDatos.Operaciones
{
    public class AlumnoDAO
    {
        public ManejoAlumnosDbContext context = new ManejoAlumnosDbContext();

        public List<Alumno> ObtenerAlumnos()
        {
            return context.Alumnos.ToList();
        }

        public Alumno AlumnoPorId(int id)
        {
            return context.Alumnos.FirstOrDefault(a => a.Id == id);
        }

        public bool EliminarAlumno(int id)
        {
            try
            {
                // Cargar el alumno junto con las calificaciones relacionadas
                var alumno = context.Alumnos
                    .Include(a => a.Matriculas)
                        .ThenInclude(m => m.Calificacions)
                    .FirstOrDefault(a => a.Id == id);

                if (alumno != null)
                {
                    // Eliminar las calificaciones relacionadas
                    foreach (var matricula in alumno.Matriculas)
                    {
                        context.Calificacions.RemoveRange(matricula.Calificacions);
                    }

                    // Eliminar las matrículas relacionadas
                    context.Matriculas.RemoveRange(alumno.Matriculas);

                    // Eliminar el alumno
                    context.Alumnos.Remove(alumno);

                    context.SaveChanges();
                    return true;
                }
                else
                {
                    Console.WriteLine("Alumno no encontrado.");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public bool insertarAlumno(string Dni, string nombre, string direccion, int edad, string email)
        {
            try
            {
                Alumno alumno = new Alumno();
                alumno.Dni = Dni;
                alumno.Nombre = nombre;
                alumno.Direccion = direccion;
                alumno.Edad = edad;
                alumno.Email = email;
                context.Alumnos.Add(alumno);
                context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool ActualizarAlumno(int id, string Dni, string nombre, string direccion, int edad, string email)
        {
            try
            {
                Alumno alumno = AlumnoPorId(id);
                if (alumno != null)
                {
                    alumno.Dni = Dni;
                    alumno.Nombre = nombre;
                    alumno.Direccion = direccion;
                    alumno.Edad = edad;
                    alumno.Email = email;
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

        public List<Asignatura> AsignaturasAlumno(int id)
        {
            try
            {
                Alumno alumno = AlumnoPorId(id);
                if (alumno != null)
                {
                    var asignaturas = context.Matriculas
                        .Where(m => m.AlumnoId == id)
                        .Select(m => m.Asignatura)
                        .ToList();
                    return asignaturas;
                }
                return new List<Asignatura>();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<Asignatura>();
            }

        }

        public List<AlumnoProfesor> AlumnosDeProfesor(string usuario)
        {
            var query = from a in context.Alumnos
                        join m in context.Matriculas on a.Id equals m.AlumnoId
                        join asig in context.Asignaturas on m.AsignaturaId equals asig.Id
                        where asig.Profesor == usuario
                        select new AlumnoProfesor
                        {
                            Id = a.Id,
                            Dni = a.Dni,
                            Nombre = a.Nombre,
                            Direccion = a.Direccion,
                            Edad = a.Edad,
                            Email = a.Email,
                            Asignatura = asig.Nombre,
                            MatriculaId = m.Id
                        };
            return query.ToList();

        }


        public bool insertarYMatricular(string dni, string nombre, string direccion, int edad, string email, int id_asig)
        {
            try
            {
                var alumno = seleccionarPorDNI(dni);
                if (alumno == null)
                {
                    insertarAlumno(dni, nombre, direccion, edad, email);
                    var insertado = seleccionarPorDNI(dni);
                    Matricula m = new Matricula();
                    m.AlumnoId = insertado.Id;
                    m.AsignaturaId = id_asig;
                    context.Matriculas.Add(m);
                    context.SaveChanges();
                    return true;
                }
                else
                {
                    // Verificar si el alumno ya está matriculado en la asignatura
                    var matriculaExistente = context.Matriculas
                        .FirstOrDefault(m => m.AlumnoId == alumno.Id && m.AsignaturaId == id_asig);
                    if (matriculaExistente == null)
                    {
                        Matricula m = new Matricula();
                        m.AlumnoId = alumno.Id;
                        m.AsignaturaId = id_asig;
                        context.Matriculas.Add(m);
                        context.SaveChanges();
                        return true;
                    }
                    else
                    {
                        return false; // El alumno ya está matriculado en esta asignatura
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }


        public Alumno seleccionarPorDNI(string dni)
        {
            return context.Alumnos.FirstOrDefault(a => a.Dni == dni);
        }
    }
}
