using light_utility.Devices.Tapo;
using Microsoft.AspNetCore.Mvc;
using TapoDevices;

namespace light_manager_api.Controllers.Lights
{
    [ApiController]
    [Route("api/lights/settings")]
    public class SettingsController : Controller
    {
        [HttpGet("devices")]
        public async Task<IActionResult> GetList()
        {
            List<L530> devices = new List<L530>();
            List<Task> tasks = new List<Task>();
            foreach(var device in TapoManager.Devices)
            {
                try
                {
                    L530 bulb = new L530(device.Ip)
                    {
                        Id = device.Id
                    };
                    bulb.Name = device.Name;
                    bulb.Location = device.Location;
                    devices.Add(bulb);
                   
                }
                catch (Exception ex) { }
            }

            return Ok(devices);
        }

        [HttpGet("device/{deviceId}")]
        public async Task<IActionResult> GetDevice(int deviceId)
        {
            TapoManager.TapoDevice? device = TapoManager.GetDevice(deviceId);
            if (device == null) { return Ok(null); }
            L530 bulb = new L530(device.Ip)
            {
                Id = device.Id
            };
            await bulb.Connect();
            await bulb.GetInfo();
            await bulb.GetStatus();
            bulb.Location = device.Location;
            return Ok(bulb);
        }


    }
}
