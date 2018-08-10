using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ccnet.Models;
using Microsoft.Extensions.Logging;

namespace ccnet.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger _logger;

        public HomeController(ILoggerFactory logger)
        {
            _logger = logger.CreateLogger("ccnet.Controllers.HomeController");
        }

        public IActionResult Index()
        {             
            _logger.LogError("Error al entrar aquí.");
            return View();
        }        

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
