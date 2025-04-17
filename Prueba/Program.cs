// See https://aka.ms/new-console-template for more information


using AccesoDatos.Models;
using AccesoDatos.Operaciones;

AlumnoDAO alumnoDAO = new AlumnoDAO();


Alumno alumno = new Alumno();

var asignaturas = alumnoDAO.AsignaturasAlumno(1);

foreach (var asignatura in asignaturas)
{
    Console.WriteLine(asignatura.ToString());
}


