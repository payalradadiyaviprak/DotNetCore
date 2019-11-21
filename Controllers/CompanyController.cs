using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TestFirstDemoCoreAngular.Controllers
{
    public class CompanyController : Controller
    {

        private string _connectionString = "Data Source = VIPRAK-PRAGNESH\\SQLEXPRESS; Integrated Security = true; Initial Catalog=TestCoreDemo";
        [HttpGet]
        public async Task<IEnumerable<Company>> Get()
        {
            IEnumerable<Company> company;
            
            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                company = await connection.QueryAsync<Company>("GetGroupMeetingDetails",
                                commandType: CommandType.StoredProcedure);
            }
            return company;
        }

        // DELETE api/aircraft/id
        [HttpPost]

        public string UpdateStudent(Company company)
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();
                DynamicParameters param = new DynamicParameters();
                param.Add("@project", company.ProjectName);
                param.Add("@groupname", company.GroupMeetingLeadName);
                param.Add("@Id", company.Id);
                param.Add("@oper", "edit");
                var affectedRows = connection.Execute("GetGroupMeetingDetails_Crud", param, commandType: CommandType.StoredProcedure);
                connection.Close();
                return "success" + affectedRows;
            }
        }

    }
}