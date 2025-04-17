using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccesoDatos.Context;
using AccesoDatos.Models;

namespace AccesoDatos.Operaciones
{
    public class ProfesorDAO
    {
        public ManejoAlumnosDbContext context = new ManejoAlumnosDbContext();
        public bool Login(string usuario, string pass)
        {
            try
            {
                return context.Profesors.Any(p => p.Usuario == usuario && p.Pass == pass);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}
