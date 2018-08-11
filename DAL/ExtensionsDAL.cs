using System;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public static class Extensions
    {

        public static T GetCastValue<T>(this BaseDAL dal, object obj)
        {
            if (obj is DBNull)
                return default(T);

            return (T)obj;
        }

        public static Guid? GetNulableGuid(this BaseDAL dal, object obj)
        {
            if (obj is DBNull)
                return null;

            return (Guid)obj;
        }

        public static string GetString(this BaseDAL dal, object obj)
        {
            if (obj is DBNull)
                return string.Empty;

            return Convert.ToString(obj);
        }
    }
}