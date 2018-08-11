using System;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace DAL
{
    public class BaseDAL
    {
        IConfiguration _configuration;

        public BaseDAL(IConfiguration config)
        {
            this._configuration = config;
        }

        private string ConnectionString
        {
            get
            {
                return Convert.ToString(_configuration.GetConnectionString("DefaultConnection"));
            }
        }

        private SqlConnection mConnection;

        private SqlConnection Connection
        {
            get
            {
                if (mConnection == null)
                    mConnection = GetConnection(ConnectionString);
                return mConnection;
            }

        }

        private SqlConnection GetConnection(string connStr)
        {
            return new SqlConnection(connStr);
        }

        private void CloseConnection(SqlConnection conn)
        {
            if (conn.State != System.Data.ConnectionState.Closed)
                conn.Close();
        }

        private void OpenConnection(SqlConnection conn)
        {
            if (conn.State != System.Data.ConnectionState.Open)
                conn.Open();
        }

        public int ExecuteNonQuery(SqlCommand cmd)
        {
            return Execute<int>(cmd, delegate ()
            {
                return cmd.ExecuteNonQuery();
            });
        }

        public object ExecuteScalar(SqlCommand cmd)
        {
            return Execute<object>(cmd, delegate ()
            {
                return cmd.ExecuteScalar();
            });
        }

        public void ExecuteDataReader(SqlCommand cmd, Action<SqlDataReader> action)
        {
            if (cmd.Connection != null)
                throw new ArgumentException("Command must have null Connection property");

            cmd.Connection = GetConnection(this.ConnectionString);
            try
            {
                OpenConnection(cmd.Connection);
                using (cmd)
                {
                    action(cmd.ExecuteReader(CommandBehavior.CloseConnection));
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConnection(cmd.Connection);
                cmd.Connection.Dispose();
                cmd.Dispose();
            }
        }

        private T Execute<T>(SqlCommand cmd, Func<T> execute)
        {
            try
            {
                OpenConnection(Connection);
                using (cmd)
                {
                    return execute();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                CloseConnection(Connection);
            }
        }

        public SqlCommand NewCommand(string sqlText, CommandType type)
        {
            SqlCommand cmd = new SqlCommand(sqlText, this.Connection);
            cmd.CommandType = type;
            return cmd;
        }

        public SqlParameter GetParam(string name, SqlDbType type, object value)
        {
            SqlParameter param = new SqlParameter(name, value);
            param.SqlDbType = type;

            return param;
        }

        public SqlParameter GetParamOut(string name, SqlDbType type)
        {
            SqlParameter param = new SqlParameter(name, type);
            param.Direction = ParameterDirection.Output;

            return param;
        }
    }
}
